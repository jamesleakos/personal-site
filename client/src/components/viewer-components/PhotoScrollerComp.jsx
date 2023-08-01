// dependancies
import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

// imports
// css
import { PhotoScrollerCompStyled } from './styles/PhotoScrollerComp.styled.js';
// comps
import ImageScroller from '../utility-components/ImageScroller.jsx';
import { ImageMapper } from '../utility-components/ImageScrollItem.jsx';

function PhotoScrollerComp({ component }) {
  return (
    <PhotoScrollerCompStyled className='photo-scroller-comp'>
      <div className={'holder' + (isMobile ? ' mobile' : '')}>
        <ImageScroller
          imageURLArray={component.keys}
          ImageMapper={ImageMapper}
        />
      </div>
    </PhotoScrollerCompStyled>
  );
}

export default PhotoScrollerComp;
