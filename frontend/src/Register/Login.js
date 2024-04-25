import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("storage==========",isLoggedIn)
    if (isLoggedIn !== null) {
      navigate("/");
    }
    else{
      
    }
  }, []);

  const userLogin = async () => {
    let obj = {
      email: email,
      password: password,
    };
    localStorage.setItem("Email", email);
    console.log("obj", obj);
    setErrorMsg("");
    setBtnLoader(true);
    let option = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };
    try {
      let res = await fetch("http://localhost:8000/user/login", option);
      let data = await res.json();
      console.log("data of logedIn user is----", data);
        if(data.token !== null){
        localStorage.setItem("isLoggedIn", data.token);
        alert(" Login Successfull");
        navigate("/");
      } else {
      }
      setBtnLoader(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div className="container login_form text-center mt-4 mb-4">
        <div className="pt-4 pb-4">
          <h3>Sign In</h3>
        </div>
        <form>
          <div className="emailField mb-3">
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              class="form-control mt-4 mb-4"
            />
          </div>

          <div className="mb-3 pt-2">
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              class="form-control mt-4 mb-4"
              placeholder="Enter your password"
            />
          </div>
          <label class="form-label security">
            By continuig, i agree to the <span>terms and Condition</span> and
            <span> privacy Polocy</span> of the website
          </label>

          <div className="row mt-4 mb-4">
            <div className="col-auto m-auto">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => userLogin()}
              >
                <span
                  style={{ display: btnLoader ? "inline-block" : "none" }}
                  className="spinner-border spinner-border-sm"
                ></span>
                Login
              </button>
            </div>
          </div>
          
          <div class="text-center pb-4">
            <span>Register Your Account </span>
            <NavLink to="/signup" className="mx-3"><strong style={{color:"red"}}>Signup</strong></NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;


