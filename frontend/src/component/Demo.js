<<<<<<< HEAD
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
    },
    [params]);
        
    //   axios.get("http://localhost:8000/category/list")     
    //   . then( (response) =>{ 
    //       setCategory(response.data.categoryList);  
    //       // setImages(response.data.categoryList);  
    //       console.log("categories are...  ",response.data.categoryList );
    //   })     
    //   .catch(err => {console.log("error is ",err)})
    

 const  fetchProductList = () =>{
    debugger;
    axios.get(`http://localhost:8000/user/list`)
    
     .then((resp) =>{
         console.log("fetch data ",resp.data); 
         setAllData(resp.data)
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

const uploadimg = (e) => {
  debugger;
  const chosenFiles = Array.prototype.slice.call(e.target.files) //prototype adds prototype prop//convets files into array
  console.log("inside choose", chosenFiles)
  handleUploadFiles(chosenFiles);
  setImages(chosenFiles);
}


const handleUploadFiles = files => {
debugger;
const uploaded = [uploadedFiles];
console.log("inside uploaded", uploaded)
files.some((file) => {
    uploaded.push(file);
})
setUploadedFiles(uploaded);
}

useEffect(() => {
  console.log("image has been set.")
  console.log("pp is ",images)
},[images]);


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
    for (let i = 1; i < uploadedFiles.length; i++) {
      formData.append("productPictures", uploadedFiles[i]);
  }
        console.log("formdata in if ",formData);
         for (var key of formData.entries()) {
           console.log("loop",key[0] + ', ' + key[1])
          }

    const config = {
        headers: {
          "content-type" : 'multipart/form-data'
                }
    };
   console.log("dat is ",data);

    axios.patch(`http://localhost:8000/product/${params.id}`,
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

        <div className="form-group mb-3 mt-3 col-md-6">
            <label className="form-label"> Change ProductPictures:</label> 
            <input id='fileUpload' type='file' value={data.productPictures} placeholder='Enter photo'  onChange={uploadimg} />
         </div> 

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
            <label className="form-label" >Select Category </label>
                     <select className="form-control" name= "category" onChange={(e) =>{ handlecategory(e) } }>
                       <option >....Select Category.... </option>
                         {
                            category.map( (items) => (
                              <option key = {items._id } value = { items._id } > { items.name }</option>
                            ))
                         }
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





   // {result.length < 0 ? (
            //   <NavLink
            //     type="submit"
            //     className="btn btn-success float-end  btn-lg"
            //     onClick={placeOrder}
            //   >
            //     Save Adress
            //   </NavLink>
            // ) : (
            //   <button type="button" class="btn btn-secondary btn-lg float-end" disabled>Save Adress</button>
            // )}
=======
// order List 

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";

const OrderList = () => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderDetailPic, setOrderDetailPic] = useState([]);
  const [quantity,setQuantity]=useState(1)
  const navigate = useNavigate();

  console.log("orderDetailorderDetailorderDetail", orderDetail);

  const handleDecreement =()=>{
    if(quantity > 1){
      setQuantity(prevCount => prevCount -1)
    }
  }
  const handleIncreement =()=>{
    if(quantity <10){
      setQuantity(prevCount => prevCount +1)
    }
  }



  // get order items
  const fetchOrderDetails = async () => {
    const response = await axios.get(`http://localhost:8000/order/getorders`, {
      headers: {
        Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
      },
    });
    setOrderDetail(response.data.orders);
    setOrderDetailPic(
      response.data.orders[0].items[0].productId.productPictures
    );
  };

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    // console.log("sotorage===============", isLoggedIn);
    if (isLoggedIn === null || isLoggedIn === undefined) {
      navigate("/");
    }

    fetchOrderDetails();
  }, []);

  return (
    <div className="container">
      <div className="mt-4">
        <div className="order_list m-4  p-3">
          {orderDetail.map((item) => {
            return item.items.map((sub) => {
              return (
                <div className=" Order_text_data border p-3 mb-2 row">
                  {sub.productId.productPictures.map((leaf, index) => {
                    if (index === 0) {
                      return (
                        <div className="col-md-4 text-center">
                          <img
                            src={`http://localhost:8000/${leaf.path}`}
                            alt="error in path"
                          />
                          <div className="quantity_order mt-4 justify-content-center">
                            <button type="button" onClick={handleDecreement}>
                              <FaMinus />
                            </button>
                            <input value={sub.purchasedQty} />
                            <button type="button" onClick={handleIncreement}>
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
                  <div className="col-md-8">
                    <div className="mb-2">
                      <strong style={{ color: "blue" }}>
                        {sub.productId.name}
                      </strong>
                    </div>
                    <div className="mb-2">
                      <label>Price : &nbsp;₹ &nbsp;</label>
                      <strong>{sub.payablePrice}</strong>
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
>>>>>>> 4e4bcd28e45761f5a8278496ebecf23f6c575d5e
