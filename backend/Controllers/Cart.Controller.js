const createError = require("http-errors");
const mongoose = require("mongoose");
const Cart = require("../Models/Cart.model");



module.exports = {

//  getAllItems : async (req, res) => {

//  const carts = await Cart.find({ } )

//      res.status(200).json({carts});
//      console.log("cart is =======",carts)
   
//   },



 


 addItemToCart: (req, res) => {
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
      if (error) return res.status(400).json(error);
      if (cart) {
        //if cart already exists then update the cart by quantity

        const product = req.body.cartItems.product;
        const Item = cart.cartItems.find((c) => c.product == product);
        let condition, update;

        if (Item) {
          condition = { user: req.user._id, "cartItems.product": product };
          update = {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: Item.quantity + req.body.cartItems.quantity,
                // price:Item.price * req.body.cartItems.quantity,

              },
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              cartItems: req.body.cartItems,
            },
          };
        }
        Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            res.status(200).json({ cart: _cart });
          }
        });
      } else {
        // if cart not exists then create new cart

        const cart = new Cart({
          user: req.user._id,
          cartItems: [req.body.cartItems],
        });
        cart.save((error, cart) => {
          if (error) return res.status(400).json({ error });
          if (cart) {
            return res.status(201).json({ cart });
          }
        });
      }
    });
  },
 

  getCartItems :(req, res) => {
  
    // const { user } = req.body.payload;
    // if(user){
   Cart.findOne({ user: req.user._id})

   .populate("cartItems.product", "_id name  price productPictures")
  
      .exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          let cartItems = {};
          cart.cartItems.forEach((item) => {
            console.log("carttttttttttttt",cart)
       cartItems[
               item.product._id ]={
         
                product: item.product._id,
              name: item.product.name,
               path: item.product.productPictures[0].path,
              price: item.product.price,
              qty: item.quantity,
            };
          });
      

         
          res.status(200).json({cartItems });
          console.log("cartitems============",cartItems)
        }
      });
    //  }
  },




  //Delete cartItems By Id


  removeCartItems:(req, res) => {
    const { productId } = req.body.payload;
    if (productId) {
      Cart.updateOne(
        { user: req.user._id },
        {
          $pull: {
            cartItems: {
              product: productId,
            },
          },
        }
      ).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    }
  },
  

  
 

  
 
};
