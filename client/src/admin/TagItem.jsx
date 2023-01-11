// dependencies
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// imports
import './styles/TagItem.css';

function TagItem({tag, modifyTag, deleteTag}) {

  const [editing, setEditing] = useState(false);
  const [nameField, setName] = useState('');

  const handleModify = function () {
    const newTag = {...tag};
    newTag.name = nameField;
    modifyTag(newTag);
    setEditing(false);
    setName('');
  }
  
  return (
    <div className='tag-item'>
      {
        editing ?
          <div>
            <input value={nameField} onChange={(e) => { setName(e.target.value) }} type="text" />
            <button onClick={handleModify}>Update</button>
          </div>
          :
          <div onDoubleClick={() => {setEditing(true); }} >
            <p className='tag-name'>{ tag.name }</p>
            <FontAwesomeIcon onClick={() => { deleteTag(tag) }} className='reacting-link expand-cursor tag-delete' icon='fa-solid fa-xmark' />
          </div>
      }

    </div>
  )
}

export default TagItem;