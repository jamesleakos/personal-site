// dependancies
import React from 'react';

//imports
import './styles/PhotoComp.css';

function PhotoComp({ url, component }) {
  return (
    <div className={'photo-comp' + (component.margin_top ? ' has-top-margin' : '') + (component.margin_bottom ? ' has-bottom-margin' : '')}>
      <div className={component.type}>
        {
          component.type === 'photo'
            ?
            <img src={url} alt='image' />
            :
            <div className='background-photo-div' style={{backgroundImage: `url(${url})`}}>
            </div>
        }
      </div>
    </div>
  )
}

export default PhotoComp;