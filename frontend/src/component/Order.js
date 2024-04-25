import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate ,NavLink} from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import Swal from "sweetalert2";


const OrderList = () => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [deleteFetch, setDeleteFetch] = useState(false);
  const [quantity,setQuantity]=useState(1)
  const navigate = useNavigate();





  var order_id = " ";

  //Delete order
  function deleteOrder() {
    Swal.fire({
      title: "want to delete this Product?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
         orderId :order_id
        };
        const config = {
          headers: {
            Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
          },
        };

        axios
          .patch(`http://localhost:8000/order/remove`, data, config)
          .then((res) => {
            fetchOrderDetails();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }


  // get order items
  const fetchOrderDetails = async () => {
    const response = await axios.get(`http://localhost:8000/order/getorders`, {
      headers: {
        Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
      },
    });
    setOrderDetail(response.data.orders); 
  };


// update quantity of product 
// const updateQuantity = (e) => {
//   e.preventDefault();
//   const config = {
//     headers: {
//       Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
//     },
//   };
//   const data = {
//     order: {
//       items:[
//        {
//         quantity: quantity,
//        }
//       ]
//     },
//   };
//   axios
//     .patch(`http://localhost:8000/order/update`, data, config)
//     .then((res) => {
//       if (res.data.status === 400) {
//         alert("update quantity again");
//       } else {
//         alert("quantity updated successfully");
//       }
//     });
// };


  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    // console.log("sotorage===============", isLoggedIn);
    if (isLoggedIn === null || isLoggedIn === undefined) {
      navigate("/");
      setDeleteFetch(false);
    }

    fetchOrderDetails();
  }, [deleteFetch]);

  return (
    <div className="container pt-4 mt-4">
      <div className="order_details">
        <div className="row border">
        {
          orderDetail.map((item)=>{
            order_id=item._id;
            return(
            
            item.items.map((sub)=>{
             return(
              <>
              <div className="col-md-4">
                {
                  sub.productId.productPictures.map((leaf,i)=>{
                    if(i===0){
                      return(
                    
                      <div className="order_image text-center">
                      <img
                        src={`http://localhost:8000/${leaf.path}`}
                        alt="error in path"
                      />
                      </div>
                     
                    )
                    }
                  })
                }
               </div>
               <div className="col-md-8 p-4" >
                   <div>
                   <label>total Price :</label>
                   <strong className="px-4">{sub.payablePrice}</strong>
                   </div>
                   <div>
                    <label>Total Quantity :</label>
                    <strong>{sub.purchasedQty}</strong>
                   </div>
                   <strong className="btn btn-link mt-5 pg-4" style={{border:"none",outline:"none"}} onClick={deleteOrder}>Remove Order</strong>
                 </div>
                 </>
             )
            })
          )})
        }
        </div>
      </div>
    </div>
  )
  }
export default OrderList;
