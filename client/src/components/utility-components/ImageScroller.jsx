// dependancies
import React from 'react';

// imports
import { UnderlinedTitleStyled } from './styles/UnderlinedTitle.styled.js';

function UnderlinedTitle({ title, titleColor, borderColor }) {
  return (
    <UnderlinedTitleStyled className='underlined-title'>
      <div style={{ color: titleColor, borderColor: borderColor }}>{title}</div>
    </UnderlinedTitleStyled>
  );
}

export default UnderlinedTitle;
