import React,{ useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Navbar from '../Dashboard/Navbar/Navbar';
import App from '../../App.css';

export default function OrdersView() {
    
  const navigate = useNavigate();
    const params = useParams(); 
    const [line,setLine] = useState("")
    const [data,setData] = useState({ 
        type: "",
        orderId:params.id
    })
    
    const orderStatus = ["ordered","packed","shipped","delivered"];

    const handleActionType = (e) =>{

       const getActionName = e.target.value;
       data.type = getActionName;
       setLine(getActionName);
    }
    const EditOrder =() =>{
       debugger;
        console.log("data val",data)
        axios.patch(`http://localhost:8000/order/update`,data , {
            headers: {  
              "Authorization":`Barear ${localStorage.getItem('isLoggedIn')} `
            }, 
         })
          .then((resp) =>{console.log("oders are",resp.data); } )
          .catch( (err) =>{console.log("error in orders ",err)})
          navigate("/orders");
    }
  return (
    <div className="ProductList ">
    <Sidebar />
   <div className="listContainer">
     <Navbar /> 
     <div className='Add'>
         <div className="container ">
  
  <h1 className="text-center pt-5 orders">Order Status</h1>
  <form className="row" onSubmit={EditOrder}>

     <div className="form-group mb-3 col-md-6 mt-5">
         <label className="form-label ">Change Order Status:</label>
  {/* <input type="text" name="type" required value={data.type}  onChange={(e)=>setData({...data,type:e.target.value})} className="form-control"  /> */}

   <select className='form-control text-center' name="type" onChange={(e) =>{ handleActionType(e) } }>
       <option>......select Type of Action.......</option>
         {orderStatus.map( (item,i) =>(
                 <option key={i}>{item}</option>
         ))}
    </select>
    </div>  

    <div className='text-center'> 
      <button type="submit" className="btn btn-primary ">Edit Status</button>
    </div>
 </form>
 
       {/* <div className='ordertrack'>
       {orderStatus?.map( (item) =>( 
        //  <div className='point'>
        <div className='point'>
            <div className='line'></div>
         </div>
          ))}
       </div> */}
      
   
   </div>
    </div>
     </div>
     </div>
  )
}
