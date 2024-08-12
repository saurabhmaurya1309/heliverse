// components/AssignStudentsForm.js

import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import Button from '../components/Button';

const AssignStudentsForm = () => {
  const [studentIds, setStudentIds] = useState([]);
  const [classroomId, setClassroomId] = useState('');
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchStudentsAndClassrooms = async () => {
      try {
        const [studentsRes, classroomsRes] = await Promise.all([
          axios.get('auth/student-list'),
          axios.get('/classrooms')
        ]);
        setStudents(studentsRes.data);
        setClassrooms(classroomsRes.data);
      } catch (error) {
        setErrorMessage('Failed to fetch data');
      }
    };
    fetchStudentsAndClassrooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/classrooms/assign-students', { studentIds, classroomId });
      setSuccessMessage('Students assigned to classroom successfully');
      setStudentIds([]);
      setClassroomId('');
    } catch (error) {
      setErrorMessage('Failed to assign students');
    }
  };

  const handleStudentChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setStudentIds(value);
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Assign Students to Classroom</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="students" className="block text-sm font-medium text-gray-700">Select Students</label>
          <select id="students" multiple value={studentIds} onChange={handleStudentChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {students.map((student) => (
              <option key={student._id} value={student._id}>{student.name}</option>
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
        <Button type="submit">Assign Students</Button>
      </form>
    </div>
  );
};

export default AssignStudentsForm;
