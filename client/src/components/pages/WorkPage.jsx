// dependencies
import React, { useState, useEffect } from 'react';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';

function WorkPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className='work'>
      <Navbar />
        Work
      <Footer />
    </div>
  )
}

export default WorkPage;