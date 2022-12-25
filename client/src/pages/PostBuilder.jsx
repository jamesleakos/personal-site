import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import AddComponentSelector from '../builder-components/AddComponentSelector.jsx';

function PostBuilder() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // here we will store all the stuff that we're adding - no need to write to the db yet
  const [components, setComponents] = useState([]);

  const addComponent = function(componentName) {
    const comp = {
      type: componentName
    }
    switch (componentName) {
      case 'main-title':
        comp.text = '';
        break;
      case 'sub-title':
        comp.text = '';
        break;
      case 'section-title':
        comp.text = '';
        break;
      case 'body-text':
        comp.text = '';
        break;
      case 'quote':
        comp.text = '';
        break;
      case 'photo':
        comp.url = '';
        break;
      case 'photo-gallery':
        comp.url = '';
        break;
      case 'background-photo':
        comp.url = '';
        break;
      case 'caption':
        comp.text = '';
        break;
      default:
        break;
    }
    setComponents([...components, comp]);
  }
  
  return (
    <div className='post-builder'>
      <Navbar />
      {
        components.map((component, index) => {
          return <p key={component.type + index}>{component.type}</p>
        })
      }
      <AddComponentSelector addComponent={addComponent} />
    </div>
  )
}

export default PostBuilder;