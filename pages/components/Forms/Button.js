import React from "react";
const Button = ({ type, onClick, text, cN, aCN, disabled }) => {
  return (
    <div
      className={`${aCN} flex w-auto justify-center items-center select-none`}
    >
      <button
        type={type}
        onClick={onClick || "button"}
        className={`${cN} disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700 dark:bg-gray-800 hover:bg-gray-300  bg-gray-200 dark:text-gray-400 text-black rounded-lg inline-flex items-center justify-center py-1 px-2 slowOut focus:outline-none border-2 border-transparent focus:border-gray-600 text-sm font-semibold`}
        disabled={disabled || false}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
