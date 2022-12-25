import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/AddComponentSelector.css';

function AddComponentSelector({ addComponent }) {
  return (
    <div className='selector-container'>
      <FontAwesomeIcon onClick={(e) => { addComponent('main-title', e.target.value); }} className='reacting-link expand-cursor' icon='fa-solid fa-book' />
      <FontAwesomeIcon onClick={(e) => { addComponent('sub-title', e.target.value); }} className='reacting-link expand-cursor' icon='fa-solid fa-book-open' />
      <FontAwesomeIcon onClick={(e) => { addComponent('section-title', e.target.value); }} className='reacting-link expand-cursor' icon='fa-solid fa-section' />
      <FontAwesomeIcon onClick={(e) => { addComponent('body-text', e.target.value); }} className='reacting-link expand-cursor' icon='fa-solid fa-font' />
      <FontAwesomeIcon onClick={(e) => { addComponent('quote', e.target.value); }} className='reacting-link expand-cursor' icon='fa-solid fa-quote-left' />
      <FontAwesomeIcon onClick={(e) => { addComponent('photo', e.target.value); }} className='reacting-link expand-cursor' icon='fa-solid fa-image' />
      <FontAwesomeIcon onClick={(e) => { addComponent('photo-gallery', e.target.value); }} className='reacting-link expand-cursor' icon='fa-solid fa-images' />
      <FontAwesomeIcon onClick={(e) => { addComponent('background-photo', e.target.value); }} className='reacting-link expand-cursor' icon='fa-solid fa-image-portrait' />
      <FontAwesomeIcon onClick={(e) => { addComponent('caption', e.target.value); }} className='reacting-link expand-cursor' icon='fa-solid fa-closed-captioning' />
    </div>
  )
}

export default AddComponentSelector;