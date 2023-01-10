// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// comps
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';
import Info from '../components/Info.jsx';
import BackgroundImage from '../components/BackgroundImage.jsx';

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
      <PostList postFilters={{ published: true }} onTileClick={loadPostViewer} showAddNew={false} showSearch={true} title='2022 Featured Articles' useWindowOffset={false} amTiled={true} />
      <PostList postFilters={{ published: true }} onTileClick={loadPostViewer} showAddNew={false} showSearch={true} title='2022 Featured Articles' useWindowOffset={false} amTiled={false} />
      <BackgroundImage height='600px' image={'url(' + require('../images/skinning_outside.JPG') + ')'} />
      <PostList postFilters={{ published: true }} onTileClick={loadPostViewer} showAddNew={false} showSearch={true} title='2022 Featured Articles' useWindowOffset={false} amTiled={true} />
      <PostList postFilters={{ published: true }} onTileClick={loadPostViewer} showAddNew={false} showSearch={true} title='2022 Featured Articles' useWindowOffset={false} amTiled={false} />
      <BackgroundImage height='600px' image={'url(' + require('../images/skinning_outside.JPG') + ')'} />
      <Footer />
    </div>
  )
}

export default Posts;