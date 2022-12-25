import React, { useEffect, useState, useRef } from 'react';
import TextAreaExpander from './TextAreaExpander.jsx';
import './styles/MainTitleComp.css';

function MainTitleComp({ component }) {
  return (
    <div className='main-title'>
			<TextAreaExpander />
      <p className='reacting-link'>Add</p>
    </div>
  )
}

export default MainTitleComp;