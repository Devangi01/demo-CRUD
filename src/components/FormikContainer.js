import React, { useState, useContext, useEffect } from "react";
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
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function FormikContainer({ isEdit, ...props }) {
  let navigate = useNavigate();
  const location = useLocation();

  const [crop, setCrop] = useState({
    x:  35.26, 
    y:  35.33,
    unit: "%",
    width: 30,
    height:30,
    aspect: 1 / 1,
  });
  const [imageResult, setImageResult] = useState(null);

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

  let initialValues = isEdit
    ? { ...updateData}
    : {
        name: "",
        email: "",
        selectOptions: [],
        radioOptions: "",
        checkBoxOptions: "",
        uploadfilee: "",
        imageUrl : "",
      };
      if (location?.state?.id && isEdit) {
        let index = data.findIndex(
          (value) => value?.user_id === location?.state?.id
        );
        initialValues = { ...data[ index < 0 ? 0 : index ] };
      }

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

    if (file && file.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageResult(reader.result);
        reader.readAsDataURL(file);
      });
    }
    const objectURL = URL.createObjectURL(file);
    setPreview(objectURL);
  };

   const makeCroppedImage =async ()=>{
    const uploadImage = document.getElementById("uploadImage");
    if(uploadImage && crop.width && crop.height)
    {
      const croppedImageURL = await getCroppedImage(
        uploadImage,
        crop,
        selectFile.name
      );
      setImageResult(croppedImageURL);
    }
    
  }

  const getCroppedImage=(image,crop,fileName)=>{
    console.log("croppedimage",crop);
    const canvas = document.createElement("canvas");
    const pixelsRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelsRatio * scaleX;
    canvas.height = crop.height * pixelsRatio * scaleY;
    ctx.setTransform(pixelsRatio,0,0,pixelsRatio,0,0);
    ctx.imageSmoothingQuality = "high";
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;

          console.log("blob",blob)
          setSelectFile(blob);
          const fileUrl = window.URL.createObjectURL(blob);
          resolve(fileUrl);
        },
        "image/jpeg",
        1
      );
    });

  }
  const onSubmit = (values, { setSubmitting }) => {
    const user_id = "id" + Math.random().toString(16).slice(2);
    const newData = { ...values, user_id,imageUrl : imageResult ? imageResult : preview };

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

  return (
    <Formik {...props} {...{ onSubmit, initialValues, validationSchema }}>
      {(formik) => (
        <Form>
          <h1>Event form</h1>
          <Label htmlFor="fullName" value="Name" id="fullName" />
          <Input type="text" name="name" />

          <Label htmlFor="fullName" value="Email" id="fullName" />
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
            accept="image/*"
            onChange={(e) => {
              formik.setFieldValue("uploadfilee", e.target.files[0]);
              setSelectFile(e.target.files[0]);
              previewData(e.target.files[0]);
            }}
          />

          {selectFile && (
            <React.Fragment>
              <ReactCrop
                src={preview}
                crop={crop}
                onImageLoaded={setSelectFile}
                onChange={setCrop}
                onComplete={makeCroppedImage}
              >
               <Image
                  src={preview}
                  alt="no preview available"
                  id="uploadImage"
                  height = "400px"
                  width = "350px"
                /> 
              </ReactCrop>
            </React.Fragment>
          )}

          {imageResult && <div className="form-label"><Image src={imageResult} id="croppedImage" alt="new cropped image" /></div>}
          <Button
            type="submit"
            className="btn btn-primary mx-2"
            name={`${isEdit ? "Update" : "Submit"} `}
          />
          <Button
          className="btn btn-danger"
          type="button"
          name="Cancel"
          handleOnClick={() => {
            navigate("/data");
          }}
        />
        </Form>
      )}
    </Formik>
  );
}
export default FormikContainer;
