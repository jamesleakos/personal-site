// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// internal
// css
import { PoetryPageStyled } from './styles/PoetryPage.styled.js';
// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import SpanItem from '../utility-components/SpanItem.jsx';
import BlockyButton from '../utility-components/BlockyButton.jsx';

// contexts
import AuthContext from '../../contexts/AuthContext.js';

function PoetryPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .post(`/page/poetry`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [poems, setPoems] = useState([]);
  useEffect(() => {
    axios
      .get('poems/')
      .then((res) => {
        setPoems(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const gotoPoem = function (poem_id) {
    navigate(`/poem/${poem_id}`);
  };

  const addPoem = function () {
    axios
      .put('poems/', {
        title: 'New Poem',
        poem: '',
        explanation: '',
      })
      .then((res) => {
        setPoems(res.data);
        navigate(`/poem/${res.data[res.data.length - 1]._id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <PoetryPageStyled>
      <Navbar />
      <div className='main-page-content'>
        <div className='poem-section'>
          <div className='top-bar'>
            <p className='section-title'>Poems</p>
            {isLoggedIn ? (
              <BlockyButton
                style={{ float: 'right' }}
                onClick={() => addPoem()}
                text='ADD POEM'
              />
            ) : null}
          </div>
          <div className='poem-span-holder'>
            {poems.map((poem, index) => {
              return (
                <SpanItem
                  key={poem._id}
                  onClick={() => gotoPoem(poem._id)}
                  text={poem.title}
                  showSlash={index !== poems.length - 1}
                  color='white'
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </PoetryPageStyled>
  );
}

export default PoetryPage;
