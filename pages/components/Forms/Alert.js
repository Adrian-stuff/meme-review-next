import React from "react";

const Alert = ({ title, message, isShowed }) => {
  return (
    <div
      className={`${
        !isShowed && "hidden"
      } relative px-4 py-3 my-2 slowOut leading-normal text-red-700 bg-red-300 rounded-lg`}
      role="alert"
    >
      <span className="absolute inset-y-0 left-0 flex items-center ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </span>
      <p className="ml-6">{message}</p>
    </div>
  );
};

export default Alert;
