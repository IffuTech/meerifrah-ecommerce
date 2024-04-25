import React,{useState } from 'react'
import axios from 'axios';
import { useNavigate ,NavLink} from 'react-router-dom';
function Registration() {

    const navigate = useNavigate();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const [error,setError] = useState(false);
    const [registerInput, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error_list:""
       
    });

    const handleInput= (e) =>{
        // e.persist();
        setRegister({...registerInput , [e.target.name]: e.target.value});
    }  

    const registerSubmit= async(e) =>{
        e.preventDefault();
        debugger;
        const data ={
            firstName: registerInput.firstName,
            lastName: registerInput.lastName,
            email: registerInput.email,
            password: registerInput.password
        }
       
            if(
                Object.keys(data.firstName).length === 0 ||
                Object.keys(data.firstName).length === 0 ||
                Object.keys(data.firstName).length === 0 ||
                Object.keys(data.firstName).length === 0 ||
                !emailRegex.test(registerInput.email)   
              ) {
                    setError(true);
                    
                    // console.log("val of first",Object.keys(data.firstName).length === 0);
              }  
            else{

                try{
                    const res = await axios.post(`http://localhost:8000/user/admin/signup`,data)
                 
                      if(res.status== 200){
                        alert("Admin Added");
                        data.firstName=""
                        data.lastName=""
                        data.email=""
                       data.password=""
                                   
                      }
                    }
                    //   .catch((err) => {console.log("err is",err)})
                  
                  catch(error){
                    console.log('error',error.message );
                    alert(error.message );
                  } 
                  navigate("/")  
            }
            console.log("error val",error)
            // if(resp.data.status === 200){

            // }
            // else{
            //     setRegister({ ...registerInput,error_list: resp.data.error})
              
            // }
        
       
        
        //  .catch((err) =>{ console.log(err)})
    }
    const validate = (values) =>{      //nw
     
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
        if(
            values.firstname === "" ||
            values.lastname ==="" ||
            values.email ==="" ||
              // data.company == null ||
              values.password ==="" 
                
                ) {
                setError(true);
                console.log("val of first",values.firstname);
               
                      
              }  
     }

  return (
    <div>
        <div className="login-page">
            <div className="container">
                <div className="loginBox ">

    <h1>Register New Admin</h1>
<form onSubmit={registerSubmit}> 
      <div className="form-group mb-3">
          <label className="form-label">First Name</label>
          <input type="text" name="firstName" value={registerInput.firstName} required onChange={handleInput}  className="form-control"   placeholder="Enter First Name" />
          { error && registerInput.firstName==""? <span className="text-danger">Enter First Name </span> : ""}                                                      
      </div>
      <div className="form-group mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" name="lastName" value={registerInput.lastName} required onChange={handleInput}  className="form-control"   placeholder="Enter Last Name" />
          { error && registerInput.firstName==""? <span className="text-danger">Enter Last Name </span> : ""}                                                      
      </div>

      <div className="form-group mb-3">
          <label className="form-label">Email</label>
          <input type="text" name="email" value={registerInput.email} required onChange={handleInput}  className="form-control"   placeholder="Enter Email" />
          { error && !emailRegex.test(registerInput.email) ? <span className="text-danger">Enter Proper email </span> : ""}                                                     
      </div>

      <div className="form-group mb-3">
          <label className="form-label">Password :</label>
          <input type="password" name="password"  onChange={handleInput} required className="form-control mb-4"  placeholder="Enter your password" />
          { error && registerInput.password<=0? <span className="text-danger">Enter Password </span> : ""} 
      </div>
     
       {/* <span>{registerInput.error_list}</span> */}
     
      <div className="row">
          <div className="form-group col-auto">
            
                  <button type="submit" className="btn btn-success btn-success " >
                  <span assName="spinner-border spinner-border-sm"></span>
                      Submit
                  </button>
                  
           </div>
          
      </div>
      <div className="form-group  text-center">
                        <NavLink to="/">                          
                                 <h5 className="text-btn text-primary" > Already have an account ? Login</h5>
                          </NavLink>      
                          </div>
      
  </form>
  </div> 
  </div> 
  </div> 
</div> 
    )
}

export default Registration