import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function CategoryAdd() {
    const navigate = useNavigate();
    const [token,setToken] = useState("");
    const [data,setData] = useState({ 
        name:" ",
       
    })
    useEffect(() =>{
      let isLoggedIn = localStorage.getItem('isLoggedIn');
      setToken(isLoggedIn);
    })
   
    const AddCategory = async() =>{
      debugger;
   
     const config = {
       headers: { Authorization: `Bearer ${token}` }
   };
  console.log("dat is ",data);
   axios.post( 
     `http://localhost:8000/category/add`,
     data,
     config
   ).then((resp) =>{
        console.log("resp in Subcat",resp)
      
      })
   .catch(console.log);
  
   navigate(`/category-list`);
     
    }
  return (
    <div className='Add'>
      
        <div className="container ">
  
     <h1 className="text-center pt-5">Add Category</h1>
     <form className="row" onSubmit={AddCategory}>
        <div className="form-group mb-3 col-md-6">
            <label className="form-label">Name of Category :</label>
             <input type="text" name="name"  value={data.name} required onChange={(e)=>setData({...data,name:e.target.value})}  className="form-control" aria-describedby="emailHelp"  placeholder="Enter your email" />
       </div>  
       <div> 
         <button type="submit" className="btn btn-primary" >Add Category</button>
       </div>
    </form>
      
      </div>
      </div>
  )
}
