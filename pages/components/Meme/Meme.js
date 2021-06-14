import React from "react";
import MemeImage from "./MemeImage";
import Caption from "./Caption";
const Meme = ({ data }) => {
  return data ? (
    <div className="container p-3 m-2 ring-1 dark:ring-gray-600 ring-gray-400 rounded-lg">
      <Caption
        title={data.title}
        author={data.author}
        subreddit={data.subreddit}
      />

      <MemeImage postLink={data.postLink} img={data.img} />
    </div>
  ) : (
    <h1 className="text-center mx-8">Start by requesting a meme</h1>
  );
};

export default Meme;
