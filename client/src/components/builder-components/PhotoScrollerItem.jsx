// dependancies
import React from 'react';

// imports
import { PhotoScrollerItemStyled } from './styles/PhotoScrollerItem.styled.js';

const PhotoScrollerMapper = (urlArr, deletePhoto, movePosition) => {
  return urlArr.map((url, index) => {
    return (
      <PhotoScrollerItem
        key={url + index}
        url={url}
        deletePhoto={deletePhoto}
        movePosition={movePosition}
        showMoveLeft={index !== 0}
        showMoveRight={index < urlArr.length - 1}
      />
    );
  });
};

function PhotoScrollerItem({
  url,
  deletePhoto,
  movePosition,
  showMoveLeft,
  showMoveRight,
}) {
  return (
    <PhotoScrollerItemStyled className='photo-scroller-item'>
      {/* TODO - add delete button */}
      <div className='image'>
        <img
          className='no-select'
          src={`https://ik.imagekit.io/hfywj4j0a/tr:w-1000/${url}`}
          alt='tile image'
          draggable='false'
        />
      </div>
      {/* TODO - add buttons to move left or right - don't show if at the end */}
    </PhotoScrollerItemStyled>
  );
}

export { PhotoScrollerItem, PhotoScrollerMapper };
