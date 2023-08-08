// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

// internal
import './styles/AllPostsPage.css';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import PostList from '../main-components/PostList.jsx';
import ImageScroller from '../utility-components/scrollers/desktop-image-scroller/ImageScroller.jsx';
import { ImageMapper } from '../utility-components/scrollers/desktop-image-scroller/ImageScrollItem.jsx';
import BackgroundImage from '../main-components/BackgroundImage.jsx';
import InlineImage from '../main-components/InlineImage.jsx';

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
      <InlineImage imageURL='Personal_Site/skinning_cropped.jpg' />
      <div className={'wm-spreads' + (!!isMobile ? ' mobile' : '')}>
        <ImageScroller
          title='2022 Wolfmoor Magazine'
          imageURLArray={Array.from(
            { length: 64 },
            (_, i) => `0_wolfmoor_spreads/2022/WolfmoorMag2022-${i + 1}.jpg`
          )}
          ImageMapper={ImageMapper}
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
        height='70vh'
        imageURL='Personal_Site/sam_in_sask_vGufgsbWx.JPG'
      /> */}
      {/* <img
        src='https://ik.imagekit.io/hfywj4j0a/tr:w-2500/Personal_Site/sam_in_sask_vGufgsbWx.JPG'
        style={{ width: '100%' }}
      /> */}
      <InlineImage imageURL='Personal_Site/SJ-162.jpg' />
      <div className={'wm-spreads' + (!!isMobile ? ' mobile' : '')}>
        <ImageScroller
          title='2021 Wolfmoor Magazine'
          imageURLArray={Array.from(
            { length: 70 },
            (_, i) => `0_wolfmoor_spreads/2021/WolfmoorMag2021-${i + 1}.jpg`
          )}
          ImageMapper={ImageMapper}
        />
      </div>
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
