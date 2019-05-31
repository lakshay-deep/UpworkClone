const {Education, validate} = require('../models/education_detail');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const education = await Education.find();
    res.send(education);

});

router.get('/:id', async (req, res) => {
    const education = await Education.findById(req.params.id);
    if(!education) return res.status(404).send('The userAccount with the given id was not found');

    res.send(education);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let education = new Education({
        
        user_account: req.body.user_account,
        certificate_degree_name: req.body.certificate_degree_name,
        major: req.body.major,
        institute_university_name: req.body.institute_university_name,
        starting_date: req.body.starting_date,
        completion_date: req.body.completion_date,
        percentage: req.body.percentage
    });

    education = await education.save();

    res.send(education);
});


router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const education = await Education.findByIdAndUpdate(req.params.id,
        {
            user_account: req.body.user_account,
            certificate_degree_name: req.body.certificate_degree_name,
            major: req.body.major,
            institute_university_name: req.body.institute_university_name,
            starting_date: req.body.starting_date,
            completion_date: req.body.completion_date,
            percentage: req.body.percentage
        },
        {new: true});

        if(!education) return res.status(404).send('The education with given id was not found');
        res.send(education);
});

router.delete('/:id', async (req, res) => {
    const education = await Education.findByIdAndRemove(req.params.id);
    if(!education) return res.status(404).send('The education with given id was not found');
    res.send(education);
});

module.exports = router;
