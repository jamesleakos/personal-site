// dependancies
import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';

// components
import Navbar from '../main-components/Navbar.jsx';
import Footer from '../main-components/Footer.jsx';
import AddComponentSelector from './AddComponentSelector.jsx';
import BuilderBar from './BuilderBar.jsx';
import InfoModal from './InfoModal.jsx';
import TextComp from './TextComp.jsx';
import PhotoComp from './PhotoComp.jsx';
import PhotoScrollerComp from './PhotoScrollerComp.jsx';
import AuthContext from '../../contexts/AuthContext.js';

function PostBuilder() {
  const passedPostID = useLoaderData();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);

  // starting effects
  useEffect(() => {
    // scroll to the top
    window.scrollTo(0, 0);

    axios
      .get('/auth/check-auth')
      .then((res) => {
        // if 200 response, do nothing
        console.log('auth check successful');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log('auth check not successful');
        setIsLoggedIn(false);
      });

    if (!passedPostID) return;
    axios
      .get(`/posts/${passedPostID}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate('/sign-in-up');
  }, [isLoggedIn]);

  // setting post
  const [post, setPost] = useState({
    components: [],
  });

  const [showInfoModal, setShowInfoModal] = useState(false);

  // POST API CALLS
  const modifyPost = function (newPost) {
    axios
      .put(`/posts?post_id=${post._id}`, {
        ...newPost,
      })
      .then((res) => {
        mergePost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePost = function () {
    axios
      .delete(`/posts?post_id=${post._id}`)
      .then(() => {
        setPost({
          components: [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // COMPONENT API CALLS
  const addComponent = function (componentName, position) {
    const comp = {
      type: componentName,
      margin_top: false,
      margin_bottom: false,
    };
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
      case 'photo-scroller':
        comp.keys = [];
        break;
      default:
        break;
    }
    modifyComponentByIndex(
      comp,
      !!position ? position : post.components.length,
      true
    );
  };
  const setComponentEdit = (index, set) => {
    const newPost = { ...post };
    newPost.components[index].openOnEdit = set;
    setPost(newPost);
  };

  const mergePost = (newPost) => {
    const newComponents = newPost.components.map((comp, i) => {
      if (post.components[i]) {
        comp.openOnEdit = !!post.components[i].openOnEdit;
      }
      return comp;
    });
    newPost.components = newComponents;
    setPost(newPost);
  };

  const modifyComponentByIndex = (component, index, openOnEdit) => {
    // add component to post locally (for speed / responsiveness)
    const newPost = { ...post };

    if (index === newPost.components.length) {
      newPost.components.push(component);
    } else {
      newPost.components[index] = component;
    }

    setPost(newPost);

    // axios call
    if (component.type === 'photo' || component.type === 'background-photo') {
      axios
        .put(`/image_components?post_id=${post._id}&index=${index}`, {
          ...component,
        })
        .then((res) => {
          res.data.components[index].openOnEdit = !!openOnEdit;
          mergePost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (component.type === 'photo-scroller') {
      axios
        .put(`/image_scroller_components?post_id=${post._id}&index=${index}`, {
          ...component,
        })
        .then((res) => {
          res.data.components[index].openOnEdit = !!openOnEdit;
          mergePost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`/components?post_id=${post._id}&index=${index}`, {
          ...component,
        })
        .then((res) => {
          res.data.components[index].openOnEdit = !!openOnEdit;
          mergePost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const deleteComponent = (component) => {
    if (!component.kind) {
      // kind should only be on something we've got back from the server - although under the new format, it'll usually have it
      const newPost = { ...post };
      const i = post.components.indexOf(component);
      if (i > 0) {
        newPost.components.splice(i, 1);
      }
      setPost(newPost);
      return;
    }

    if (component.kind === 'TextComponent') {
      axios
        .delete(`/components?post_id=${post._id}&component_id=${component._id}`)
        .then((res) => {
          console.log(res.data);
          setPost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (component.kind === 'ImageComponent') {
      axios
        .delete(
          `/image_components?post_id=${post._id}&component_id=${component._id}&key=${component.key}`
        )
        .then((res) => {
          console.log(res.data);
          setPost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (component.kind === 'ImageScrollerComponent') {
      console.log(
        'sending delete request for keys: ',
        component.keys.join(',')
      );
      axios
        .delete(
          `/image_scroller_components?post_id=${post._id}&component_id=${
            component._id
          }&keys=${component.keys.join(',')}`
        )
        .then((res) => {
          console.log(res.data);
          setPost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.error('kind has unknown value');
    }
  };
  // move element forward or backward
  const moveComponent = (comp, positionsToMove) => {
    const index = post.components.indexOf(comp);
    if (index < 0) return;

    axios
      .patch(
        `/components/reorder?post_id=${post._id}&from=${index}&to=${
          index + positionsToMove
        }`
      )
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <div
      className='post-builder'
      style={post.isDark ? { backgroundColor: 'black', color: 'white' } : null}
    >
      <Navbar />
      {post._id ? (
        <BuilderBar
          post={post}
          setShowInfoModal={setShowInfoModal}
          modifyPost={modifyPost}
          deletePost={deletePost}
        />
      ) : null}
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
                key={'' + component._id + index}
                index={index}
                component={component}
                addComponent={addComponent}
                modifyComponentByIndex={modifyComponentByIndex}
                deleteComponent={deleteComponent}
                openOnEdit={!!component.openOnEdit}
                setComponentEdit={setComponentEdit}
                moveComponent={moveComponent}
              />
            );
          case 'photo':
          case 'background-photo':
            return (
              <PhotoComp
                key={'' + component._id + index}
                index={index}
                postId={post._id}
                component={component}
                addComponent={addComponent}
                modifyComponentByIndex={modifyComponentByIndex}
                deleteComponent={deleteComponent}
                openOnEdit={!!component.openOnEdit}
                setComponentEdit={setComponentEdit}
                moveComponent={moveComponent}
              />
            );
          case 'photo-scroller':
            return (
              <PhotoScrollerComp
                key={'' + component._id + index}
                index={index}
                postId={post._id}
                component={component}
                addComponent={addComponent}
                modifyComponentByIndex={modifyComponentByIndex}
                deleteComponent={deleteComponent}
                openOnEdit={!!component.openOnEdit}
                setComponentEdit={setComponentEdit}
                moveComponent={moveComponent}
              />
            );
          default:
            break;
        }
      })}
      {!!post._id ? <AddComponentSelector addComponent={addComponent} /> : null}
      {showInfoModal ? (
        <InfoModal
          post={post}
          modifyPost={modifyPost}
          setShowInfoModal={setShowInfoModal}
        />
      ) : null}
      {/* <Footer /> */}
    </div>
  );
}

export default PostBuilder;
