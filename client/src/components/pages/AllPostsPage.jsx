// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import PostList from '../main-components/PostList.jsx';
import TileScroller from '../utility-components/TileScroller.jsx';
import {
  ImageScrollItem,
  ImageMapper,
} from '../utility-components/ImageScrollItem.jsx';
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
      <div className='wm-spreads'>
        <p className='title'>{title}</p>
        <hr />
        <TileScroller
          Mapper={ImageMapper}
          MapArray={[
            '0_wolfmoor_spreads/2022/WolfmoorMag2022-28.jpg',
            '0_wolfmoor_spreads/2022/WolfmoorMag2022-28.jpg',
          ]}
        />
      </div>
      <PostList
        postFilters={{ published: true, featured: true, tags: 'WM 2022' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        showSearch={true}
        title='2022 Featured Posts'
        useWindowOffset={false}
        amTiled={true}
      />
      <PostList
        postFilters={{ published: true, tags: 'WM 2022' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        showSearch={true}
        title='2022 All Posts'
        useWindowOffset={false}
        amTiled={false}
      />
      {/* <BackgroundImage
        height='600px'
        imageURL='Personal_Site/sam_in_sask_vGufgsbWx.JPG'
      /> */}
      <PostList
        postFilters={{ published: true, featured: true, tags: 'WM 2021' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        showSearch={true}
        title='2021 Featured Posts'
        useWindowOffset={false}
        amTiled={true}
      />
      <PostList
        postFilters={{ published: true, tags: 'WM 2021' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        showSearch={true}
        title='2021 All Posts'
        useWindowOffset={false}
        amTiled={false}
      />
      {/* <BackgroundImage
        height='600px'
        imageURL='Personal_Site/skinning_outside_RJ4rJKy53.jpg'
      /> */}
      <Footer />
    </div>
  );
}

export default Posts;
