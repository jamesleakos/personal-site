// dependancies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//imports
import './styles/PhotoComp.css';
import '../viewer-components/styles/PhotoComp.css';

// 
const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

function PhotoComp({ postId, component,  addComponent, index, modifyComponent, deleteComponent, openOnEdit, moveComponent }) {
  // are we editing the post?
  const [editActive, setEditActive] = useState(openOnEdit);

  // consts for qol stuff for the image uploading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');

  // size stuff
  const [size, setSize] = useState(component.size);

  const endEdit = function() {
    component.size = size;
    setEditActive(false);
    if (!component.key) deleteComponent(component);
    // this is just for size
    else modifyComponent(component, index);
  }

  const changeType = function(type) {
    setEditActive(false);
    component.type = type;
    modifyComponent(component, index);
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

    // we pass the current key so that the server can delete the old image
    axios.post(`/image_components?post_id=${postId}&current_key=${component.key}`, form)
      .then(response => {
        setIsLoading(false);
        component.key = response.data.key;
        component.extension = file.name.split('.').pop(); // get the extension
        modifyComponent(component, index);
      })
      .catch(err => {
        setIsLoading(false);
        setUploadError(err.message);
        console.log(err);
      })
  }

  const toggleMarginTop = function() {
    component.margin_top = !component.margin_top;
    modifyComponent(component, index);
  }

  const toggleMarginBottom = function() {
    component.margin_bottom = !component.margin_bottom;
    modifyComponent(component, index);
  }

  const handleAddBelow = function (compName) {
    console.log('click');
    setEditActive(false);
    addComponent(compName, index + 1);
  }

  return (
    <div className='photo-comp'>
      {
        editActive 
          ?
          <div className='editing'>
            <div className='top-icons'>
              <div className='left-icons'>
                <FontAwesomeIcon onClick={() => { moveComponent(component, -1); }} className='reacting-link expand-cursor' icon='fa-solid fa-arrow-up' />
                <FontAwesomeIcon onClick={() => { moveComponent(component, 1); }} className='reacting-link expand-cursor' icon='fa-solid fa-arrow-down' />
                <span className='reacting-link expand-cursor' onClick={() => {toggleMarginTop(); }}>{component.margin_top ? 'Remove Top Margin' : 'Add Top Margin'}</span>
                <span className='reacting-link expand-cursor' onClick={() => {toggleMarginBottom(); }}>{component.margin_bottom ? 'Remove Bottom Margin' : 'Add Buttom Margin'}</span>
              </div>
              <div className='right-icons'>
                <FontAwesomeIcon onClick={() => { deleteComponent(component) }} className='reacting-link expand-cursor' icon='fa-solid fa-xmark' />
              </div>
            </div>

            {
              component.key ? <img src={`https://ik.imagekit.io/hfywj4j0a/${component.key})`} alt='image' /> : null
            }

            <div className='input-area'>
                <input id={isLoading ? 'image-input is-loading' : 'image-input'} type='file' onChange={ handleUpload } />
                { error && <p className='error-text' >{error}</p>}
                { uploadError && <p className='error-text' >{uploadError}</p>}
                { isLoading && <p className='loading-text' >...loading</p>}
            </div>

            <div className='left-icons'>
              <FontAwesomeIcon onClick={(e) => { changeType('photo'); }} className='reacting-link expand-cursor' icon='fa-solid fa-image' style={component.type==='photo' ? {color: 'red'} : null} />
              <FontAwesomeIcon onClick={(e) => { changeType('background-photo'); }} className='reacting-link expand-cursor' icon='fa-solid fa-image-portrait' style={component.type==='background-photo' ? {color: 'red'} : null} />
              <div className='size-field-div'>
                <label htmlFor='size'>Size:</label>
                <input name='size' value={size} onChange={(e) => { setSize(e.target.value) }} type="text" />
              </div>
            </div>
            <div className='right-icons'>
              {/* <p className='reacting-link'>Add</p> */}
              <span className='reacting-link expand-cursor' onClick={() => { handleAddBelow('body-text'); }}>Text Below</span>
              <span className='reacting-link expand-cursor' onClick={() => { handleAddBelow('photo'); }}>Photo Below</span>
              <FontAwesomeIcon onClick={ endEdit } className='reacting-link expand-cursor' icon='fa-solid fa-arrow-right' />
            </div>
          </div> 
          :
          <div className={component.type + (component.margin_top ? ' has-top-margin' : '') + (component.margin_bottom ? ' has-bottom-margin' : '')} onDoubleClick={() => setEditActive(true) }>
            {
              component.type === 'photo'
                ?
                <img src={`https://ik.imagekit.io/hfywj4j0a/${component.key}`} alt='image' style={{ width: component.size }} />
                :
                <div className='background-photo-div' style={{backgroundImage: `url('https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${component.key}')`, height: component.size || '600px' }}>
                </div>
            }
            
          </div>
      }
    </div>
  )
}

export default PhotoComp;