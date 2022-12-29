// dependancies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link, useLocation } from 'react-router-dom'

// components
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';
import AddComponentSelector from '../builder-components/AddComponentSelector.jsx';
import BuilderBar from '../builder-components/BuilderBar.jsx';
import TextComp from '../builder-components/TextComp.jsx';
import PhotoComp from '../builder-components/PhotoComp.jsx';
import PhotoGalleryComp from '../builder-components/PhotoGalleryComp.jsx';
import BackgroundPhotoComp from '../builder-components/BackgroundPhotoComp.jsx';

function PostBuilder({ passedPost }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // setting post
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (!passedPost) return;
    setPost(passedPost);
  }, [])

  useEffect(() => {
    if (!post) return;
    setComponents(post.components);
  }, [post])

  // dealing with components
  const [components, setComponents] = useState([]);

  const getComponents = () => {

  }
  
  const modifyComponent = (id, obj) => {
    const newComponents = [...components];
    const index = newComponents.findIndex(comp => comp.id === id); // find the index of the item with the specified id
    newComponents[index] = obj; // update the item at that index by adding a new property
    setComponents(newComponents); // update the state with the new array
  }
  const deleteComponent = (id) => {
    const newComponents = [...components];
    const index = newComponents.findIndex(comp => comp.id === id); // find the index of the item with the specified id
    newComponents.splice(index, 1);
    const out = newComponents.map((comp, index) => {
      comp.id = index;
      return comp;
    });
    setComponents(out); // update the state with the new array
  }
  const addComponent = function(componentName) {
    const comp = {
      id: components.length,
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
      case 'photo':
        comp.url = '';
        break;
      case 'photo-gallery':
        comp.url = '';
        break;
      case 'background-photo':
        comp.url = '';
        break;
      default:
        break;
    }
    setComponents([...components, comp]);
  }
  
  return (
    <div className='post-builder'>
      <Navbar />
      <BuilderBar />
      {
        !passedPost 
          ? 
          <PostList onTileClickPostBuilder={setPost} />
          : null
      }
      {
        components.map((component, index) => {
          switch (component.type) {
            case 'main-title':
            case 'subtitle':
            case 'section-title':
            case 'body-text':
            case 'quote':
            case 'caption':
              return <TextComp key={component.type + index} component={component} modifyComponent={modifyComponent} deleteComponent={deleteComponent} />
            case 'photo':
              return <PhotoComp key={component.type + index} component={component} modifyComponent={modifyComponent} deleteComponent={deleteComponent} />
            case 'photo-gallery':
              return <PhotoGalleryComp key={component.type + index} component={component} modifyComponent={modifyComponent} deleteComponent={deleteComponent} />
            case 'background-photo':
              return <BackgroundPhotoComp key={component.type + index} component={component} modifyComponent={modifyComponent} deleteComponent={deleteComponent} />
            default:
              break;
          }
        })
      }
      {
        !!passedPost
          ?
          <AddComponentSelector addComponent={addComponent} />
          : null
      }
    </div>
  )
}

export default PostBuilder;