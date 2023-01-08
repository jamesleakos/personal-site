import React from 'react';
import './styles/BackgroundImage.css';

function BackgroundImage({height, image}) {

  return (
    <div className='background-image-main-component' style={{height: height, backgroundImage: image }} >
    </div>
  )
}

export default BackgroundImage;