import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
// import PostBuilder from '../components/PostBuilder.jsx';

function PostBuilder() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className='post-builder'>
      <Navbar />
    </div>
  )
}

export default PostBuilder;