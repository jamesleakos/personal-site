// dependancies
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'

// import
import PostTile from './PostTile.jsx';
import './styles/PostList.css';

function PostList({ onTileClickPostBuilder, showAddNew, useWindowOffset }) {
  // 
  const [posts, setPosts] = useState([]);

  // get the posts
  useEffect(() => {
    axios.get('/posts/info')
    .then(res => {
      setPosts(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  // what should we do when a tile is clicked
  const handleTileClick = function(post) {
    // check if we're in post-builder 
    if (onTileClickPostBuilder) {
      onTileClickPostBuilder(post._id);
    } else {
      // go to post-builder with argument post
    }
  }

  // adding a new post
  const addPostObj = { _id: 'new-post', title: 'New Post', description: 'Click here for a new post' };
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
  const dragOffSetX = -20;
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
    console.log(navbar.clientHeight);
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
    <div className='post-list' ref={wrapperRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
      <div className='scroller' >
        {
          // map out the posts
          posts.map(post => {
            return <PostTile key={post._id} post={post} onClick={handleTileClick} />
          })
        }
        {
          showAddNew
            ?
            <PostTile key='new-post' post={addPostObj} onClick={addPost} />
            : null
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
            DRAG
          </div>
          : null
      }
    </div>
  )
}

export default PostList;