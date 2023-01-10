// dependancies
import React from 'react';

// imports
import './styles/PostSpan.css';

function PostSpan({post, onClick}) {

  return (
    <div className='post-span' onClick={() => onClick(post)} >
      <span className='actual-post-span expand-cursor reacting-link'>{ post.title }</span>
    </div>
  )
}

export default PostSpan;