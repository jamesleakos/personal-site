import React from 'react';
import './styles/BackgroundImage.css';

function BackgroundImage({height, imageURL}) {

  return (
    <div className='background-image-main-component' style={{height: height, backgroundImage: `url(https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${imageURL})` }} >
    </div>
  )
}

export default BackgroundImage;