const Joi = require('joi');
const mongoose = require('mongoose');

const user_type_Schema = new mongoose.Schema({
    user_type_name: {
        type: String,
        required: true,
        enum: ['user', 'recruiter']

    }
});

const User = mongoose.model('User', user_type_Schema );

function validateUser(user){
    const schema = {
        user_type_name: Joi.string().required()
    };
    return Joi.validate(user, schema);

}

exports.User = User;
exports.validate = validateUser;