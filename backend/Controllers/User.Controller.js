const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const shortid = require("shortid");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};


module.exports = {

//Get a list of users

  getAllUsers: async (req, res) => {
    const users= await User.find({});
    res.json(users);
    
  },

  //Create new user

   signup : (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (user)
        return res.status(400).json({
          error: "User already registered",
        });
  
      const { firstName, lastName, email,password} = req.body;
      const Password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        Password,
        
        
      });
  
      _user.save((error, user) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
  
        if (user) {
          const token = generateJwtToken(user._id, user.role);
          const { _id, firstName, lastName, email, role, fullName } = user;
          return res.status(201).json({
            token,
            user: { _id, firstName, lastName, email, role, fullName },
          });
        }
      });
    });
  },
  
  //login user

  signin : (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        const isPassword = await user.authenticate(req.body.password);
        if (isPassword && user.role === "user") {
         
          const token = generateJwtToken(user._id, user.role);
          const { _id, firstName, lastName, email, role, fullName } = user;
          res.status(200).json({
            token,
            user: { _id, firstName, lastName, email, role, fullName },
          });
        } else {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    });
  },
  
//Edit User Details
  
  updateUserDetails: async (req, res, next) => {
    try {
    
     const id = { _id: mongoose.Types.ObjectId(req.params.id), is_deleted: false };
      const updates = req.body;
      updates.updated_at = new Date();
      const options = { new: true };
      console.log(req.body)
      
      const result = await User.findByIdAndUpdate(id, updates);
      if (!result) {
        throw createError(404, 'User does not exist');
      }
      //res.send(result);
      res.status(200).send({ message: "User updated successfully", result });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid User Id'));
      }

      next(error);
    }
  },

  //get a single user by Id
  getUserById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);

      if (!user) {
        throw createError(404, 'User does not exist.');
      }
      res.send(user);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  },







  //Admin register

  adminSignup: (req, res,) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
  if (user)
    return res.status(400).json({
      message: "Admin already registered",
    });

       const { firstName, lastName, email,password } = req.body;
  
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      role:'admin'
      
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
     
      if (data) {
        return res.status(201).json({
          // user:data
          message: "Admin created Successfully..!",
        });
      }
    });
  
});

},

adminSignin: (req, res) => {
  User.findOne({email:req.body.email})
  .exec(async(error,user)=>{
    if(error)return res.status(400).json({error});
    if(user){
     
      
      if((req.body.password)&& user.role==='admin'){

        const token=jwt.sign({_id:user._id, email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
      const{_id,firstName,lastName,email,role,fullName}=user;
      res.status(200).json({
        token,
        user:{
          _id,firstName,lastName,email,role,fullName
        }
      });

      }else{
        return res.status(400).json({
          message:'Invalid Password'
        })
      }

    }else{
      return  res.status(400).json({message:'Something went wrong'})
    }
  })


},



deleteUser: async (req, res, next) => {
  const id = req.params.id;
 const update={is_deleted:true};
 // const options={new:true};
  try {
    const result = await User.findByIdAndDelete(id, update);
    // console.log(result);
    if (!result) {
      throw createError(404, 'User does not exist.');
    }
    res.send({message:"user deleted successfully",result});
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid User id'));
      return;
    }
    next(error);
  }
},

getUserById: async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    if (!user) {
      throw createError(404, 'User does not exist.');
    }
    res.send(user);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid User id'));
      return;
    }
    next(error);
  }
},
   

};



