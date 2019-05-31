const {Experience, validate} = require('../models/experience_detail');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const experience = await Experience.find();
    res.send(experience);

});

router.get('/:id', async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if(!experience) return res.status(404).send('The userAccount with the given id was not found');

    res.send(experience);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let experience = new Experience({
        
        user_account: req.body.user_account,
        is_current_job: req.body.is_current_job,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        job_title: req.body.job_title,
        company_name: req.body.company_name,
        job_location_city: req.body.job_location_city,
        job_location_state: req.body.job_location_state,
        job_location_country: req.body.job_location_country,
        description: req.body.description
    });

    experience = await experience.save();

    res.send(experience);
});


router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const experience = await Experience.findByIdAndUpdate(req.params.id,
        {
            user_account: req.body.user_account,
            is_current_job: req.body.is_current_job,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            job_title: req.body.job_title,
            company_name: req.body.company_name,
            job_location_city: req.body.job_location_city,
            job_location_state: req.body.job_location_state,
            job_location_country: req.body.job_location_country,
            description: req.body.description
        },
        {new: true});

        if(!experience) return res.status(404).send('The experience with given id was not found');
        res.send(experience);
});

router.delete('/:id', async (req, res) => {
    const experience = await Experience.findByIdAndRemove(req.params.id);
    if(!experience) return res.status(404).send('The experience with given id was not found');
    res.send(experience);
});

module.exports = router;
