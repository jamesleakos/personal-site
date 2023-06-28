// dependancies
import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

// imports
// css
import { PhotoScrollerCompStyled } from './styles/PhotoScrollerComp.styled.js';
// comps
import ImageScroller from '../utility-components/ImageScroller.jsx';

function PhotoScrollerComp({ component }) {
  return (
    <PhotoScrollerCompStyled className='photo-scroller-comp'>
      <ImageScroller imageURLArray={component.keys} />
    </PhotoScrollerCompStyled>
  );
}

export default PhotoScrollerComp;