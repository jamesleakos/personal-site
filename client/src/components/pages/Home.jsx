// dependancies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// compos
import Title from '../main-components/Title.jsx';
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import PostList from '../main-components/PostList.jsx';
import Info from '../main-components/Info.jsx';
import BackgroundImage from '../main-components/BackgroundImage.jsx';
import axios from 'axios';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [opacity, setOpacity] = useState(1);

  let scrollDiv = React.useRef(null);
  let titleDiv = React.useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', fader);
    return () => window.removeEventListener('scroll', fader);
  }, []);

  const fader = () => {
    // get the bounding client rect of the other div and the fixed div
    const scrollDivRect = scrollDiv.current.getBoundingClientRect();
    const titleDivRect = titleDiv.current.getBoundingClientRect();

    // calculate the percentage of the fixed div that is covered by the other div
    let overlap = 0;

    if (scrollDivRect.top < titleDivRect.top) {
      overlap = 1;
    } else {
      overlap = Math.max(scrollDivRect.top / titleDivRect.bottom, 0);
    }
    // set the fixed div's opacity based on the percentage of overlap
    // setOpacity(overlap);
  };

  const navigate = useNavigate();
  const loadPostViewer = function (post_id) {
    navigate(`/post-viewer/${post_id}`)
  };

  return (
    <div className='home'>
      <div></div>
      <div className='title-div' ref={titleDiv} style={{ opacity }}>
        <Title />
      </div>
      <div className='scroll-div' ref={scrollDiv}>
        <Navbar />
        <PostList
          postFilters={{ published: true }}
          onTileClick={loadPostViewer}
          showAddNew={false}
          useWindowOffset={true}
          title='Featured Posts'
          showSearch={false}
          amTiled={true}
        />
        <Info />
        <PostList
          postFilters={{}}
          onTileClick={loadPostViewer}
          showAddNew={false}
          showSearch={false}
          title='All Posts'
          useWindowOffset={false}
          amTiled={false}
        />
        <BackgroundImage
          height='80vh'
          imageURL='cascade_party_o3vag5CSz.JPG'
        />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
