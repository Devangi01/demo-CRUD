import React from "react";

import "react-image-crop/dist/ReactCrop.css";


const Image = ({ src, alt, ...rest }) => {
  const imageStyle = {
    height: "300px",
    width: "300px",
  };

  return (
      <img src={src} alt={alt} {...rest}  />
  );
};

export default Image;
