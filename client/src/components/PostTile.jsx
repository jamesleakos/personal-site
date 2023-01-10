// dependancies
import React from 'react';

// imports
import './styles/PostTile.css';

function PostTile({post, onClick}) {

  // get the image


  return (
    <div className='post-tile' >
      {/* tags */}
      <div className='tags'>
        {
          post.tags.map((tag, index) => {
            return <div className='tag' key={tag + index + ''}>
              <span className='tag-span'>{tag}</span>
            </div>
          })
        }
      </div>
      <div className='post-tile-title-area' onClick={() => onClick(post)} >
        {/* image */}
        {
          post.url ?
            <div className='tile-title-image'>
              <img src={post.url} alt='tile image' />
            </div> : null
        }
        {/* title */}
        <h3 className='tile-title links-item reacting-link' >{ post.title }</h3>
      </div>
      {/* description */}
      <p className='description'>{ post.description }</p>
    </div>
  )
}

export default PostTile;