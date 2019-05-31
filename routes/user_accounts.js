const {UserAccount, validate} = require('../models/user_account');
const {User} = require('../models/user_type');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const userAccount = await UserAccount.find();
    res.send(userAccount);

});

router.get('/:id', async (req, res) => {
    const userAccount = await UserAccount.findById(req.params.id);
    if(!userAccount) return res.status(404).send('The userAccount with the given id was not found');

    res.send(userAccount);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let userAccount = new UserAccount({
        
        user_type: req.body.user_typeId,
        email: req.body.email,
        password: req.body.password,
        Dob: req.body.Dob,
        gender: req.body.gender,
        is_active: req.body.is_active,
        contact_no: req.body.contact_no,
        sms_notification_active: req.body.sms_notification_active,
        email_notification_active: req.body.email_notification_active,
        user_image: req.body.user_image,
        registration_date: req.body.registration_date
    });

   // const salt = await bcrypt.genSalt(10);
   // userAccount.password = await bcrypt.hash(userAccount.password, salt);

    userAccount = await userAccount.save();

    res.send(userAccount);
});


router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const userAccount = await UserAccount.findByIdAndUpdate(req.params.id,
        {
            
        user_type: req.body.user_typeId,
        email: req.body.email,
        password: req.body.password,
        Dob: req.body.Dob,
        gender: req.body.gender,
        is_active: req.body.is_active,
        contact_no: req.body.contact_no,
        sms_notification_active: req.body.sms_notification_active,
        email_notification_active: req.body.email_notification_active,
        user_image: req.body.user_image,
        registration_date: req.body.registration_date
        },
        {new: true});

        if(!userAccount) return res.status(404).send('The userAccount with given id was not found');
        
     //   const salt = await bcrypt.genSalt(10);
      //  userAccount.password = await bcrypt.hash(userAccount.password, salt);

        res.send(userAccount);
});

router.delete('/:id', async (req, res) => {
    const userAccount = await UserAccount.findByIdAndRemove(req.params.id);
    if(!userAccount) return res.status(404).send('The userAccount with given id was not found');
    res.send(userAccount);
});

module.exports = router;
