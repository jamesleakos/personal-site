// dependancies
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'

// import
import PostTile from './PostTile.jsx';
import PostSpan from './PostSpan.jsx';
import './styles/PostList.css';

function PostList({ postFilters, onTileClick, showAddNew, showSearch, title, useWindowOffset, amTiled }) {
  // 
  const [posts, setPosts] = useState([]);
  const [shownPosts, setShownPosts] = useState([]);
  const [search, setSearch] = useState('');

  // get the posts
  useEffect(() => {
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
      for (let tag of post.tags) {
        if (tag.toLowerCase().includes(search.toLowerCase())) returning = true;
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
      tags: ['adventure', 'culture', 'winter 2023'],
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
  const dragOffSetX = -50;
  const dragOffSetY = -30;

  // for text
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showText, setShowText] = useState(false);
  const textRef = useRef(null);

  const handleMouseDown = (event) => {
    setInitialMousePos(event.clientX);
  };

  const handleMouseMove = (event) => {
    //for drag
    const wrapper = wrapperRef.current;
    if (initialMousePos !== null) {
      const difference = event.clientX - initialMousePos;
      wrapper.scrollLeft -= difference;
      setInitialMousePos(event.clientX);
    }
    // for text
    const { clientX, clientY } = event;
    const { scrollX, scrollY } = window;
    const navbar = document.querySelector('.navbar');
    const wo = useWindowOffset ? window.innerHeight - navbar.clientHeight : 0;
    setMousePos({ x: clientX + scrollX, y: clientY + scrollY - wo});
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

  return (
    <div className='post-list'>
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
          <div className='scroll-wrapper' ref={wrapperRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <div className='scroller' >
              {
                // map out the posts
                shownPosts.map(post => {
                  return <PostTile key={post._id} post={post} onClick={handleTileClick} />
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
          <div className='span-wrapper'>
            {
              shownPosts.map((post, index) => {
                return <PostSpan key={post._id} post={post} onClick={handleTileClick} showSlash={index === (shownPosts.length - 1)} />
              })
            }
          </div>
      }
    </div>

  )
}

export default PostList;