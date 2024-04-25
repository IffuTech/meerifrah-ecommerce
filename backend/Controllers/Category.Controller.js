const createError = require("http-errors");
const mongoose = require("mongoose");
const Category = require("../Models/Category.model");

//recursive function
function  createCategories(categories,parentId =null){
  const categoryList=[];
  let category
  if(parentId == null){
  category=  categories.filter(cat=>cat.parentId==undefined)

  }else{
    category=categories.filter(cat=>cat.parentId == parentId);
    
  }
  for(let cate of category){
    categoryList.push({
      _id:cate._id,
      name:cate.name,
     children:createCategories(categories,cate._id)
    });
   
  }
  return categoryList;

};

module.exports = {
  
  
//get all created categories Api

  getAllCategories: async (req, res) => {
    Category.find({})
    .exec((error,categories)=>{
      if(error)return res.status(400).json({error});

      if(categories){

        const categoryList=createCategories(categories);

        res.status(200).json({categoryList});
      }
    })

    },

//create Categories Api
  createNewCategory: async (req, res,next) => {

  const categoryObj={
    name:req.body.name,
  }
   if(req.body.parentId){
    categoryObj.parentId=req.body.parentId
   }
   const cat=new Category(categoryObj);
   cat.save((error,category)=>{
    if(error)return res.status(400).json({error});
    if(category){
      return res.status(201).json({category});
    }

   });
    
  
  },

  //Delete Category Api
  
  deleteCategory: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Category.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Category does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Category id'));
        return;
      }
      next(error);
    }
  },


  
  updateCategory: async (req, res, next) => {
    try {
    
     const id = { _id: mongoose.Types.ObjectId(req.params.id), is_deleted: false };
      const updates = req.body;
      updates.updated_at = new Date();
      const options = { new: true };
      console.log(req.body)
      
      const result = await Category.findByIdAndUpdate(id, updates);
      if (!result) {
        throw createError(404, 'Category does not exist');
      }
      //res.send(result);
      res.status(200).send({ message: "Category updated successfully", result });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Category Id'));
      }

      next(error);
    }
  },

  // searchProduct:async(req,res)=>{
  //   var regex = RegExp(req.params.name,'i');
  //   Category.find({name:regex }).then((result)=>{
  //     res.status(200).json(result)
  //   })
    
  // },





};
