import React, { useState } from 'react';
import Dashboard from './Dashboard';

const Login = () => {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setMessage('Login successful');
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred');
    }
  };
  return (
    <div>
         <h1>Login</h1>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>

      { message !=='Login successful' ? null : <Dashboard/>}
    </div>
  )
}

export default Login
