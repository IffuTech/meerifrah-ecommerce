import React,{ useEffect,useState } from 'react'
import axios from "axios";
import { useNavigate,useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

function ProductGallery() {
    const params = useParams();
    const [images,setImages] = useState([]);
    const [upload,setupload ] = useState("");
   const [file, setFile] = useState({}); 

    useEffect(() =>{
       getImages();
    },[])

    const getImages=() =>{
        axios.get(`http://localhost:8000/product/product/${params.id}`)
         .then( (resp) =>{
            console.log("respo",resp.data.data[0].productPictures)
            setImages(resp.data.data[0].productPictures);
        }   )
         .catch( (error)=>{console.log("Error",error.message)})
    }

    function deleteimg(id) {  // Delete opttions
        // e.preventDefault();
        Swal.fire({
            title: 'Do you want to Delete this Product?',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
        })
            .then((result) => {
                if (result.isConfirmed) {    
                 axios.patch(` http://localhost:8000/product/remove `,{ id :params.id , imageId : id} )
                  /*  fetch(`http://localhost:4000/cars/remove/${params.id}`, {
                        method: 'DELETE',
                        headers: {  
                            "Content-Type": "application/json",
                            "Accept": "application/json" ,
                            "x-access-token":localStorage.getItem('isLoggedIn')
                          }, 
                    })          */
                    .then((resp) => {
                        console.log(resp.message);
                        Swal.fire("Product Deleted successfully", resp.message)
                      //  setDeleteFetch(true);
                       // console.log(resp)
                       getImages();
     
                    })
                }
            }
            )
     }

     function uploadimg(e){
        debugger;
        const files = e.target.files;
          setFile(files);  
          console.log("image is ",files) 
          console.log("image2 is ",file) 
       }

     async function saveimg(e){
        debugger;
        const formData = new FormData();
       
      for (let i = 0; i < file.length; i++) {            //val of i? and uploadedFiles
          formData.append("productPictures", file[i]);     
      } 
        console.log("formData",formData)
        
        let url = ` http://localhost:8000/product/images/${params.id} `
        const config = {     
          headers: { 'content-type': 'multipart/form-data' }
      }
      
       axios.patch(url, formData , config)
         .then((res) => {
          console.log("RESPONSE IS",res)
         })
         .catch((error)=>{
           console.log(error)
         }   )
         getImages();
     }
  return (
    <div>

        {/* {Array.from(image)?.map((item) =>{ */}
        <div className='container row '>
        
        {  Array.from(images).map(item =>{ 
                    
                    return(
                 <div className = "col-md-3 Gallery text-center my-3 px-4 " > 
                     <img  key={Math.random()} className=" " src={`http://localhost:8000/${item.path}`} alt="image" />

                      <button className="btn btn-danger  " onClick={() =>{deleteimg(item._id)} } >Delete  </button>   
                 
                   </div>   

                    )
                })
            } 
        </div> 
     <br /><br /><br />
     <div>      
       <h5> Add Product Photos</h5>        
       <input id='fileUpload' type='file' multiple placeholder='Enter photo'  onChange={uploadimg} />   
       <button type="button" className="btncarGal btn-primary btn-lg mb-3"  onClick={saveimg}>ADD image</button>
     </div>  

    </div>
  )
}

export default ProductGallery