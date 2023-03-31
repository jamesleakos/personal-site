// dependancies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/InfoModal.css';

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

function InfoModal({ post, modifyPost, setShowInfoModal }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [tags, setTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  // for photos
  const [isLoading, setIsLoading] = useState(false);

  // get the tags
  useEffect(() => {
    axios.get('tags')
      .then(res => {
        setTagOptions(res.data);
        setTags(res.data.filter(c => post.tag_ids.includes(c._id)));
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const submit = function() {
    post.title = title;
    post.description = description;
    post.tag_ids = tags.map(t => t._id);
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

  const handleTagClick = (option, bool) => {
    if (bool) {
      const newTags = [ ...tags ];
      newTags.push(option);
      setTags(newTags);
    } else {
      const i = tags.findIndex(t => t._id === option._id);
      let newTags = [...tags];
      newTags.splice(i, 1);
      setTags(newTags);
    }
  }

  return (
    <div className='modal-container'>
      <div className='info-modal'>
        <p className='close expand-cursor reacting-link' onClick={() => { setShowInfoModal(false); }}>X</p>

        <label htmlFor='title' >Title</label>
        <textarea name='title' value={title} onChange={(e) => { setTitle(e.target.value); }} />

        <label htmlFor='description' >Description</label>
        <textarea name='description' value={description} onChange={(e) => { setDescription(e.target.value); }} />

        <div className='tag-section' >
          <p className='label'>Tags</p>
          <div className='tag-holder'>
            {
              tagOptions.map(option => {
                return <div key={option._id}>
                  <input type='checkbox' id={option._id} onClick={(e) => {handleTagClick(option, e.target.checked)}} defaultChecked={ tags.findIndex(t => t._id === option._id) > -1 }  />
                  <label htmlFor={option._id}>{option.name}</label>
                </div>
              })
            }
          </div>
        </div>

        <label htmlFor='image-upload' >Title Image</label>
        <input name='image-upload' id={isLoading ? 'image-input is-loading' : 'image-input'} type='file' onChange={ handleTitleImageUpload } />
        { isLoading && <p className='loading-text' >...loading</p>}
        { !isLoading && 
          <div className='submit-button'>
            <p className='expand-cursor reacting-link' onClick={ submit } >Submit</p>
          </div>
        }
        

      </div>
    </div>
  )
}

export default InfoModal;