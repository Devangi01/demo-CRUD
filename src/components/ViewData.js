import React, { useContext,useState } from "react";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import Button from "./AllButtons";
import Image from "./Image";


function ViewData() {
  let navigate = useNavigate();
  const { data, setData, setIsEdit, setUpdateData, setSelectFile, setPreview } =
    useContext(DataContext);
    const [isShowModal, setIsShowModal] = useState(false);

  const editOnClick = (id) => {
    setIsEdit(true);
    const index = data?.findIndex((value) => value?.user_id === id);
    const editData = data[index];
    setUpdateData({ ...editData });
    navigate(`/edit-user/${id}`, { state: { id } });
  };
  

  const handleDelete = (id) => {
    var msj='Are you sure that you want to delete?';
   if (!window.confirm(msj)) { 
      return false;
   } else {
    const filterData = data.filter((item) => item.user_id !== id);
    setData(filterData);
   }
   
  };

  return (
    <div className="container">
      {isShowModal && console.log(isShowModal)}
      <Button
        type="button"
        name="ADD NEW DATA"
        className="btn btn-primary my-2"
        handleOnClick={() => {
          setIsEdit(false);
          navigate("/add-user");
          setPreview(undefined);
          setSelectFile(undefined);
        }}
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Select a topic</th>
            <th scope="col">Payment</th>
            <th scope="col">Hobbies</th>
            <th scope="col">Email</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.selectOptions.join(",")}</td>
                <td>{item.radioOptions}</td>
                <td>{item.checkBoxOptions.join(",")}</td>
                <td>{item.email}</td>
                <td><Image src={item.imageUrl} height="100px" width="100px" alt="no preview" /></td>
                <td>
                  <Button
                    type="button"
                    name="Update"
                    className="btn btn-primary mb-2"
                    handleOnClick={() => {
                      editOnClick(item.user_id);
                    }}
                  />
                  <Button
                    type="button"
                    name="Delete"
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                    className="btn btn-danger"
                    handleOnClick={() => handleDelete(item.user_id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewData;
