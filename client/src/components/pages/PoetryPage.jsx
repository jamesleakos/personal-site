// dependencies
import React, { useState, useEffect } from 'react';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';

function PoetryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className='poetry'>
      <Navbar />
        Poetry
      <Footer />
    </div>
  )
}

export default PoetryPage;