// dependancies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//imports
import './styles/PhotoComp.css';
import '../viewer-components/styles/PhotoComp.css';

// 
const validFileTypes = ['iamge/jpg', 'image/jpeg', 'image/png'];

function PhotoComp({ postId, url, component, modifyComponent, deleteComponent, openOnEdit }) {

  console.log(url);

  // are we editing the post?
  const [editActive, setEditActive] = useState(openOnEdit);

  // consts for qol stuff for the image uploading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');

  const endEdit = function() {
    setEditActive(false);
    if (!component.key) deleteComponent(component);
  }

  const changeType = function(type) {
    component.type = type;
    modifyComponent(component);
  }

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!validFileTypes.find(type => type === file.type)) {
      setError('File must be JPG/PNG');
      return;
    }

    const form = new FormData();
    form.append('image', file);

    setIsLoading(true);
    axios.post(`/image_components?post_id=${postId}`, form)
      .then(response => {
        setIsLoading(false);
        component.key = response.data.key;
        console.log('photocomp upload key: ' + component.key);
        modifyComponent(component);
      })
      .catch(err => {
        setIsLoading(false);
        setUploadError(err.message);
        console.log(err);
      })
  }

  return (
    <div className='photo-comp'>
      {
        editActive 
          ?
          <div className='editing'>
            <div className='left-icons'>
              <FontAwesomeIcon onClick={(e) => { }} className='reacting-link expand-cursor' icon='fa-solid fa-bars' />
            </div>
            <div className='right-icons'>
              <FontAwesomeIcon onClick={() => { deleteComponent(component) }} className='reacting-link expand-cursor' icon='fa-solid fa-xmark' />
            </div>
            
            <div className='input-area'>
              <input id={isLoading ? 'image-input is-loading' : 'image-input'} type='file' onChange={ handleUpload } />
              { error && <p className='error-text' >{error}</p>}
              { uploadError && <p className='error-text' >{uploadError}</p>}
              { isLoading && <p className='loading-text' >...loading</p>}
            </div>

            <div className='left-icons'>
            <FontAwesomeIcon onClick={(e) => { changeType('photo'); }} className='reacting-link expand-cursor' icon='fa-solid fa-image' />
            <FontAwesomeIcon onClick={(e) => { changeType('background-photo'); }} className='reacting-link expand-cursor' icon='fa-solid fa-image-portrait' />
            </div>
            <div className='right-icons'>
              {/* <p className='reacting-link'>Add</p> */}
              <FontAwesomeIcon onClick={ endEdit } className='reacting-link expand-cursor' icon='fa-solid fa-arrow-right' />
            </div>
          </div> 
          :
          <div className={component.type} onDoubleClick={() => setEditActive(true) }>
            <img src={url} alt='image' />
          </div>
      }
    </div>
  )
}

export default PhotoComp;