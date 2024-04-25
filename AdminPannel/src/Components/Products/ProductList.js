import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { NavLink,useNavigate } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Navbar from '../Dashboard/Navbar/Navbar';
import { FaTrashAlt,FaEdit } from "react-icons/fa";  
import { BsFillEyeFill } from "react-icons/bs";
import { FcGallery } from "react-icons/fc";
import Swal from "sweetalert2";
import Pagination from '../Pagination';

function ProductView() {
    
   const navigate = useNavigate();
    const [deleteFetch, setDeleteFetch] = useState(false);
    const [allproducts,setAllproducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(3)

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = allproducts.slice(firstPostIndex,lastPostIndex);
  
    const [data,setData] = useState({ 
        name:" ",
        desc:"",
        price:"",
        quantity:"",
        category:"",
      
    })
    debugger;
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      console.log("pno ",pageNumber)
    }
    
    //Pagination.... 
    useEffect(() =>{
        ProductList();
    },[])

    const ProductList = async() =>{
      //allproducts
      const res = await axios.get(`http://localhost:8000/product/list`)
       setAllproducts(res.data.products);
      console.log("products are",res.data.products)
    }

    useEffect(() => {
     
      let isLoggedIn = localStorage.getItem('isLoggedIn');
      console.log('isLoggedIn', isLoggedIn);
      ProductList();
      setDeleteFetch(false);
  }, [deleteFetch]);
   

   

    const EditProduct= async(id) =>{
      console.log("edit.. ",id);
      // const x=`/admin/product_edit/${id}`
    }
  
  function deleteProduct(id) {  // Delete opttions
    debugger;
   
    Swal.fire({
        title: 'Do you want to delete this Product?',
       
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Cancel`,   
    })
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8000/product/delete/${id}`, {
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
                    ProductList();
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
     <h1 className="text-center">Product List</h1>
     <NavLink to="/product-add">
      <button type="submit" className="btn btn-primary addbtn" >Add Product</button>
     </NavLink>
     <table className="table table-bordered tablelist" >
  <thead>
    <tr>
    
      <th scope="col">Name</th>
      {/* <th scope="col">Category</th> */}
      <th scope="col">Price</th>
      <th scope="col">Quality</th>
      <th scope="col" >Action</th>
    </tr>
  </thead>
  <tbody>
 
        {currentPosts.map((item) =>(
            <tr key={item.id}>
           <td>{item.name} </td>
           {/* <td>{item.category.name} </td> */}
            <td>{item.price} </td>
           <td>{item.quantity} </td>
            
           <td  >
             <FaTrashAlt onClick={() => deleteProduct(item._id)} style={{ color: "tomato" }}/> &nbsp;
               <NavLink
                    to={`/product_edit/${item._id}`}
                    style={{ textDecoration: "none" }}
                    
                 >
                 <FaEdit  size={'20px'}/>   
              </NavLink> &nbsp; 

              <NavLink
                    to={`/Product-view/${item._id}`}
                    style={{ textDecoration: "none" }}
                 >
                 <BsFillEyeFill size={'20px'}  style={{ color: "green" }}/>   
              </NavLink>&nbsp; 

              <NavLink
                    to={`/Product-Gallery/${item._id}`}
                    style={{ textDecoration: "none" }}
                    
                 >
                 <FcGallery  size={'20px'}/>   
              </NavLink> &nbsp;  
            </td>
          
           </tr>
        ))}
     </tbody>
 </table> 
        <Pagination postsPerPage={postPerPage} totalPosts={allproducts.length}
           setCurrentPage={setCurrentPage}
        />
      
 </div> 
 </div>
    
  </div>
    </>
  )
}

export default ProductView