const Joi = require('joi');
const mongoose = require('mongoose');



const user_log_schema = new mongoose.Schema({
    user_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAccount"
    },
    last_login_date: {
        types: Date,
    },
    last_job_apply_date: {
        types: Date,
    }

});

const UserLog = mongoose.model('UserLog', user_log_schema);


function validateUserLog(userLog){
    const schema = {
        user_accountId: Joi.string().required(),
        last_login_date: Joi.date().required(),
        last_job_apply_date: Joi.date().required()
    }

    return Joi.validate(userLog, schema);
}

exports.UserLog = UserLog;
exports.validate = validateUserLog;
exports.user_log_schema = user_log_schema;