const express = require('express');
const router = express.Router();
const {check} =require('express-validator');
const UserController = require('../Controllers/User.Controller');

const {signup,signin,adminSignin,adminSignup } = require('../Controllers/User.Controller');

const { validateSignupRequest, isRequestValidated ,validateSigninRequest} = require('../validators/user');

//for user

//register user
router.post('/register',validateSignupRequest,isRequestValidated, UserController.signup);

//login user
router.post('/login', validateSigninRequest,isRequestValidated,UserController.signin);

//Get a list of users
router.get('/list', UserController.getAllUsers);

//Get a single user by id
router.get('/:id', UserController.getUserById);

router.patch('/:id',UserController.updateUserDetails);

//delete user
router.delete('/:id', UserController.deleteUser);


//for Admin

//register  admin user
router.post('/admin/signup',validateSignupRequest,isRequestValidated, UserController.adminSignup);

//login  admin user
router.post('/admin/login',validateSigninRequest,isRequestValidated, UserController.adminSignin);





module.exports = router;
