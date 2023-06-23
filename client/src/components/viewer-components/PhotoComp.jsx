// dependancies
import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

//imports
import './styles/PhotoComp.css';

function PhotoComp({ component }) {
  // #region zooming and panning

  const [showModal, setShowModal] = useState(false);
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
    <div
      className={
        'photo-comp' +
        (component.margin_top ? ' has-top-margin' : '') +
        (component.margin_bottom ? ' has-bottom-margin' : '')
      }
    >
      <div className={component.type}>
        {!isMobile ? (
          component.type === 'photo' ? (
            <img
              src={`https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${component.key}`}
              alt='image'
              style={{ width: component.size }}
              onDoubleClick={() => {
                setShowModal(true);
              }}
            />
          ) : (
            <div
              className='background-photo-div'
              style={{
                backgroundImage: `url('https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${component.key}')`,
                height: component.size || '600px',
                backgroundPosition: component.background_position || 'center',
              }}
              onDoubleClick={() => {
                setShowModal(true);
              }}
            ></div>
          )
        ) : (
          <img
            src={`https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${component.key}`}
            alt='image'
            style={{ width: '95%' }}
          />
        )}
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
              src={`https://ik.imagekit.io/hfywj4j0a/${component.key}`}
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
        </div>
      )}
    </div>
  );
}

export default PhotoComp;
