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
  const loadPostBuilder = function(post_id) {
    navigate(`/post-builder/${post_id}`)
  }
  
  return (
    <div className='admin'>
      <Navbar />
      <PostList postFilters={{ published: true }} onTileClick={loadPostBuilder} showAddNew={false} useWindowOffset={false} title='Published Posts' showSearch={true} amTiled={true} />
      <PostList postFilters={{ }} onTileClick={loadPostBuilder} showAddNew={false} showSearch={false} title='All Posts' useWindowOffset={false} amTiled={false} />
      <PostList postFilters={{ published: false }} onTileClick={loadPostBuilder} showAddNew={true} useWindowOffset={false} title='Drafts' showSearch={true} amTiled={true} />
      <PostList postFilters={{ }} onTileClick={loadPostBuilder} showAddNew={false} showSearch={false} title='All Posts' useWindowOffset={false} amTiled={false} />
      <TagManager />
      <BackgroundImage height='50vh' imageURL='skinning_outside_RJ4rJKy53.jpg' />
      <Footer />
    </div>
  )
}

export default Admin;