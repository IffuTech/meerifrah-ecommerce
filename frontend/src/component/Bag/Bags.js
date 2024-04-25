import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./bag.css";
import { NavLink } from "react-router-dom";


const Bags = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getBag();
  }, []);

  function getBag() {
    axios
      .get(`http://localhost:8000/product/list`)
      .then((resp) => {
        setProduct(resp.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const current_id = params._id;

  return (
    <div className="container mt-4">
      <div className="row">
        {product.map((item) =>{
          if (current_id === item.category) {
            return (
              <div className="cat_by_id col-md-3">
              <h2>{item.category}</h2>
                  <NavLink to={`/productDetail/${item._id}`}>
                  {item.productPictures.map((pic,i ) => {
                    if(i<1){
                    return(
                    <img
                      src={`http://localhost:8000/${pic.path}`}
                      alt="error in path"
                    />
                    )}
          })}
                  <strong>{item.name}</strong><br/>
                  <p>
                    <span>Price :</span>
                    {item.price}
                  </p>
                  </NavLink>
                </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Bags;
