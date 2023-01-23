import React from 'react';
import './styles/BackgroundImage.css';

function BackgroundImage({ height, imageURL, caption }) {
  return (
    <div
      className="background-image-main-component"
      style={{
        height: height,
        backgroundImage: `url(https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${imageURL})`,
      }}
    >
      {!!caption ? (
        <div className="background-caption">
          <p className="background-caption-text">{caption}</p>
        </div>
      ) : null}
    </div>
  );
}

export default BackgroundImage;
