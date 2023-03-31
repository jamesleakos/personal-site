import React from 'react';
import './styles/TextComp.css';

function TextComp({ component }) {
  return (
    <div className={'text-comp' + (component.margin_top ? ' has-top-margin' : '') + (component.margin_bottom ? ' has-bottom-margin' : '')}>
      <div className={component.type} dangerouslySetInnerHTML={{ __html: component.text.replace(/\n/g, '<br />') }}></div>
    </div>
  )
}

export default TextComp;