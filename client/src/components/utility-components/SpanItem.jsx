// dependancies
import React from 'react';

// imports
import { SpanItemStyled } from './styles/SpanItem.styled.js';

function SpanItem({ text, onClick, showSlash, color }) {
  return (
    <SpanItemStyled onClick={() => onClick()}>
      <span className='actual-span expand-cursor reacting-link'>{text}</span>
      {showSlash && (
        <span className='span-slash'>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
      )}
    </SpanItemStyled>
  );
}

export default SpanItem;
