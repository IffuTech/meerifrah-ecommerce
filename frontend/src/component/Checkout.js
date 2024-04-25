import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const Checkout = () => {
  const params = useParams();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [adress, setAdress] = useState([]);
  const [editAdress, setEditAdress] = useState("");
  const [selectedAdress, setSelectedAdress] = useState("");
  const [checkoutInput, setCheckoutInput] = useState({
    name: " ",
    phone: "",
    pincode: "",
    locality: "",
    adress: "",
    cityDistrictTown: "",
    state: "",
    landmark: "",
    alternateNumber: "",
  });

  // const [product_id, setProdict_id] = useState([]);
  //  var productId= product_id.map((item)=>{
  //        {item.product}
  //   })
  //   var purchasedQty= product_id.map((item)=>{
  //     {item.quantity}
  // })

  var totalPayable = 0;
  var pdo_id;
  var pdo_qty = 0;

  // get cart items
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8000/cart/getCartItems`,
      {
        headers: {
          Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
        },
      }
    );
    setCart(response.data.cartItems);
  };

  // get Adress
  const getAdress = async () => {
    const res = await axios.get(`http://localhost:8000/address/getaddress`, {
      headers: {
        Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
      },
    });
    // console.log("adress''''", res.data.userAddress.address)
    setAdress(res.data.userAddress.address);
    setEditAdress(res.data.userAddress.address);

  };

  // const HandleNewAdress=(item)=>{
  //   let data={
  //     addressId:item._id,
  //     totalAmount:total,
  //     items:{
  //   productId:productId,
  //   purchasedQty:purchasedQty

  //     }
  //   }
  //   axios.post(`http://localhost:8000/order/addorder`,data,{ headers: {
  //     "Authorization":`Barear ${localStorage.getItem('isLoggedIn')} `
  //   }, }).then(res=>{
  //     if(res.data.status===400){
  //       alert("full address required")
  //     }else{
  //       alert("adress successfully updated")
  //     }
  // }
  // )
  // }

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    // console.log("sotorage===============", isLoggedIn);
    if (isLoggedIn === null || isLoggedIn === undefined) {
      navigate("/");
    }
    fetchData();
    getAdress();
    // getEditAdress();
  }, []);

  const handleInput = (e) => {
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  const placeOrder = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
      },
    };
    const data = {
      payload: {
        address: {
          name: checkoutInput.name,
          mobilenumber: checkoutInput.phone,
          pincode: checkoutInput.pincode,
          locality: checkoutInput.locality,
          cityDistrictTown: checkoutInput.cityDistrictTown,
          landmark: checkoutInput.landmark,
          alternateNumber: checkoutInput.alternateNumber,
          addressType: checkoutInput.adress,
        },
      },
    };
    axios
      .post(`http://localhost:8000/address/create`, data, config)
      .then((res) => {
        if (res.data.status === 400) {
          alert("full address required");
        } else {
          alert("adress successfully Added");
        }
      });
  };

  // onclick post Adress on order api

  const select_onClickAdress = (e) => {
    e.preventDefault();
    const data = {
      addressId: selectedAdress,
      totalAmount: totalPayable,
      items: [
        {
          productId: pdo_id,
          payablePrice: totalPayable,
          purchasedQty: pdo_qty,
        },
      ],
    };

    axios
      .post(`http://localhost:8000/order/addorder`, data, {
        headers: {
          Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
        },
      })
      .then((res) => {
        navigate("/order")
      })
      .catch((error) => {
        return error;
      });
  };

  // const getEditAdress = async () => {
  //   const res = await axios.get(`http://localhost:8000/adress/${params.id}`);
  //   console.log("user.adresssssssssssssssssssssssss", res.data);
  //   setEditAdress(res.data);
  // };
  // const EditAdress = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("name", editAdress.name);
  //   formData.append("mobileNumber", editAdress.mobileNumber);
  //   formData.append("pinCode", editAdress.pinCode);
  //   formData.append("locality", editAdress.locality);
  //   // formData.append("address", editAdress.address);
  //   // formData.append("cityDistrictTown", editAdress.cityDistrictTown);
  //   // formData.append("state", editAdress.state);
  //   // formData.append("landmark", editAdress.landmark);
  //   // formData.append("alternatePhone", editAdress.alternatePhone);

  //   console.log("formdata in if ", formData);

  //   // for (var key of formData.entries()) {
  //   //   console.log("loop", key[0] + ", " + key[1]);
  //   // }

  //   const config = {
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   };
  //   // console.log("dat is ", data);

  //   axios
  //     .patch(`http://localhost:8000/adress/${params.id}`, formData, config)
  //     .then((res) => {
  //       console.log("resp of ADD PRODUCT ", res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   //   navigate("/");
  //   alert("Edited successfully");
  // };


