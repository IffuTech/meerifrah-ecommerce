import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { NavLink,useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Navbar from '../Dashboard/Navbar/Navbar';
import { FaTrashAlt,FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CategoryList() {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [deleteFetch, setDeleteFetch] = useState(false);
    const [allcategory,setAllcategory] = useState([]);
    const [subcategoryId,setsubcategoryId] = useState("");
    const [search,setSearch] = useState(true);  
    const params = useParams();  
    const [data,setData] = useState({ 
        name:" ",
      
    })
     
    useEffect(() =>{
     callCategory();
     setsubcategoryId(params.id)
    
},[])

 const callCategory= async =>{
  axios.get(`http://localhost:8000/category/list`)
  .then((resp) =>{
      console.log("categories inleaf page vare",resp.data.categoryList);
      if(resp.status ===200){
          setAllcategory(resp.data.categoryList);
      }
      setLoading(false);
      // callsearch();
  } )
 
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
        title: 'Do you want to delete this Product?',
       
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
                        // "x-access-token":localStorage.getItem('isLoggedIn')
                      }, 
                }).then((resp) => {
                  debugger;
                    console.log("delete msg",resp.message);
                    Swal.fire("Product deleted successfully", resp.message)
                    setDeleteFetch(true);
                    console.log(resp)
                    callCategory();
                   
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
    <h1 className="text-center">Leaf Category List</h1>
 
    <NavLink to={`/leafcategory-add/${params.id}`}>   
      <button type="submit" className="btn btn-primary ml-5" >Add Category</button>
     </NavLink>
    
    
        {   allcategory.map((item) =>(
            <>
              
                {item.children.map( (sub) =>{
                 return(
                 <>
                
                       { search && sub._id == subcategoryId?
                       <table className="table table-bordered tablelist" >
                       <thead className="text-center">
                        <tr>
               <th scope="col">name</th>
               <th scope="col">Delete</th>
      
                  </tr> 
                                { sub.children.map( (leaf) =>(
                                        <tr> 
                                          <td>{leaf.name} </td>
                                          <td className="text-center" style={{color:"red"}}> <FaTrashAlt size={20} onClick={() => deleteCategory(leaf._id)} className="trash" /> </td>
             
                                        </tr>
                                    ))
                                    
                                  }
                            </thead>
                            </table> :
                               <span></span>
                        }


                 
                  </> 
                  )
    })}
              
            
           
   </>
     ))}

     </div>    
     </div>
     </div>
    </>
  )
}
