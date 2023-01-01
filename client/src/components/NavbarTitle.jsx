import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles/Navbar.css';
import { Link, useLocation } from 'react-router-dom'

function TitleText() {
  return (
    <Link className='reacting-link' to="/">JAMES LEAKOS</Link>
  )
}

function NavbarTitle() {
  const [navbarStuck, setNavbarStuck] = useState(false);
  const [windowHasScrolled, setWindowHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const navbarElement = document.querySelector('.navbar');
      const navbarRect = navbarElement.getBoundingClientRect();
      setNavbarStuck(navbarRect.top <= 0);

      setWindowHasScrolled(window.scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (useLocation().pathname === '/') {
    return (
      <CSSTransition in={navbarStuck} timeout={300} classNames="slide" >
        <div className='navbar-title' style={navbarStuck ? {opacity: 1, gridColumn: 4} : {gridColumn: 4}}>
          <TitleText />
        </div>
      </CSSTransition>
    )
  } else if (useLocation().pathname === '/post-builder' || useLocation().pathname === '/post-viewer') {
    return (
      <CSSTransition in={windowHasScrolled} timeout={300} classNames="slide" >
        <div className='navbar-title' style={windowHasScrolled ? {opacity: 1, gridColumn: 4} : {gridColumn: 4}}>
          <TitleText />
        </div>
      </CSSTransition>
    )
  } else {
    return (
      <div className='navbar-title' style={{opacity: 1, gridColumn: 4}}>
        <TitleText />
      </div>
    )
  }

}

export default NavbarTitle;
