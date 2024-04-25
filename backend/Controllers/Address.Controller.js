const UserAddress = require("../Models/Address.model");
const Address = require("../Models/Address.model");
const createError = require("http-errors");

const mongoose = require("mongoose");

module.exports = {

addUserAddress : (req, res) => {
  const {payload}=req.body;
  if(payload.address){
   UserAddress.findOneAndUpdate({user:req.user._id},{
      "$push":{
        "address":payload.address
      }
    },{new:true,upsert:true})
    .exec((error,address)=>{
      if(error)return res.status(400).json({error});
      if(address){
        res.status(200).json({address});
      }
    });
  }else{
    res.status(400).json({error:"Address required"});
  }

 
  },

  //Delete  User Address

  removeAddress:(req, res) => {
    const {addressId } = req.body;
    if (addressId) {
      UserAddress.updateOne(
        { user: req.user._id },
        {
          $pull: {
            address: {
              _id: addressId,
            },
          },
        }
      ).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    }
  },



getUserAddress:(req, res) => {
  
  UserAddress.findOne({ user: req.user._id })
  .exec((error, userAddress) => {
    if (error) return res.status(400).json({ error });
    if (userAddress) {
      res.status(200).json({ userAddress });
    }
  });
},


updateAddress: async (req, res, next) => {
  console.log("req-body",req.body);
  const body=req.body;

  const id={_id:mongoose.Types.ObjectId(req.params.id)}

  
  let Address=await UserAddress.findOne({'address._id':id },{'address.$':1});
  
  let Add=Address.address[0]
 
  let updates= Object.assign(Add,body)
  let address=await UserAddress.findOneAndUpdate(
  

       {'address._id':id},
    {
      $set:{
        'address.$':updates,
      }
    },
    {new:true}

  );
  if(!address){
    console.log(err);
  }
  res.status(200).send(address);


 
},

};