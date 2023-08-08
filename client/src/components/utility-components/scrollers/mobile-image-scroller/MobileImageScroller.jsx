// dependancies
import React, { useState, useEffect } from 'react';

// imports
import { MobileImageScrollerStyled } from './styles/MobileImageScroller.styled.js';

// comps
import UnderlinedTitle from '../../UnderlinedTitle.jsx';

function MobileImageScroller({ title, imageURLArray }) {
  const [imageIndex, setImageIndex] = useState(0);

  const prevImage = () => {
    if (imageIndex <= 0) {
      // setImageIndex(imageURLArray.length - 1);
      return;
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  const nextImage = () => {
    if (imageIndex >= imageURLArray.length - 1) {
      // setImageIndex(0);
      return;
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  return (
    <MobileImageScrollerStyled className='mobile-image-scroller'>
      {!!title ? <UnderlinedTitle title={title} /> : null}
      <div className='content'>
        {/* the image, if there is an array */}
        {
          <div className='image-holder'>
            {imageURLArray && imageURLArray.length > 0 && (
              <img
                src={`https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${imageURLArray[imageIndex]}`}
                alt='Carousel item'
              />
            )}
          </div>
        }
        {/* arrows */}
        {/* left arrow */}
        {imageIndex > 0 && (
          <button onClick={prevImage} className='carousel-arrow left-arrow'>
            &lt;
          </button>
        )}
        {/* right arrow */}
        {imageIndex < imageURLArray.length - 1 && (
          <button onClick={nextImage} className='carousel-arrow right-arrow'>
            &gt;
          </button>
        )}
      </div>
    </MobileImageScrollerStyled>
  );
}

export default MobileImageScroller;
