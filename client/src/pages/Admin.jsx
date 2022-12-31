import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';

function Admin() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className='admin'>
      <Navbar />
      <h3>Published Posts</h3>
      <PostList />
      <h3>Drafts</h3>
      <PostList showAddNew={true}/>
      <br /><br /><br />
      <Footer />
    </div>
  )
}

export default Admin;