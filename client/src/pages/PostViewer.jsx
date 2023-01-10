// dependancies
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// components
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';
import Footer from '../components/Footer.jsx';
import TextComp from '../viewer-components/TextComp.jsx';
import PhotoComp from '../viewer-components/PhotoComp.jsx';
// import PhotoGalleryComp from '../viewer-components/PhotoGalleryComp.jsx';
// import BackgroundPhotoComp from '../viewer-components/BackgroundPhotoComp.jsx';

function PostViewer() {
  const location = useLocation();
  let passedPost = false;
  if (location.state) {
    passedPost = location.state.passedPost;
  }
  // starting effects
  useEffect(() => {
    // scroll to the top
    window.scrollTo(0, 0);

    // at the start, if we were given a post (not likely to include components) we fetch the full post
    if (!passedPost) return;
    getFullPost(passedPost);
  }, [])

  // setting post
  const [post, setPost] = useState({
    components: []
  });

  // POST API CALLS
  const getFullPost = function(post) {
    axios.get(`/posts/${post._id}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

    // image GET calls - the POST calls are in the image component itself
    const [images, setImages] = useState([]);

    useEffect(() => {
      if (!post._id) return;
      axios.get(`/image_components?post_id=${post._id}`)
        .then(res => {
          setImages(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }, [post]);
  
  return (
    <div className='post-viewer'>
      <Navbar />
      {
        !post._id 
          ? 
          <PostList onTileClick={getFullPost} showAddNew={false}  title='Posts' showSearch={true} postFilters={{ published: true }} useWindowOffset={false} amTiled={true} />
          : null
      }
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