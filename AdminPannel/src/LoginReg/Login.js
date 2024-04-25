import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { NavLink, useNavigate ,Link} from "react-router-dom";
import '../App.css';

const Login = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobile: ""
    });
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const [error, setError] = useState(false);
 
    const [btnLoader, setBtnLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [currentpage, setcurrentpage] = useState("login");
    const navigate = useNavigate();
   
    
    useEffect(()=>{
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== null) {
          navigate("/admin/");
        }
        
    }, []);

    const loginUser = async () => {
        let obj = {
            "email": data.email,
            "password" : data.password
        }
        localStorage.setItem('Email', data.email);
        console.log('obj',obj);
        setErrorMsg('');
        setBtnLoader(true);
        let option = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }

        if(
            Object.keys(data.email).length === 0 ||
            Object.keys(data.password).length === 0 ||
            !emailRegex.test(data.email)   
            
            ) {
            setError(true);
            console.log("val of first",data.firstName);
            console.log("yes error ")
            // setcurrentpage("login");
          // emptyValue();                
          } 
          else {
            try {
                let res = await fetch('http://localhost:8000/user/admin/login',option);
                let data = await res.json();
                console.log('data is',data);
                debugger;
                if (data.token !== undefined) {
                    localStorage.setItem('isLoggedIn',data.token);
                     navigate("/admin/");
                } else {
                    setErrorMsg(data.message);
                }
                setBtnLoader(false);
            } catch(error) {
                console.log('error',error);
            }
          }
       
        
    }
 
  
 return (
      <>
   <div className="login-page">
            <div className="container">
                <div className="loginBox ">
               
                <div>     <h1>Admin Login</h1>
                      <form>
                      <div className="form-group mb-3">
                            <label className="form-label">Email Address :</label>
                            <input type="email" name="email" value={data.email} required onChange={(e)=>setData({...data,email:e.target.value})}  className="form-control" aria-describedby="emailHelp"  placeholder="Enter your email" />
                            { error && !emailRegex.test(data.email) ? <span className="text-danger">Enter Proper email </span> : ""}
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Password :</label>
                            <input type="password" name="password" value={data.password} required onChange={(e)=>setData({...data,password:e.target.value})}  className="form-control mb-4"  placeholder="Enter your password" />
                            { error && data.password<=0? <span className="text-danger">Enter Password </span> : ""}
                        </div>
                                              
                        <div className="row">
                            <div className="form-group col-auto text-center">
                                  <button type="button" className="btn btn-success " onClick={() => loginUser()}>
                                  <span className={btnLoader ? "spinner-border spinner-border-sm" : ''}></span>
                                        Submit
                                 </button>
                              
                            </div>
                            
                        </div>
                        <div className="form-group  text-center">
                        <NavLink to="/register">                          
                                 <h5 className="text-btn text-primary" > Dont have an account?Register</h5>
                          </NavLink>      
                          </div>
                          <span className="text-danger">{errorMsg}</span>
                        <div className="form-group  text-center">
                                <NavLink to="/forgetpassword" className="text-btn">Forgot Password</NavLink>
                         </div>
                    </form>
                </div> 
                
                   
                  
                 
                  
               </div>

            </div>
        </div>

   

       </>
    )
}

  export default Login;
