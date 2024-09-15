import React, { useState } from "react";

const InputField = ({ type, field, onInputChange }) => {
  // logic
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(value);
    onInputChange(name, value);
  };
  // view
  return (
    <input
      type={type}
      name={field}
      value={value}
      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
      className="block rounded-xl border border-gray-800 w-full bg-churead-gray-800 text-white placeholder-churead-gray-600 p-5"
      onChange={handleChange}
    />
  );
};

export default InputField;
