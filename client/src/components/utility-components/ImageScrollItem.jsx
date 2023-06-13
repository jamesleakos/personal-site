// dependancies
import React from 'react';

// imports
import { ImageScrollItemStyled } from './styles/ImageScrollItem.styled.js';

const ImageMapper = (urlArr) => {
  return urlArr.map((url, index) => {
    return <ImageScrollItem key={url + index} url={url} first={index === 0} />;
  });
};

function ImageScrollItem({ url, first }) {
  return (
    <ImageScrollItemStyled className='image-scroll-item'>
      <div className={'image' + (!!first ? ' first' : '')}>
        <img
          className='no-select'
          src={`https://ik.imagekit.io/hfywj4j0a/${url}`}
          alt='tile image'
          draggable='false'
        />
      </div>
    </ImageScrollItemStyled>
  );
}

export { ImageScrollItem, ImageMapper };
