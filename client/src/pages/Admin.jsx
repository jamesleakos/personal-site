// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// comps
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';

function Admin() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate();
  const loadPostBuilder = function(post) {
    navigate(
      '/post-builder',
      {
        state: {
          passedPost: post
        }
      }
    )
  }
  
  return (
    <div className='admin'>
      <Navbar />
      <h3>Published Posts</h3>
      <PostList onTileClick={loadPostBuilder} showAddNew={false} useWindowOffset={false} />
      <h3>Drafts</h3>
      <PostList onTileClick={loadPostBuilder} showAddNew={true} useWindowOffset={false} />
      <br /><br /><br />
      <Footer />
    </div>
  )
}

export default Admin;