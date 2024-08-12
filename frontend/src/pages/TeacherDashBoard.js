import React, { useState, useEffect } from 'react';
import StudentsList from './StudentsList1';
import TimetableForm from './TimetableForm';
import CreateStudentForm from './CreateStudentForm';
import axios from '../services/axios';
import AssignStudentsForm from './AssignStudentsForm';

const TeacherDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('students');
  const [classroom, setClassroom] = useState(null);
  console.log("classroom",classroom._id);
  

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const res = await axios.get('/classrooms/classroom');
        setClassroom(res.data);
      } catch (err) {
        console.error('Failed to fetch classroom', err);
      }
    };

    fetchClassroom();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Teacher Dashboard</h1>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-6 py-3 rounded-lg font-semibold text-lg focus:outline-none transition-colors duration-300 
            ${selectedTab === 'students' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          onClick={() => setSelectedTab('students')}
        >
          Manage Students
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold text-lg focus:outline-none transition-colors duration-300 
            ${selectedTab === 'timetable' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          onClick={() => setSelectedTab('timetable')}
        >
          Manage Timetable
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold text-lg focus:outline-none transition-colors duration-300 
            ${selectedTab === 'create-student' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          onClick={() => setSelectedTab('create-student')}
        >
          Create Student
        </button>
        <button 
          className={`px-6 py-3 rounded-lg shadow-md ${selectedTab === 'assign-students' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setSelectedTab('assign-students')}
        >
          Assign Students
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {selectedTab === 'students' && classroom && (
          <StudentsList classroomId={classroom._id} />
        )}

        {selectedTab === 'timetable' && classroom && (
          <TimetableForm classroomId={classroom._id} />
        )}

        {selectedTab === 'create-student' && classroom && (
          <CreateStudentForm classroomId={classroom._id} />
        )}
        {selectedTab === 'assign-students' && (
          <AssignStudentsForm/>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
