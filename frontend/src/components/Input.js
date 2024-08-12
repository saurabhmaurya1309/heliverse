import React from 'react';

const Input = ({ label, type = 'text', value, onChange, required = false }) => (
  <div className="mt-4">
    <label className="block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg"
      required={required}
    />
  </div>
);

export default Input;
