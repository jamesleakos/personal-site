// dependancies
import React from 'react';

// imports
import { ImageScrollItemStyled } from './styles/ImageScrollItem.styled.js';

const ImageMapper = (urlArr, callback) => {
  return urlArr.map((url, index) => {
    return (
      <ImageScrollItem
        key={url + index}
        url={url}
        callback={() => {
          if (!!callback) callback(index);
        }}
      />
    );
  });
};

function ImageScrollItem({ url, callback }) {
  return (
    <ImageScrollItemStyled
      className='image-scroll-item'
      onDoubleClick={callback}
    >
      <div className='image'>
        <img
          className='no-select'
          src={`https://ik.imagekit.io/hfywj4j0a/tr:w-1000/${url}`}
          alt='tile image'
          draggable='false'
        />
      </div>
    </ImageScrollItemStyled>
  );
}

export { ImageScrollItem, ImageMapper };
