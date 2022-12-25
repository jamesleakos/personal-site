import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';
import Info from '../components/Info.jsx';

function Posts() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className='posts'>
      <Navbar />
      <PostList />
      <Info />
      <Footer />
    </div>
  )
}

export default Posts;