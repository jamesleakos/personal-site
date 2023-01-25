import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/Footer.css';

function Footer() {

  return (
    <div className='footer'>
      <a href='https://www.instagram.com/jamesleakos/'><FontAwesomeIcon className='reacting-link expand-cursor' icon={['fab', 'instagram']} /></a>
      <a href='https://www.linkedin.com/in/jamesleakos/'><FontAwesomeIcon className='reacting-link expand-cursor' icon={['fab', 'linkedin']} /></a>
      <a href='https://github.com/jamesleakos'><FontAwesomeIcon className='reacting-link expand-cursor' icon={['fab', 'github']} /></a>
    </div>
  )
}

export default Footer;