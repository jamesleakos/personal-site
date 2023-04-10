// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import PostList from '../main-components/PostList.jsx';
import BackgroundImage from '../main-components/BackgroundImage.jsx';

function Posts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const loadPostViewer = function (post_id) {
    navigate(`/post-viewer/${post_id}`);
  };

  return (
    <div className='posts'>
      <Navbar />
      <PostList
        postFilters={{ published: true }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        showSearch={true}
        title='2022 Wolfmoor Magazine'
        useWindowOffset={false}
        amTiled={true}
      />
      <PostList
        postFilters={{ published: true }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        showSearch={true}
        title='2022 List'
        useWindowOffset={false}
        amTiled={false}
      />
      <BackgroundImage
        height='600px'
        imageURL='Personal_Site/sam_in_sask_vGufgsbWx.JPG'
      />
      <PostList
        postFilters={{ published: true, tags: 'WM 2021' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        showSearch={true}
        title='2021 Wolfmoor Magazine'
        useWindowOffset={false}
        amTiled={true}
      />
      <PostList
        postFilters={{ published: true, tags: 'WM 2021' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        showSearch={true}
        title='2021 List'
        useWindowOffset={false}
        amTiled={false}
      />
      <BackgroundImage
        height='600px'
        imageURL='Personal_Site/skinning_outside_RJ4rJKy53.jpg'
      />
      <Footer />
    </div>
  );
}

export default Posts;
