const express = require('express');
const router = express.Router();


const CategoryController = require('../Controllers/Category.Controller');
const{requireSignin,adminMiddleware}=require('../middleware');


//Get all categories
router.get('/list', CategoryController.getAllCategories);

//Create a new category
router.post('/add', CategoryController.createNewCategory);


//Delete category  by id
router.delete('/:id', CategoryController.deleteCategory);


//update category
router.patch('/:id',CategoryController.updateCategory);


// router.get('/search/:name', CategoryController.searchProduct);


module.exports = router;
