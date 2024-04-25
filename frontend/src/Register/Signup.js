import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from "axios"

const Signup = () => {
  const [firstName, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailError, setEmailError] = useState('')
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNumber: contactNumber,
      password: password,
      username:username
    };
    if (
      firstName.length == 0 ||
      lastName.length == 0 ||
      email.length == 0 ||
      contactNumber.length == 0 ||
      password.length == 0||
      username.length===0
    ) {
      setError(true);
    }    
    else{
      setError(false);
      
      let url = `http://localhost:8000/user/register`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      alert("Registration Successfull !!!!");
      // navigate("/")
    }
    
  };

//   handleOnChange = ({currentTarget}) => {
//     axios.get(`/url/${currentTarget.value}`).then(({data1}) => {
//        console.log("data111111111",data1)
//     })
// }

  return (
    <div className="reg_form">
      <h2>Register here</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter First Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {error && firstName.length <= 0 ? <span>Enter Name </span> : ""}
        <div className="mb-3 mt-3">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Last Name"
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
        {error && lastName.length <= 0 ? <span>Enter Last Name </span> : ""}
        <div className="mb-3 mt-3">
          <label className="form-label">username:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Last Name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {error && username.length <= 0 ? <span>Enter username </span> : ""}

        <div className="mb-3 mt-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            // onChange={handleOnChange}
          />
        </div>
        {error && email.length <= 0 ? <span>Enter email adress </span> : ""}


        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && password.length <= 0 ? <span>Enter password </span> : ""}

        <div className="mb-3">
          <label className="form-label">contactNumber :</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Phone contactNumber"
            onChange={(e) => setcontactNumber(e.target.value)}
          />
        </div>

        <div className="pt-3">
           
          <button type="submit" className="btn btn-primary" >
            Submit
          </button>
          {/* {error ? <span>Fill the above fields</span> : ""} */}
          <span>{emailError}</span>
        </div>
        <div className="already_account text-center">
          <label>
            Already have an account, <NavLink to="/login">Login</NavLink>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Signup;
