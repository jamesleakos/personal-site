// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// comps
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';
import Info from '../components/Info.jsx';

function Posts() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate();
  const loadPostViewer = function(post) {
    navigate(
      '/post-viewer',
      {
        state: {
          passedPost: post
        }
      }
    )
  }
  
  return (
    <div className='posts'>
      <Navbar />
      <PostList onTileClick={loadPostViewer} showAddNew={false} useWindowOffset={false} />
      <Info />
      <Footer />
    </div>
  )
}

export default Posts;