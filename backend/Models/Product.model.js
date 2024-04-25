const mongoose = require("mongoose");
const validator = require("validator");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      // required:true ,
      // unique:true,
    },

    desc: {
      type: String,
      // required:true,
      trim: true,
    },
    price: {
      type: Number,
      // required:true
    },
    offer: {
      type: Number,
    },
    quantity: {
      type: Number,
      // required:true
    },

    productPictures:[{filename:String,path:String,thumbnail:String}],

    // productPictures: [
    //   {
    //     img: { type: String },
    //   },
    // ],
   
   

    is_deleted: {
      type: Boolean,
      default: false,
    },

    // discounted_price:{
    //   type:String,

    // },
    // discount:{
    //   type:String,

    // },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    reviews:[{
        rating:String,comments:String,reviewer:String,reviewerId:String,isActive:Boolean,DateAndTime: {
            type:Date, 
            default: Date.now 
          },
    
    }],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    updatedAt: Date,
  },
  { timestamps: true }
);

ProductSchema.plugin(uniqueValidator);
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
