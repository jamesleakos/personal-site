// dependancies
import React from 'react';

// imports
import './styles/BuilderBar.css';

function BuilderBar({post, onClick}) {

  return (
    <div className='builder-bar'>
      {/* left links */}
      <div className='builder-bar-item' style={{gridColumn: 2}}>
        <p className='expand-cursor reacting-link'>Set Post Info</p>
      </div>
      <div className='builder-bar-item' style={{gridColumn: 3}}>
        <p className='expand-cursor reacting-link'>Publish Post</p>
      </div>

      {/* right links */}
      <div className='builder-bar-item' style={{gridColumn: 4}}>
        <p className='expand-cursor reacting-link'>Feature Post</p>
      </div>
      <div className='builder-bar-item' style={{gridColumn: 5}}>
        <p className='expand-cursor reacting-link'>Delete Post</p>
      </div>

    </div>
  )
}

export default BuilderBar;