// dependancies
import React from 'react';

// imports
import './styles/PostTile.css';

function PostTile({post, onClick}) {

  return (
    <div className='post-tile' >
      <h3 className='links-item reacting-link' onClick={() => onClick(post)} >{ post.title }</h3>
      <p>{ post.description }</p>
    </div>
  )
}

export default PostTile;