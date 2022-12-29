// dependancies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'

// import
import PostTile from './PostTile.jsx';
import './styles/PostList.css';

function PostList({ onTileClickPostBuilder }) {
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
  }, [])

  const handleTileClick = function(post) {
    // check if we're in post-builder 
    if (onTileClickPostBuilder) {
      console.log('clicked?');
      onTileClickPostBuilder(post);
    } else {
      // go to post-builder with argument post
    }
  }

  const addPostObj = { _id: 'new-post', title: 'New Post', description: 'Click here for a new post' };
  const addPost = function() {
    const today = new Date();
    axios.post('/posts', {
      title: 'This is a temp Title',
      description: 'This will be a short blurb about the post. It will give a catchy overview of what happens in this post, and will invite the reader in with some welcoming prose. The reader will be very interested yes.',
      tags: ['adventure', 'culture', 'winter 2023'],
      created_at: today.toISOString(),
      published: false,
      published_at: null,
      featured: false
    })
      .then(res => {
        setPosts([...posts, res.data])
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='post-list'>
      {
        // map out the posts
        posts.map(post => {
          return <PostTile key={post._id} post={post} onClick={handleTileClick} />
        })
      }
      {
        <PostTile key='new-post' post={addPostObj} onClick={addPost} />
      }
    </div>
  )
}

export default PostList;