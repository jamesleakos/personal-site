// dependancies
import React, { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';

// imports
import { ImageScrollerStyled } from './styles/ImageScroller.styled.js';

// comps
import TileScroller from '../base-tile-scroller/TileScroller.jsx';
import UnderlinedTitle from '../../UnderlinedTitle.jsx';

function ImageScroller({ title, imageURLArray, ImageMapper }) {
  const [urlArray, setUrlArray] = useState(imageURLArray);

  useEffect(() => {
    setUrlArray(imageURLArray);
  }, [imageURLArray]);
  const [centerScroller, setCenterScroller] = useState(false);

  // add wrapperRef
  const wrapperRef = useRef(null);

  // useEffect(() => {
  //   // Function to check overflow
  //   const checkOverflow = () => {
  //     const wrapper = wrapperRef.current;
  //     if (wrapper) {
  //       if (wrapper.scrollWidth <= wrapper.clientWidth) {
  //         setCenterScroller(true);
  //       } else {
  //         setCenterScroller(false);
  //       }
  //     }
  //   };

  //   // Initial check
  //   checkOverflow();

  //   // Set up event listener for window resize
  //   const onResize = () => checkOverflow('resize check');
  //   window.addEventListener('resize', onResize);

  //   // Listen for all images to load
  //   const images = wrapperRef.current?.querySelectorAll('img');
  //   if (images) {
  //     images.forEach((img) => {
  //       img.addEventListener('load', () => checkOverflow());
  //     });
  //   }

  //   // Clean up
  //   return () => {
  //     window.removeEventListener('resize', onResize);
  //     if (images) {
  //       images.forEach((img) => {
  //         img.removeEventListener('load', () => checkOverflow());
  //       });
  //     }
  //   };
  // }, [imageURLArray]);
  // #endregion

  // #region image modal
  const [showModal, setShowModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    setDragging(false);
    setInitialX(0);
    setInitialY(0);
    setCurrentX(0);
    setCurrentY(0);
    setScale(1);

    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = null;
      document.documentElement.style.overflow = null;
    }
  }, [showModal]);

  const expandImage = function (index) {
    if (isMobile) return;
    setImageIndex(index);
    setShowModal(true);
  };
  // #endregion

  // #region zooming and panning

  const handleZoom = (event) => {
    event.preventDefault();
    let scaleAdd = 0;

    if (event.deltaY < 0) {
      // Zoom in
      scaleAdd = 0.1;
    } else {
      // Zoom out
      scaleAdd = -0.1;
    }

    if (scale + scaleAdd >= 1) {
      // ^ avoids zooming out beyond original size
      const image = event.target;
      setScale((prevScale) => {
        const newScale = prevScale + scaleAdd;

        // if we're zooming out, this makes sure the image stays within the original bounds
        // if (scaleAdd < 0) {
        let testX = (currentX * newScale) / prevScale;
        let testY = (currentY * newScale) / prevScale;

        // Calculate the max translation for the new scale
        const maxX = ((newScale - 1) * image.offsetWidth) / 2;
        const maxY = ((newScale - 1) * image.offsetHeight) / 2;

        // Constrain translations within bounds and adjust position relative to scale
        if (Math.abs(testX) > maxX) {
          setCurrentX(currentX > 0 ? maxX : -maxX);
        } else {
          setCurrentX((currentX * newScale) / prevScale);
        }
        if (Math.abs(testY) > maxY) {
          setCurrentY(currentY > 0 ? maxY : -maxY);
        } else {
          setCurrentY((currentY * newScale) / prevScale);
        }

        return newScale;
      });
    }
  };

  const handleMouseDown = (event) => {
    setInitialX(event.clientX - currentX);
    setInitialY(event.clientY - currentY);

    setDragging(true);
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      event.preventDefault();

      const image = event.target;

      let newX = event.clientX - initialX;
      let newY = event.clientY - initialY;

      const maxX = ((scale - 1) * image.offsetWidth) / 2;
      const maxY = ((scale - 1) * image.offsetHeight) / 2;

      if (Math.abs(newX) > maxX) {
        newX = newX > 0 ? maxX : -maxX;
      }

      if (Math.abs(newY) > maxY) {
        newY = newY > 0 ? maxY : -maxY;
      }

      setCurrentX(newX);
      setCurrentY(newY);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  // #endregion

  return (
    <ImageScrollerStyled className='image-scroller'>
      {!!title ? <UnderlinedTitle title={title} /> : null}
      <div className='image-scroller-wrapper'>
        <TileScroller
          key={JSON.stringify(urlArray)}
          Mapper={() => ImageMapper(urlArray, expandImage)}
        />
      </div>
      {/* full screen image view modal */}
      {showModal && (
        <div
          className='image-modal'
          onClick={() => {
            setShowModal(false);
          }}
        >
          <div className='image-modal-content'>
            {/* zoom with the scroll bar */}
            <img
              className='image-modal-image'
              src={`https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${imageURLArray[imageIndex]}`}
              onClick={(e) => e.stopPropagation()}
              alt='tile image'
              draggable='false'
              onWheel={(e) => {
                handleZoom(e);
              }}
              onMouseDown={(e) => handleMouseDown(e)}
              onMouseUp={(e) => handleMouseUp(e)}
              onMouseMove={(e) => handleMouseMove(e)}
              style={{
                transform: `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale})`,
              }}
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
