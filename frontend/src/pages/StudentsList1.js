import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const StudentsList = ({ classroomId }) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`/classrooms/${classroomId}/students`);
        setStudents(res.data);
      } catch (error) {
        setError('Failed to fetch students');
      }
    };

    fetchStudents();
  }, [classroomId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Students in Your Classroom</h2>
      {error && <p className="text-red-600 text-lg mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {students.map((student) => (
              <tr key={student._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
