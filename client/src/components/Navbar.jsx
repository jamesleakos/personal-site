import React from 'react';
import './styles/Navbar.css';
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <div className='navbar'>
      <div className='navbar-item' style={{gridColumn: 2, borderWidth: '0 1px'}}>
        <Link className='links-item reacting-link' to="/posts">About</Link>
      </div>
      <div className='navbar-item' style={{gridColumn: 3, borderWidth: '0 1px 0 0'}}>
        <Link className='links-item reacting-link' to="/posts">Resume</Link>
      </div>
      <div className='navbar-title' style={{gridColumn: 4}}>
        <h3>JAMES LEAKOS</h3>
      </div>
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