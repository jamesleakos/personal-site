// dependancies
import React from 'react';

// imports
import { PhotoScrollerEditingItemStyled } from './styles/PhotoScrollerEditingItem.styled.js';

const ImageMapper = (urlArr, deleteImage, moveImage) => {
  return urlArr.map((url, index) => {
    return (
      <PhotoScrollerEditingItem
        key={url + index}
        url={url}
        deleteImage={() => {
          if (!!deleteImage) deleteImage(index);
        }}
        moveLeft={() => {
          if (!!moveImage) moveImage(index, index - 1);
        }}
        moveRight={() => {
          if (!!moveImage) moveImage(index, index + 1);
        }}
      />
    );
  });
};

function PhotoScrollerEditingItem({ url, deleteImage, moveLeft, moveRight }) {
  return (
    <PhotoScrollerEditingItemStyled className='image-scroll-item'>
      <div className='image'>
        <img
          className='no-select'
          src={`https://ik.imagekit.io/hfywj4j0a/tr:w-1000/${url}`}
          alt='tile image'
          draggable='false'
        />
      </div>
      <div className='image-scroll-item-buttons'>
        <button className='image-scroll-item-button left' onClick={moveLeft}>
          &lt;
        </button>
        <button className='image-scroll-item-button right' onClick={moveRight}>
          &gt;
        </button>
        <button className='image-scroll-item-button' onClick={deleteImage}>
          <i className='fas fa-trash'></i>
        </button>
      </div>
    </PhotoScrollerEditingItemStyled>
  );
}

export { PhotoScrollerEditingItem, ImageMapper };
