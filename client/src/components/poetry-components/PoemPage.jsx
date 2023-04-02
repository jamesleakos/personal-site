// dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import axios from 'axios';

// internal
// css
import { PoemPageStyled } from './styles/PoemPage.styled.js';
import { PoemModalStyled } from './styles/PoemModal.styled.js';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import BlockyButton from '../utility-components/BlockyButton.jsx';
// contexts
import AuthContext from '../../contexts/AuthContext.js';

function PoemPage() {
  const navigate = useNavigate();
  const passedPoemID = useLoaderData();
  const { isLoggedIn } = React.useContext(AuthContext);

  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [poem, setPoem] = useState(null);
  useEffect(() => {
    axios
      .get(`/poems/${passedPoemID}`)
      .then((res) => {
        setPoem(res.data);
      })
      .catch((err) => console.log(err));
  }, [modalOn]);

  useEffect(() => {
    if (!poem) return;
    if (poem.title === 'New Poem') {
      setModalOn(true);
    }
  }, [poem]);

  const deletePoem = () => {
    console.log('delete poem');
    axios
      .delete(`/poems/${passedPoemID}`)
      .then((res) => {
        navigate('/poetry');
      })
      .catch((err) => console.log(err));
  };

  return (
    <PoemPageStyled>
      <Navbar />
      <div className='poem-content'>
        <div className='top-bar'>
          <div className='poem-title'>{poem?.title}</div>
          {isLoggedIn ? (
            <BlockyButton
              style={{ float: 'right' }}
              onClick={() => deletePoem(passedPoemID)}
              text='DELETE'
            />
          ) : null}
          {isLoggedIn ? (
            <BlockyButton
              style={{ float: 'right' }}
              onClick={() => setModalOn(true)}
              text='EDIT'
            />
          ) : null}
        </div>
        <div
          className='poem-body'
          dangerouslySetInnerHTML={{
            __html: poem?.poem.replace(/\n/g, '<br />'),
          }}
        ></div>
        <div className='poem-explanation'>{poem?.explanation}</div>
      </div>
      <Footer />
      {modalOn ? (
        <PoemModal
          poem={poem}
          close={() => {
            setModalOn(false);
          }}
        />
      ) : null}
    </PoemPageStyled>
  );
}

const PoemModal = ({ poem, close }) => {
  const [title, setTitle] = useState(poem.title);
  const [poemText, setPoem] = useState(poem.poem);
  const [explanation, setExplanation] = useState(poem.explanation);

  const save = () => {
    axios
      .put(`/poems`, {
        _id: poem._id,
        title: title,
        poem: poemText,
        explanation: explanation,
      })
      .then((res) => {
        console.log(res.data);
        close();
      })
      .catch((err) => console.log(err));
  };

  return (
    <PoemModalStyled>
      <div className='background'></div>
      <div className='content'>
        <div className='relative-content'>
          <div className='form'>
            <label htmlFor='title'>Title</label>
            <textarea
              name='title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <label htmlFor='poem'>Poem</label>
            <textarea
              name='poem'
              value={poemText}
              onChange={(e) => {
                setPoem(e.target.value);
              }}
              style={{ height: '200px' }}
            />

            <label htmlFor='explanation'>Explanation</label>
            <textarea
              name='explanation'
              value={explanation}
              onChange={(e) => {
                setExplanation(e.target.value);
              }}
            />

            <BlockyButton
              onClick={() => save()}
              text='SAVE'
              // style={{ position: 'absolute', top: '5px', right: '5px' }}
            />
          </div>

          <BlockyButton
            onClick={() => close()}
            text='CLOSE'
            style={{ position: 'absolute', top: '5px', right: '5px' }}
          />
        </div>
      </div>
    </PoemModalStyled>
  );
};

export default PoemPage;
