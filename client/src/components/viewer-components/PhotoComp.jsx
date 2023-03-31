// dependancies
import React from 'react';
import { isMobile } from 'react-device-detect';

//imports
import './styles/PhotoComp.css';

function PhotoComp({ url, component }) {
  return (
    <div className={'photo-comp' + (component.margin_top ? ' has-top-margin' : '') + (component.margin_bottom ? ' has-bottom-margin' : '')}>
      <div className={component.type}>
        {
          !isMobile 
            ?
            (component.type === 'photo'
              ?
              <img src={`https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${component.key}`} alt='image' style={{ width: component.size }}/>
              :
              <div className='background-photo-div' style={{backgroundImage: `url('https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${component.key}')`, height: component.size || '600px' }}>
              </div>)
            :
            <img src={`https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${component.key}`} alt='image' style={{ width: '95%' }}/>
        }
      </div>
    </div>
  )
}

export default PhotoComp;