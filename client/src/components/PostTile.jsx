// dependancies
import React from 'react';

// imports
import './styles/PostTile.css';

function PostTile({post, onClick, tags}) {

  // get the image


  return (
    <div className='post-tile' >
      {/* tags */}
      <div className='tags'>
        {
          // these tags are really just the tag names passed in
          tags.map((tag, index) => {
            return <div className='tag' key={tag + index + ''}>
              <span className='tag-span no-select'>{tag}</span>
            </div>
          })
        }
      </div>
      <div className='post-tile-title-area' onClick={() => onClick(post)} >
        {/* image */}
        {
          post.url ?
            <div className='tile-title-image'>
              <img className='no-select' src={post.url} alt='tile image' draggable='false' />
            </div> : null
        }
        {/* title */}
        <h3 className='tile-title links-item reacting-link no-select' >{ post.title }</h3>
      </div>
      {/* description */}
      <p className='description no-select'>{ post.description }</p>
    </div>
  )
}

export default PostTile;