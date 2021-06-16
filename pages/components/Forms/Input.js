import React from "react";

const Input = ({
  cN,
  aCN,
  placeholder,
  children,
  value,
  onChange,
  required,
}) => {
  return (
    <div
      className={`${aCN} w-full flex flex-row justify-around  slowInOut focus-within:ring-2 focus:ring-blue-600 items-center dark:bg-gray-800 dark:ring-gray-600 ring-1 ring-gray-400  rounded-lg`}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${cN} flex-grow outline-none bg-transparent p-2 dark:text-gray-200 placeholder-gray-600 select-none`}
        required={required || false}
      />
      {children}
    </div>
  );
};

export default Input;
