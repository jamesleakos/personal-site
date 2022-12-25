import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import AddComponentSelector from '../builder-components/AddComponentSelector.jsx';

function PostBuilder() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // here we will store all the stuff that we're adding - no need to write to the db yet
  const [components, setComponents] = useState([]);
  
  return (
    <div className='post-builder'>
      <Navbar />
      <AddComponentSelector />
    </div>
  )
}

export default PostBuilder;