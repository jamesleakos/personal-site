// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// comps
import Footer from '../../main-components/Footer.jsx';
import Navbar from '../../main-components/Navbar.jsx';
import PostList from '../../main-components/PostList.jsx';
import BackgroundImage from '../../main-components/BackgroundImage.jsx';

function SkiingPostsPage({ isMobile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .post(`/page/skiing-posts`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const loadPostViewer = function (post_id) {
    navigate(`/post-viewer/${post_id}`);
  };

  return (
    <div className='posts'>
      <Navbar />
      {!isMobile ? (
        <BackgroundImage imageURL='Personal_Site/sam_and_guide_hike.JPG' />
      ) : null}
      <PostList
        postFilters={{ published: true, tags: 'Skiing' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        title='Skiing Posts'
        useWindowOffset={false}
        amTiled={true}
      />
      <Footer />
    </div>
  );
}

export default SkiingPostsPage;
