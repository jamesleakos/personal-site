// dependancies
import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { isMobile } from 'react-device-detect';

// components
import Navbar from '../main-components/Navbar.jsx';
import Footer from '../main-components/Footer.jsx';
import TextComp from './TextComp.jsx';
import PhotoComp from './PhotoComp.jsx';
import PhotoScrollerComp from './PhotoScrollerComp.jsx';
// import PhotoGalleryComp from '../viewer-components/PhotoGalleryComp.jsx';
// import BackgroundPhotoComp from '../viewer-components/BackgroundPhotoComp.jsx';
import { PostViewerStyled } from './styles/PostViewer.styled.js';

function PostViewer() {
  const passedPostID = useLoaderData();
  const [preventScrolling, setPreventScrolling] = useState(false);

  // landscape for mobile
  const [isLandscapeMode, setIsLandscapeMode] = useState(isLandscape());
  function isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  useEffect(() => {
    if (!passedPostID) return;
    if (!post) return;
    axios
      .get(`/page/post-viewer`, {
        id: passedPostID,
        name: post.title,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [passedPostID, post]);

  useEffect(() => {
    // we don't care if not on mobile
    if (!isMobile) return;

    function handleResize() {
      setIsLandscapeMode(isLandscape());
    }

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // prevent scrolling
  const handlePreventScrolling = (set) => {
    console.log('setting prevent scrolling to ', set);
  };

  useEffect(() => {
    console.log('prevent scrolling is ', preventScrolling);
  }, [preventScrolling]);

  // starting effects
  useEffect(() => {
    // scroll to the top
    window.scrollTo(0, 0);

    if (!passedPostID) return;
    axios
      .get(`/posts/${passedPostID}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // setting post
  const [post, setPost] = useState({
    components: [],
  });

  return (
    <PostViewerStyled
      className='post-viewer'
      style={post.isDark ? { backgroundColor: 'black', color: 'white' } : null}
    >
      {!(isMobile && isLandscapeMode) && <Navbar />}
      <div
        className={'scroll-container' + (preventScrolling ? ' is-locked' : '')}
      >
        <div className='scroller'>
          {post.components.map((component, index) => {
            switch (component.type) {
              case 'main-title':
              case 'subtitle':
              case 'section-title':
              case 'body-text':
              case 'quote':
              case 'caption':
                return (
                  <TextComp
                    key={component._id + index + ''}
                    component={component}
                  />
                );
              case 'photo':
              case 'background-photo':
                return (
                  <PhotoComp
                    key={component._id + index}
                    component={component}
                  />
                );
              case 'photo-scroller':
                return (
                  <PhotoScrollerComp
                    key={component._id + index}
                    component={component}
                    handlePreventScrolling={handlePreventScrolling}
                  />
                );
              default:
                break;
            }
          })}
        </div>
      </div>
      <Footer />
    </PostViewerStyled>
  );
}

export default PostViewer;
