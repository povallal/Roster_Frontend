import React, { useState } from 'react';
import '../Styles/Login.css';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { variables } from '../Admin/apiConfig';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const data = {
      email: username, // Use the correct property name
      password: password,
    };
    const headers = {
      'Content-Type': 'application/json',
    }
  
    try {
      const response = await axios.post(variables.API_URL + 'account/login', data, { headers });
  
      if (response.status === 200) {
        // Login successful
        const { Status, Message, Errors } = response.data;
        if (Status === 'Success') {
          // Save token in session storage
          sessionStorage.setItem('ADMIN_TOKEN', Message);
          // Redirect to '/all-shifts' page
          setIsAuthenticated(true);
          alert(Status);
          navigate('/all-shifts');
        } else {
          // Handle other successful login scenarios or display appropriate message
          console.error('Unexpected response from server:', response.data);
          alert(Errors);
        }
      } else {
        // Handle other HTTP status codes
        console.error('Unexpected HTTP status code:', response.status);
        alert(response.status);
      }

    } catch (error) {
      // Handle login error
      console.error('An error occurred during login:', error);
      alert(error);
      // Check if the error is related to invalid credentials
      if (error.response && error.response.status === 400) {
        // Display alert for invalid credentials
        alert('Invalid email or password.');
      } else {
        // Handle other errors
        console.error('An unexpected error occurred during login:', error);
        alert(error);
      }
    }
  }
  

  return (
    <div className="login-container">
      <h1 id="text1">ROSTER</h1>
      <h2 id="text2"> Management System</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>LOGIN</button>
      </div>
    </div>
  );
};

export default Login;
