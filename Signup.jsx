import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Client, Account, ID } from "appwrite";
import './home.css';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For displaying messages

  const handleRegister = (e) => {
    e.preventDefault(); // Prevents the default form submission

    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('66b2699f003e24b1712e'); // Your project ID

    const account = new Account(client);

    // Create a user with a unique ID, email, and password
    const promise = account.create(ID.unique(), email, password);

    promise.then(
      function (response) {
        console.log('Registration Successful:', response);
        setMessage('Registration successful!'); // Set success message
      },
      function (error) {
        console.log('Registration Error:', error);
        setMessage('Registration failed. Please try again.'); // Set error message
      }
    );
  };

  return (
    <div id="main">
      <div className="card">
        <h2>Fill the details to Signup</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit" className="btn">Register</button>
        </form>
        {message && (
          <div className={`message ${message.includes('failed') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
        <div className="register-link">
          <p>If you registered successfully, </p>
          <br />
          <span><Link to="/">Login!</Link></span>
        </div>
      </div>
    </div>
  );
}

export default Home;
