import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../../services/graphql';
import { useAuth } from '../Authentication/AuthContext'; // Assuming you have the useAuth hook

const Login = () => {
  const { dispatch } = useCart();
  const { login } = useAuth(); // Import the login function from the AuthContext
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [getUser, { loading }] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      const user = data.getUser;
      if (user) {
        dispatch({ type: 'SET_CART', payload: { cart: user.cartItems } });
        dispatch({ 
          type: 'SET_USER', 
          payload: { 
            user: { 
              userName: user.userName, 
              userId: user.userId,
              password: user.password,
            } 
          }
        });
        dispatch({ type: 'SET_ORDERS', payload: { orders: user.orders } });
        login(); // Call the login function upon successful authentication
      } else {
        setError('Invalid username or password');
      }
    },
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    getUser({ variables: { userName, password } });
  };

  return (
    <div className='center-form'>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Login</p>
        <p className="message">Login now and get full access to our app.</p>

        <label>
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            required
          />
        </label>

        <label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="submit" type="submit" disabled={loading}>Submit</button>
        <p className="signin">Don't have an account? <Link to='/'>SignUp</Link></p>
      </form>
    </div>
  );
};

export default Login;
