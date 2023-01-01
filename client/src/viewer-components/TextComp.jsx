import React from 'react';
import './styles/TextComp.css';

function TextComp({ component }) {
  return (
    <div className='text-comp'>
      <div className={component.type} dangerouslySetInnerHTML={{ __html: component.text.replace(/\n/g, '<br />') }}></div>
    </div>
  )
}

export default TextComp;