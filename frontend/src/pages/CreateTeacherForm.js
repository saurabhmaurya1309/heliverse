import React, { useState } from 'react';
import axios from '../services/axios';
import Input from '../components/Input';
import Button from '../components/Button';

const CreateTeacherForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {               
      await axios.post('auth/create-teacher', { name, email, password });
      setSuccessMessage('Teacher account created successfully');
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      setErrorMessage('Failed to create teacher account');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Create Teacher Account</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit">Create Teacher</Button>
      </form>
    </div>
  );
};

export default CreateTeacherForm;
