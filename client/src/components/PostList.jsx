// dependancies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import
import './styles/PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/posts')
    .then(res => {
      console.log(res.data);
      setPosts(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  })

  return (
    <div className='post-list'>
      {
        posts.map(post => {
          
        })
      }
    </div>
  )
}

export default PostList;