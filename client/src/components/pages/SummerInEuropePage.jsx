// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

// internal
import { SignInUpPageStyled } from './styles/SignInUpPage.styled.js';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import PostList from '../main-components/PostList.jsx';
import SimpleText from '../main-components/SimpleText.jsx';
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
    <SignInUpPageStyled className='summer-in-europe-page'>
      <Navbar />
      <InlineImage imageURL='Personal_Site/SummerInEurope/DSC01950.JPG' />
      <SimpleText text='I had a great summer in Europe. I got my feet under me with some friends in London, then headed to Krakow for the weekend to chase down some of the places in a podcast I had been listening to. I met my dad in Munich for the main event, a winding roadtrip through the Alps. We headed down into Austria, then continued into Italy. We were then back up into Switzerland, and then ended the car ride in the Black Forest. We flew to Paris for some excellent food and a bit of art. When Dad flew home from Paris, I went and met a friend in Portugal, and then Sam in Rome. ' />
      <PostList
        postFilters={{ published: true, tags: 'Europe 2023' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        showSearch={false}
        title='Europe 2023'
        useWindowOffset={false}
        amTiled={true}
        showPostsOldToNew={true}
      />
      <PostList
        postFilters={{ published: true, tags: 'Europe 2023' }}
        onTileClick={loadPostViewer}
        showAddNew={false}
        showSearch={false}
        title=''
        useWindowOffset={false}
        amTiled={false}
        showPostsOldToNew={true}
      />
      {/* <div className={'wm-spreads' + (!!isMobile ? ' mobile' : '')}>
        <ImageScroller
          title='2022 Wolfmoor Magazine'
          imageURLArray={Array.from(
            { length: 64 },
            (_, i) => `0_wolfmoor_spreads/2022/WolfmoorMag2022-${i + 1}.jpg`
          )}
          ImageMapper={ImageMapper}
        />
      </div> */}
      <Footer />
    </SignInUpPageStyled>
  );
}

export default Posts;
