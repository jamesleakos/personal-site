import React, { useEffect } from 'react';

import SignInUp from '../components/SignInUp.jsx';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';

function SignInUpPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='sign-in-up-page'>
      <Navbar />
      <SignInUp />
      <Footer />
    </div>
  );
}

export default SignInUpPage;
