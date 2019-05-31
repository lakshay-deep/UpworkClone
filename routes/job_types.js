const {JobType, validate} = require('../models/job_type');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    const jobtype = await JobType.find();
    res.send(jobtype);
});

router.get('/:id', async (req, res) => {
    const jobtype = await JobType.findById(req.params.id);
    if(!jobtype) return res.status(404).send('The jobtype with the given id was not found');
    res.send(jobtype);


});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let jobtype = new JobType({
        job_type_name: req.body.job_type_name
    });
    jobtype = await jobtype.save();

    res.send(jobtype);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status().send(error.details[0].message);

    const jobtype = await JobType.findByIdAndUpdate(req.params.id,
        {
            job_type_name: req.body.job_type_name
        },
        {new: true});

        if(!jobtype) return res.status(400).send('The jobtype with given id was not found');
        res.send(jobtype);

});

router.delete('/:id', async (req, res) => {
    const jobtype = await JobType.findByIdAndRemove(req.params.id);
    if(!jobtype) return res.status(404).send('The jobtype with given id was not found');
    res.send(jobtype);

});

module.exports = router;