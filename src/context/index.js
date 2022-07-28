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
    },
  ];
  const [data, setData] = useState(dummyData);
  const [selectFile, setSelectFile] = useState();
  const [preview, setPreview] = useState();
  
  return (
    <DataContext.Provider
    value={{ isEdit, setIsEdit, data, setData, updateData, setUpdateData,selectFile,setSelectFile,preview,setPreview }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
