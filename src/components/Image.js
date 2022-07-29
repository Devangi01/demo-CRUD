import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "./AllButtons";

const Image = ({ src, alt, onImageLoaded }) => {
  const imageStyle = {
    height: "100px",
    width: "100px",
  };

  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  return (
    <div className="formlabel">
      <ReactCrop onImageLoaded={onImageLoaded} crop={crop} onChange={setCrop}>
        <img src={src} {...{ alt }} style={imageStyle} />
      </ReactCrop>
    </div>
  );
};

export default Image;
