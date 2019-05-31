const {SeekerProfile, validate} = require('../models/seeker_profile');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const sProfile = await SeekerProfile.find();
    res.send(sProfile);

});

router.get('/:id', async (req, res) => {
    const sProfile = await SeekerProfile.findById(req.params.id);
    if(!sProfile) return res.status(404).send('The sProfile with the given id was not found');

    res.send(sProfile);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let sProfile = new SeekerProfile({
        
        user_account: req.body.user_account,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        current_salary: req.body.current_salary,
        is_annually_monthly: req.body.is_annually_monthly,
        currency: req.body.currency
    });

    sProfile = await sProfile.save();

    res.send(sProfile);
});


router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const sProfile = await SeekerProfile.findByIdAndUpdate(req.params.id,
        {
            user_account: req.body.user_account,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            current_salary: req.body.current_salary,
            is_annually_monthly: req.body.is_annually_monthly,
            currency: req.body.currency
        },
        {new: true});

        if(!sProfile) return res.status(404).send('The sProfile with given id was not found');
        res.send(sProfile);
});

router.delete('/:id', async (req, res) => {
    const sProfile = await SeekerProfile.findByIdAndRemove(req.params.id);
    if(!sProfile) return res.status(404).send('The sProfile with given id was not found');
    res.send(sProfile);
});

module.exports = router;
