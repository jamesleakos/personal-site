import React, { useState, useEffect, useRef } from 'react';

// css
import { TileScrollerStyled } from './styles/TileScroller.styled.js';

function TileScroller({ Mapper }) {
  // drag to scroll and text near cursor (all is for drag unless specified)
  // for drag
  const wrapperRef = useRef(null); // this is used by both
  const [initialMousePos, setInitialMousePos] = useState(null);
  const [velX, setVelX] = useState(0);
  const requestRef = useRef();
  const [isDown, setIsDown] = useState(false);

  // for text
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showText, setShowText] = useState(false);
  const textRef = useRef(null);

  const dragOffSetX = -50;
  const dragOffSetY = -30;

  // functions

  const handleMouseDown = (event) => {
    setIsDown(true);
    setInitialMousePos(event.clientX);
    cancelMomentumTracking();
    setVelX(0);
  };
  const handleTouchStart = (event) => {
    setIsDown(true);
    setInitialMousePos(event.touches[0].clientX);
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
    const wo = 0;
    setMousePos({ x: clientX + scrollX, y: clientY + scrollY - wo });

    //for drag
    if (!isDown) return;
    const wrapper = wrapperRef.current;
    const difference = event.clientX - initialMousePos;
    wrapper.scrollLeft -= difference;
    setVelX(difference * 1.5);
    setInitialMousePos(event.clientX);
  };

  const handleTouchMove = (event) => {
    // Same logic as handleMouseMove
    if (!isDown) return;
    const wrapper = wrapperRef.current;
    const difference = event.touches[0].clientX - initialMousePos;
    wrapper.scrollLeft -= difference;
    setVelX(difference);
    setInitialMousePos(event.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    beginMomentumTracking();
  };
  const handleTouchEnd = () => {
    setIsDown(false);
    beginMomentumTracking();
  };

  const handleMouseEnter = () => {
    setShowText(true);
  };

  const handleMouseLeave = () => {
    // if the mouse leaves we also want to stop drag tracking
    setIsDown(false);
    // and we want to stop showing text
    setShowText(false);
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
    if (isDown) return;
    if (Math.abs(velX) > 0.5) {
      requestRef.current = requestAnimationFrame(momentumLoop);
    }
  }, [velX]);

  return (
    <TileScrollerStyled>
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
        <div className='scroller'>
          <Mapper />
        </div>
      </div>
    </TileScrollerStyled>
  );
}

export default TileScroller;
