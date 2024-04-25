const express=require('express');
const router= express.Router();

const DashboardController=require('../Controllers/Dashboard.Controller');

// var VerifyToken=require('../helpers/VerifyToken');

router.get('/totalCount',DashboardController.Total_Count);

module.exports=router;