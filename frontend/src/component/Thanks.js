import React, { useState,useEffect } from 'react';
import girnar_logo from "../Images/Girnarcare-Logo-1.png";
import axios from 'axios';

const Thanks = () => {
  const getOrder = async () => {
    // const [order,setOrder]=useState([]);
    const res = await axios.get(`http://localhost:8000/order/getorder`);
    console.log("orrderrrrrrrr",res.data)
    // setOrder(res.data);
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
    <div className="container">
    <div className="text-center success_order">
    <img src={girnar_logo} alt={girnar_logo}/>
    <h1>Thank you!</h1>
    <strong><i>visit again Girnarcare Online shopping site</i></strong>
    </div>
    </div>
    </>
  )
}

export default Thanks;
