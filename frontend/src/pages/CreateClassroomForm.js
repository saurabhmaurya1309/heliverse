import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import Input from '../components/Input';
import Button from '../components/Button';

const CreateClassroomForm = () => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await axios.get('auth/teacher-list');
      setTeachers(res.data);
    };
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/classrooms/create', { name, startTime, endTime, days, teacherId });
      setSuccessMessage('Classroom created successfully');
      setName('');
      setStartTime('');
      setEndTime('');
      setDays('');
      setTeacherId('');
    } catch (error) {
      setErrorMessage('Failed to create classroom');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Create Classroom</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Classroom Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Start Time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        <Input label="End Time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        <Input label="Days (e.g., Monday-Saturday)" type="text" value={days} onChange={(e) => setDays(e.target.value)} required />
        <div className="mb-4">
          <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">Assign Teacher</label>
          <select id="teacher" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
            ))}
          </select>
        </div>
        <Button type="submit">Create Classroom</Button>
      </form>
    </div>
  );
};

export default CreateClassroomForm;
