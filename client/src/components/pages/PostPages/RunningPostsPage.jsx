// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// comps
import Footer from '../../main-components/Footer.jsx';
import Navbar from '../../main-components/Navbar.jsx';
import PostList from '../../main-components/PostList.jsx';
import BackgroundImage from '../../main-components/BackgroundImage.jsx';

function RunningPostsPage({ isMobile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!passedTag) return;
    axios
      .get(`/page/running-posts`)
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
        <BackgroundImage imageURL='Personal_Site/sam_running_in_kanab_curve.JPG' />
      ) : null}
      <PostList
        postFilters={{ published: true, tags: 'Running' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        title='Running Posts'
        useWindowOffset={false}
        amTiled={true}
      />
      <Footer />
    </div>
  );
}

export default RunningPostsPage;
