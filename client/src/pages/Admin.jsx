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
      <BackgroundImage height='100px' image={'url(' + require('../images/gc_wall.JPG') + ')'} />
      <PostList postFilters={{ published: false }} onTileClick={loadPostBuilder} showAddNew={true} useWindowOffset={false} title='Drafts' showSearch={true} amTiled={true} />
      <TagManager />
      <BackgroundImage height='50vh' image={'url(' + require('../images/skinning_outside.JPG') + ')'} />
      <Footer />
    </div>
  )
}

export default Admin;