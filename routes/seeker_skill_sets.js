const {SSkSet, validate} = require('../models/seeker_skill_set');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const sSkSet = await SSkSet.find();
    res.send(sSkSet);

});

router.get('/:id', async (req, res) => {
    const sSkSet = await SSkSet.findById(req.params.id);
    if(!sSkSet) return res.status(404).send('The sSkSet with the given id was not found');

    res.send(sSkSet);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    let sSkSet = new SSkSet({
        
        user_account: user_account._id,
        skill_set: skill_set._id,
        skill_level: req.body.skill_level
    });

    sSkSet = await sSkSet.save();

    res.send(sSkSet);
});


router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    const sSkSet = await SSkSet.findByIdAndUpdate(req.params.id,
        {
            user_account: user_account._id,
            skill_set: skill_set._id,
            skill_level: req.body.skill_level
        },
        {new: true});

        if(!sSkSet) return res.status(404).send('The sSkSet with given id was not found');
        res.send(sSkSet);
});

router.delete('/:id', async (req, res) => {
    const sSkSet = await SSkSet.findByIdAndRemove(req.params.id);
    if(!sSkSet) return res.status(404).send('The sSkSet with given id was not found');
    res.send(sSkSet);
});

module.exports = router;
