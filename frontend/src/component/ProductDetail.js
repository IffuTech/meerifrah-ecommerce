import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaMinus, FaStar } from "react-icons/fa";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState("");
  const [proPic, setProPic] = useState([]);
  const [mainImg, setMainimg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate("");
  // const [token,setToken] = useState("");
  const [selected, setselected] = useState(null);
  const [rating, setRating] = useState("");
  const [hover, setHover] = useState(null);
  const [commit, setCommit] = useState("");

  const handleDecreement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncreement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };


  const addToCart = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
      },
    };
    const data = {
      cartItems: {
        product: product._id,
        // name:product.name,
        // img:proPic[0].img,
        quantity: quantity,
        // price:product.price
      },
    
    };
    axios
      .post(`http://localhost:8000/cart/addcart`, data, config)
      .then((res) => {
        if (res.data.status === 400) {
          alert("add product again");
        } else {
          alert("product added successfully");
        }
      });
  };

  useEffect(() => {
    getCart();
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    // console.log("sotorage===============", isLoggedIn);
    if (isLoggedIn === null || isLoggedIn === undefined) {
      navigate("/");
    }
  }, []);

  function getCart() {
    axios
      .get(`http://localhost:8000/product/${params.id}`)
      .then((res) => {
        // console.log("product detail", res.data.products);
        setProduct(res.data);
        setProPic(res.data.productPictures);
        setMainimg(res.data.productPictures[0].path);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function display(i) {
    if (selected == i) {
      return setselected(null);
    }
    setselected(i);
  }

  function displayImg(path) {
    console.log("path is", path);
    setMainimg(path);
  }




  const updateproduct = () => {
    const config = {
      headers: {
        Authorization: `Barear ${localStorage.getItem("isLoggedIn")} `,
      },
    };
    const reviews = {
      rating:rating,
      comments:commit,
    };
    console.log("reviews dataaaaaaaaaaa",reviews)
    axios
      .patch(`http://localhost:8000/product/reviews/${params.id}`, reviews, config)
      .then((res) => {
       
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-2">
              <div className="small_images mt-2">
                {Array.from(proPic).map((item, i) => {
                  return (
                    <img
                      src={`http://localhost:8000/${item.path}`}
                      alt="kid"
                      onClick={() => {
                        displayImg(item.path);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-md-10">
              <div className="main_img text-center">
                <img
                  src={`http://localhost:8000/${mainImg}`}
                  alt={mainImg.path}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h3>{product.name}</h3>

          <div className="review_star">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <>
                  
                  <label>
                    <input
                      type="radio"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      className="star"
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      onClick={updateproduct}
                    />
                  </label>
                </>
              );
            })}
            <br />

            <textarea className="form-control" placeholder="Enter Your review...." onChange={(e)=>setCommit(e.target.value)}/>
          </div>
          <span>{product.desc}</span>
          {product.quantity < 1 ? (
            <strong style={{ color: "red" }}>{product.name}is out of stock</strong>
          ) : (
            <strong style={{ color: "green" }}>
              {product.name} is avaliable to Buy
            </strong>
          )}
          <p>
            Price :<strong>{product.price}</strong>
          </p>

          {product.offer === " " ? (
            " "
          ) : (
            <strong>
              <span>Offer : </span>₹ {product.offer}
            </strong>
          )}
          <br />
          <br />
          <div className="quantity">
            <button type="button" onClick={handleDecreement}>
              <FaMinus />
            </button>
            <input value={quantity} />
            <button type="button" onClick={handleIncreement}>
              <FaPlus />
            </button>
          </div>
          {product.quantity < 1 ? (
            <NavLink to="/" className="mt-4 btn btn-link mtn-sm pt-4">
              Find Other Products
            </NavLink>
          ) : (
            <button className="btn btn-success mt-4" onClick={addToCart}>
              add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
