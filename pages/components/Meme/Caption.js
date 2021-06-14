import React from "react";

const Caption = ({ title, author, subreddit }) => {
  return (
    <div className="mx-1">
      <div className="text-sm mx-2 font-light dark:text-gray-400 text-gray-800 ">
        <a
          href={`https://reddit.com/r/${subreddit}`}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          r/{subreddit}
        </a>{" "}
        &bull; Posted by{" "}
        <a
          href={`https://reddit.com/u/${author}`}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          u/{author}
        </a>
      </div>
      <h1 className="text-2xl font-semibold dark:text-gray-200 text-black pb-2">
        {title}
      </h1>
    </div>
  );
};

export default Caption;
