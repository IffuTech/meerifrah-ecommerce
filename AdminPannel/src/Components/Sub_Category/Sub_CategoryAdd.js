import React,{ useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
// import swal from 'sweetalert';

function Sub_CategoryAdd() {

  const params = useParams(); 
  console.log("add sub param",params);
   const navigate = useNavigate();
   const [token,setToken] = useState("");
   const [data,setData] = useState({ 
    name:" ",
    parentId:params.id
})

useEffect(() =>{
  let isLoggedIn = localStorage.getItem('isLoggedIn');
  setToken(isLoggedIn);
})

 const AddSubCategory = async() =>{
   debugger;

  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
console.log("data in sub category is ",data);
axios.post( 
  `http://localhost:8000/category/add`,
  data,
  config
).then((resp) =>{
     console.log("resp in Subcat",resp)
 })
.catch(console.log);

   navigate(`/Subcategory-list/${params.id}`)
 } 

  return (
    <div className='Add'>
         <div className="container ">
  
  <h1 className="text-center pt-5">Add Sub_Category</h1>
  <form className="row" onSubmit={AddSubCategory}>

     <div className="form-group mb-3 col-md-6">
         <label className="form-label">Name of Sub_Category :</label>
          <input type="text" name="name"  value={data.name} required onChange={(e)=>setData({...data,name:e.target.value})}  className="form-control" aria-describedby="emailHelp"  placeholder="l" />
    </div>  

    <div> 
      <button type="submit" className="btn btn-primary">Add Sub Category</button>
    </div>
 </form>
   
   </div>
    </div>
  )
}

export default Sub_CategoryAdd