const express= require('express');
const User = require('../model/usermodel');
const { isAdmin, isAuthenticated } = require('../middleware/auth');
const {allusers, singleuser, edituser, deleteuser} =require('../controller/usercontroller');
const router=express.Router();

//get all users
router.get('/allusers',isAdmin,allusers);

//get one user by id
router.get('/user/:id',isAuthenticated,singleuser);

//edit user
router.put('/user/edit/:id',isAuthenticated, edituser);

//delete user
router.delete('/user/delete/:id',isAuthenticated,isAdmin,deleteuser)

module.exports = router;
