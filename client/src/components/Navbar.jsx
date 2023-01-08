// dependancies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// imports
import NavbarTitle from './NavbarTitle.jsx';
import './styles/Navbar.css';

function Navbar() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 800;
  React.useEffect(() => {
   const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <div className='navbar'>
      {/* left links */}
      {
        width > breakpoint ?
          <div className='navbar-item' style={{gridColumn: 2, borderWidth: '0 1px'}}>
            <Link className='reacting-link' to="/posts">About</Link>
          </div> : null
      }
      {
        width > breakpoint ?
          <div className='navbar-item' style={{gridColumn: 3, borderWidth: '0 1px 0 0'}}>
            <Link className='reacting-link' to="/posts">Resume</Link>
          </div> : null
      }

      {/* hamburger */}
      {
        width < breakpoint ?
          <div className='navbar-item' style={{gridColumn: 1, borderWidth: '0 1px 0 0'}}>
            <FontAwesomeIcon onClick={ () => {console.log('clicked'); }} className='reacting-link expand-cursor' icon='fa-solid fa-bars' />
          </div> : null
      }

      <NavbarTitle gridColumn={ width > breakpoint ? 4 : 2 }/>

      {/* right links */}
      {
        width > breakpoint ?
          <div className='navbar-item' style={{gridColumn: 5, borderWidth: '0 1px'}}>
              <Link className='reacting-link' to="/posts">Journal</Link>
          </div> : null
      }
      {
        width > breakpoint ?
          <div className='navbar-item' style={{gridColumn: 6, borderWidth: '0 1px 0 0'}}>
            <Link className='reacting-link' to="/posts">Contact</Link>
          </div> : null
      }
    </div>
  )
}

export default Navbar;