import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('/auth/student-list');
        setStudents(res.data);
      } catch (error) {
        setError('Failed to fetch students');
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Students List</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Name
              </th>
              <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Email
              </th>
              <th className="px-6 py-4 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Assigned Classroom
              </th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{student.name}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{student.email}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{student.classroom || 'Not Assigned'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 border-b border-gray-200 text-center text-gray-500" colSpan="3">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
