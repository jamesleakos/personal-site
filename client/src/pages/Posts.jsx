import React, { useState, useEffect } from 'react';
import Title from '../components//Title.jsx';
import Footer from '../components//Footer.jsx';
import Navbar from '../components//Navbar.jsx';
import PostList from '../components//PostList.jsx';
import Info from '../components/Info.jsx';

function Posts() {
  return (
    <div className='posts'>
      <PostList />
      <Info />
      <Footer />
    </div>
  )
}

export default Posts;