import React, { useState,useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import Checkbox from "./Checkbox";
import File from "./File";
import Radio from "./Radio";
import Select from "./Select";
import DataContext from "../context/DataContext";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./AllButtons";
import Label from "./Label";
import Image from "./Image";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

function FormikContainer({ isEdit, ...props }) {
  let navigate = useNavigate();
  const location = useLocation();

  const[crop, setCrop] = useState({ aspect: 16 / 9});

  const closeModal = () => {
    navigate("/data");
  };
  const {
    data,
    setData,
    updateData,
    selectFile,
    setSelectFile,
    preview,
    setPreview,
  } = useContext(DataContext);

  const FILE_SIZE = 1024 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const dropDown = [
    { key: "Select an option", value: "" },
    { key: "Java", value: "java" },
    { key: "Reactjs", value: "reactjs" },
    { key: "Nodejs", value: "nodejs" },
    { key: "Javascript", value: "javascript" },
  ];

  const radiOptions = [
    { key: "Paid Event", value: "paidevent" },
    { key: "Free Event", value: "freeevent" },
  ];

  const checkBoxOptions = [
    { key: "Reading", value: "reading" },
    { key: "Cricket", value: "cricket" },
    { key: "Music", value: "music" },
    { key: "Dance", value: "dance" },
  ];

  const initialValues = isEdit
    ? { ...updateData }
    : {
        name: "",
        email: "",
        selectOptions: [],
        radioOptions: "",
        checkBoxOptions: "",
        uploadfilee: "",
      };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    selectOptions: Yup.array()
      .min(1)
      .of(Yup.string().required())
      .required("Please Select Intrested Area!"),
    radioOptions: Yup.string().required("Required"),
    checkBoxOptions: Yup.array().required("Required"),
    uploadfilee: Yup.mixed()
      .required("Required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "only upload image with .jpg, .jpeg, .png format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  useEffect(() => {
    if (!selectFile) {
      setPreview(undefined);
      return;
    }

    if (isEdit) {
      setSelectFile(updateData.uploadfilee);
    }
    previewData(selectFile);
    // eslint-disable-next-line
  }, []);
 
  const previewData = (file) => {
    const objectURL = URL.createObjectURL(file);
    console.log("AdddSelectFile", file);
    setPreview(objectURL);
  };
  const onSubmit = (values, { setSubmitting }) => {
    const user_id = "id" + Math.random().toString(16).slice(2);
    const newData = { ...values, user_id };

    if (isEdit) {
      const index = data?.findIndex(
        (value) => value?.user_id === location?.state?.id
      );
      const cloneData = [...data];
      cloneData[index] = { ...newData };
      setData(cloneData);
      if (location.state.id >= 0) {
        data[location.state.id] = newData;
        setData(data);
      }
    } else {
      setData((data) => [...data, newData]);
    }
    navigate("/data");
  };
   const onLoad = (selectFile) => {
    
  }

  return (
    <Formik {...props} {...{ onSubmit, initialValues, validationSchema }}>
      {(formik) => (
        <Form>
          <h1>Event form</h1>
          <Label htmlFor="fullName" value="name" id="fullName" />
          <Input type="text" name="name" />

          <Label htmlFor="fullName" value="email" id="fullName" />
          <Input type="email" name="email" />

          <Label htmlFor="firstName" value="Select a topic" id="labelFName" />
          <Select name="selectOptions" options={dropDown} />

          <Label htmlFor="firstName" value="Payment" id="labelFName" />
          <Radio name="radioOptions" options={radiOptions} />

          <Label htmlFor="firstName" value="Hobbies" id="labelFName" />
          <Checkbox name="checkBoxOptions" options={checkBoxOptions} />

          <Label htmlFor="firstName" value="Upload file" id="labelFName" />
          <File
            type="file"
            name="uploadfilee"
            onChange={(e) => {
              formik.setFieldValue("uploadfilee", e.target.files[0]);
              setSelectFile(e.target.files[0]);
              previewData(e.target.files[0]);
            }}
          />
          {selectFile && 
            <Image src={preview} alt="no preview Available" onImageLoaded={setSelectFile} />
          }
         
          <Button
            type="submit"
            className="btn btn-primary mx-2"
            name={`${isEdit ? "Edit" : "Submit"} `}
          />
          <Button
            type="submit"
            className="btn btn-danger mx-2 "
            name="Cancel"
            handleOnClick={closeModal}
          />
        </Form>
      )}
    </Formik>
  );
}
export default FormikContainer;
