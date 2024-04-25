import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState("");
  const params = useParams();

  const getUser = async () => {
    const res = await axios.get(`http://localhost:8000/user/${params.id}`);
    console.log("user.dataaaaaaaaaaaaaaaaa", res.data);
    setData(res.data);
  };
 
  useEffect(() => {
    getUser();
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log(isLoggedIn);
  }, []);


  const EditProduct = async (e) => {
    debugger;
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    // formData.append("ContactNumber", data.ContactNumber);
   
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
      .patch(`http://localhost:8000/user/${params.id}`, formData, config)
      .then((res) => {
        console.log("resp of ADD PRODUCT ", res);
      })
      .catch((error) => {
        console.log(error);
      });
    //   navigate("/");
    alert("success")

  };

 

  return (
  <div className="container">

 <div className="profile mt-4">
<form className="" onSubmit={EditProduct}>
 <h2 className="text-center text-decoration-underline">Edit Your Detail</h2>
  <div className="row mt-4">
    <div className="col-md-6">
      <label class="form-label">firstName</label>
      <input
        type="text"
        value={data.firstName}
        className="form-control"
        onChange={(e) => setData({ ...data, firstName: e.target.value })}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">lastName</label>
      <input
        type="text"
        value={data.lastName}
        className="form-control"
        onChange={(e) => setData({ ...data, lastName: e.target.value })}
      />
    </div>
  </div>
  <div className="row">
    <div className="col-md-6">
      <label class="form-label">Email</label>
      <input type="email" value={data.email} className="form-control" 
      // onChange={(e) => setData({ ...data, email: e.target.value })}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">Password</label>
      <input
        type="password"
        value={data.password}
        className="form-control"
        // onChange={(e) => setData({ ...data, password: e.target.value })}
      />
    </div>
  </div>
  <div className="row mb-4">
    <div className="col-md-6">
      <label class="form-label">ContactNumber</label>
      <input
        type="tel"
        // value={data.ContactNumber}
        placeholder="9906"
        className="form-control"
      //  onChange={(e) => setData({ ...data, ContactNumber: e.target.value })}
      />
    </div>
  </div>

  <button type="submit" className="btn btn-success">
    submit
  </button>
</form>
</div>
          
</div>

   
  );
};

export default Profile;
