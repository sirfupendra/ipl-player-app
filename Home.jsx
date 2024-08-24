import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Client, Account } from "appwrite";
import './home.css';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66b2699f003e24b1712e');

const account = new Account(client);

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Log out any existing session
    account.deleteSessions().then(
      () => {
        // Create session after logging out
        account.createEmailPasswordSession(email, password).then(
          function (response) {
            console.log('Login Successful:', response);
            setMessage('Login successful!');
            navigate('/Dashboard');
          },
          function (error) {
            console.log('Login Error:', error);
            setMessage('Login failed. Please check your email and password.');
          }
        );
      },
      (error) => {
        console.log('Error logging out previous sessions:', error);
      }
    );
  };

  return (
    <div id="main">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        {message && (
          <div className={`message ${message.includes('failed') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
        <div className="register-link">
          <p>Don't have an account?</p>
          <br />
          <p><Link to="/Signup">Register Now!</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Home;
