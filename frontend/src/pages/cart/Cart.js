import { useState, useEffect } from "react";
import "./Cart.css";
import axios from "axios";
import empty_cart from "../../Images/empty_cart.png";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Cart = () => {
  const [cart, setCart] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [deleteFetch, setDeleteFetch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  var totalPayable = 0;
  var product_id_cart = " ";

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8000/cart/getCartItems`,
      {
        headers: {
          Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
        },
      }
    );
    console.log("cart items'''''''''''", response.data.cartItems);
    setCart(response.data.cartItems);
  };

  function deleteCategory() {
    Swal.fire({
      title: "want to delete this Product?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          payload: {
            productId: product_id_cart,
          },
        };
        const config = {
          headers: {
            Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
          },
        };

        axios
          .post(`http://localhost:8000/cart/removeItem`, data, config)
          .then((res) => {
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  // const handleDecreement=(cart_id)=>{
  //   setCart(cart=>
  //     cart.map((item)=>
  //     cart_id===item._id ?{...item, quantity:item.quantity  -1}:item)
  //     )
  // }
  // const handleIncreement=(cart_id)=>{
  //   setCart(cart=>
  //     cart.map((item)=>
  //     cart_id===item._id ?{...item, qquantity:item.quantity  + 1}:item)
  //     )
  // }
  // const handleDecreement =()=>{
  //   if(quantity > 1){
  //     setQuantity(prevCount => prevCount -1)
  //   }
  // }
  // const handleIncreement =()=>{
  //   if(quantity <10){
  //     setQuantity(prevCount => prevCount +1)
  //   }
  // }

  // const remove_item=(e,cart_id)=>{
  //   e.preventDefault();
  //  const removeProduct = e.currentTarget;
  //  removeProduct.innerText ="removing"

  //  axios.delete(`http://localhost:8000/cart/list${cart_id}`).then(res=>{
  //   if (res.data.status===200 ){
  //     alert("removed product")
  //     removeProduct.closest("li").remove();
  //   }
  //  })

  // }

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("sotorage===============", isLoggedIn);
    if (isLoggedIn === null || isLoggedIn === undefined) {
      navigate("/");
    }
    fetchData();
    setDeleteFetch(false);
  }, [deleteFetch]);

  //logout

  const userLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  // login

  const userLogin = () => {
    setIsLoggedIn(true);
  };

  // if(loading){
  //   return <h4>loading cart page</h4>
  // }



  const result = Object.entries(cart);

  let cart_body = " ";
  if (result.length >= 1) {
    cart_body = (
      <div className="container pb-4">
        <table className="table table-bordered mt-4 pt-4 cart_table">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              <th>Dlelte Product</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cart).map((key, index) => {
              totalPayable += cart[key].price * cart[key].qty;
              // console.log("product_id''''''",cart[key].product)
              product_id_cart = cart[key].product;
              return (
                <>
                  <tr key={index}>
                    <td>
                      <img
                        src={`http://localhost:8000/${cart[key].path}`}
                        alt="error in path"
                      />
                    </td>
                    <td> {cart[key].name}</td>
                    <td>{cart[key].price}</td>
                    <td>{cart[key].qty}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        data-bs-target="#exampleModal"
                        onClick={() => deleteCategory()}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <div className="total mt-3">
          <strong>
            Card Total : ₹ <span>{totalPayable}</span>
          </strong>

          <br />
          <NavLink to="/checkout" className="btn btn-success mt-2">
            Checkout
          </NavLink>
          <br />
        </div>
      </div>
    );
  } else {
    cart_body = (
      <div className="container mt-4">
        <div className="container empty_cart">
          <img
            src={empty_cart}
            alt="Your cart is empty"
            style={{ margin: "0 35%" }}
          />
          <div className="go_to_home text-center">
          <strong>Your Cart is empty!</strong><br/>
          <span>Add Items to it now</span><br/>
          <NavLink to="/" className="btn btn-primary">Shop Now</NavLink>
          </div>
        </div>
      </div>
    );
  }
  return <>{cart_body}</>;
};
export default Cart;

// import { useState, useEffect } from "react";
// import "./Cart.css";
// import axios from "axios";
// import empty_cart from "../../Images/empty_cart.png";
// import { NavLink, useNavigate } from "react-router-dom";
// import { FaTrash } from "react-icons/fa";
//  import Swal from 'sweetalert';

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useState();
//   const [deleteFetch, setDeleteFetch] = useState(false);

//   var totalPayable = 0;

//   const fetchData = async () => {
//     const response = await axios.get(`http://localhost:8000/cart/getCartItems`, { headers: {
//       "Authorization":`Barear ${localStorage.getItem('isLoggedIn')} `
//     }, });
//     console.log("cart items'''''''''''",response.data.cartItems)
//     setCart(response.data.cartItems);
//   };

//   useEffect(() => {
//     let isLoggedIn = localStorage.getItem("isLoggedIn");
//     console.log("sotorage===============", isLoggedIn);
//     if (isLoggedIn === null || isLoggedIn === undefined) {
//       navigate("/");
//     }
//     fetchData();
//     setDeleteFetch(false);
//   }, [deleteFetch]);

//   function deleteCategory(id) {  // Delete opttions
//     // e.preventDefault();
//     Swal.fire({
//         title: 'want to delete this Product?',
//         // showDenyButton: true,
//         showCancelButton: true,
//         confirmButtonText: 'Delete',
//         denyButtonText: `Cancel`,
//     })
//         .then((result) => {
//             if (result.isConfirmed) {
//                 fetch(`http://localhost:8000/product/${id}`, {
//                     method: 'DELETE',
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Accept": "application/json" ,
//                       },
//                 }).then((resp) => {
//                     console.log("delete msg",resp.message);
//                     Swal.fire("Product deleted ", resp.message)
//                     setDeleteFetch(true);
//                     console.log(resp)
//                    })
//             }
//         }
//         )
//       };
//       return (
//         <>
//          <div className="Cart">
//           {
//             Object.keys(cart).map((key,index)=>
//             <div key={index} >
//             <div>
//             {cart[key].name}
//             {cart[key].price}

//             <img
//                src={`http://localhost:8000/${cart[key].img}`}
//                alt="error in path"
//                  />
//             </div>
//             </div>

//             )
//           }
//          </div>
//         </>
//       );
//     };

// export default Cart;
