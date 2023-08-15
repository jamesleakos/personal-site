// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// comps
import Footer from '../../main-components/Footer.jsx';
import Navbar from '../../main-components/Navbar.jsx';
import PostList from '../../main-components/PostList.jsx';
import BackgroundImage from '../../main-components/BackgroundImage.jsx';

function CulturePostsPage({ isMobile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .post(`/page/culture-posts`)
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
        <BackgroundImage
          imageURL='Personal_Site/plunge_pool_at_amangiri.jpg'
          backgroundPosition='bottom'
        />
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
