import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles/Navbar.css';
import { Link, useLocation } from 'react-router-dom'

function TitleText() {
  return (
    <Link className='reacting-link' to="/">JAMES LEAKOS</Link>
  )
}

function Navbar() {

  const [navbarStuck, setNavbarStuck] = useState(false);
  const animateTitle = useLocation().pathname === '/';

  // we don't actually need the if statement here for functionality but no point doing extra work if we want it off?
  if (animateTitle) {
    useEffect(() => {
      function handleScroll() {
        const navbarElement = document.querySelector('.navbar');
        const navbarRect = navbarElement.getBoundingClientRect();
        setNavbarStuck(navbarRect.top <= 0);
      }
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  }

  return (
    <div className='navbar'>
      {/* left links */}
      <div className='navbar-item' style={{gridColumn: 2, borderWidth: '0 1px'}}>
        <Link className='reacting-link' to="/posts">About</Link>
      </div>
      <div className='navbar-item' style={{gridColumn: 3, borderWidth: '0 1px 0 0'}}>
        <Link className='reacting-link' to="/posts">Resume</Link>
      </div>

      {/* center title - some ternaries to choose between active or not */}
      {
        animateTitle
          ? <CSSTransition in={navbarStuck} timeout={300} classNames="slide" >
              <div className='navbar-title' style={navbarStuck ? {opacity: 1, gridColumn: 4} : {gridColumn: 4}}>
                <TitleText />
              </div>
            </CSSTransition>
          : <div className='navbar-title' style={{opacity: 1, gridColumn: 4}}>
              <TitleText />
            </div>
      }

      {/* right links */}
      <div className='navbar-item' style={{gridColumn: 5, borderWidth: '0 1px'}}>
        <Link className='reacting-link' to="/posts">Journal</Link>
      </div>
      <div className='navbar-item' style={{gridColumn: 6, borderWidth: '0 1px 0 0'}}>
        <Link className='reacting-link' to="/posts">Contact</Link>
      </div>

    </div>
  )
}

export default Navbar;