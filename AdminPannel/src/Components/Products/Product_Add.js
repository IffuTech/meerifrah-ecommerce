import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
var FormData = require('form-data');
function Product() {

  const navigate = useNavigate();
  const formData = new FormData();
  const [token,setToken] = useState("");
  const [category , setcategory] = useState([]);  
  const [subcategorylist , setsubcategorylist] = useState([]);  
  const [images,setImages] = useState([])   
  const [uploadedFiles, setUploadedFiles] = useState([]);

  let url =`http://localhost:8000/category/list`
  const [data,setData] = useState({ 
        name:" ",
        desc:" ",
        price:" ",
        quantity:" ",
        offer:"",
        category:" "
              
    })   
   
    
    useEffect(() =>{
          let isLoggedIn = localStorage.getItem('isLoggedIn');
          setToken(isLoggedIn);

      axios.get(url)     
          . then( (response) =>{ 
              setcategory(response.data.categoryList);  
              console.log("categories are  ",response.data.categoryList );
          })     
          .catch(err => {console.log("error is ",err)})
        },[])

     const uploadimg = (e) => {
      debugger;
      const chosenFiles = Array.prototype.slice.call(e.target.files) //prototype adds prototype prop//convets files into array
      console.log("inside choose", chosenFiles)
      handleUploadFiles(chosenFiles);
}

  
  const handleUploadFiles = files => {
    debugger;
    const uploaded = [uploadedFiles];
    console.log("inside uploaded", uploaded)
    files.some((file) => {
        uploaded.push(file);
        images.push(file);
    })
    setUploadedFiles(uploaded);
}


    const AddProduct =async(e) => {
     e.preventDefault();
      debugger;
  
     console.log("product details",data)
 
    
       formData.append('name',data.name);
       formData.append('desc',data.desc);
       formData.append('price',data.price);
       formData.append('quantity',data.quantity);
       formData.append('offer',data.offer); 
       formData.append('category',data.category);  

    //   for (let i = 1; i < uploadedFiles.length; i++) {
    //     formData.append("productPictures", uploadedFiles[i]);
    // }



        console.log("formdata in if ",formData);
         for (var key of formData.entries()) {
           console.log("loop",key[0] + ', ' + key[1])
          }

   console.log("dat is ",data);

    axios.post("http://localhost:8000/product/create",
    formData,
    { headers: { 'Content-Type': 'application/json'  } }  
    )
     .then((res) => {
           console.log("resp of ADD PRODUCT ",res)
          })
     .catch((error)=>{
            console.log(error.response.data)
          }   )
          navigate("/product-list");
  }
    
  async  function handlecategory(e){
     
    const getcategoryname = e.target.value;
    data.category = getcategoryname;
     console.log("category id is ", data.category);
    
  }
   
  return (
    <div className='Add'>
          
<div className="container">
  
     <h1 className="text-center pt-5">Add product</h1>
     <form className="row" onSubmit={AddProduct}>
      
      {/* <img 
      src ={file ? URL.createObjectURL(file) :
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Feitrawmaterials.eu%2Fclc-location%2Fclc-west%2Fperson-icon%2F&psig=AOvVaw0W_KTDoOYawzeEk9ejKdTt&ust=1674539845533000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCODurZaB3fwCFQAAAAAdAAAAABAE"
        }  atl=""  /> */}

         {/* <div className="container  row  ">
              {  Array.from( images)?.map(item =>{ 
                  
                  return(
               <div className = "col-3 text-center image" > 
                   <img  key={Math.random()} className=" " src={`http://localhost:8000/${item.img}`}  alt="image" />
             
                 </div>   

                  )
                })   
             } 
        </div> */}
         {/* <div className="form-group mb-3 col-md-6">
            <label className="form-label"> Select ProductPictures:</label> 
            <input id='fileUpload' type='file' multiple placeholder='Enter photo'  onChange={uploadimg} />
         </div>  */}

        <div className="form-group mb-3 col-md-6">
            <label className="form-label">Name of Product :</label>
             <input type="text" name="name"  value={data.name} required onChange={(e)=>setData({...data,name:e.target.value})}  className="form-control" aria-describedby="emailHelp"  placeholder="Enter your email" />
       </div>  

       <div className="form-group mb-3 col-md-6">
            <label className="form-label">Description :</label>
             <textarea type="text" name="desc" value={data.desc} required onChange={(e)=>setData({...data,desc:e.target.value})}  className="form-control"  />
       </div> 

       <div className="form-group mb-3 col-md-6">
            <label className="form-label">Price  :</label>
             <input type="number" name="price" value={data.price} required onChange={(e)=>setData({...data,price:e.target.value})}  className="form-control"  />
       </div> 
        
       <div className="form-group mb-3 col-md-6">
            <label className="form-label">Quantity :</label>
             <input type="number" name="Quantity" value={data.quantity} required onChange={(e)=>setData({...data,quantity:e.target.value})}  className="form-control"  />
       </div> 

       <div className="form-group mb-3 col-md-6">
            <label className="form-label">Offer :</label>
             <input type="number" name="offer" value={data.offer} required onChange={(e)=>setData({...data,offer:e.target.value})}  className="form-control"  />
       </div> 
        
       <div className="form-group mb-3 col-md-6">
            <label className="form-label" >Select type of leaf Category </label>
                   <select className="form-control" name= "category" onChange={(e) =>{ handlecategory(e) } }>
                       <option >....Select Category.... </option>
                        {   category.map((item) =>(
                               <>
                               {item.children.map( (sub) =>{
                                  return(
                                  <>
                                      { sub.children.map( (leaf) =>(
                                        <> 
                                         <option key = {leaf._id } value = { leaf._id } >{leaf.name}</option>
                                        </>
                                         )) 
                                      }
                                  </> )
                               })}
                              </>
                         ))}
                 </select>
       </div> 

     
       <div> 
         <button type="submit" className="btn btn-primary" >Add Product</button>
       </div>
     </form>
      
</div>
    </div>
  )
}

export default Product