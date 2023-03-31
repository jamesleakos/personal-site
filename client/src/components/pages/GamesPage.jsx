// dependencies
import React, { useState, useEffect } from 'react';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';

function GamesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className='work'>
      <Navbar />
        Games
      <Footer />
    </div>
  )
}

export default GamesPage;