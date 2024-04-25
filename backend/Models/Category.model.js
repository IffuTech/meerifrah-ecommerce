const mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    
    type:{
        type:String
    },
    
   
    parentId:{
        type:String
    },

    
  is_deleted: {
    type: Boolean,
    default: false
  },

},
          {timestamps:true}
);

CategorySchema.plugin(uniqueValidator);
const Category = mongoose.model('category', CategorySchema);
module.exports = Category;


