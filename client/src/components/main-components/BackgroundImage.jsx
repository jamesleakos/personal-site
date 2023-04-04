import React from 'react';
import './styles/BackgroundImage.css';
import { isMobile } from 'react-device-detect';

function BackgroundImage({ height, imageURL, caption, backgroundPosition }) {
  return !isMobile ? (
    <div
      className='background-image-main-component'
      style={{
        height: height,
        backgroundImage: `url(https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${imageURL})`,
        backgroundPosition: backgroundPosition,
      }}
    >
      {!!caption ? (
        <div className='background-caption'>
          <p className='background-caption-text'>{caption}</p>
        </div>
      ) : null}
    </div>
  ) : (
    <img
      className='background-mobile-image'
      src={`https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${imageURL}`}
      alt='image'
      style={{ width: '100%' }}
    />
  );
}

export default BackgroundImage;
