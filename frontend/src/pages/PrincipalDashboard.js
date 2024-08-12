import React, { useState } from 'react';
import CreateTeacherForm from './CreateTeacherForm';
import CreateStudentForm from './CreateStudentForm';
import CreateClassroomForm from './CreateClassroomForm';
import AssignTeacherForm from './AssignTeacherForm';
import AssignStudentsForm from './AssignStudentsForm';
import TeachersList from './TeachersList';
import StudentsList from './StudentsList';
import ClassroomsList from './ClassroomsList';

const PrincipalDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('teachers'); 

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">Principal Dashboard</h1>
      
      <div className="flex justify-center space-x-4 mb-10">
        <button 
          className={`px-6 py-3 rounded-lg shadow-md ${selectedTab === 'teachers' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setSelectedTab('teachers')}
        >
          Manage Teachers
        </button>
        <button 
          className={`px-6 py-3 rounded-lg shadow-md ${selectedTab === 'students' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setSelectedTab('students')}
        >
          Manage Students
        </button>
        <button 
          className={`px-6 py-3 rounded-lg shadow-md ${selectedTab === 'classrooms' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setSelectedTab('classrooms')}
        >
          Manage Classrooms
        </button>
        <button 
          className={`px-6 py-3 rounded-lg shadow-md ${selectedTab === 'assign-teacher' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setSelectedTab('assign-teacher')}
        >
          Assign Teacher
        </button>
        <button 
          className={`px-6 py-3 rounded-lg shadow-md ${selectedTab === 'assign-students' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setSelectedTab('assign-students')}
        >
          Assign Students
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {selectedTab === 'teachers' && (
          <>
            <CreateTeacherForm />
            <TeachersList />
          </>
        )}

        {selectedTab === 'students' && (
          <>
            <CreateStudentForm />
            <StudentsList />
          </>
        )}

        {selectedTab === 'classrooms' && (
          <>
            <CreateClassroomForm />
            <ClassroomsList />
          </>
        )}

        {selectedTab === 'assign-teacher' && (
          <AssignTeacherForm />
        )}

        {selectedTab === 'assign-students' && (
          <AssignStudentsForm />
        )}
      </div>
    </div>
  );
};

export default PrincipalDashboard;
