import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { NavLink,useNavigate } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Navbar from '../Dashboard/Navbar/Navbar';
import { FaTrashAlt,FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";   

function UsersList() {    
    
   const navigate = useNavigate();
    const [deleteFetch, setDeleteFetch] = useState(false);
    const [allusers,setAllusers] = useState([]);
    
    const [data,setData] = useState({ 
        firstName:" ",
        lastName:"",
        email:"",
        role:""      
    })
     
    useEffect(() =>{
        UserList();
    },[])

    const UserList = async() =>{
      //allusers
      const res = await axios.get(` http://localhost:8000/user/list`)
       setAllusers(res.data);
      console.log("users are",res.data)
    }

    useEffect(() => {
     
      let isLoggedIn = localStorage.getItem('isLoggedIn');
      console.log('isLoggedIn', isLoggedIn);
      UserList();
      setDeleteFetch(false);
  }, [deleteFetch]);
   
  
  function deleteUser(id) {  // Delete opttions
    debugger;
    //  e.preventDefault();
    Swal.fire({
        title: 'Do you want to delete this User ?',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Cancel`,   
    })
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8000/user/${id}`, {
                    method: 'DELETE',
                    headers: {  
                        "Content-Type": "application/json",
                        "Accept": "application/json" ,
                        "x-access-token":localStorage.getItem('isLoggedIn')
                      }, 
                }).then((resp) => {
                    console.log(resp.message);
                    Swal.fire("Product deleted successfully", resp.message)
                    setDeleteFetch(true);
                    console.log(resp)
                    UserList();
                    // fetchCarList(options);
                   

                })
            }
        }
        )
}
  return (
    <>
 
   <div className="ProductList">
      <Sidebar />
     <div className="listContainer">
       <Navbar /> 
       <div className="Product-table">
     <h1 className="text-center">User List</h1>
   
     <table className="table table-bordered tablelist" >
  <thead>
    <tr>
    
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col" style={{ width:"10px" }}>Delete</th>
    </tr>
  </thead>
  <tbody>
           {allusers.map((item) =>{
          if(item.role == 'admin'){
          return(
            <tr key={item.id}>
           <td>{item.firstName} </td>
           <td>{item.lastName} </td>
           <td>{item.email} </td>
           <td>{item.role} </td>
           <td  >
             <FaTrashAlt onClick={() => deleteUser(item._id)} className="trash text-danger "/> &nbsp;
            </td>
            </tr>
          )
          }
})}
    
    
    </tbody>
 </table> 
 </div> 
 </div>
 
     
</div>
    </>
  )
}

export default UsersList