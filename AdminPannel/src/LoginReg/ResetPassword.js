import  { useState } from 'react'
import {NavLink, useParams} from 'react-router-dom';
import swal from 'sweetalert';


 const ResetPassword = () => {
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const [password, setPassword] = useState("")
    
    let {id,token} = useParams();
    console.log(id,token)   


    async function Reset() {
        
        let renewpassword = {password,id,token }
        console.log("inside front",renewpassword)
        
        let url = `http://localhost:7000/users/reset-password/${id}/${token}`

        let result = await fetch(url, {
            method: "POST",
              headers: {  
                  "Content-Type": "application/json",
                  "Accept": "application/json" ,
                
                },
            body: JSON.stringify(renewpassword),
        })

        result = await result.json();
        console.log("inside serverresponse", result);
        // if (!result) {
        //     console.log("Not Verified Token");
        //   }

        
        //swal("Password updated successfully");
    }
        return (
            <>

<div className="reset-password-page">
            <div className="container">
                <div className="loginBox">
                    <h1 className="title">Reset Password</h1>
                   
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="form-control"  placeholder="Enter name" />
                          
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirm Password:</label>
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  className="form-control"  placeholder="Enter value" />
                                                       
                        </div>
                         
                       
                        <div className="row">
                            <div className="col-auto">
                                <NavLink to="/">
                                    <button type="button" className="btn btn-success" onClick={Reset}>
                                        Reset
                                    </button>
                                </NavLink>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
            {/*
               <div className="container mt-5">
                <form  className="register-form" id="register-form">
                <h2 className="form-title"><center>Reset Password</center></h2>
                
                
               <div className="form-group">
                <label htmlFor="password">
               <i className="zmdi zmdi-lock material-icons-name"></i>
                 </label>
                <input type="password" name="password" id="password" autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                 />
                </div>
                 <div className="form-group">
                 <label htmlFor="cpassword">
                 <i className="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="off"
                 value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                 placeholder="Confirm Your Password"
                 />
                 </div>
                            
                <div className="d-grid">
                    <Link to="/login">
                    <button type="button" className="btn btn-success " onClick={Reset}>Reset</button>
                    </Link>
                </div>
                </form>
            </div>
        */}
         </>
        )
    }

export default ResetPassword;
