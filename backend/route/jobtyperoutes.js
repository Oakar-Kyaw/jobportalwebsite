const express= require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createJobType, jobTypes, updateJobType, deleteJobType, singlejobType } = require('../controller/jobtypecontroller');
const router= express.Router();

//route for creating job type 
router.post('/type/create',createJobType);

//get all job type
router.get('/type/jobs', jobTypes);

//get single job type
router.get('/type/:jobid', singlejobType);

//update job type by id
router.put('/type/edit/:id', updateJobType);

//delete job type by id
router.delete('/type/delete/:id', deleteJobType);


module.exports = router;
