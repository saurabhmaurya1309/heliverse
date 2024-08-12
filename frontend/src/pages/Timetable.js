import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await axios.get('/timetable');
        setTimetable(res.data);
      } catch (err) {
        console.error('Failed to fetch timetable', err);
      }
    };

    fetchTimetable();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Timetable</h2>
      <ul>
        {timetable.map((entry) => (
          <li key={entry._id}>
            {entry.subject} - {entry.startTime} to {entry.endTime} on {entry.day}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timetable;
