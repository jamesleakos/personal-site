// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// comps
import Footer from '../../main-components/Footer.jsx';
import Navbar from '../../main-components/Navbar.jsx';
import PostList from '../../main-components/PostList.jsx';
import BackgroundImage from '../../main-components/BackgroundImage.jsx';

function CulturePostsPage({ isMobile }) {
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
      {!isMobile ? (
        <BackgroundImage imageURL='Personal_Site/amangiri_far_shot_077VZ07AC.JPG' />
      ) : null}
      <PostList
        postFilters={{ published: true, tags: 'Culture' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        title='Culture Posts'
        useWindowOffset={false}
        amTiled={true}
      />
      <Footer />
    </div>
  );
}

export default CulturePostsPage;
