const {BusinessStream, validate} = require('../models/business_stream');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    const stream = await BusinessStream.find();
    res.send(stream);
});

router.get('/:id', async (req, res) => {
    const stream = await BusinessStream.findById(req.params.id);
    if(!stream) return res.status(404).send('The stream with the given id was not found');
    res.send(stream);


});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let stream = new BusinessStream({
        business_stream_name: req.body.business_stream_name
    });
    stream = await stream.save();

    res.send(stream);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status().send(error.details[0].message);

    const stream = await BusinessStream.findByIdAndUpdate(req.params.id,
        {
            business_stream_name: req.body.business_stream_name
        },
        {new: true});

        if(!stream) return res.status(400).send('The stream with given id was not found');
        res.send(stream);

});

router.delete('/:id', async (req, res) => {
    const stream = await BusinessStream.findByIdAndRemove(req.params.id);
    if(!stream) return res.status(404).send('The stream with given id was not found');
    res.send(stream);

});

module.exports = router;