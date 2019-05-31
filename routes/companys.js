const {Company, validate} = require('../models/company');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    const company = await Company.find();
    res.send(company);
});

router.get('/:id', async (req, res) => {
    const company = await Company.findById(req.params.id);
    if(!company) return res.status(404).send('The company with the given id was not found');
    res.send(company);


});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let company = new Company({
        company_name: req.body.company_name,
        profile_description: req.body.profile_description,
        business_stream: req.body.business_stream,
        establishment_date: req.body.establishment_date,
        company_website_url: req.body.company_website_url

    });
    company = await company.save();

    res.send(company);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status().send(error.details[0].message);

    const company = await Company.findByIdAndUpdate(req.params.id,
        {
            
        company_name: req.body.company_name,
        profile_description: req.body.profile_description,
        business_stream: req.body.business_stream,
        establishment_date: req.body.establishment_date,
        company_website_url: req.body.company_website_url
        },
        {new: true});

        if(!company) return res.status(400).send('The company with given id was not found');
        res.send(company);

});

router.delete('/:id', async (req, res) => {
    const company = await Company.findByIdAndRemove(req.params.id);
    if(!company) return res.status(404).send('The company with given id was not found');
    res.send(company);

});

module.exports = router;