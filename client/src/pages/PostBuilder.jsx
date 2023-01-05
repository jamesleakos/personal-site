// dependancies
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// components
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';
import AddComponentSelector from '../builder-components/AddComponentSelector.jsx';
import BuilderBar from '../builder-components/BuilderBar.jsx';
import InfoModal from '../builder-components/InfoModal.jsx';
import TextComp from '../builder-components/TextComp.jsx';
import PhotoComp from '../builder-components/PhotoComp.jsx';

function PostBuilder() {
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

  const [showInfoModal, setShowInfoModal] = useState(false);

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
  const modifyPost = function (newPost) {
    axios.put(`/posts?post_id=${post._id}`, {
      ...newPost
    })
      .then(res => {
        setPost(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }
  const deletePost = function() {
    axios.delete(`/posts?post_id=${post._id}`)
      .then(() => {
        setPost({
          components: []
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  // COMPONENT API CALLS
  const addComponent = function(componentName) {
    const comp = {
      type: componentName
    }
    switch (componentName) {
      case 'main-title':
      case 'subtitle':
      case 'section-title':
      case 'body-text':
      case 'quote':
      case 'caption':
        comp.text = '';
        break;
      case 'photo':
      case 'background-photo':
        comp.key = '';
        break;
      default:
        break;
    }
    comp.openOnEdit = true;
    const p = { ...post };
    p.components.push(comp);
    setPost(p);
  }
  const modifyComponent = (component) => {
    if (component.type === 'photo' || component.type === 'background-photo') {
      axios.put(`/image_components?post_id=${post._id}`,{
        ...component
      })
        .then(res => {
          setPost(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      axios.put(`/components?post_id=${post._id}`,{
        ...component
      })
        .then(res => {
          setPost(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  const deleteComponent = (component) => {
    if (!component.kind) { // kind should only be on something we've got back from the server
      const newPost = { ...post };
      const i = post.components.indexOf(component);
      if (i > 0) {
        newPost.components.splice(i, 1);
      }
      setPost(newPost);
      return;
    }

    if (component.kind === 'TextComponent') {
      axios.delete(`/components?post_id=${post._id}&component_id=${component._id}`)
        .then(res => {
          console.log(res.data);
          setPost(res.data);
        })
        .catch(err => {
          console.log(err);
        })

    } else if (component.kind === 'ImageComponent') {
      console.log(component);
      axios.delete(`/image_components?post_id=${post._id}&component_id=${component._id}&key=${component.key}`)
        .then(res => {
          console.log(res.data);
          setPost(res.data);
        })
        .catch(err => {
          console.log(err);
        })

    } else {
      console.error('kind has unknown value');
    }
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
    <div className='post-builder'>
      <Navbar />
      {
        post._id 
          ?
          <BuilderBar post={post} setShowInfoModal={setShowInfoModal} modifyPost={modifyPost} deletePost={deletePost} />
          : null
      }
      {
        !post._id 
          ? 
          <PostList onTileClick={getFullPost} showAddNew={true} useWindowOffset={false} title='Posts' showSearch={true} postFilters={{}} />
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
              return <TextComp key={component._id + index + ''} component={component} modifyComponent={modifyComponent} deleteComponent={deleteComponent} openOnEdit={!!component.openOnEdit} />
            case 'photo':
            case 'background-photo':
              return <PhotoComp key={component._id + index} postId={post._id} component={component} modifyComponent={modifyComponent} deleteComponent={deleteComponent} openOnEdit={!!component.openOnEdit} url={images.filter(c => c.key === component.key)[0]?.url} />
            default:
              break;
          }
        })
      }
      {
        !!post
          ?
          <AddComponentSelector addComponent={addComponent} />
          : null
      }
      {
        showInfoModal
          ?
          <InfoModal post={post} modifyPost={modifyPost} setShowInfoModal={setShowInfoModal} />
          : null
      }
    </div>
  )
}

export default PostBuilder;