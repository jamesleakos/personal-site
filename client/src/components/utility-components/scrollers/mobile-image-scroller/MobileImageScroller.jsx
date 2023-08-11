// dependancies
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// imports
import { MobileImageScrollerStyled } from './styles/MobileImageScroller.styled.js';

// comps
import UnderlinedTitle from '../../UnderlinedTitle.jsx';

function MobileImageScroller({ title, imageURLArray }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Preload all images
    imageURLArray.forEach((img) => {
      const newImage = new Image();
      newImage.src = `https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${img}`;
    });
  }, [imageURLArray]); // Only run this once when imageURLArray changes

  const prevImage = () => {
    setIsLoading(true);
    if (imageIndex <= 0) {
      // setImageIndex(imageURLArray.length - 1);
      return;
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  const nextImage = () => {
    setIsLoading(true);
    if (imageIndex >= imageURLArray.length - 1) {
      // setImageIndex(0);
      return;
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  // Image's onLoad event
  const handleImageLoad = () => {
    setIsLoading(false);
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
                onLoad={handleImageLoad}
                className={isLoading ? 'loading' : ''}
              />
            )}
          </div>
        }
      </div>
      {/* arrows */}
      {/* left arrow */}
      {imageIndex > 0 && (
        <button onClick={prevImage} className='carousel-arrow left-arrow'>
          {/* <FontAwesomeIcon icon='fa-solid fa-backward' /> */}
          <FontAwesomeIcon icon='fa-solid fa-angle-left' />
          {/* <FontAwesomeIcon icon='fa-solid fa-caret-left' /> */}{' '}
        </button>
      )}
      {/* right arrow */}
      {imageIndex < imageURLArray.length - 1 && (
        <button onClick={nextImage} className='carousel-arrow right-arrow'>
          {/* <FontAwesomeIcon icon='fa-solid fa-forward' /> */}
          <FontAwesomeIcon icon='fa-solid fa-angle-right' />
          {/* <FontAwesomeIcon icon='fa-solid fa-caret-right' /> */}
        </button>
      )}
    </MobileImageScrollerStyled>
  );
}

export default MobileImageScroller;
