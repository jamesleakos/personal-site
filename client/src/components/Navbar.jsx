import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles/Navbar.css';
import { Link } from 'react-router-dom'

function Navbar() {

  const [navbarStuck, setNavbarStuck] = useState(false);

  useEffect(() => {
    function handleScroll() {
      console.log('handling scroll');
      const navbarElement = document.querySelector('.navbar');
      const navbarRect = navbarElement.getBoundingClientRect();
      setNavbarStuck(navbarRect.top <= 0);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='navbar'>
      <div className='navbar-item' style={{gridColumn: 2, borderWidth: '0 1px'}}>
        <Link className='links-item reacting-link' to="/posts">About</Link>
      </div>
      <div className='navbar-item' style={{gridColumn: 3, borderWidth: '0 1px 0 0'}}>
        <Link className='links-item reacting-link' to="/posts">Resume</Link>
      </div>
      <CSSTransition in={navbarStuck} timeout={300} classNames="slide">
        <div className='navbar-title' style={{gridColumn: 4}}>
          <h3>JAMES LEAKOS</h3>
        </div>
      </CSSTransition>
      <div className='navbar-item' style={{gridColumn: 5, borderWidth: '0 1px'}}>
        <Link className='links-item reacting-link' to="/posts">Journal</Link>
      </div>
      <div className='navbar-item' style={{gridColumn: 6, borderWidth: '0 1px 0 0'}}>
        <Link className='links-item reacting-link' to="/posts">Contact</Link>
      </div>

    </div>
  )
}

export default Navbar;