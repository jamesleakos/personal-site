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
  const [poem, setPoem] = useState(null);

  const [modalOn, setModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!passedPoemID) return;
    if (!poem) return;
    axios
      .post(`/page/poem`, {
        id: passedPoemID,
        name: poem.title,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [passedPoemID, poem]);

  useEffect(() => {
    axios
      .get(`/poems/${passedPoemID}`)
      .then((res) => {
        setPoem(res.data);
      })
      .catch((err) => console.log(err));
  }, [modalOn]);

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
              onClick={() => setDeleteModalOn(true)}
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
      {deleteModalOn ? (
        <ConfirmDeleteModal
          poem={poem}
          deletePoem={deletePoem}
          close={() => {
            setDeleteModalOn(false);
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
            <BlockyButton onClick={() => close()} text='CANCEL' />
            <BlockyButton onClick={() => save()} text='SAVE' />
          </div>
        </div>
      </div>
    </PoemModalStyled>
  );
};

const ConfirmDeleteModal = ({ deletePoem, close }) => {
  return (
    <PoemModalStyled>
      <div className='background'></div>
      <div
        className='content'
        style={{ width: '250px', height: '120px', margin: 'auto' }}
      >
        <div className='relative-content'>
          <div style={{ marginBottom: '10px' }}>Are you sure?</div>
          <div className='form' style={{ textAlign: 'center' }}>
            <BlockyButton onClick={() => close()} text='CANCEL' />
            <BlockyButton onClick={() => deletePoem()} text='DELETE' />
          </div>
        </div>
      </div>
    </PoemModalStyled>
  );
};

export default PoemPage;
