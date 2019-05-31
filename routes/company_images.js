const {CompanyImage, validate} = require('../models/company_image');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    const image = await CompanyImage.find();
    res.send(image);
});

router.get('/:id', async (req, res) => {
    const image = await CompanyImage.findById(req.params.id);
    if(!image) return res.status(404).send('The image with the given id was not found');
    res.send(image);


});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let image = new CompanyImage({
        company: req.body.companyId,
        company_image: req.body.company_image
    });
    image = await image.save();

    res.send(image);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status().send(error.details[0].message);

    const image = await CompanyImage.findByIdAndUpdate(req.params.id,
        {
            
        company: req.body.company,
        company_image: req.body.company_image
        },
        {new: true});

        if(!image) return res.status(400).send('The image with given id was not found');
        res.send(image);

});

router.delete('/:id', async (req, res) => {
    const image = await CompanyImage.findByIdAndRemove(req.params.id);
    if(!image) return res.status(404).send('The image with given id was not found');
    res.send(image);

});

module.exports = router;