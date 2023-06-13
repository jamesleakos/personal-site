// dependancies
import React from 'react';

// imports
import { ImageScrollItemStyled } from './styles/ImageScrollItem.styled.js';

const ImageMapper = (urlArr) => {
  return urlArr.map((url, index) => {
    return <ImageScrollItem key={url + index} url={url} />;
  });
};

function ImageScrollItem({ url }) {
  return (
    <ImageScrollItemStyled>
      <div className='image'>
        <img
          className='no-select'
          src={`https://ik.imagekit.io/hfywj4j0a/tr:w-500/${url}`}
          alt='tile image'
          draggable='false'
        />
      </div>
    </ImageScrollItemStyled>
  );
}

export { ImageScrollItem, ImageMapper };
