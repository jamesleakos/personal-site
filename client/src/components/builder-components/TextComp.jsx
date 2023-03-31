import React, { useEffect, useState } from 'react';
import TextAreaExpander from './TextAreaExpander.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/TextComp.css';
import '../viewer-components/styles/TextComp.css';

function TextComp({ component, addComponent, index, modifyComponent, deleteComponent, openOnEdit, moveComponent }) {
  useEffect(() => {
    // console.log(component);
  }, []);
  
  const [text, setText] = useState(component.text);
  const [editActive, setEditActive] = useState(openOnEdit);

  const endEdit = function() {
    component.text = text;
    modifyComponent(component, index);

    setEditActive(false);
  }

  const changeType = function(type) {
    component.type = type;
    modifyComponent(component, index);
  }

  const toggleMarginTop = function() {
    component.margin_top = !component.margin_top;
    modifyComponent(component, index);
  }

  const toggleMarginBottom = function() {
    // console.log('toggle bottom');
    component.margin_bottom = !component.margin_bottom;
    modifyComponent(component, index);
  }

  const handleAddBelow = function (compName) {
    console.log('click');
    setEditActive(false);
    addComponent(compName, index + 1);
  }

  return (
    <div className='text-comp'>
      {
        editActive 
          ?
          <div className='editing'>
            <div className='left-icons'>
              <FontAwesomeIcon onClick={() => { moveComponent(component, -1); }} className='reacting-link expand-cursor' icon='fa-solid fa-arrow-up' />
              <FontAwesomeIcon onClick={() => { moveComponent(component, 1); }} className='reacting-link expand-cursor' icon='fa-solid fa-arrow-down' />
              <span className='reacting-link expand-cursor' onClick={() => {toggleMarginTop(); }}>{component.margin_top ? 'Remove Top Margin' : 'Add Top Margin'}</span>
              <span className='reacting-link expand-cursor' onClick={() => {toggleMarginBottom(); }}>{component.margin_bottom ? 'Remove Bottom Margin' : 'Add Buttom Margin'}</span>
            </div>
            <div className='right-icons'>
              <FontAwesomeIcon onClick={() => { deleteComponent(component) }} className='reacting-link expand-cursor' icon='fa-solid fa-xmark' />
            </div>
            <TextAreaExpander value={text} setText={setText} />
            <div className='left-icons'>
              <FontAwesomeIcon style={component.type==='main-title' ? {color: 'red'} : null} onClick={() => { changeType('main-title') }} className='reacting-link expand-cursor' icon='fa-solid fa-book' />
              <FontAwesomeIcon style={component.type==='subtitle' ? {color: 'red'} : null} onClick={() => { changeType('subtitle') }} className='reacting-link expand-cursor' icon='fa-solid fa-book-open' />
              <FontAwesomeIcon style={component.type==='section-title' ? {color: 'red'} : null} onClick={() => { changeType('section-title') }} className='reacting-link expand-cursor' icon='fa-solid fa-section' />
              <FontAwesomeIcon style={component.type==='body-text' ? {color: 'red'} : null} onClick={() => { changeType('body-text') }} className='reacting-link expand-cursor' icon='fa-solid fa-font' />
              <FontAwesomeIcon style={component.type==='quote' ? {color: 'red'} : null} onClick={() => { changeType('quote') }} className='reacting-link expand-cursor' icon='fa-solid fa-quote-left' />
              <FontAwesomeIcon style={component.type==='caption' ? {color: 'red'} : null}  onClick={() => { changeType('caption') }} className='reacting-link expand-cursor' icon='fa-solid fa-closed-captioning' />
            </div>
            <div className='right-icons'>
              {/* <p className='reacting-link'>Add</p> */}
              <span className='reacting-link expand-cursor' onClick={() => { handleAddBelow('body-text'); }}>Text Below</span>
              <span className='reacting-link expand-cursor' onClick={() => { handleAddBelow('photo'); }}>Photo Below</span>
              <FontAwesomeIcon onClick={ endEdit } className='reacting-link expand-cursor' icon='fa-solid fa-arrow-right' />
            </div>
          </div> 
          :
          <div className={component.type + (component.margin_top ? ' has-top-margin' : '') + (component.margin_bottom ? ' has-bottom-margin' : '')} onDoubleClick={() => setEditActive(true) }  dangerouslySetInnerHTML={{ __html: component.text.replace(/\n/g, '<br />') }}>
          </div>
      }
    </div>
  )
}

export default TextComp;