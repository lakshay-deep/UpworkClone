const {JobPost, validate} = require('../models/job_post');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const jobpost = await JobPost.find();
    res.send(jobpost);

});

router.get('/:id', async (req, res) => {
    const jobpost = await JobPost.findById(req.params.id);
    if(!jobpost) return res.status(404).send('The jobpost with the given id was not found');

    res.send(jobpost);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    let jobpost = new JobPost({
        user_type: user_type._id,
        job_type: job_type._id,
        company: company._id,
        is_company_name_hidden: req.body.is_company_name_hidden,
        created_date: req.body.created_date,
        job_description: req.body.job_description,
        job_location: job_location._id,
        is_active: req.body.is_active


    });

    jobpost = await jobpost.save();

    res.send(jobpost);
});


router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    const jobpost = await JobPost.findByIdAndUpdate(req.params.id,
        {
            
        user_type: user_type._id,
        job_type: job_type._id,
        company: company._id,
        is_company_name_hidden: req.body.is_company_name_hidden,
        created_date: req.body.created_date,
        job_description: req.body.job_description,
        job_location: job_location._id,
        is_active: req.body.is_active
        },
        {new: true});

        if(!jobpost) return res.status(404).send('The jobpost with given id was not found');
        res.send(jobpost);
});

router.delete('/:id', async (req, res) => {
    const jobpost = await JobPost.findByIdAndRemove(req.params.id);
    if(!jobpost) return res.status(404).send('The jobpost with given id was not found');
    res.send(jobpost);
});

module.exports = router;
