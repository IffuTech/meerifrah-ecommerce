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
                          
                        </div>
                      );
                    }
                  })}
                  <div className="col-md-6">
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
                  <div className="col-md-2 order_status">
                    <span  style={{color:"green"}}>Ordered</span>
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
