// dependancies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// imports
import NavbarTitle from './NavbarTitle.jsx';
import './styles/Navbar.css';

function MobileNavbar({ toggleModal }) {
  {/* hamburger */}
  return <div className='navbar mobile-navbar'>
    <div
      className='navbar-item'
      style={{ gridColumn: 1, borderWidth: '0 1px 0 0' }}
    >
      <FontAwesomeIcon
        onClick={() => {
          toggleModal();
        }}
        className='reacting-link expand-cursor'
        icon='fa-solid fa-bars'
      />
    </div>

    <NavbarTitle gridColumn={2} />

    {/* right icon */}
    <div
      className='navbar-item'
      style={{ gridColumn: 3, borderWidth: '0 0 0 1px' }}
    >
      <FontAwesomeIcon
        onClick={() => {
          toggleModal();
        }}
        className='reacting-link expand-cursor'
        icon='fa-solid fa-bars'
      />
    </div>
  </div>

}

function DesktopNavbar() {
  return <div className='navbar desktop-navbar'>
    {/* left links */}
    <div
      className='navbar-item'
      style={{ gridColumn: 2, borderWidth: '0 1px' }}
    >
      <a className='reacting-link expand-cursor' href='https://www.linkedin.com/in/jamesleakos/'>
        LinkedIn
      </a>
    </div>
    <div
      className='navbar-item'
      style={{ gridColumn: 3, borderWidth: '0 1px 0 0' }}
    >
      <a className='reacting-link expand-cursor' href='https://github.com/jamesleakos'>
        GitHub
      </a>
    </div>

    <NavbarTitle gridColumn={4} />

    {/* right links */}
    <div
      className='navbar-item'
      style={{ gridColumn: 5, borderWidth: '0 1px' }}
    >
      <Link className='reacting-link' to='/all-posts'>
        Posts
      </Link>
    </div>
    <div
      className='navbar-item'
      style={{ gridColumn: 6, borderWidth: '0 1px 0 0' }}
    >
      <a className='reacting-link expand-cursor' href='https://github.com/jamesleakos'>
        Projects
      </a>
    </div>
  </div>
}

function Navbar() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 800;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const [modalOn, setModalOn] = useState(false);

  return (
      <div className='navbar-holder'>
        <div className='navbar-top'>
          {
            width > breakpoint
              ?
              <DesktopNavbar />
              :
              <MobileNavbar toggleModal={() => setModalOn(!modalOn)} />
          }
        </div>
        {
          (width < breakpoint && modalOn)
            ?
            <div className='mobile-modal'>
              <a className='reacting-link modal-option' href='https://www.linkedin.com/in/jamesleakos/'>
                LinkedIn
              </a>
              <a className='reacting-link modal-option' href='https://github.com/jamesleakos'>
                GitHub
              </a>
              <Link className='reacting-link modal-option' to='/all-posts'>
                Posts
              </Link>
              <a className='reacting-link modal-option' href='https://github.com/jamesleakos'>
                Projects
              </a>
            </div>
            : null
        }
      </div>
  );
}

export default Navbar;
