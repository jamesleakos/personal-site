// dependancies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//imports
import './styles/PhotoComp.css';
import '../viewer-components/styles/PhotoComp.css';

// 
const validFileTypes = ['iamge/jpg', 'image/jpeg', 'image/png'];

function PhotoComp({ component, modifyComponent, deleteComponent, openOnEdit }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [url, setUrl] = useState(component.url);
  const [editActive, setEditActive] = useState(openOnEdit);

  const endEdit = function() {
    component.url = url;
    modifyComponent(component);

    setEditActive(false);
  }

  const changeType = function(type) {
    component.type = type;
    modifyComponent(component);
  }

  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (!validFileTypes.find(type => type === file.type)) {
      setError('File must be JPG/PNG');
      return;
    }

    const form = new FormData();
    form.append('image', file);

    setIsLoading(true);
    axios.post('/image_component', form)
      .then(response => {
        setIsLoading(false);
        console.log(response);
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
              {/* <FontAwesomeIcon style={component.type==='main-title' ? {color: 'red'} : null} onClick={() => { changeType('main-title') }} className='reacting-link expand-cursor' icon='fa-solid fa-book' />
              <FontAwesomeIcon style={component.type==='subtitle' ? {color: 'red'} : null} onClick={() => { changeType('subtitle') }} className='reacting-link expand-cursor' icon='fa-solid fa-book-open' />
              <FontAwesomeIcon style={component.type==='section-title' ? {color: 'red'} : null} onClick={() => { changeType('section-title') }} className='reacting-link expand-cursor' icon='fa-solid fa-section' />
              <FontAwesomeIcon style={component.type==='body-text' ? {color: 'red'} : null} onClick={() => { changeType('body-text') }} className='reacting-link expand-cursor' icon='fa-solid fa-font' />
              <FontAwesomeIcon style={component.type==='quote' ? {color: 'red'} : null} onClick={() => { changeType('quote') }} className='reacting-link expand-cursor' icon='fa-solid fa-quote-left' />
              <FontAwesomeIcon style={component.type==='caption' ? {color: 'red'} : null}  onClick={() => { changeType('caption') }} className='reacting-link expand-cursor' icon='fa-solid fa-closed-captioning' /> */}
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