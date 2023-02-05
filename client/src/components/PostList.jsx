// dependancies
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'

// import
import PostTile from './PostTile.jsx';
import PostSpan from './PostSpan.jsx';
import './styles/PostList.css';
import { set } from 'date-fns/esm';

function PostList({ postFilters, onTileClick, showAddNew, showSearch, title, useWindowOffset, amTiled }) {
  // 
  const [posts, setPosts] = useState([]);
  const [shownPosts, setShownPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState('');

  // get the posts
  useEffect(() => {
    axios.get('tags')
      .then(ts => {
        setTags(ts.data);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('/posts/info', {
      params: {
        ...postFilters
      }
    })
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    let newPosts = [...posts];
    newPosts = newPosts.filter((post) => {
      let returning = false;
      if (post.title.toLowerCase().includes(search.toLowerCase())) returning = true;
      if (post.description.toLowerCase().includes(search.toLowerCase())) returning = true;
      // tags
      const tagNames = tags.filter(t => post.tag_ids.includes(t._id)).map(t => t.name);
        for (let name of tagNames) {
          if (name.toLowerCase().includes(search.toLowerCase())) returning = true;
        }
      if (search.toLowerCase().includes('publish') && post.published) returning = true;
      if (search.toLowerCase().includes('feature') && post.featured) returning = true;
      if (search.toLowerCase().includes('draft') && !post.published) returning = true;
      return returning;
    });
    setShownPosts(newPosts);
  }, [search, posts])

  // what should we do when a tile is clicked
  const handleTileClick = function(post) {
    if (onTileClick) {
      onTileClick(post);
    }
  }

  // adding a new post
  const addPost = function() {
    const today = new Date();
    axios.post('/posts', {
      title: 'Temp Title',
      description: 'Temp Description',
      tags: [],
      created_at: today.toISOString(),
      published: false,
      published_at: null,
      featured: false
    })
      .then(res => {
        setPosts([...posts, res.data])
      })
      .catch(err => {
        console.log(err);
      })
  }

  // drag to scroll and text near cursor (all is for drag unless specified)
  // for drag
  const wrapperRef = useRef(null); // this is used by both
  const [initialMousePos, setInitialMousePos] = useState(null);
  const [velX, setVelX] = useState(0);

  // for text
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showText, setShowText] = useState(false);
  const textRef = useRef(null);

  const dragOffSetX = -50;
  const dragOffSetY = -30;

  // functions

  const handleMouseDown = (event) => {
    setInitialMousePos(event.clientX);
  };

  const handleMouseMove = (event) => {
    // for text
    const { clientX, clientY } = event;
    const { scrollX, scrollY } = window;
    const navbar = document.querySelector('.navbar');
    const wo = useWindowOffset ? window.innerHeight - navbar.clientHeight : 0;
    setMousePos({ x: clientX + scrollX, y: clientY + scrollY - wo});
    
    //for drag
    const wrapper = wrapperRef.current;
    if (initialMousePos !== null) {
      const difference = event.clientX - initialMousePos;
      wrapper.scrollLeft -= difference;
      setVelX(difference);
      setInitialMousePos(event.clientX);
    }

  };

  const handleMouseUp = () => {
    setInitialMousePos(null);
  };

  const handleMouseEnter = () => {
    setShowText(true);
  }

  const handleMouseLeave = () => {
    // if the mouse leaves we also want to stop drag tracking
    setInitialMousePos(null);
    // and we want to stop showing text
    setShowText(false);
  }

  const handleTouchStart = (event) => {
    setInitialMousePos(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    // Same logic as handleMouseMove
    const wrapper = wrapperRef.current;
    if (initialMousePos !== null) {
      const difference = event.touches[0].clientX - initialMousePos;
      wrapper.scrollLeft -= difference;
      setInitialMousePos(event.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setInitialMousePos(null);
  };

  return (
    <div className={amTiled ? 'post-list tiled' : 'post-list spanned'}>
      <p className='title' >{title}</p>
      <hr />
      {
        showAddNew
          ?
          <p className='new-post-button links-item reacting-link' onClick={addPost} >Add New Draft</p>
          : null
      }
      {
        showSearch
          ? 
          <input className='search' type="text" placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value); }} />
          : null
      }
      {
        amTiled 
          ?
          <div className='scroll-wrapper' ref={wrapperRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className='scroller' >
              {
                // map out the posts
                shownPosts.map(post => {
                  return <PostTile key={post._id} post={post} onClick={handleTileClick} tags={tags.filter(t => post.tag_ids.includes(t._id)).map(t => t.name)} />
                })
              }
            </div>
            {
              showText 
                ?
                <div className='mouseOverText' ref={textRef} style={{
                  position: 'absolute',
                  left: mousePos.x + dragOffSetX,
                  top: mousePos.y + dragOffSetY,
                  zIndex: 999
                }} > 
                  {/* DRAG */}
                </div>
                : null
            }
          </div>
          :
          <div className='span-area'>
            {
              shownPosts.map((post, index) => {
                return <PostSpan key={post._id} post={post} onClick={handleTileClick} showSlash={index !== (shownPosts.length - 1)} />
              })
            }
          </div>
      }
    </div>

  )
}

export default PostList;