// src/pages/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios';
import Input from '../components/Input';
import Button from '../components/Button';
 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      
      // Determine the role and navigate accordingly
      const userRes = await axios.get('/auth/me', { headers: { Authorization: `Bearer ${res.data.token}` } });
      const role = userRes.data.role;
      
      if (role === 'Principal') {
        navigate('/dashboard/principal');
      } else if (role === 'Teacher') {
        navigate('/dashboard/teacher');
      } else if (role === 'Student') {
        navigate('/dashboard/student');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
