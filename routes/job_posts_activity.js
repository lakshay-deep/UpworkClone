const {JobPostActivity, validate} = require('../models/job_post_activity');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const jobpostactivity = await JobPostActivity.find();
    res.send(jobpostactivity);

});

router.get('/:id', async (req, res) => {
    const jobpostactivity = await JobPostActivity.findById(req.params.id);
    if(!jobpostactivity) return res.status(404).send('The jobpostactivity with the given id was not found');

    res.send(jobpostactivity);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    let jobpostactivity = new JobPostActivity({
        
        user_account: user_account._id,
        job_post: job_post._id,
        apply_date: apply_date._id
    });

    jobpostactivity = await jobpostactivity.save();

    res.send(jobpostactivity);
});


router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    const jobpostactivity = await JobPostActivity.findByIdAndUpdate(req.params.id,
        {
            user_account: user_account._id,
            job_post: job_post._id,
            apply_date: apply_date._id
        },
        {new: true});

        if(!jobpostactivity) return res.status(404).send('The jobpostactivity with given id was not found');
        res.send(jobpostactivity);
});

router.delete('/:id', async (req, res) => {
    const jobpostactivity = await JobPostActivity.findByIdAndRemove(req.params.id);
    if(!jobpostactivity) return res.status(404).send('The jobpostactivity with given id was not found');
    res.send(jobpostactivity);
});

module.exports = router;
