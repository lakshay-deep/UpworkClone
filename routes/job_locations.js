const {JobLocation, validate} = require('../models/user_account');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const joblocation = await JobLocation.find();
    res.send(joblocation);

});

router.get('/:id', async (req, res) => {
    const joblocation = await JobLocation.findById(req.params.id);
    if(!joblocation) return res.status(404).send('The joblocation with the given id was not found');

    res.send(joblocation);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    let joblocation = new JobLocation({
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zip: req.body.zip

    });

    joblocation = await joblocation.save();

    res.send(joblocation);
});


router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    const joblocation = await JobLocation.findByIdAndUpdate(req.params.id,
        {
            
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zip: req.body.zip
        },
        {new: true});

        if(!joblocation) return res.status(404).send('The joblocation with given id was not found');
        res.send(joblocation);
});

router.delete('/:id', async (req, res) => {
    const joblocation = await JobLocation.findByIdAndRemove(req.params.id);
    if(!joblocation) return res.status(404).send('The joblocation with given id was not found');
    res.send(joblocation);
});

module.exports = router;
