const mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
 
  user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},

  cartItems:[
    {
      product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
      
      quantity:{type:Number,default:1},
      // price:{type:Number,required:false}
    }
  ],

  is_deleted: {
    type: Boolean,
    default: false,
  },

},



  {timestamps:true}
  
);

CartSchema.plugin(uniqueValidator);
const Cart= mongoose.model('cart', CartSchema);
module.exports = Cart;


