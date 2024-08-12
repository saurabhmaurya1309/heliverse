import React, { useState } from 'react';
import axios from '../services/axios';
import Input from '../components/Input';
import Button from '../components/Button';

const CreateStudentForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/create-student', { name, email, password });
      setSuccessMessage('Student account created successfully');
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      setErrorMessage('Failed to create student account');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Student Account</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit">Create Student</Button>
      </form>
    </div>
  );
};

export default CreateStudentForm;
