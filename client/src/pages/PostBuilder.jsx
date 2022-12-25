import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import AddComponentSelector from '../builder-components/AddComponentSelector.jsx';
import MainTitleComp from '../builder-components/MainTitleComp.jsx';
import SubtitleComp from '../builder-components/SubtitleComp.jsx';
import SectionTitleComp from '../builder-components/SectionTitleComp.jsx';
import BodyTextComp from '../builder-components/BodyTextComp.jsx';
import QuoteComp from '../builder-components/QuoteComp.jsx';
import PhotoComp from '../builder-components/PhotoComp.jsx';
import PhotoGalleryComp from '../builder-components/PhotoGalleryComp.jsx';
import BackgroundPhotoComp from '../builder-components/BackgroundPhotoComp.jsx';
import CaptionComp from '../builder-components/CaptionComp.jsx';

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
          switch (component.type) {
            case 'main-title':
              return <MainTitleComp key={component.type + index} component={component}/>
            case 'sub-title':
              return <SubtitleComp key={component.type + index} component={component}/>
            case 'section-title':
              return <SectionTitleComp key={component.type + index} component={component}/>
            case 'body-text':
              return <BodyTextComp key={component.type + index} component={component}/>
            case 'quote':
              return <QuoteComp key={component.type + index} component={component}/>
            case 'photo':
              return <PhotoComp key={component.type + index} component={component}/>
            case 'photo-gallery':
              return <PhotoGalleryComp key={component.type + index} component={component}/>
            case 'background-photo':
              return <BackgroundPhotoComp key={component.type + index} component={component}/>
            case 'caption':
              return <CaptionComp key={component.type + index} component={component}/>
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