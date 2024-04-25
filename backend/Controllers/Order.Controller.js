const Order = require("../Models/Order.model");
 const Cart = require("../Models/Cart.model");
 const createError = require("http-errors");
 const mongoose = require("mongoose");
 var jwt = require('jsonwebtoken');
 const Address = require("../Models/Address.model");

module.exports={


addOrder : (req, res) => {
  console.log('req-body',req.body);

 Cart.deleteOne({user:req.user._id}).exec((error,result)=>{

  if(error)return res.status(400).json({error});

  if(result){
    req.body.user = req.user._id;
    req.body.orderStatus=[
      {
        type:"ordered",
        date:new Date(),
        isCompleted:true,

    },
    {
      type:"packed",
      isCompleted:false,
    },
    {
      type:"shipped",
     isCompleted:false,

    },
    {
      type:"delivered",
      isCompleted:false,
    },
    {
      type:"return",
      isCompleted:false,
    },
    

  ];
    const order=new Order(req.body);
    order.save((error,order)=>{
      if(error)return res.status(400).json({error});
      if(order){
        res.status(201).json({order});
      }
    });

  }
});
  // req.body.user=req.user._id;
  // const order=new Order(req.body);
  // order.save((error,order)=>{
  //   if(error)return res.status(400).json({error});
  //   if(order){
  //     res.status(201).json({order});
  //   }
  // });
  
},

//Get all orders
getOrders : (req, res) => {
  Order.find({ user: req.user._id})
    .select("_id paymentStatus paymentType orderStatus items")
    .populate("items.productId", "_id name productPictures")
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({orders});
      }
      
    });
  

   
},
//delete order
// removeOrder:(req, res) => {
//   const {orderId } = req.body;
//   if (orderId) {
//     Order.updateOne(
//       { user: req.user._id },
//       {
//         $pull: {
//           items: {
//             _id: orderId,
//           },
//         },
//       }
//     ).exec((error, result) => {
//       if (error) return res.status(400).json({ error });
//       if (result) {
//         res.status(202).json({ result });
//       }
//     });
//   }
// },

//delete order

deleteOrder: async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Order.findByIdAndDelete(id);
    if (!result) {
      throw createError(404, 'Order does not exist.');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Order id'));
      return;
    }
    next(error);
  }
},
//get a single order

getOrder:(req, res) => {
  Order.findOne({ id: req.body.orderId })
    .populate("items.productId", "_id name productPictures")
    .lean()
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        Address.findOne({
          user: req.user._id,
        }).exec((error, address) => {
          if (error) return res.status(400).json({ error });
          order.address = address.address.find(
            (adr) => adr._id.toString() == order.addressId.toString()
          );
          res.status(200).json({
            order,
          });
        });
      }
    });
},
//update Order by Admin
//   Order.findOne({ _id: req.body.orderId })
//     .populate("items.productId", "_id name productPictures")
//     .lean()
//     .exec((error, order) => {
//       if (error) return res.status(400).json({ error });
//       if (order) {
//         Address.findOne({
//           user: req.user._id,
//         }).exec((error, address) => {
//           if (error) return res.status(400).json({ error });
//           order.address = address.address.find(
//             (adr) => adr._id.toString() == order.addressId.toString()
//           );
//           res.status(200).json({
//             order,
//           });
//         });
//       }
//     });
// },





//update order  by Admin
updateOrder:(req,res)=>{
  Order.updateOne(
    {_id:req.body.orderId,"orderStatus.type":req.body.type},
    // {user:req.body.userId,"orderStatus.type":req.body.type},
    {
      $set:{
        // "orderStatus.$":[{date:new Date(),isCompleted:true}],
        "orderStatus.$":[{type:req.body.type,date:new Date(),isCompleted:true}],
      },
    }

  ).exec((error,order)=>{
    if(error) return res.status(400).json({error});
    if(order){
      res.status(201).json({order});
    }
  });


},
//get orders by Admin

getCustomerOrders :async (req, res) => {

const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();
  res.status(200).json({ orders });
 
},




};