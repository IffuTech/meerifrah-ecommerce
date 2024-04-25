const express = require('express');
const router = express.Router();
const { requireSignin, userMiddleware } = require('../middleware');

const AddressController = require('../Controllers/Address.Controller');
// const { addUserAddress, getUserAddress ,removeAddress,updateAddress} = require('../Controllers/Address.Controller');



router.post('/create', requireSignin, userMiddleware, AddressController.addUserAddress);

router.patch('/remove', requireSignin, userMiddleware,AddressController.removeAddress);

router.patch('/:id',AddressController.updateAddress);



router.get('/getaddress', requireSignin, userMiddleware, AddressController.getUserAddress);

module.exports = router;