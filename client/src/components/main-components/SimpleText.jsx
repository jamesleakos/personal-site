// dependancies
import React from 'react';

// imports
import { SimpleTextStyled } from './styles/SimpleText.styled.js';

function SimpleText({ text }) {
  return (
    <SimpleTextStyled className='simple-text'>
      <div className='text-container'>
        <p className='text'>{text}</p>
      </div>
    </SimpleTextStyled>
  );
}

export default SimpleText;
