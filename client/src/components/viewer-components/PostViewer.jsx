// dependancies
import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

// components
import Navbar from '../main-components/Navbar.jsx';
import PostList from '../main-components/PostList.jsx';
import Footer from '../main-components/Footer.jsx';
import TextComp from '../viewer-components/TextComp.jsx';
import PhotoComp from '../viewer-components/PhotoComp.jsx';
// import PhotoGalleryComp from '../viewer-components/PhotoGalleryComp.jsx';
// import BackgroundPhotoComp from '../viewer-components/BackgroundPhotoComp.jsx';

function PostViewer() {
  const passedPostID = useLoaderData();

  // starting effects
  useEffect(() => {
    // scroll to the top
    window.scrollTo(0, 0);

    if (!passedPostID) return;
    axios.get(`/posts/${passedPostID}`)
    .then(res => {
      setPost(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  // setting post
  const [post, setPost] = useState({
    components: []
  });

  // POST API CALLS

  // image GET calls - the POST calls are in the image component itself
  const [images, setImages] = useState([]);
  
  return (
    <div className='post-viewer'>
      <Navbar />
      {
        post.components.map((component, index) => {
          switch (component.type) {
            case 'main-title':
            case 'subtitle':
            case 'section-title':
            case 'body-text':
            case 'quote':
            case 'caption':
              return <TextComp key={component._id + index + ''} component={component} />
            case 'photo':
            case 'background-photo':
              return <PhotoComp key={component._id + index} component={component} url={images.filter(c => c.key === component.key)[0]?.url} />
            default:
              break;
          }
        })
      }
      <Footer />
    </div>
  )
}

export default PostViewer;