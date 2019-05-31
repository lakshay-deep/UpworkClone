const { UserLog, validate} = require('../models/user_log');
const {User} = require('../routes/user_accounts');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const userLog = await UserLog.find();
    res.send(userLog);

});

router.get('/:id', async (req, res) => {
    const userLog = await UserLog.findById(req.params.id);
    if(!userLog) return res.status(404).send('The userLog with the given id was not found');

    res.send(userLog);

});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //var mydate = new Date( req.body.last_login_date);
   // var result = await mydate.toStringDate();

    let userLog = new UserLog({
        
        user_account: req.body.user_accountId,
        last_login_date: req.body.last_login_date,
        last_job_apply_date: req.body.last_job_apply_date
    });

    userLog = await userLog.save();

    res.send(userLog);
});


router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).error(error.details[0].message);

    const userLog = await UserLog.findByIdAndUpdate(req.params.id,
        {
            
        user_account: req.body.user_accountId,
        last_login_date: req.body.last_login_date,
        last_job_apply_date: req.body.last_job_apply_date
        },
        {new: true});

        if(!userLog) return res.status(404).send('The userAccount with given id was not found');
        res.send(userLog);
});

router.delete('/:id', async (req, res) => {
    const userLog = await UserLog.findByIdAndRemove(req.params.id);
    if(!userLog) return res.status(404).send('The userAccount with given id was not found');
    res.send(userLog);
});

module.exports = router;