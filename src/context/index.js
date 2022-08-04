import DataContext from "./DataContext";

import React, { useState } from "react";

const DataProvider = (props) => {
  const [updateData, setUpdateData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const dummyData = [
    {
      checkBoxOptions: [("reading", "dance")],
      email: "fefutemaby@mailinator.com",
      name: "Ezra Love",
      radioOptions: "paidevent",
      selectOptions: ["reactjs", "javascript"],
      uploadfilee: {
        webkitRelativePath: "",
        type: "image/jpeg",
        size: 253773,
        name: "iamge.jpg",
      },
      user_id: "id8f6d89c8b9b26",
      imageUrl :"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/surprising-flower-meanings-balloon-flowers-1650767465.jpg"
    },
    {
      checkBoxOptions: ["reading", "cricket", "music"],
      email: "fakyqenac@mailinator.com",
      name: "Ruth Spencer",
      radioOptions: "paidevent",
      selectOptions: ["reactjs", "nodejs"],
      uploadfilee: {
        webkitRelativePath: "",
        type: "image/jpeg",
        size: 3541,
        name: "dwnld.jfif",
      },
      user_id: "id51f5a33290b79",
      imageUrl :"https://images.pexels.com/photos/7091903/pexels-photo-7091903.jpeg?cs=srgb&dl=pexels-juan-martin-lopez-7091903.jpg&fm=jpg"
    },
  ];
  const [data, setData] = useState(dummyData);
  const [selectFile, setSelectFile] = useState();
  const [preview, setPreview] = useState();
  
  return (
    <DataContext.Provider
    value={{ isEdit, setIsEdit, data, setData, updateData, setUpdateData,selectFile,setSelectFile,preview,setPreview, dummyData }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
