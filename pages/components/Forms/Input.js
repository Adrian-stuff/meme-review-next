import React from "react";

const Input = ({ cN, placeholder, children, value, onChange, required }) => {
  return (
    <div className={`${cN} w-64`}>
      <div className="flex flex-row w-full slowInOut focus-within:ring-2 focus:ring-blue-600 items-center dark:bg-gray-800 dark:ring-gray-600 ring-1 ring-gray-400  rounded-lg">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-grow outline-none bg-transparent p-2 max-w-md dark:text-gray-200 placeholder-gray-600 select-none"
          required={required || false}
        />
        {children}
      </div>
    </div>
  );
};

export default Input;
