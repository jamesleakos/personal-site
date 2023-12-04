import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import VisitsSummary from './VisitsSummary.jsx';
import VisitsSummaryByPage from './VisitsSummaryByPage.jsx';

// contexts
import AuthContext from '../../contexts/AuthContext.js';

// css
import { VisitsDataPageStyled } from './styles/VisitsDataPage.styled.js';

function VisitsDataPage() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, logout } = React.useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get('/auth/check-auth')
      .then((res) => {
        // if 200 response, do nothing
        console.log('auth check successful');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log('auth check not successful');
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate('/sign-in-up');
  }, [isLoggedIn]);

  return (
    <VisitsDataPageStyled className='visits-data-page'>
      <Navbar />
      <VisitsSummary />
      <VisitsSummaryByPage />
      <Footer />
    </VisitsDataPageStyled>
  );
}

export default VisitsDataPage;
