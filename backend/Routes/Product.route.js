const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/Product.Controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/products' });


const { requireSignin, adminMiddleware } = require('../middleware');

//Get a list of product details
router.get('/list', ProductController.getAllProducts);

//get all car images
router.get('/product/:id', ProductController.getAllProductImages);

//Create a new product
router.post('/create',ProductController.createNewProduct);

//Update product  with reviews
router.patch('/reviews/:id',requireSignin, ProductController.productReviews);


// router.post('/', upload.single('productPictures'),ProductController.createNewProduct);


//Update a product by id
router.patch('/update/:id',ProductController.updateProduct);

// router.patch('/:id', upload.array('productPictures') ,ProductController.updateAProduct);


//update product Pictures
router.patch('/images/:id',upload.array('productPictures'), ProductController.updateProductImages);

//delete product Pictures
router.patch('/remove',ProductController.deleteProductImages);

//Get product by id
router.get('/:id', ProductController.getProductById);

//Delete a product  by id
router.delete('/delete/:id', ProductController.deleteAProduct);

//search products by name
router.get('/search/:key', ProductController.searchProduct);







module.exports = router;