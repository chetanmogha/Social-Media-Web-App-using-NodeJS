const express=require('express');
const router =express.Router();

const home_controller=require('../controllers/home_controller')

router.get('/',home_controller.home)

router.use('/users',require('./users'))

// for any other routes, access from here
// router.use('/routerName',require('router path')) 
console.log("Router Started")
module.exports=router;