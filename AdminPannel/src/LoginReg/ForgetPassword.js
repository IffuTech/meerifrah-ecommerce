import React, { Fragment } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export const Forgetpassword = () => {
    const [email, setEmail] = useState("")


    async function Forgotpassword() {

        let subittedemail = { email }
 
        let url = "http://localhost:3021/forgotpassword"

        let result = await fetch(url, {
            method: "POST",
              headers: {  
                  "Content-Type": "application/json",
                  "Accept": "application/json" 
                },
            body: JSON.stringify(subittedemail),
        })

        result = await result.json();
        console.log(result);
            }
        return (
            <Fragment>
            <div className="login-page">
                <div className='loginBox'>
                <div className="text-center">
                    <h2>Enter Your Email</h2>
                </div>
                <div className="mb-4">
                    <input type="text" placeholder='Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example1c" className="form-control" />
                 </div>
                <div>
                <Link to="/resetpassword">   
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={Forgotpassword}>Find your account</button>
                 
               </Link>
                </div>
              </div>
             </div>
            </Fragment>

        )
    }

export default Forgetpassword