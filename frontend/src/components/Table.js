import React from 'react';

const Table = ({ headers, data }) => (
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="py-2">{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {Object.values(row).map((cell, cellIndex) => (
            <td key={cellIndex} className="border px-4 py-2">{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
