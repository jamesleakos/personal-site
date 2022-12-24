import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/Footer.css';

function Footer() {

  return (
    <div className='footer'>
      <div className='footer-img'>
      </div>
      <div className='final'>
        <FontAwesomeIcon className='reacting-link link' icon={['fab', 'instagram']} />
        <FontAwesomeIcon className='reacting-link link' icon={['fab', 'linkedin']} />
        <FontAwesomeIcon className='reacting-link link' icon={['fab', 'github']} />
      </div>
    </div>
  )
}

export default Footer;