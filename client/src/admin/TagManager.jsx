// dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// imports
import TagItem from './TagItem.jsx';
import './styles/TagManager.css';

function TagManager() {

  const [tags, setTags] = useState([]);

  // get the tags
  useEffect(() => {
    axios.get('tags')
      .then(res => {
        setTags(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const addTag = function() {
    axios.put('/tags', {
      name: 'New Tag'
    })
      .then(res => {
        setTags(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const modifyTag = function(tag) {
    axios.put(`/tags`,{
      ...tag
    })  
      .then(res => {
        setTags(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const deleteTag = function(tag) {
    axios.delete(`/tags?tag_id=${tag._id}`)  
      .then(res => {
        setTags(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  return (
    <div className='tag-manager'>
      <div className='tag-bar'>
        <h3 className='tag-title'>Tags</h3>
        <p className='expand-cursor reacting-link add-tag' onClick={addTag}>Add Tag</p>
      </div>
      <div className='tag-holder'>
        {
          tags.map(tag => {
            return <TagItem key={tag._id} tag={tag} modifyTag={modifyTag} deleteTag={deleteTag} />
          })
        }
      </div>
    </div>
  )
}

export default TagManager;