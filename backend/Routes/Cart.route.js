const express = require('express');
const router = express.Router();

const CartController = require('../Controllers/Cart.Controller');
const {requireSignin,userMiddleware} =require('../middleware');


//Get all cart items

// router.get('/list', CartController.getAllItems);

// add products to cart
router.post('/addcart', requireSignin,userMiddleware,CartController.addItemToCart);

router.get("/getCartItems", requireSignin, userMiddleware, CartController.getCartItems);


// remove cart Item
 router.post( "/removeItem",  requireSignin, userMiddleware,CartController. removeCartItems );










module.exports = router;