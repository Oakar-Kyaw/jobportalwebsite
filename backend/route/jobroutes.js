const express = require('express');
const { createJob, getAllJob, getSingleJob, updateJob, deleteJob, createJobHistory, createAppliedUser, getJobByUserId } = require('../controller/jobcontroller');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();

//router for creating job
router.post('/job/create',isAuthenticated,isAdmin,createJob);

//router for getting all jobs
router.get('/job/all',getAllJob);

//router for getting single job
router.get('/job/:id',getSingleJob);

//router for getting  job by userid 
router.get('/job/apply/userid',isAuthenticated,getJobByUserId);

//router for updating job
router.put('/job/edit/:id',isAuthenticated,isAdmin,updateJob);

//router for deleting job
router.delete('/job/delete/:id',isAuthenticated,isAdmin,deleteJob);

//router for creating jobhistory
router.post('/job/history/create',isAuthenticated,createJobHistory,createAppliedUser);

module.exports = router;