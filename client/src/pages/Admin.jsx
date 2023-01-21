// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// comps
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';
import BackgroundImage from '../components/BackgroundImage.jsx';
import TagManager from '../admin/TagManager.jsx';

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
      <PostList postFilters={{ published: true }} onTileClick={loadPostBuilder} showAddNew={false} useWindowOffset={false} title='Published Posts' showSearch={true} amTiled={true} />
      <PostList postFilters={{ }} onTileClick={loadPostBuilder} showAddNew={false} showSearch={false} title='All Posts' useWindowOffset={false} amTiled={false} />
      <PostList postFilters={{ published: false }} onTileClick={loadPostBuilder} showAddNew={true} useWindowOffset={false} title='Drafts' showSearch={true} amTiled={true} />
      <PostList postFilters={{ }} onTileClick={loadPostBuilder} showAddNew={false} showSearch={false} title='All Posts' useWindowOffset={false} amTiled={false} />
      <TagManager />
      <BackgroundImage height='50vh' imageURL='https://ik.imagekit.io/hfywj4j0a/skinning_outside_RJ4rJKy53.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674278399179' />
      <Footer />
    </div>
  )
}

export default Admin;