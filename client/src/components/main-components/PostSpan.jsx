// dependancies
import React from 'react';

// imports
import './styles/PostSpan.css';

function PostSpan({post, onClick, showSlash}) {

  return (
    <div className='post-span' onClick={() => onClick(post)} >
      <span className='actual-post-span expand-cursor reacting-link'>{ post.title }</span>
      { showSlash && <span className='post-span-slash'>&nbsp;&nbsp;/&nbsp;&nbsp;</span> }
    </div>
  )
}

export default PostSpan;