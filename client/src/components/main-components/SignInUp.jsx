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
    setError(null);
    axios
      .post('/auth/register_login', {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        navigate('/admin');
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
          type='password'
          placeholder='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type='button' onClick={handleSubmit} value='Submit' />
        {error ? <p className='input-error'>{error}</p> : null}
      </div>
    </div>
  );
}

export default SignInUp;