console.log("carttttttttttttttttttt",cart)

  const result = Object.entries(cart);
  let checkout_body = " ";
  if (result.length >= 0) {
    checkout_body = (
      <div className="row mt-4 pt-4">
        <div className="col-md-6 adress_form">
          <form>
            <h2 className="mb-4 pt-4 text-center text-decoration-underline">
              Enter New Adress
            </h2>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Full Name </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleInput}
                  value={checkoutInput.name}
                  required
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Mobile no.</label>
                <input
                  type="tel"
                  className="form-control"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  name="phone"
                  onChange={handleInput}
                  value={checkoutInput.phone}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  onChange={handleInput}
                  value={checkoutInput.pincode}
                  required
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Locality</label>
                <input
                  type="text"
                  className="form-control"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  name="locality"
                  onChange={handleInput}
                  value={checkoutInput.locality}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <label className="form-label">Adress</label>
                <textarea
                  class="form-control"
                  placeholder="Enter current Adress"
                  name="adress"
                  onChange={handleInput}
                  value={checkoutInput.adress}
                  required
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">City / District / Town</label>
                <input
                  type="text"
                  className="form-control"
                  name="cityDistrictTown"
                  onChange={handleInput}
                  value={checkoutInput.cityDistrictTown}
                  required
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">state</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  onChange={handleInput}
                  value={checkoutInput.state}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">landmark</label>
                <input
                  type="text"
                  className="form-control"
                  name="landmark"
                  onChange={handleInput}
                  value={checkoutInput.landmark}
                  required
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">alternate Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  name="alternateNumber"
                  onChange={handleInput}
                  value={checkoutInput.alternateNumber}
                  required
                />
              </div>
            </div>

            <NavLink
              type="submit"
              to="/checkout"
              className="btn btn-success float-end  btn-sm"
              onClick={placeOrder}
            >
              Save Adress
            </NavLink>
          </form>
        </div>
        <div className="col-md-6"></div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="checkout_adress mt-4 pt-4">
        <div className=" row">
          <div className="col-md-7">
            {adress?.map((item) => {
              return (
                <>
                  <div className="db_adress_bar" key={item._id}>
                    <div className="row">
                      <div className="col-md-10 db_adress">
                        <form onSubmit={select_onClickAdress}>
                          <input
                            type="radio"
                            name="adress"
                            value={item._id}
                            checked={selectedAdress === item._id}
                            onChange={(e) => setSelectedAdress(e.target.value)}
                          />
                          &nbsp;
                          <strong>{item.name}</strong>
                          <div className="d-flex">
                            &nbsp;<span> {item.locality}</span>&nbsp;
                            <span> {item.landmark}</span>&nbsp;
                            <span>{item.cityDistrictTown}</span>
                          </div>
                          <div className="Adress_button">
                            <button
                              to="/order"
                              type="submit"
                              style={{
                                background: "#fb641b",
                                color: "white",
                                padding: "4px 14px",
                                marginTop: "15px",
                                border: "none",
                                outline: "none",
                                borderRadius: "8px",
                              }}
                            >
                              DELIVER HERE
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-2 existing_adress_link">
                       {editAdress.map((item)=>{
                        return(
                          <NavLink to ={`/editaddress/${item._id}`} ><FaEdit/></NavLink>
                        )
                       })}
                         
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="col-md-5">
            <div className="order">
              <div className="">
                <table className="table table-bordered cart_table">
                  <thead>
                    <tr className="">
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Product Price</th>
                      <th>Product Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(cart).map((key, index) => {
                      totalPayable += cart[key].price * cart[key].qty;
                      pdo_id = key; 
                      pdo_qty = cart[key].qty;
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
                          </tr>
                        </>
                      );
                    })}
                    <tr>
                      <td colSpan="2" className="text-end fw-bold text-center">
                        Grand Total
                      </td>
                      <td colSpan="2" className="text-end fw-bold text-center">
                        ₹&nbsp;{totalPayable}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {checkout_body}
    </div>
  );
};

export default Checkout;