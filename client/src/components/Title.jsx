import React, { useRef, useState, useEffect } from 'react';
import './styles/Title.css';

function Title() {
  const upRef = useRef(null);
  // const downRef = useRef(null);
  // const downSpeed = 1; 
  const upSpeed = -2;

  // useEffect(() => {
  //   function downScroll() {
  //     const downNode = downRef.current;
  //     const offset = window.scrollY * downSpeed;
  //     downNode.style.transform = `translateY(${offset}px)`;
  //   }
  //   window.addEventListener('scroll', downScroll);
  //   return () => window.removeEventListener('scroll', downScroll);
  // }, [downSpeed]);

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
          <h1 id='im'>I'm</h1>
          <h1 id='james' >James</h1>
          <h1 id='leakos'>Leakos</h1>
        </div>
        <div id='title-welcome' className='text-scroller'>
          <h1 id='welcome'>Welcome</h1>
          <h1 id='to'>To</h1>
          <h1 id='my'>My</h1>
          <h1 id='website'>Website!</h1>
        </div>
      </div>
      {/* <div ref={downRef} >
        
      </div> */}
    </div>
  )
}

export default Title;