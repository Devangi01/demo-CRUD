import React from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";

import FormikControl from "./FormikControl"
function Reg() {
  const options = [
    { key: "Email", value: "emailMoc" },
    { key: "Telephone", value: "telephoneMoc" },
  ];
  const initialValues = {
    name: "",
    email: "",
    password: "",
    modeofcontact: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    modeofcontact: Yup.string().required("Required"),
    phone: Yup.string().when("modeofcontact", {
      is: "telephoneMoc",
      then: Yup.string().required("Required"),
    }),
  });
  const onSubmit = (values) => {
    console.log("form data", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
            />
            <FormikControl
              control="radio"
              label="Mode of contact"
              name="modeOfContact"
              options={options}
            />
            <FormikControl
              control="input"
              type="text"
              label="Phone number"
              name="phone"
            />
            <button type="submit" disabled={!formik.isValid} >Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Reg;
