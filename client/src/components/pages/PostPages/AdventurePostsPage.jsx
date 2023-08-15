// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// comps
import Footer from '../../main-components/Footer.jsx';
import Navbar from '../../main-components/Navbar.jsx';
import PostList from '../../main-components/PostList.jsx';
import BackgroundImage from '../../main-components/BackgroundImage.jsx';

function AdventurePostsPage({ isMobile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`/page/adventure-posts`)
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
        <BackgroundImage imageURL='Personal_Site/sam_on_rock_spine.JPG' />
      ) : null}
      <PostList
        postFilters={{ published: true, tags: 'Adventure' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        title='Adventure Posts'
        useWindowOffset={false}
        amTiled={true}
      />
      <Footer />
    </div>
  );
}

export default AdventurePostsPage;
