const {User, validate} = require('../models/user_type');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    const user = await User.find();
    res.send(user);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('The user with the given id was not found');
    res.send(user);


});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = new User({
        user_type_name: req.body.user_type_name
    });
    user = await user.save();

    res.send(user);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status().send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id,
        {
            user_type_name: req.body.user_type_name
        },
        {new: true});

        if(!user) return res.status(400).send('The user with given id was not found');
        res.send(user);

});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if(!user) return res.status(404).send('The user with given id was not found');
    res.send(user);

});

module.exports = router;