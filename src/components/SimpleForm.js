import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumber: ["", ""],
  phNumber: [""],
};

const onSubmit = (values) => {
  console.log("form data", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  channel: Yup.string().required("Required"),
});

function SimpleForm() {
  console.log("Visitedfields");
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="formlabel">
          <label htmlFor="name">Name: </label>
          <Field type="text" name="name" id="name" />
          <ErrorMessage name="name" component={TextError} />
        </div>
        <div className="formlabel">
          <label htmlFor="email">Email: </label>
          <Field type="email" name="email" id="email" />
          <ErrorMessage name="email">
            {(errormsg) => <div className="error">{errormsg}</div>}
          </ErrorMessage>
        </div>
        <div className="formlabel">
          <label htmlFor="channel">Channel: </label>
          <Field type="text" name="channel" id="channel" placeholder="name  " />
          <ErrorMessage name="channel" />
        </div>
        <div className="formlabel">
          <label htmlFor="comments">Comment: </label>
          <Field as="textarea" id="comments" name="comments" />
        </div>
        <div className="formlabel">
          <label htmlFor="address">Address: </label>
          <Field name="address">
            {(props) => {
              const { field, form, meta } = props;
              console.log("RenderProps", props);
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </Field>
        </div>
        <div className="formlabel">
          <label htmlFor="facebook">Facebook: </label>
          <Field name="social.facebook" type="text" id="facebook" />
        </div>
        <div className="formlabel">
          <label htmlFor="twitter">Twitter: </label>
          <Field name="social.twitter" type="text" id="twitter" />
        </div>
        <div className="formlabel">
          <label htmlFor="primaryPh">Contact number: </label>
          <Field name="phoneNumber[0]" type="text" id="primaryPh" />
        </div>
        <div className="formlabel">
          <label htmlFor="primaryPh">Mobile number: </label>
          <Field name="phoneNumber[1]" type="text" id="primaryPh" />
        </div>
        <div className="formlabel">
          <label htmlFor="primaryPh">List of phone number: </label>
          <FieldArray name= "phNumber">
          {
            (FieldArrayProps)=>{
              console.log("FieldArrayProps", FieldArrayProps);
              const{push, remove, form} = FieldArrayProps
              const {values} = form;
              const {phNumber} = values;
              return <div> {
                phNumber.map((phNumber, index) =>( 
                    <div key ={index}>
                      <Field name={`phNumber[${index}]`}/>
                      {
                        index > 0 && (
                          <button type= "button" onClick={()=>remove(index)}>-</button>
                        )
                      }
                    
                      <button type= "button" onClick={()=>push('')}>+</button>
                    </div>
                ))
              }

              </div>
            }
          }
          </FieldArray>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default SimpleForm;
