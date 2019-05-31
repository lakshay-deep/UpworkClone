const {SkillSet, validate} = require('../models/skill_set');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    const skSet = await SkillSet.find();
    res.send(skSet);
});

router.get('/:id', async (req, res) => {
    const skSet = await SkillSet.findById(req.params.id);
    if(!skSet) return res.status(404).send('The user with the given id was not found');
    res.send(skSet);


});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let skSet = new SkillSet({
        skill_set_name: req.body.skill_set_name
    });
    skSet = await skSet.save();

    res.send(skSet);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status().send(error.details[0].message);

    const skSet = await SkillSet.findByIdAndUpdate(req.params.id,
        {
            skill_set_name: req.body.skill_set_name
        },
        {new: true});

        if(!skSet) return res.status(400).send('The user with given id was not found');
        res.send(skSet);

});

router.delete('/:id', async (req, res) => {
    const skSet = await SkillSet.findByIdAndRemove(req.params.id);
    if(!skSet) return res.status(404).send('The user with given id was not found');
    res.send(skSet);

});

module.exports = router;