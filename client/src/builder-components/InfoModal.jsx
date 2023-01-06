// dependancies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/InfoModal.css';

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

function InfoModal({ post, modifyPost, setShowInfoModal }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [tags, setTags] = useState(post.tags);
  const [tagOptions, setTagOptions] = useState([]);
  // for photos
  const [isLoading, setIsLoading] = useState(false);


  const submit = function() {
    post.title = title;
    post.description = description;
    modifyPost(post);

    setShowInfoModal(false);
  }

  const handleTitleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!validFileTypes.find(type => type === file.type)) {
      setError('File must be JPG/PNG');
      return;
    }

    const form = new FormData();
    form.append('image', file);

    setIsLoading(true);

    // we pass the current key so that the server can delete the old image
    axios.post(`/image_components?post_id=${post._id}&current_key=${post.display_image_key}`, form)
      .then(response => {
        setIsLoading(false);
        post.display_image_key = response.data.key;
        post.display_image_extension = file.name.split('.').pop(); // get the extension
        modifyPost(post);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      })
  }

  return (
    <div className='modal-container'>
      <div className='info-modal'>
        <p className='close expand-cursor reacting-link' onClick={() => { setShowInfoModal(false); }}>X</p>

        <label htmlFor='title' >Title</label>
        <textarea name='title' value={title} onChange={(e) => { setTitle(e.target.value); }} />

        <label htmlFor='description' >Description</label>
        <textarea name='description' value={description} onChange={(e) => { setDescription(e.target.value); }} />

        <label htmlFor='image-upload' >Title Image</label>
        <input name='image-upload' id={isLoading ? 'image-input is-loading' : 'image-input'} type='file' onChange={ handleTitleImageUpload } />
        { isLoading && <p className='loading-text' >...loading</p>}

        {/* <label htmlFor='tags' >Tags</label>
        <select name='tags' id='tags' value={tags} onChange={(e) => { setTags(e.target.value); }} multiple >
          {
            tagOptions.map((option, index) => {
              return <option key={option.value + index + ''} value={option.value}>{option.value}</option>
            })
          }
        </select> */}
        <div className='submit-button'>
          <p className='expand-cursor reacting-link' onClick={ submit } >Submit</p>
        </div>

      </div>
    </div>
  )
}

export default InfoModal;