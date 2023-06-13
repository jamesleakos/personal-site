// dependancies
import React, { useState } from 'react';

// imports
import { ImageScrollerStyled } from './styles/ImageScroller.styled.js';

// comps
import TileScroller from './TileScroller.jsx';
import { ImageMapper } from './ImageScrollItem.jsx';
import UnderlinedTitle from './UnderlinedTitle.jsx';

function ImageScroller({ title, imageURLArray }) {
  const [showModal, setShowModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const expandImage = function (index) {
    console.log('expandImage: ' + index);
    setImageIndex(index);
    setShowModal(true);
  };

  return (
    <ImageScrollerStyled className='image-scroller'>
      <UnderlinedTitle title={title} />
      <TileScroller Mapper={() => ImageMapper(imageURLArray, expandImage)} />
      {/* full screen image view modal */}
      {showModal && (
        <div className='image-modal' onClick={() => setShowModal(false)}>
          <div className='image-modal-content'>
            {/* if the image if clicked, don't close the modal */}
            <img
              className='image-modal-image'
              src={`https://ik.imagekit.io/hfywj4j0a/${imageURLArray[imageIndex]}`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {/* add a left and a right button below the image that will move to teh next one */}
          <div className='image-modal-buttons'>
            <button
              className='image-modal-button left'
              onClick={(e) => {
                e.stopPropagation();
                setImageIndex(
                  imageIndex === 0 ? imageURLArray.length - 1 : imageIndex - 1
                );
              }}
            >
              &lt;
            </button>
            <button
              className='image-modal-button right'
              onClick={(e) => {
                e.stopPropagation();
                setImageIndex(
                  imageIndex === imageURLArray.length - 1 ? 0 : imageIndex + 1
                );
              }}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </ImageScrollerStyled>
  );
}

export default ImageScroller;
