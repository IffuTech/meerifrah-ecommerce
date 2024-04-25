import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import { NavLink,useNavigate,useParams } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Navbar from '../Dashboard/Navbar/Navbar';
function ProductView() {

  const navigate = useNavigate();
   const params = useParams();
   var FormData = require('form-data');
    console.log("inside params of Products",params)
    const [category,setCategory] = useState([])
    const [catVal,setCatcatVal] = useState("")
    const [displayOld,setDisplayOld] = useState(true)
    const [uploadedFiles, setUploadedFiles] = useState([]);  
    const [images, setImages] = useState([]);
    const [data,setData] = useState({ 
        name:" ",
        // desc:"",
        price:"",
        quantity:"",
        productPictures:"",
        category:""
    })
    useEffect(() => {
        
        fetchProductList();
       
      axios.get("http://localhost:8000/category/list")     
      . then( (response) =>{ 
          setCategory(response.data.categoryList);  
          // setImages(response.data.categoryList);  
          console.log("categories are...  ",response.data.categoryList );
      })     
      .catch(err => {console.log("error is ",err)})
    
    }, [params]);

 const  fetchProductList = () =>{
    debugger;
    axios.get(`http://localhost:8000/product/${params.id}` )
    
     .then((resp) =>{
         console.log("View Product data ",resp.data); 
         setImages(resp.data.productPictures)
         debugger;
         setData({
         
            name: resp.data.name ,
            // desc: resp.data.name,
            price: resp.data.price,
            quantity: resp.data.quantity,
            // productPictures:resp.data.productPictures,
            category:resp.data.category.name
         })
       
        })
     .catch((error) =>{ console.log("resp ",error)} )
    
 }

  return (
    <>
     <div className="ProductList">
      <Sidebar />
     <div className="listContainer">
       <Navbar /> 
          
   <div className='container '>
   <h1 className="text-center  pt-5 mb-4 ">View Product Details</h1>
    
        <div className="container  row  ">
              {  Array.from( images)?.map(item =>{ 
                  
                  return(
               <div className = "col-3 text-center image" > 
                   <img  key={Math.random()} className=" " src={`http://localhost:8000/${item.path}`}  alt="image" />
             
                 </div>   

                  )
                })   
             } 
        </div>  
        
     <form className="row mt-5" >

        <div className="form-group mb-3 col-md-6">
            <label className="form-label">Name of Product :</label>
             <input type="text" name="name"  value={data.name} className="form-control" />
       </div>  

       {/* <div className="form-group mb-3 col-md-6">
            <label className="form-label">Description :</label>
             <textarea type="text" name="desc" value={data.desc}   className="form-control"  />
       </div>  */}
           
       <div className="form-group mb-3 col-md-6">
            <label className="form-label">Price  :</label>
             <input type="text" name="wishlisted" value={data.price}   className="form-control"  />
       </div> 

       <div className="form-group mb-3 col-md-6">
            <label className="form-label" > Category </label>
            <input type="text" name="wishlisted" value={data.category}   className="form-control"  />
                    
       </div> 
        
       <div className="form-group mb-3 col-md-6">
            <label className="form-label">Quantity :</label>
             <input type="text" name="actual_price" value={data.quantity}   className="form-control"  />
       </div> 

     </form>
   </div>
   </div>
   </div>
    
    </>
  )
}

export default ProductView