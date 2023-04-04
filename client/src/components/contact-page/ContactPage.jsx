// dependencies
import React, { useState, useEffect } from 'react';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import BackgroundImage from '../main-components/BackgroundImage.jsx';

// styles
import { ContactPageStyled } from './styles/ContactPage.styled.js';

function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ContactPageStyled>
      <Navbar />
      <div className='main-content'>
        <div className='contact-section'>
          <h1 className='section-title'>Contact</h1>
          <p className='contact-text'>Email me at jamesleakos@gmail.com</p>
        </div>
      </div>
      <BackgroundImage
        height='80vh'
        imageURL='Personal_Site/cascade_party_o3vag5CSz.JPG'
      />
      <Footer />
    </ContactPageStyled>
  );
}

export default ContactPage;
