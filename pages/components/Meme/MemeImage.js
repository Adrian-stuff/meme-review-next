import React from "react";

const MemeImage = ({ postLink, img }) => {
  return (
    <div className="flex mt-2 justify-center inset-0">
      <a href={postLink} target="_blank" rel="noreferrer">
        <div style={{ maxHeight: "512px", margin: "0 auto" }} className="flex">
          <img
            src={img}
            alt="Loading..."
            style={{ maxHeight: "512px", margin: "0 auto" }}
          />
        </div>
      </a>
    </div>
  );
};

export default MemeImage;
