// dependancies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// internal
import AuthContext from '../../contexts/AuthContext.js';
import './styles/SignInUp.css';

function SignInUp() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const handleSubmit = function () {
    axios
      .post('/auth/register_login', {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <div className='sign-in-up-comp'>
      <div className='sign-in-up-wrapper'>
        <input
          type='text'
          placeholder='email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type='button' onClick={handleSubmit} value='Submit' />
      </div>
      {error ? <p>{error}</p> : null}
    </div>
  );
}

export default SignInUp;
