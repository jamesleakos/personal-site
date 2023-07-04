// dependancies
import React from 'react';

// imports
import { PhotoScrollerEditingItemStyled } from './styles/PhotoScrollerEditingItem.styled.js';

const ImageMapper = (urlArr, callback) => {
  return urlArr.map((url, index) => {
    return (
      <PhotoScrollerEditingItem
        key={url + index}
        url={url}
        callback={() => {
          if (!!callback) callback(index);
        }}
      />
    );
  });
};

function PhotoScrollerEditingItem({ url, callback }) {
  return (
    <PhotoScrollerEditingItemStyled
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
    </PhotoScrollerEditingItemStyled>
  );
}

export { PhotoScrollerEditingItem, ImageMapper };
