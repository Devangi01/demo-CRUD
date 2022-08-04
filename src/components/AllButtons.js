import React from "react";

const Button = ({ className, type, name ,handleOnClick,...rest}) => (

    <button {...{className,type,onClick:handleOnClick}} {...rest}>
      {name}
    </button>
  
);
export default Button;