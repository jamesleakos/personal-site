
// dependancies
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

// components
import Navbar from '../components/Navbar.jsx';
import PostList from '../components/PostList.jsx';
import Footer from '../components/Footer.jsx';
import AddComponentSelector from '../builder-components/AddComponentSelector.jsx';
import BuilderBar from '../builder-components/BuilderBar.jsx';
import InfoModal from '../builder-components/InfoModal.jsx';
import TextComp from '../builder-components/TextComp.jsx';
import PhotoComp from '../builder-components/PhotoComp.jsx';

function PostBuilder({ match }) {

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
  const addComponent = function(componentName, position) {
    const comp = {
      type: componentName,
      margin_top: false,
      margin_bottom: false
    }
    switch (componentName) {
      case 'main-title':
        comp.text = post.title || '';
        comp.margin_bottom = false;
        break;
      case 'subtitle':
        comp.text = post.description || '';
        comp.margin_bottom = false;
        break;
      case 'section-title':
      case 'body-text':
      case 'quote':
      case 'caption':
        comp.text = '';
        comp.margin_bottom = true;
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
    if (!position) p.components.push(comp);
    else {
      p.components.splice(position, 0, comp);
    }
    setPost(p);
  }
  const modifyComponent = (component, index) => {
    if (component.type === 'photo' || component.type === 'background-photo') {
      axios.put(`/image_components?post_id=${post._id}&index=${index}`,{
        ...component
      })
        .then(res => {
          setPost(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      axios.put(`/components?post_id=${post._id}&index=${index}`,{
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
  // move element forward or backward
  const moveComponent = (comp, positionsToMove) => {
    const index = post.components.indexOf(comp);
    if (index < 0) return;

    axios.patch(`/components/reorder?post_id=${post._id}&from=${index}&to=${index+positionsToMove}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // NOTE: with imagekit, we shouldn't need this any more
  // images are not displayed with presigned URLs, but very simply with the imagekit url + key path

  // image GET calls - the POST calls are in the image component itself
  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   if (!post._id) return;

  //   let resetNeeded = false;
  //   for (let comp of post.components) {
  //     if (comp.kind === 'ImageComponent') {
  //       if (images.findIndex(i => i.key === comp.key) < 0) {
  //         resetNeeded = true;
  //         // console.log('A reset is needed. ' + JSON.stringify(images) + ' does not include the ')
  //       }
  //     }
  //   }

  //   if (!resetNeeded) return;

  //   axios.get(`/image_components?post_id=${post._id}`)
  //     .then(res => {
  //       setImages(res.data);
  //     })
  //     .catch(err => {
  //       console.log('Received error: ' + err.message);
  //     })
  // }, [post]);
  
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
          <PostList onTileClick={getFullPost} showAddNew={true} useWindowOffset={false} title='Posts' showSearch={true} postFilters={{}} amTiled={true} />
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
              return <TextComp key={component._id + index + ''} index={index} component={component} addComponent={addComponent} modifyComponent={modifyComponent} deleteComponent={deleteComponent} openOnEdit={!!component.openOnEdit} moveComponent={moveComponent} />
            case 'photo':
            case 'background-photo':
              return <PhotoComp key={component._id + index} index={index} postId={post._id} component={component} addComponent={addComponent} modifyComponent={modifyComponent} deleteComponent={deleteComponent} openOnEdit={!!component.openOnEdit} moveComponent={moveComponent} />
            default:
              break;
          }
        })
      }
      {
        !!post._id
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
      {/* <Footer /> */}
    </div>
  )
}

export default PostBuilder;