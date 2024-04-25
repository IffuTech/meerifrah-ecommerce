import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
// import swal from 'sweetalert';
function ProductEdit() {

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
        desc:"",
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
         console.log("fetch data ",resp.data); 
         setImages(resp.data.productPictures)
         setData({
            name: resp.data.name ,
            desc: resp.data.name,
            price: resp.data.price,
            quantity: resp.data.quantity,
            // productPictures:resp.data.productPictures,
            category:resp.data.category
         })
       
        })
     .catch((error) =>{ console.log("resp ",error)} )
    
 }


 async  function handlecategory(e){
     debugger;
  const getcategoryname = e.target.value;
  // data.category = getcategoryname;   
  setCatcatVal(getcategoryname);
   console.log("category id is ", data.category);
  
}

// const uploadimg = (e) => {
//   debugger;
//   const chosenFiles = Array.prototype.slice.call(e.target.files) //prototype adds prototype prop//convets files into array
//   console.log("inside choose", chosenFiles)
//   handleUploadFiles(chosenFiles);
//   setImages(chosenFiles);
// }


// const handleUploadFiles = files => {
// debugger;
// const uploaded = [uploadedFiles];
// console.log("inside uploaded", uploaded)
// files.some((file) => {
//     uploaded.push(file);
// })
// setUploadedFiles(uploaded);
// }

// useEffect(() => {
//   console.log("image has been set.")
//   console.log("pp is ",images)
// },[images]);


    const EditProduct = async(e) =>{
      
      debugger;
      e.preventDefault();
  
     console.log("product details",data)
    
     const formData = new FormData();
    
       formData.append('name',data.name);
       formData.append('desc',data.desc);
       formData.append('price',data.price);
       formData.append('quantity',data.quantity);
       formData.append('category',catVal);
  
    //    for (let i = 0; i < file.length; i++) {            //val of i? and uploadedFiles
    //     formData.append("productPictures", file[i]);     
    // } 
  //   for (let i = 1; i < uploadedFiles.length; i++) {
  //     formData.append("productPictures", uploadedFiles[i]);
  // }
  //       console.log("formdata in if ",formData);
  //        for (var key of formData.entries()) {
  //          console.log("loop",key[0] + ', ' + key[1])
  //         }

    const config = {
        headers: {
          'Content-Type': 'application/json' 
                }
    };
   console.log("dat is ",data);

    axios.patch(`http://localhost:8000/product/update/${params.id}`,
    formData,
    config
)
     .then((res) => {
           console.log("resp of ADD PRODUCT ",res)
           navigate("/product-list");
          })
     .catch((error)=>{
            console.log(error)
          }   )
       
 }

  return (
    <div className='Add'>

   <div className='container'>
   <h1 className="text-center pt-5">Edit product</h1>
   <div className="container  row  ">
   
     {/* {  displayOld==true?
         <div className="container  row  ">
              {  Array.from( images)?.map(item =>{ 
                  
                  return(
               <div className = "  col-3 text-center  " > 
                   <img  key={Math.random()} className=" " src={`http://localhost:8000/${item.img}`} multiple alt="image" />
             
                 </div>   

                  )
                })   
             } 
          </div>  :
        <>hello</>
     } */}
                
                
      </div>   
    
     <form className="row" onSubmit={EditProduct}>

        {/* <div className="form-group mb-3 mt-3 col-md-6">
            <label className="form-label"> Change ProductPictures:</label> 
            <input id='fileUpload' type='file' value={data.productPictures} placeholder='Enter photo'  onChange={uploadimg} />
         </div>  */}

        <div className="form-group mb-3 col-md-6">
            <label className="form-label">Name of Produvt :</label>
             <input type="text" name="name"  value={data.name} required onChange={(e)=>setData({...data,name:e.target.value})}  className="form-control" aria-describedby="emailHelp"  placeholder="Enter your email" />
       </div>  

       <div className="form-group mb-3 col-md-6">
            <label className="form-label">Description :</label>
             <textarea type="text" name="desc" value={data.desc} required onChange={(e)=>setData({...data,desc:e.target.value})}  className="form-control"  />
       </div> 
           
       <div className="form-group mb-3 col-md-6">
            <label className="form-label">Price  :</label>
             <input type="text" name="wishlisted" value={data.price} required onChange={(e)=>setData({...data,price:e.target.value})}  className="form-control"  />
       </div> 

       <div className="form-group mb-3 col-md-6">
            <label className="form-label" >Select Leaf Category of Product</label>
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
        
       <div className="form-group mb-3 col-md-6">
            <label className="form-label">Quantity :</label>
             <input type="text" name="actual_price" value={data.quantity} required onChange={(e)=>setData({...data,quantity:e.target.value})}  className="form-control"  />
       </div> 

      
       <div> 
         <button type="submit" className="btn btn-primary" >Update Product</button>
       </div>
     </form>
   </div>

    </div>
  )
}

export default ProductEdit