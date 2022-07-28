import React from "react";

const Button = ({ className, type, name ,handleOnClick}) => {
  return (
    <button className={className} type={type} onClick={handleOnClick}>
      {name}
    </button>
  );
};
export default Button;