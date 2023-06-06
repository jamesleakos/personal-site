import React, { useEffect } from 'react';

import SignInUp from '../main-components/SignInUp.jsx';
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';

import { SignInUpPageStyled } from './styles/SignInUpPage.styled.js';

function SignInUpPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SignInUpPageStyled>
      <Navbar />
      <SignInUp />
      <Footer />
    </SignInUpPageStyled>
  );
}

export default SignInUpPage;
