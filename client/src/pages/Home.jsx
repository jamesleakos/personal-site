import React, { useState, useEffect } from 'react';
import Title from '../components/Title.jsx';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';
import Info from '../components/Info.jsx';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
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
      overlap = Math.max((scrollDivRect.top / titleDivRect.bottom), 0);
    }
    // set the fixed div's opacity based on the percentage of overlap
    // setOpacity(overlap);
  }

  return (
    <div className='home'>
      <div className='title-div' ref={titleDiv} style={{ opacity }}>
        <Title />
      </div>
      <div className='scroll-div' ref={scrollDiv}>
        <Navbar />
        <PostList />
        <Info />
        <Footer />
      </div>
    </div>
  )
}

export default Home;