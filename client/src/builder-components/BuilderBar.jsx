// dependancies
import React from 'react';

// imports
import './styles/BuilderBar.css';

function BuilderBar({ post, modifyPost, deletePost, setShowInfoModal }) {

  const togglePublish = function() {
    const newPost = {...post};
    newPost.published = !post.published;
    modifyPost(newPost);
  }

  const toggleFeature = function() {
    const newPost = {...post};
    newPost.featured = !post.featured;
    modifyPost(newPost);
  }

  return (
    <div className='builder-bar'>
      {/* left links */}
      <div className='builder-bar-item' style={{gridColumn: 2}}>
        <p className='expand-cursor reacting-link' onClick={() => { setShowInfoModal(true); }}>Set Post Info</p>
      </div>
      <div className='builder-bar-item' style={{gridColumn: 3}}>
        <p className='expand-cursor reacting-link' onClick={ togglePublish } >
          { post.published ? 'Un-publish Post' : 'Publish Post' }
        </p>
      </div>

      {/* right links */}
      <div className='builder-bar-item' style={{gridColumn: 4}}>
        <p className='expand-cursor reacting-link' onClick={ toggleFeature } >
          { post.featured ? 'Un-feature Post' : 'Feature Post' }
        </p>
      </div>
      <div className='builder-bar-item' style={{gridColumn: 5}}>
        <p className='expand-cursor reacting-link' onClick={ deletePost }>Delete Post</p>
      </div>

    </div>
  )
}

export default BuilderBar;