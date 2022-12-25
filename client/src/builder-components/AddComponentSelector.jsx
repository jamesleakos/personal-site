import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/AddComponentSelector.css';

function AddComponentSelector() {
  return (
    <div className='selector-container'>
      <FontAwesomeIcon className='reacting-link expand-cursor' icon='fa-solid fa-book' />
      <FontAwesomeIcon className='reacting-link expand-cursor' icon='fa-solid fa-book-open' />
      <FontAwesomeIcon className='reacting-link expand-cursor' icon='fa-solid fa-section' />
      <FontAwesomeIcon className='reacting-link expand-cursor' icon='fa-solid fa-font' />
      <FontAwesomeIcon className='reacting-link expand-cursor' icon='fa-solid fa-quote-left' />
      <FontAwesomeIcon className='reacting-link expand-cursor' icon='fa-solid fa-image' />
      <FontAwesomeIcon className='reacting-link expand-cursor' icon='fa-solid fa-images' />
      <FontAwesomeIcon className='reacting-link expand-cursor' icon='fa-solid fa-image-portrait' />
      <FontAwesomeIcon className='reacting-link expand-cursor' icon='fa-solid fa-closed-captioning' />
    </div>
  )
}

export default AddComponentSelector;