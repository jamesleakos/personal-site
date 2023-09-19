// dependancies
import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

// imports
// css
import { PhotoScrollerCompStyled } from './styles/PhotoScrollerComp.styled.js';
// comps
import ImageScroller from '../utility-components/scrollers/desktop-image-scroller/ImageScroller.jsx';
import { ImageMapper } from '../utility-components/scrollers/desktop-image-scroller/ImageScrollItem.jsx';
import MobileImageScroller from '../utility-components/scrollers/mobile-image-scroller/MobileImageScroller.jsx';

function PhotoScrollerComp({ component }) {
  return (
    <PhotoScrollerCompStyled
      className={
        'photo-scroller-comp' +
        (component.margin_top ? ' has-top-margin' : '') +
        (component.margin_bottom ? ' has-bottom-margin' : '')
      }
    >
      <div className={'holder' + (isMobile ? ' mobile' : '')}>
        {!isMobile ? (
          <ImageScroller
            imageURLArray={component.keys}
            ImageMapper={ImageMapper}
            addLeftMargin={true}
          />
        ) : (
          <MobileImageScroller imageURLArray={component.keys} />
        )}
      </div>
    </PhotoScrollerCompStyled>
  );
}

export default PhotoScrollerComp;
