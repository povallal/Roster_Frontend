import React, { useState } from 'react';
import '../Styles/Login.css';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { variables } from '../Admin/apiConfig';
import {jwtDecode} from 'jwt-decode';


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

          console.log("User Token",Message)
          const decodedToken = jwtDecode(Message);
         
          const userRole = decodedToken["roles"];
          
          console.log("User Role",userRole);
          
          // Dynamically set the navigation path based on user role
          let navigationPath = '/';
            switch(userRole) {
              case 'Admin':
                sessionStorage.setItem('ADMIN_TOKEN', Message);
                navigationPath = '/admin-dashboard'; // Example path for Admin
                break;
              case 'ChiefConsultant':
                sessionStorage.setItem('CHIEF_CONSULTANT_TOKEN', Message);
                navigationPath = '/chief-consultant-dashboard';
                break;
              // Add other cases as needed
              case 'Consultant' :
                sessionStorage.setItem('CONSULTANT_TOKEN', Message);
                navigationPath = '/consultant-dashboard'; 
                 break;
              case 'MedicalOfficer':
                sessionStorage.setItem("MEDICAL_OFFICER_TOKEN",Message);
                navigationPath = '/medical-officer-dashboard';
                break;
              default:
                alert("Role not recognized. Defaulting to home.");
                break;
              
              }

          // Navigate to the determined path
          navigate(navigationPath);
          setIsAuthenticated(true);
          alert(Status);
        
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
