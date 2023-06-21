// external
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// internal
import TextAreaExpander from './TextAreaExpander.jsx';
import './styles/TextComp.css';
import '../viewer-components/styles/TextComp.css';

function TextComp({
  component,
  addComponent,
  index,
  modifyComponentByIndex,
  deleteComponent,
  openOnEdit,
  setComponentEdit,
  moveComponent,
}) {
  useEffect(() => {
    if (!component.text || component.text === '') {
      handleEdit(true);
    }
  }, []);

  const [text, setText] = useState(component.text);
  const [editActive, setEditActive] = useState(openOnEdit);

  const handleEdit = function (set) {
    setEditActive(set);
    setComponentEdit(index, set);
  };

  const endEdit = function () {
    component.text = text;
    handleEdit(false);

    modifyComponentByIndex(component, index);
  };

  const changeType = function (type) {
    component.type = type;
    modifyComponentByIndex(component, index);
  };

  const toggleMarginTop = function () {
    component.margin_top = !component.margin_top;
    modifyComponentByIndex(component, index);
  };

  const toggleMarginBottom = function () {
    // console.log('toggle bottom');
    component.margin_bottom = !component.margin_bottom;
    modifyComponentByIndex(component, index);
  };

  const handleAddBelow = function (compName) {
    console.log('click');
    handleEdit(false);
    addComponent(compName, index + 1);
  };

  return (
    <div className='text-comp'>
      {editActive ? (
        <div className='editing'>
          <div className='left-icons'>
            <FontAwesomeIcon
              onClick={() => {
                moveComponent(component, -1);
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-arrow-up'
            />
            <FontAwesomeIcon
              onClick={() => {
                moveComponent(component, 1);
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-arrow-down'
            />
            <FontAwesomeIcon
              onClick={() => {
                toggleMarginTop();
              }}
              style={
                component.margin_top ? { color: 'red' } : { color: 'green' }
              }
              className='reacting-link expand-cursor'
              icon='fa-solid fa-arrows-up-to-line'
            />
            <FontAwesomeIcon
              onClick={() => {
                toggleMarginBottom();
              }}
              style={
                component.margin_bottom ? { color: 'red' } : { color: 'green' }
              }
              className='reacting-link expand-cursor'
              icon='fa-solid fa-arrows-down-to-line'
            />
          </div>
          <div className='right-icons'>
            <FontAwesomeIcon
              onClick={() => {
                deleteComponent(component);
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-xmark'
            />
          </div>
          <TextAreaExpander value={text} setText={setText} />
          <div className='left-icons'>
            <FontAwesomeIcon
              style={component.type === 'main-title' ? { color: 'red' } : null}
              onClick={() => {
                changeType('main-title');
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-book'
            />
            <FontAwesomeIcon
              style={component.type === 'subtitle' ? { color: 'red' } : null}
              onClick={() => {
                changeType('subtitle');
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-book-open'
            />
            <FontAwesomeIcon
              style={
                component.type === 'section-title' ? { color: 'red' } : null
              }
              onClick={() => {
                changeType('section-title');
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-section'
            />
            <FontAwesomeIcon
              style={component.type === 'body-text' ? { color: 'red' } : null}
              onClick={() => {
                changeType('body-text');
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-font'
            />
            <FontAwesomeIcon
              style={component.type === 'quote' ? { color: 'red' } : null}
              onClick={() => {
                changeType('quote');
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-quote-left'
            />
            <FontAwesomeIcon
              style={component.type === 'caption' ? { color: 'red' } : null}
              onClick={() => {
                changeType('caption');
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-closed-captioning'
            />
          </div>
          <div className='right-icons'>
            {/* <p className='reacting-link'>Add</p> */}
            <span
              className='reacting-link expand-cursor'
              onClick={() => {
                handleAddBelow('body-text');
              }}
            >
              <FontAwesomeIcon icon='fa-solid fa-font' />
            </span>
            <span
              className='reacting-link expand-cursor'
              onClick={() => {
                handleAddBelow('photo');
              }}
            >
              <FontAwesomeIcon icon='fa-solid fa-image' />
            </span>
            <FontAwesomeIcon
              onClick={endEdit}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-arrow-right'
            />
          </div>
        </div>
      ) : (
        <div
          className={
            component.type +
            (component.margin_top ? ' has-top-margin' : '') +
            (component.margin_bottom ? ' has-bottom-margin' : '')
          }
          onDoubleClick={() => handleEdit(true)}
          dangerouslySetInnerHTML={{
            __html: component.text.replace(/\n/g, '<br />'),
          }}
        ></div>
      )}
    </div>
  );
}

export default TextComp;
