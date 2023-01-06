// dependancies
import React from 'react';

// imports
import './styles/PostTile.css';

function PostTile({post, onClick}) {

  // get the image


  return (
    <div className='post-tile' >
      <div className='tags'>
        {
          post.tags.map(tag => {
            return <span className='tag'>{tag}</span>
          })
        }
      </div>
      <div className='tile-title-image'>
        <img src={post.url} alt='tile image' onClick={() => onClick(post)} />
      </div>
      <h3 className='tile-title links-item reacting-link' onClick={() => onClick(post)} >{ post.title }</h3>
      <p className='description'>{ post.description }</p>
    </div>
  )
}

export default PostTile;