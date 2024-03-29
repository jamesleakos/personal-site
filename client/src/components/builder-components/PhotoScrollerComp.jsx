// dependancies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//imports
import { PhotoScrollerCompStyled } from './styles/PhotoScrollerComp.styled.js';
import ImageScroller from '../utility-components/scrollers/desktop-image-scroller/ImageScroller.jsx';
import { ImageMapper } from '../utility-components/scrollers/desktop-image-scroller/ImageScrollItem.jsx';
import { ImageMapper as EditingMapper } from './PhotoScrollerEditingItem.jsx';

//
const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

function EditingScroller({ keys, deleteSingleImage, changeImagePosition }) {
  const [forceRerender, setForceRerender] = useState(0);
  useEffect(() => {
    setForceRerender(forceRerender + 1);
    console.log('keys in EditingScroller: ', keys);
  }, [keys]);

  return (
    <ImageScroller
      imageURLArray={keys}
      ImageMapper={() =>
        EditingMapper(keys, deleteSingleImage, changeImagePosition)
      }
    />
  );
}

function PhotoScrollerComp({
  postId,
  component,
  addComponent,
  index,
  modifyComponentByIndex,
  deleteComponent,
  openOnEdit,
  setComponentEdit,
  moveComponent,
}) {
  // are we editing the post?
  const [editActive, setEditActive] = useState(openOnEdit);
  const [editIndex, setEditIndex] = useState(0);
  const [keys, setKeys] = useState(component.keys);

  useEffect(() => {
    if (!!component) setKeys(component.keys);
  }, [component.keys]);

  useEffect(() => {
    if (component.keys.length === 0) {
      handleEdit(true);
    }
  }, []);

  // consts for qol stuff for the image uploading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');

  // size stuff
  const [size, setSize] = useState(component.size);

  const endEdit = function () {
    component.size = size;
    handleEdit(false);
    if (component.keys.length === 0) deleteComponent(component);
    // this is just for size
    else modifyComponentByIndex(component, index);
  };

  const handleEdit = function (set) {
    setEditActive(set);
    setComponentEdit(index, set);
  };

  const changeImagePosition = function (currentIndex, newPosition) {
    // move a key to a new position, adjusting the array as appropriate. Make sure to not do anything if the index is 0 and we're moving left or if the index is the last index and we're moving right
    if (newPosition === -1 || newPosition === component.keys.length) return;

    const newKeys = component.keys.slice();

    const key = newKeys[currentIndex];
    newKeys.splice(currentIndex, 1);
    newKeys.splice(newPosition, 0, key);

    setKeys(newKeys);
    modifyComponentByIndex({ ...component, keys: newKeys }, index);
  };

  // TODO : changing type likely needs to make an axios call in the PostBuilder, as we'll need to reload the components
  const changeType = function (type) {
    handleEdit(false);
    component.type = type;
    modifyComponentByIndex(component, index);
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    // Check if all files are valid
    if (!files.every((file) => validFileTypes.includes(file.type))) {
      setError('All files must be JPG/PNG');
      return;
    }

    // Prepare FormData
    const form = new FormData();
    files.forEach((file, index) => {
      form.append(`image`, file);
    });

    console.log('form: ', form);

    setIsLoading(true);

    axios
      .post(
        `/image_scroller_components?post_id=${postId}&current_key=${component.keys[editIndex]}`,
        form
      )
      .then((response) => {
        console.log('handleUpload response: ', response);
        setIsLoading(false);
        response.data.keys.forEach((key) => component.keys.push(key));
        modifyComponentByIndex(component, index);
      })
      .catch((err) => {
        setIsLoading(false);
        setUploadError(err.message);
        console.log(err);
      });
  };

  const deleteSingleImage = function (imageIndex) {
    // delete at '/image_scroller_components/image' with key in query
    console.log('deleteSingleImage called: ', imageIndex);
    axios
      .delete(
        `/image_scroller_components/image?post_id=${postId}&component_id=${component._id}&key=${component.keys[index]}`
      )
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // import that this comes after the axios call
    component.keys.splice(imageIndex, 1);
    modifyComponentByIndex(component, index);
  };

  // #region margin and add below

  const toggleMarginTop = function () {
    component.margin_top = !component.margin_top;
    modifyComponentByIndex(component, index);
  };

  const toggleMarginBottom = function () {
    component.margin_bottom = !component.margin_bottom;
    modifyComponentByIndex(component, index);
  };

  const handleAddBelow = function (compName) {
    console.log('click');
    handleEdit(false);
    addComponent(compName, index + 1);
  };

  // #endregion

  return (
    <PhotoScrollerCompStyled
      className={'photo-scroller-comp' + (isMobile ? ' mobile' : '')}
    >
      {editActive ? (
        <div className='editing'>
          <div className='top-icons'>
            {/* TOP LEFT ICONS */}
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
                  component.margin_bottom
                    ? { color: 'red' }
                    : { color: 'green' }
                }
                className='reacting-link expand-cursor'
                icon='fa-solid fa-arrows-down-to-line'
              />
            </div>
            {/* TOP RIGHT ICONS */}
            <div className='right-icons'>
              <FontAwesomeIcon
                onClick={() => {
                  deleteComponent(component);
                }}
                className='reacting-link expand-cursor'
                icon='fa-solid fa-xmark'
              />
            </div>
          </div>
          {/* MIDDLE IMAGES */}
          {keys.length > 0 ? (
            <EditingScroller
              keys={keys}
              deleteSingleImage={deleteSingleImage}
              changeImagePosition={changeImagePosition}
            />
          ) : null}

          <div className='input-area'>
            <input
              id={isLoading ? 'image-input is-loading' : 'image-input'}
              type='file'
              multiple
              onChange={handleUpload}
            />
            {error && <p className='error-text'>{error}</p>}
            {uploadError && <p className='error-text'>{uploadError}</p>}
            {isLoading && <p className='loading-text'>...loading</p>}
          </div>

          <div className='left-icons'>
            <FontAwesomeIcon
              onClick={(e) => {
                changeType('photo');
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-image'
              style={component.type === 'photo' ? { color: 'red' } : null}
            />
            <FontAwesomeIcon
              onClick={(e) => {
                changeType('background-photo');
              }}
              className='reacting-link expand-cursor'
              icon='fa-solid fa-image-portrait'
              style={
                component.type === 'background-photo' ? { color: 'red' } : null
              }
            />
            <div className='size-field-div'>
              <label htmlFor='size'>Size:</label>
              <input
                name='size'
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                type='text'
              />
            </div>
            {component.type === 'background-photo' ? (
              <div className='bg-position-field-div'>
                <label htmlFor='bg-pos'>BG Position:</label>
                <input
                  name='bg-pos'
                  value={backgroundPosition}
                  onChange={(e) => {
                    setBackgroundPosition(e.target.value);
                  }}
                  type='text'
                />
              </div>
            ) : null}
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
            <span
              className='reacting-link expand-cursor'
              onClick={() => {
                handleAddBelow('photo-scroller');
              }}
            >
              <FontAwesomeIcon icon='fa-solid fa-images' />
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
          className={'not-editing' + (isMobile ? ' mobile' : '')}
          onDoubleClick={() => handleEdit(true)}
        >
          <ImageScroller
            imageURLArray={keys}
            ImageMapper={ImageMapper}
            addLeftMargin={true}
          />
        </div>
      )}
    </PhotoScrollerCompStyled>
  );
}

export default PhotoScrollerComp;
