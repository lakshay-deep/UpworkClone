const {JobPostSkillSet, validate} = require('../models/job_post_skill_set');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const jobpostskillset = await JobPostSkillSet.find();
    res.send(jobpostskillset);

});

router.get('/:id', async (req, res) => {
    const jobpostskillset = await JobPostSkillSet.findById(req.params.id);
    if(!jobpostskillset) return res.status(404).send('The jobpostskillset with the given id was not found');

    res.send(jobpostskillset);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    let jobpostskillset = new JobPostSkillSet({
        skill_set: skill_set._id,
        job_post: job_post._id,
        skill_level: req.body.skill_level


    });

    jobpostskillset = await jobpostskillset.save();

    res.send(jobpostskillset);
});


router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    const jobpostskillset = await JobPostSkillSet.findByIdAndUpdate(req.params.id,
        {
            skill_set: skill_set._id,
            job_post: job_post._id,
            skill_level: req.body.skill_level
        },
        {new: true});

        if(!jobpostskillset) return res.status(404).send('The jobpostskillset with given id was not found');
        res.send(jobpostskillset);
});

router.delete('/:id', async (req, res) => {
    const jobpostskillset = await JobPostSkillSet.findByIdAndRemove(req.params.id);
    if(!jobpostskillset) return res.status(404).send('The jobpostskillset with given id was not found');
    res.send(jobpostskillset);
});

module.exports = router;
