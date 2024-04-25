const mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt=require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName:{
    type:String,
   // required:true,
    trim:true,
    min:3,
    max:10
  },
  lastName:{
    type:String,
    //required:true,
    trim:true,
    min:3,
    max:10
  },

   email:{
    type: String, 
    //required:true,
    unique:true,
    trim:true,
    lowercase:true,
    
     match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
   
  },

  Password: {
    type: String,
//required:true,
 },
 role:{
  type:String,
  enum:['user','admin',"super-admin"],
  default:'user'
 },

  ContactNumber: { 
    type: Number,
 },
 profilePicture:{
  type:String
},

is_deleted: {
  type: Boolean,
  default: false
},


}, {timestamps:true});



UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});



UserSchema.methods={
  authenticate: async function(password){
    //returns true or false
    return  await bcrypt.compare(password,this.Password);
  }
}


UserSchema.plugin(uniqueValidator);
const User = mongoose.model('User', UserSchema);
module.exports = User;


