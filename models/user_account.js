const Joi = require('joi');
const mongoose = require('mongoose');

const user_account_schema = new mongoose.Schema({
    user_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    Dob: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },

    is_active: {
        type: Boolean,
        required: true
     },

     contact_no: {
         type: String,
         required: true
     },
     
     sms_notification_active: {
         type: Boolean,
         required: true
     },

     email_notification_active: {
         type: Boolean,
         required: true
     },

     user_image: {
         type: String,
         required: true
     },

     registration_date: {
         type: Date,
         required: true
     },
});

const UserAccount = mongoose.model('UserAccount', user_account_schema);

function validateUserAccount(userAccount) {
    const schema = {
        user_typeId: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        Dob: Joi.date().required(),
        gender: Joi.string().required(),
        is_active: Joi.boolean().required(),
        contact_no: Joi.string().required(),
        sms_notification_active: Joi.boolean().required(),
        email_notification_active: Joi.boolean().required(),
        user_image: Joi.string().required(),
        registration_date: Joi.date().required(),
    
    }

    return Joi.validate(userAccount, schema);
}

exports.UserAccount = UserAccount,
exports.user_account_schema = user_account_schema;
exports.validate = validateUserAccount;