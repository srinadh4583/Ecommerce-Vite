import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../services/graphql';
import Login from './Login'; // Import your Login component

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const navigate = useNavigate(); // Access the navigate function

  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    onCompleted: () => {
      setIsSignupSuccessful(true);
      // Redirect to login page after successful signup
      navigate('/login');
    },
    onError: (error) => {
      console.error('Error signing up:', error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    addUser({ variables: { userName, password } });
  };

  return (
    <div className='center-form'>
      {isSignupSuccessful ? (
        <Login />
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register </p>
          <p className="message">Signup now and get full access to our app. </p>

          <label>
            <input className="input" type="email" placeholder="" required value={userName} onChange={(e) => setUserName(e.target.value)} />
            <span>Email</span>
          </label>

          <label>
            <input className="input" type="password" placeholder="" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <span>Password</span>
          </label>
          <label>
            <input className="input" type="password" placeholder="" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <span>Confirm password</span>
          </label>
          <button className="submit" type="submit" disabled={loading}>
            Submit
          </button>
          {error && <p className="error">Error: {error.message}</p>}
          <p className="signin">
            Already have an account? <NavLink to='/login'>Log In</NavLink>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUp;
