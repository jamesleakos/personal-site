import React, { useState, useEffect, useRef, useMemo } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// css
import { TileScrollerStyled } from './styles/TileScroller.styled.js';

// Mapper is a required argument, as it is the function called to output the components
// MapArray is an optional argument to Mapper that can influence the output of the Mapper function
function TileScroller({ Mapper, MapArray }) {
  // drag to scroll and text near cursor (all is for drag unless specified)
  // for drag
  const wrapperRef = useRef(null); // this is used by both
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [velX, setVelX] = useState(0);
  const requestRef = useRef();
  const [mouseDown, setMouseIsDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  // for long press tracking
  const [mouseMoved, setMouseMoved] = useState(false);
  const [longPress, setLongPress] = useState(false);
  const [timer, setTimer] = useState(null);
  // preventing vertical scrolling
  const [scrollingHor, setScrollingHor] = useState(false);

  useEffect(() => {
    scrollingHor ? disableBodyScroll(document) : enableBodyScroll(document);
  }, [scrollingHor]);

  // for text
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showText, setShowText] = useState(false);
  const textRef = useRef(null);

  const dragOffSetX = -50;
  const dragOffSetY = -30;

  // memoize the mapper
  const memoizedMapper = useMemo(() => {
    return Mapper(MapArray);
  }, [MapArray]);

  // functions

  const handleMouseDown = (event) => {
    setMouseIsDown(true);
    setStartX(event.clientX);
    setStartY(event.clientY);
    cancelMomentumTracking();
    setVelX(0);
    setMouseMoved(false);
    setTimer(setTimeout(() => setLongPress(true), 500)); // 500ms for a long press
  };
  const handleTouchStart = (event) => {
    setMouseIsDown(true);
    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
    cancelMomentumTracking();
    setVelX(0);
    setMouseMoved(false);
    setTimer(setTimeout(() => setLongPress(true), 500)); // 500ms for a long press
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
    // for long press anti click
    setMouseMoved(true);

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
    const wrapper = wrapperRef.current;
    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setScrollingHor(true);
      wrapper.scrollLeft -= deltaX;
      setVelX(deltaX);
    } else {
      setScrollingHor(false);
      handleTouchEnd();
    }

    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
    setMouseMoved(true);
  };

  const handleMouseUp = () => {
    setMouseIsDown(false);
    beginMomentumTracking();
    clearTimeout(timer);
    setLongPress(false);
  };
  const handleTouchEnd = () => {
    setMouseIsDown(false);
    beginMomentumTracking();
    clearTimeout(timer);
    setLongPress(false);
    setScrollingHor(false);
  };

  const handleMouseEnter = () => {
    setShowText(true);
  };

  const handleMouseLeave = () => {
    // if the mouse leaves we also want to stop drag tracking
    setMouseIsDown(false);
    // and we want to stop showing text
    setShowText(false);
    clearTimeout(timer);
    setLongPress(false);
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

  return (
    <TileScrollerStyled
      style={scrollingHor ? { overflowY: 'hidden' } : {}}
      className='tile-scroller'
    >
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
      >
        <div className='scroller'>{memoizedMapper}</div>
      </div>
    </TileScrollerStyled>
  );
}

export default TileScroller;
