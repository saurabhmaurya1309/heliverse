// components/TimetableForm.js

import React, { useState } from 'react';
import axios from '../services/axios';
import Input from '../components/Input'; 
import Button from '../components/Button';

const TimetableForm = ({ classroomId }) => {
    console.log(classroomId);
    
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [day, setDay] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`timetable/${classroomId}/timetable`, { subject, startTime, endTime, day });
      setSuccess('Timetable created successfully');
      setSubject('');
      setStartTime('');
      setEndTime('');
      setDay('');
    } catch (err) {
      setError('Failed to create timetable');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Timetable</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <Input label="Start Time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        <Input label="End Time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        <Input label="Day" type="text" value={day} onChange={(e) => setDay(e.target.value)} required />
        <Button type="submit">Create Timetable</Button>
      </form>
    </div>
  );
};

export default TimetableForm;
