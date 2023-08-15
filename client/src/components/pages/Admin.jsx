// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import PostList from '../main-components/PostList.jsx';
import BackgroundImage from '../main-components/BackgroundImage.jsx';
import TagManager from '../../admin/TagManager.jsx';
// contexts
import AuthContext from '../../contexts/AuthContext.js';

function Admin() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, logout } = React.useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get('/auth/check-auth')
      .then((res) => {
        // if 200 response, do nothing
        console.log('auth check successful');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log('auth check not successful');
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    axios
      .post(`/page/admin`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate('/sign-in-up');
  }, [isLoggedIn]);

  const loadPostBuilder = function (post_id) {
    navigate(`/post-builder/${post_id}`);
  };

  return (
    <div className='admin'>
      <Navbar />
      <PostList
        postFilters={{ published: true }}
        onTileClick={loadPostBuilder}
        showAddNew={false}
        useWindowOffset={false}
        title='Published Posts'
        showSearch={true}
        amTiled={true}
      />
      <PostList
        postFilters={{}}
        onTileClick={loadPostBuilder}
        showAddNew={false}
        showSearch={false}
        title='All Posts'
        useWindowOffset={false}
        amTiled={false}
      />
      <PostList
        postFilters={{ published: false }}
        onTileClick={loadPostBuilder}
        showAddNew={true}
        useWindowOffset={false}
        title='Drafts'
        showSearch={true}
        amTiled={true}
      />
      {/* <PostList
        postFilters={{}}
        onTileClick={loadPostBuilder}
        showAddNew={false}
        showSearch={false}
        title='All Posts'
        useWindowOffset={false}
        amTiled={false}
      /> */}

      <TagManager />

      {/* <BackgroundImage
        height='50vh'
        imageURL='Personal_Site/skinning_outside_RJ4rJKy53.jpg'
      /> */}
      <div
        className='admin_logout'
        onClick={logout}
        style={{ height: '50px', lineHeight: '50px' }}
      >
        <p
          className='clickable cursor-expand'
          style={{ fontWeight: 'normal', lineHeight: '50px' }}
        >
          Logout
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
