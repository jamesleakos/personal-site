// dependancies
import React from 'react';

// imports
import { WorkTileStyled } from './styles/WorkTile.styled.js';

function WorkTile({ project }) {
  const onClick = (project) => {
    window.location.href = project.url;
  };

  return (
    <WorkTileStyled>
      {/* tags */}
      <div className='tags'>
        {
          // these tags are really just the tag names passed in
          project.tags.map((tag, index) => {
            return (
              <div className='tag' key={tag + index + ''}>
                <span className='tag-span no-select'>{tag}</span>
              </div>
            );
          })
        }
      </div>
      <div className='title-area' onClick={() => onClick(project)}>
        {/* image */}
        <div className='tile-title-image'>
          <img
            className='no-select'
            src={project.image_url}
            alt='tile image'
            draggable='false'
          />
        </div>
        {/* title */}
        <h3 className='tile-title no-select'>{project.title}</h3>
      </div>
      {/* description */}
      <p className='description no-select'>{project.description}</p>
    </WorkTileStyled>
  );
}

export default WorkTile;
