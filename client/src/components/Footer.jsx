import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/Footer.css';

function Footer() {

  return (
    <div className='footer'>
      <FontAwesomeIcon className='reacting-link expand-cursor' icon={['fab', 'instagram']} />
      <FontAwesomeIcon className='reacting-link expand-cursor' icon={['fab', 'linkedin']} />
      <FontAwesomeIcon className='reacting-link expand-cursor' icon={['fab', 'github']} />
    </div>
  )
}

export default Footer;