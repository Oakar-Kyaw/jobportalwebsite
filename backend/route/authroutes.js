const express=require('express');
const {signup, signin, logout, userprofile}= require('../controller/authcontroller');
const { isAuthenticated } = require('../middleware/auth');
const router=express.Router();

//sign up 
router.post('/signup',signup);

//sign in
router.post('/signin',signin);

//logout
router.get('/logout',logout);

//my profile
router.get('/me',isAuthenticated,userprofile);

module.exports= router;