import React, { useEffect, useState } from 'react';
import './styles/InfoModal.css';

function InfoModal({ post, modifyPost, setShowInfoModal }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [tags, setTags] = useState(post.tags);
  const [tagOptions, setTagOptions] = useState([]);

  const submit = function() {
    post.title = title;
    post.description = description;
    modifyPost(post);

    setShowInfoModal(false);
  }

  return (
    <div className='modal-container'>
      <div className='info-modal'>
        <p className='close expand-cursor reacting-link' onClick={() => { setShowInfoModal(false); }}>X</p>

        <label htmlFor='title' >Title</label>
        <textarea name='title' value={title} onChange={(e) => { setTitle(e.target.value); }} />

        <label htmlFor='description' >Description</label>
        <textarea name='description' value={description} onChange={(e) => { setDescription(e.target.value); }} />

        {/* <label htmlFor='tags' >Tags</label>
        <select name='tags' id='tags' value={tags} onChange={(e) => { setTags(e.target.value); }} multiple >
          {
            tagOptions.map((option, index) => {
              return <option key={option.value + index + ''} value={option.value}>{option.value}</option>
            })
          }
        </select> */}
        <p className='expand-cursor reacting-link' onClick={ submit } >Submit</p>

      </div>
    </div>
  )
}

export default InfoModal;