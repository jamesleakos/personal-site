// dependancies
import React from 'react';

// imports
import './styles/PostTile.css';

function PostTile({post, onClick}) {

  return (
    <div className='post-tile' onClick={() => onClick(post)} >
      <h3>{ post.title }</h3>
      <p>{ post.description }</p>
    </div>
  )
}

export default PostTile;