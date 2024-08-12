// components/ClassroomsList.js

import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const ClassroomsList = () => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      const res = await axios.get('/classrooms');
      setClassrooms(res.data);
    };
    fetchClassrooms();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Classrooms</h2>
      <ul>
        {classrooms.map((classroom) => (
          <li key={classroom._id} className="mb-2">
            <div className="font-semibold">
              {classroom.name} - {classroom.startTime} to {classroom.endTime} on {classroom.days.join(', ')}
            </div>
            <div className="text-sm text-gray-600">
              Teacher: {classroom.teacher ? classroom.teacher.name : 'Not Assigned'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassroomsList;
