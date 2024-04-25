const createError = require("http-errors");
const mongoose = require("mongoose");
const Product = require("../Models/Product.model");
const slugify=require('slugify');

const shortid=require('shortid');

module.exports = {

  //get all products

   getAllProducts: async (req, res) => {
    const products= await Product.find({})
  .select("_id name price quantity description productPictures category")
      .populate({ path: "category", select: "_id name" })
      .exec();
    
    res.json({products});
    
  },

  //Add new Product
  createNewProduct: async (req, res, next) => {
  console.log('req-body',req.body);
 try {

  const product = new Product(req.body)
  const result = await product.save();
  res.send(result);

  }catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
  }
  next(error)
} 
},

//  createNewProduct: async (req, res) => {

// const{name,price,desc,category, quantity,offer} = req.body

//    let productPictures=[];
//    if(req.files.length>0){
//     productPictures=req.files.map(file=>{
//       return {img:file.path}
//     });

//    }
//    try{
//     const product=new Product({
//       name:name,
//      price,
//       desc,
//        productPictures,
//       category,
//       quantity,
//       offer
//       });
//       const result=await product.save();
//       res.send(result);
//     }catch(error){
//       console.log(error.message);
//       if(error.name=='ValidationError'){
//         next(createError(422,error.message));
//         return;
//       }
//       next(error);
//     }
//   },
    
  // product.save(((error,product)=>{
  //     if(error)return res.status(400).json({error});
  //     if(product){
  //       res.status(201).json({product});
  //     }
  //   }));
  // }
    
    

   // get all products

  // getAllProducts : async (req, res) => {

  //   const products = await Product.find({ } )
  //     .select("_id name price quantity description productPictures category")
  //     .populate({ path: "category", select: "_id name" })
  //     .exec();
  
  //   res.status(200).json({products});
  //   console.log("product is ",products);
  // },
  // findProductById: async (req, res, next) => {
  //   const id = { is_deleted: false, _id: mongoose.Types.ObjectId(req.params.id) }
  //   try {
  //     const product = await Product.findById(id);
      
  //     if (!product) {
  //       throw createError(404, 'Car does not exist.');
  //     }
  //     res.send(product);
  //   } catch (error) {
  //     console.log(error.message);
  //     if (error instanceof mongoose.CastError) {
  //       next(createError(400, 'Invalid Car id'));
  //       return;
  //     }
  //     next(error);
  //   }
  // },



    //Get a single product by Id
  getProductById: async (req, res) => {

    const products=await Product.findById(req.params.id)

    .select("_id name price quantity description category productPictures")
    .populate({ path: "category", select: "_id name" })
    .exec();

    if(products){

    res.status(200).json(products);
     
     
    }
    else{
      res.status(404)
      throw  new Error("Product not Found")

    }
    
  },

  //update product details

    updateProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;

    
      console.log(req.body)
      const result = await Product.findByIdAndUpdate(id, updates);
      res.status(200).send({ message: "Product updated successfully", result });
      if (!result) {
        throw createError(404, 'Product does not exist');
      }
      //res.status(200).send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Product Id'));
      }

      next(error);
    }
  },

  //add product images
  updateProductImages: async(req, res, next) => {
    console.log('req.body',req.body);
    var doc = [];
    if (req.files !== undefined) {
      for (var i = 0; i < req.files.length; i++) {
        doc.push({path: req.files[i].path});
      }
    }
    try {
     
      const result = await Product.updateOne(
          { _id: req.params.id }, 
          { $push: { productPictures: doc } }
      );
      console.log("inside result",result);
      res.status(200).send({ message: "Pictures added successfully", result });
    
    } catch (error) {
      console.log("inside catch",error.message);
      next(error);
    }
},

//get all images wth product details
getAllProductImages: async (req, res, next) => {
  try {
    

    let query = { is_deleted: false }
  
   
    const Id = mongoose.Types.ObjectId(req.params.id) 
    const products = await Product.find({_id:Id});
    const result ={
    data:products,
     
      
    }
    
   res.status(200).send(result);

  } catch (error) {
    console.log(error.message);
  }
},
//delete images

deleteProductImages: async (req, res, next) => {
  
  
  try {
    const imageId = mongoose.Types.ObjectId(req.body.imageId) 
   const productId = mongoose.Types.ObjectId(req.body.id) 

    const result = await Product.updateOne(
      {_id:productId},
      {$pull:{productPictures:{_id:imageId}}},
      {multi: true}
      );
   
    if (!result) {
      throw createError(404, 'product does not exist');
    }
    res.status(200).send({ message: "Selected Image deleted successfully", result });
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid product Id'));
    }

    next(error);
  }
},

  
 


  //Delete product by Id
 deleteAProduct: async (req, res, next) => {
    const id = req.params.id;
    const update = { is_deleted: true };

    try {
      const result = await Product.findByIdAndDelete(id, update);
      
      if (!result) {
        throw createError(404, "product does not exist.");
      }
      res.send({ message: "product deleted successfully", result });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid product id"));
        return;
      }
      next(error);
    }
  },

//update product with reviews
productReviews: async (req, res, next) => {
  // console.log('req-body',req.body);
  
  try {

    const updates = req.body;
    // if (updates.reviewer === undefined) {
    //   updates.reviewer = req.email;
    //   console.log("jwt getting email", req.email)
    // }

    const result = await Product.findByIdAndUpdate({_id:req.params.id},{$push:{reviews:updates}})
    if (!result) {
      throw createError(404, 'Product does not exist');
    }
    res.status(200).send({ message: "Reviews added successfully", result });
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Product  Id'));
    }

    next(error);
  }
},

searchProduct:async(req,res)=>{
  // var regex = RegExp(req.params.name,'i');
  // Product.find({name:regex }).then((result)=>{
  //   res.status(200).json(result)
  // })

  console.log(req.params.key)
  let data=await Product.find({
    "$or":[

      {"name":{$regex:req.params.key} },
      // {"category":{$regex:req.params.key}}
    ]

  })
  res.send(data);
  
},





};