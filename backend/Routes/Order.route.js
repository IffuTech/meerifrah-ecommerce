const express = require("express");
const { requireSignin, userMiddleware,adminMiddleware  } = require("../middleware");

const OrderController = require("../Controllers/Order.Controller");

const router = express.Router();



// router.post(
//   `/order/getCustomerOrders`,
//   requireSignin,
//   adminMiddleware,
//   getCustomerOrders
// );

router.post("/addorder",requireSignin,userMiddleware ,OrderController.addOrder);

router.get("/getorders",requireSignin,userMiddleware ,OrderController.getOrders);

// router.get("/getOrder", requireSignin, userMiddleware, OrderController.getOrder);

// router.patch('/remove', requireSignin, userMiddleware,OrderController.removeOrder);

router.post("/get",requireSignin,userMiddleware ,OrderController.getOrder);

router.patch("/update" ,requireSignin, adminMiddleware,OrderController.updateOrder);

router.get("/Orders", requireSignin, adminMiddleware,OrderController.getCustomerOrders);


router.delete('/delete/:id', OrderController.deleteOrder);

module.exports = router;
