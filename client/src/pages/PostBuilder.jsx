import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import AddComponentSelector from '../builder-components/AddComponentSelector.jsx';
import TextComp from '../builder-components/TextComp.jsx';
import PhotoComp from '../builder-components/PhotoComp.jsx';
import PhotoGalleryComp from '../builder-components/PhotoGalleryComp.jsx';
import BackgroundPhotoComp from '../builder-components/BackgroundPhotoComp.jsx';

function PostBuilder() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // here we will store all the stuff that we're adding - no need to write to the db yet
  const [components, setComponents] = useState([]);
  
  const modifyComponent = (id, obj) => {
    const newComponents = [...components];
    const index = newComponents.findIndex(comp => comp.id === id); // find the index of the item with the specified id
    newComponents[index] = obj; // update the item at that index by adding a new property
    setComponents(newComponents); // update the state with the new array
  }

  const deleteComponent = (id) => {
    const newComponents = [...components];
    const index = newComponents.findIndex(comp => comp.id === id); // find the index of the item with the specified id
    newComponents.splice(index, 1);
    const out = newComponents.map((comp, index) => {
      comp.id = index;
      return comp;
    });
    setComponents(out); // update the state with the new array
  }

  const addComponent = function(componentName) {
    const comp = {
      id: components.length,
      type: componentName
    }
    switch (componentName) {
      case 'main-title':
      case 'subtitle':
      case 'section-title':
      case 'body-text':
      case 'quote':
      case 'caption':
        comp.text = '';
      case 'photo':
        comp.url = '';
        break;
      case 'photo-gallery':
        comp.url = '';
        break;
      case 'background-photo':
        comp.url = '';
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
          switch (component.type) {
            case 'main-title':
            case 'subtitle':
            case 'section-title':
            case 'body-text':
            case 'quote':
            case 'caption':
              return <TextComp key={component.type + index} component={component} modifyComponent={modifyComponent} deleteComponent={deleteComponent} />
            case 'photo':
              return <PhotoComp key={component.type + index} component={component} modifyComponent={modifyComponent} deleteComponent={deleteComponent} />
            case 'photo-gallery':
              return <PhotoGalleryComp key={component.type + index} component={component} modifyComponent={modifyComponent} deleteComponent={deleteComponent} />
            case 'background-photo':
              return <BackgroundPhotoComp key={component.type + index} component={component} modifyComponent={modifyComponent} deleteComponent={deleteComponent} />
            default:
              break;
          }
        })
      }
      <AddComponentSelector addComponent={addComponent} />
    </div>
  )
}

export default PostBuilder;