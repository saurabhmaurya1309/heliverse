import React, { useEffect, useState } from 'react';
import StudentsList from './StudentsList';
import Timetable from './Timetable';
import axios from '../services/axios';

const StudentDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('students');
  const [classroom, setClassroom] = useState(null); // Store the teacher's classroom

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const res = await axios.get('/classrooms/classroom');
        console.log(res.data);
        
        setClassroom(res.data);
        console.log(classroom);
        
      } catch (err) {
        console.error('Failed to fetch classroom', err);
      }
    };

    fetchClassroom();
  },[]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 ${selectedTab === 'students' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('students')}
        >
          View Classmates
        </button>
        <button
          className={`px-4 py-2 ${selectedTab === 'timetable' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('timetable')}
        >
          View Timetable
        </button>
      </div>

      {selectedTab === 'students' && <StudentsList/>}
      {selectedTab === 'timetable' && <Timetable />}
    </div>
  );
};

export default StudentDashboard;
