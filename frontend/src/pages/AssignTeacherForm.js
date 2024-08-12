// components/AssignTeacherForm.js

import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import Button from '../components/Button';

const AssignTeacherForm = () => {
  const [teacherId, setTeacherId] = useState('');
  const [classroomId, setClassroomId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTeachersAndClassrooms = async () => {
      try {
        const [teachersRes, classroomsRes] = await Promise.all([
          axios.get('auth/teacher-list'),
          axios.get('/classrooms')
        ]);
        setTeachers(teachersRes.data);
        setClassrooms(classroomsRes.data);
      } catch (error) {
        setErrorMessage('Failed to fetch data');
      }
    };
    fetchTeachersAndClassrooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/classrooms/assign-teacher', { teacherId, classroomId });
      setSuccessMessage('Teacher assigned to classroom successfully');
      setTeacherId('');
      setClassroomId('');
    } catch (error) {
      setErrorMessage('Failed to assign teacher');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Assign Teacher to Classroom</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">Select Teacher</label>
          <select id="teacher" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="classroom" className="block text-sm font-medium text-gray-700">Select Classroom</label>
          <select id="classroom" value={classroomId} onChange={(e) => setClassroomId(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select Classroom</option>
            {classrooms.map((classroom) => (
              <option key={classroom._id} value={classroom._id}>{classroom.name}</option>
            ))}
          </select>
        </div>
        <Button type="submit">Assign Teacher</Button>
      </form>
    </div>
  );
};

export default AssignTeacherForm;
