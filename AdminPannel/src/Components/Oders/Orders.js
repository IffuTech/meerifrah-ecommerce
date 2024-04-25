import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Navbar from '../Dashboard/Navbar/Navbar';
import  {FaEdit, FaGlasses } from "react-icons/fa";  
import Swal from "sweetalert2";

 function Orders() {
 
  
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [token,setToken] = useState("");
    const [allusers,setAllusers] = useState([]);

    const [data,setData] = useState({ 
      userId:" ",
      type :""     
  })

 
      
    useEffect(() => {
     
      allorders();
      UserList();
 }, []);

   function allorders(){
        console.log("tokenn..",token)
        axios.get(`http://localhost:8000/order/orders`, {
          headers: {  
            "Authorization":`Barear ${localStorage.getItem('isLoggedIn')} `
          }, 
       } )
        .then((resp) =>{
            console.log("oders are",resp.data.orders);
                setOrders(resp.data.orders);
                setLoading(false);
                } )
        .catch( (error) =>{
          console.log("error in orders ",error)
          // Swal(error.message )

        })
   }

   const UserList = async() =>{
        //allusers
        const res = await axios.get(` http://localhost:8000/user/list`)
         setAllusers(res.data);
        console.log("users are",res.data)
    }
    
   
      var displayorder = "";
  if(loading){
    return <h4 className='text-center mt-5'>Loading Orders .....</h4>
  }

  function  status(item){
    debugger;
    let stat="";
    let onlyFalse = true;

    const x = item.orderStatus[0].isCompleted
   
     {item.orderStatus?.map((oitems) =>{
        debugger;
              if(oitems.isCompleted === true){
                 stat = oitems.type;
                 onlyFalse =false
                   }
       })} 
        // console.log("val of statr",stat)
       return ( onlyFalse ? 
        <span type="button" className="btn btn-warning" >Ordered</span>  :
        <span type="button" className="btn btn-info" >{stat}</span>  )
      
  }
  // else{

  //    displayorder = orders.map( (item) =>{

  //       return(
  //           <tr key={item.id}>
  //               <td></td>
  //           </tr>
  //       )
  //   })
  // }

  return (
    <div className="ProductList ">
      <Sidebar />
     <div className="listContainer">
       <Navbar /> 
            <h4 className="text-center container">Orders </h4>
 <table className="table table-bordered tablelist" >
  <thead className="text-center">
    <tr>
       <th scope="col">Order_Id </th>
       <th scope="col">User_Email </th>
       <th scope="col">Total_Amount </th>
        <th scope="col">Status Type</th>
       <th scope="col">Action</th>
       
    </tr>
  </thead>
  <tbody className="text-center">
  
    {orders?.map( (item) =>(
       <tr>
       <td>{item._id}</td>
       <td>
           {allusers.map( (user) =>{
              if(item.user == user._id){
                  return(
                   <> {user.email}   </>
                  )
              }
           })}
        </td>
       <td>{item.totalAmount}</td>
       <td>{status(item)} </td>
       <td>
       <NavLink to={`/OrdersView/${item._id}`} style={{ textDecoration: "none" }} >
              <FaEdit size={'20px'}  style={{ color: "green" }}/>   
        </NavLink>
        </td>   
               
       </tr>
    ))}
     
     </tbody>    
     </table> 

     </div>
        
    </div>
  )
}

export default Orders