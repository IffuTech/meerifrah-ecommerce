import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import axios from "axios";

const EditAddress = () => {
  const [data, setData] = useState("");
  const params = useParams();

 const getAdress = async () => {
    const res = await axios.get(`http://localhost:8000/address/getaddress`, {
      headers: {
        Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
      },
    });
    // console.log("adress''''", res.data.userAddress.address)
    setData(res.data.userAddress.address[0]);

  };
 
  useEffect(() => {
    getAdress();
    EditProduct();
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log(isLoggedIn);
  }, []);


  const EditProduct = async (e) => {
    debugger;
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", data.name);
    formData.append("lastName", data.mobileNumber);
    formData.append("email", data.pinCode);
    formData.append("locality", data.locality);
    formData.append("address", data.address);
    formData.append("cityDistrictTown", data.cityDistrictTown);
    formData.append("state", data.state);
    formData.append("landmark", data.landmark);
    formData.append("alternatePhone", data.alternatePhone);

   
    console.log("formdata in if ", formData);


    
    // for (var key of formData.entries()) {
    //   console.log("loop", key[0] + ", " + key[1]);
    // }

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    console.log("dat is ", data);

    axios
      .patch(`http://localhost:8000/address/${params.id[0]}`, formData, config)
      .then((res) => {
        console.log("patch adress======================== ", res);
      })
      .catch((error) => {
        console.log(error);
      });
    //   navigate("/");
    alert("success")

  };

 

  return (
    <div className="container">
 <div className="edit_adress_form mt-4 p-4">
<form className="" onSubmit={EditProduct}>
 <h3 className="text-center text-decoration-underline">Edit Adress Detail</h3>
  <div className="row mt-4">
    <div className="col-md-6">
      <label class="form-label">name</label>
      <input
        type="text"
        value={data.name}
        className="form-control"
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">mobileNumber</label>
      <input
        type="text"
        value={data.mobileNumber}
        className="form-control"
        onChange={(e) => setData({ ...data, lastName: e.target.value })}
      />
    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
      <label class="form-label">pinCode</label>
      <input type="text" value={data.pinCode} className="form-control" 
      onChange={(e) => setData({ ...data, pinCode: e.target.value })}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">locality</label>
      <input
        type="text"
        value={data.locality}
        className="form-control"
        onChange={(e) => setData({ ...data, locality: e.target.value })}
      />
    </div>
  </div>
  <div className="row mb-4">
    <div className="col-md-6">
      <label class="form-label">address</label>
      <textarea
        type="text"
        value={data.address}
        placeholder="9906"
        className="form-control"
       onChange={(e) => setData({ ...data, address: e.target.value })}
      />
    </div>
  </div>
  <div className="row">
  <div className="col-md-6">
    <label class="form-label">cityDistrictTown</label>
    <input type="text" value={data.cityDistrictTown} className="form-control" 
    onChange={(e) => setData({ ...data, cityDistrictTown: e.target.value })}
    />
  </div>
  <div className="col-md-6">
    <label className="form-label"> state</label>
    <input
      type="text"
      value={data.state}
      className="form-control"
      onChange={(e) => setData({ ...data, state: e.target.value })}
    />
  </div>
</div>
<div className="row">
<div className="col-md-6">
  <label class="form-label">landmark</label>
  <input type="text" value={data. landmark} className="form-control" 
  onChange={(e) => setData({ ...data, landmark: e.target.value })}
  />
</div>
<div className="col-md-6">
  <label className="form-label"> alternatePhone</label>
  <input
    type="text"
    value={data. alternatePhone}
    className="form-control"
    onChange={(e) => setData({ ...data,  alternatePhone: e.target.value })}
  />
</div>
</div>
  <button type="submit" className="btn btn-success mt-4">
   Save Adress
  </button>
</form>
</div>
          

   
    </div>
  );
};

export default EditAddress;
