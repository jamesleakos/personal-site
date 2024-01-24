import React, { useState, useEffect, useRef, useMemo } from 'react';

// css
import { TileScrollerStyled } from './styles/TileScroller.styled.js';

// Mapper is a required argument, as it is the function called to output the components
// MapArray is an optional argument to Mapper that can influence the output of the Mapper function
function TileScroller({ Mapper, MapArray }) {
  // memoize the mapper
  const memoizedMapper = useMemo(() => {
    return Mapper(MapArray);
  }, [MapArray]);

  // #region mouse, scroll, momentum, and text state
  // drag to scroll and text near cursor (all is for drag unless specified)
  // for drag
  const wrapperRef = useRef(null); // this is used by both
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [velX, setVelX] = useState(0);
  const requestRef = useRef();
  const [mouseDown, setMouseIsDown] = useState(false);
  // preventing vertical scrolling
  const [scrollAxis, setScrollAxis] = useState(null);

  useEffect(() => {}, [scrollAxis]);

  // for text
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showText, setShowText] = useState(false);
  const textRef = useRef(null);

  const dragOffSetX = -50;
  const dragOffSetY = -30;

  // functions
  const handleWheel = (event) => {
    const wrapper = wrapperRef.current;
    const delta = event.deltaX;
    wrapper.scrollLeft += delta;
  };

  const handleMouseDown = (event) => {
    setMouseIsDown(true);
    setStartX(event.clientX);
    setStartY(event.clientY);
    cancelMomentumTracking();
    setVelX(0);
  };
  const handleTouchStart = (event) => {
    setMouseIsDown(true);
    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
    cancelMomentumTracking();
    setVelX(0);
  };

  const handleMouseMove = (event) => {
    // for text
    const { clientX, clientY } = event;
    const { scrollX, scrollY } = window;
    const navbar = document.querySelector('.navbar');
    // see personal site
    // const wo = useWindowOffset ? window.innerHeight - navbar.clientHeight : 0;
    // for other
    const wo = 0;
    setMousePos({ x: clientX + scrollX, y: clientY + scrollY - wo });

    //for drag
    if (!mouseDown) return;
    const wrapper = wrapperRef.current;
    const difference = event.clientX - startX;
    wrapper.scrollLeft -= difference;
    setVelX(difference * 1.5);
    setStartX(event.clientX);
    setStartY(event.clientY);
  };

  const handleTouchMove = (event) => {
    // Same logic as handleMouseMove

    if (!mouseDown) return;
    if (scrollAxis === 'y') return;

    const wrapper = wrapperRef.current;
    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;

    if (!scrollAxis) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setScrollAxis('x');
      } else {
        setScrollAxis('y');
      }
    }

    wrapper.scrollLeft -= deltaX;
    setVelX(deltaX);
    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
  };

  const handleMouseUp = () => {
    setMouseIsDown(false);
    beginMomentumTracking();
  };
  const handleTouchEnd = () => {
    setMouseIsDown(false);
    beginMomentumTracking();
    setScrollAxis(null);
  };

  const handleMouseEnter = () => {
    setShowText(true);
  };

  const handleMouseLeave = () => {
    // if the mouse leaves we also want to stop drag tracking
    setMouseIsDown(false);
    // and we want to stop showing text
    setShowText(false);
  };

  const handleTouchLeave = () => {
    // if the mouse leaves we also want to stop drag tracking
    setMouseIsDown(false);
    // and we want to stop showing text
    setShowText(false);
    setScrollAxis(null);
  };

  function beginMomentumTracking() {
    cancelMomentumTracking();
    requestRef.current = requestAnimationFrame(momentumLoop);
  }
  function cancelMomentumTracking() {
    cancelAnimationFrame(requestRef.current);
  }
  function momentumLoop() {
    if (!wrapperRef.current) return;
    wrapperRef.current.scrollLeft -= velX;
    setVelX((prev) => prev * 0.97);
  }

  useEffect(() => {
    if (mouseDown) return;
    if (Math.abs(velX) > 0.5) {
      requestRef.current = requestAnimationFrame(momentumLoop);
    }
  }, [velX]);
  // #endregion

  return (
    <TileScrollerStyled className='tile-scroller'>
      <div
        className='scroll-wrapper'
        ref={wrapperRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchLeave}
        onWheel={handleWheel}
      >
        <div className='scroller'>{memoizedMapper}</div>
      </div>
    </TileScrollerStyled>
  );
}

export default TileScroller;
