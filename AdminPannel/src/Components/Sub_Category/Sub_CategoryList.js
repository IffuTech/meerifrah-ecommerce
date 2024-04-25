import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { NavLink,useNavigate , useParams  } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Navbar from '../Dashboard/Navbar/Navbar';
import { FaTrashAlt,FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

function Sub_CategoryList() {
 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [deleteFetch, setDeleteFetch] = useState(false);
  const [allcategory,setAllcategory] = useState([]);
  const [categoryId,setcategoryId] = useState("");
  const [children,setChildren] = useState([]);
  const [search,setSearch] = useState(true);
  const params = useParams();  
  console.log("category param   is",params); 

  const [data,setData] = useState({ 
      name:" ",
    
  })
   
  useEffect(() =>{

    setcategoryId(params.id)
    callSubcategory();
},[])


const callSubcategory= async =>{
  axios.get(`http://localhost:8000/category/list`)
  .then((resp) =>{
      console.log("in subCat page categories are",resp.data.categoryList );
      if(resp.status ===200){
          setAllcategory(resp.data.categoryList);
      }
      setLoading(false);
      
  })
}
  
  useEffect(() => {
   
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log('isLoggedIn', isLoggedIn);
   
    setDeleteFetch(false);
}, [deleteFetch]);
 
if(loading){
  return <h4>Loading Category.....</h4>
}


function deleteCategory(id) {  // Delete opttions
  debugger;
  Swal.fire({
      title: 'Do you want to delete this Sub Category Product?',
     
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
  })
      .then((result) => {
          if (result.isConfirmed) {
              fetch(`http://localhost:8000/category/${id}`, {
                  method: 'DELETE',
                  headers: {  
                      "Content-Type": "application/json",
                      "Accept": "application/json" ,
                      "x-access-token":localStorage.getItem('isLoggedIn')
                    }, 
              }).then((resp) => {
                  console.log(resp.message);
                  Swal.fire("SubCategory deleted successfully", resp.message)
                  setDeleteFetch(true);
                  console.log(resp)
                  callSubcategory();
                  // CategoryList();

              })
          }
      }
      )
}
  return (
    <>
        <div className="CategoryList">
      <Sidebar />
     <div className="listContainer">
       <Navbar /> 
    <div className="CategoryTable">
    <h1 className="text-center">Sub Category List</h1>
     <NavLink to={`/subcategory-add/${params.id}`}>
      <button type="submit" className="btn btn-primary ml-5" >Add Sub Category</button>
     </NavLink>
     <table className="table table-bordered tablelist" >
  <thead className="text-center">
    <tr>
       <th scope="col">name</th>
       <th scope="col">Sub_Catogory</th>
       {/* <th scope="col">Edit</th> */}
       <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody className="text-center">
 
          { allcategory.map((item) =>{

            if(search == true && item._id == categoryId){
              setChildren(item.children) 
              setSearch(false);
              
            }
          })
     }
           { children.map((item) =>(
             <>
             <tr key={item._id}> 
              <td>{item.name}</td>
              <td> <NavLink to={`/leafcategory-list/${item._id}`  }>   
                                           <span type="button" className="btn btn-sm btn-info" >Options</span> 
                                           </NavLink>  </td>
              <td className="text-center" style={{color:"red"}}> <FaTrashAlt size={20} onClick={() => deleteCategory(item._id)} className="trash" /> </td>
            
           
            </tr> 
            </>
           ))

   }

     </tbody>    
     </table>    
     </div>    
     </div>
     </div>
    </>
  )
}

export default Sub_CategoryList