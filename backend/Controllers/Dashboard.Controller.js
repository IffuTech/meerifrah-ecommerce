const mongoose = require('mongoose');
const User= require("../Models/User.model");
const Product= require("../Models/Product.model");
 const Category = require("../Models/Category.model");
 const Order = require("../Models/Order.model");
const { db } = require('../Models/User.model');

module.exports = {

     Total_Count : async(req,res, next) =>{

        const results = {}
        try{
              
    

    results.totalUsers = await User.aggregate([
   { "$match": { is_deleted: false} },
       { "$group": { _id: "$is_deleted", count: { $sum: 1 } }}
    ])
   } catch (error) {
      console.log(error)
    }



    try {
        results.totalProducts = await Product.aggregate([
          // { "$match": { is_deleted: false } },
  
          { "$group": { _id: "$is_deleted", count: { $sum: 1 } } },
    
        ])
      } catch (error) {
        console.log(error)
      }

      try {
        results.totalCategories = await Category.aggregate([
          // { "$match": { is_deleted: false } },
  
          { "$group": { _id: "$is_deleted", count: { $sum: 1 } } },
    
        ])
      } catch (error) {
        console.log(error)
      }

      try {
        results.totalOrders= await Order.aggregate([
          // { "$match": { is_deleted: false } },
  
          { "$group": { _id: "$is_deleted", count: { $sum: 1 } } },
    
        ])
      } catch (error) {
        console.log(error)
      }

   


  
 res.status(200).send(results);



        
     } 
    
    
}