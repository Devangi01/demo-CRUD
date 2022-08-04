import React from "react";
import { ErrorMessage } from "formik";
import TextError from "./TextError";

function File( { label, name,value, ...rest}) {
  return (
    <div className="formlabel">
      
      <input {...{name, id:name}} {...rest} />
      <p>{value}</p>
      <ErrorMessage {...{name}} component={TextError}/>
    </div>
  );
}   

export default File;
