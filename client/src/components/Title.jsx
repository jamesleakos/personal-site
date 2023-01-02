import React, { useRef, useState, useEffect } from 'react';
import './styles/Title.css';

function Title() {
  const upRef = useRef(null);
  const downRef = useRef(null);
  const downSpeed = 1; // don't make this more than 1, it can cause weird issues with the bottom of the page
  const upSpeed = -1.5;

  useEffect(() => {
    function downScroll() {
      const downNode = downRef.current;
      const offset = window.scrollY * downSpeed;
      downNode.style.transform = `translateY(${offset}px)`;
    }
    window.addEventListener('scroll', downScroll);
    return () => window.removeEventListener('scroll', downScroll);
  }, [upSpeed]);

  useEffect(() => {
    function upScroll() {
      const upNode = upRef.current;
      const offset = window.scrollY * upSpeed;
      upNode.style.transform = `translateY(${offset}px)`;
    }
    window.addEventListener('scroll', upScroll);
    return () => window.removeEventListener('scroll', upScroll);
  }, [upSpeed]);

  return (
    <div className='title-component'>
      <div ref={upRef} >
        <div id='title-name' className='text-scroller'>
          <h1 style={{ position: 'absolute', top: 0, left: '80px', fontSize: '3rem' }} >I'm</h1>
          <h1 style={{ position: 'absolute', top: '25px', left: 0, fontSize: '7rem'  }} >James</h1>
          <h1 style={{ position: 'absolute', top: '130px', left: '40px', fontSize: '7rem'  }} >Leakos</h1>
        </div>
        <div id='title-welcome' className='text-scroller'>
          <h1 style={{ position: 'absolute', top: 0, left: 0, fontSize: '7rem'  }} >Welcome</h1>
          <h1 style={{ position: 'absolute', top: '65px', left: '410px', fontSize: '3rem' }} >To</h1>
          <h1 style={{ position: 'absolute', top: '120px', left: '30px', fontSize: '3rem' }} >My</h1>
          <h1 style={{ position: 'absolute', top: '120px', left: '100px', fontSize: '7rem'  }} >Website!</h1>
        </div>
      </div>
      {/* <div ref={downRef} >
        
      </div> */}
    </div>
  )
}

export default Title;