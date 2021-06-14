import React from "react";
import Spinner from "./Spinner";
const Loading = ({ text }) => {
  return (
    <div className="flex my-10 justify-center items-center text-3xl dark:text-gray-400">
      {text}
      <Spinner />
    </div>
  );
};

export default Loading;
