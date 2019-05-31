const Joi = require('joi');
const mongoose = require('mongoose');

const seeker_profile_schema = new mongoose.Schema({
    user_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAccount",
        unique: true
    },

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    current_salary: {
        type: Number,
        required: true
    },

    is_annually_monthly: {
        type: Boolean,
        required: true
    },

    currency: {
        type: String,
        required: true
    }
});

const SeekerProfile = mongoose.model('SeekerProfile', seeker_profile_schema);


function validateSeekerProfile(sProfile) {
    const schema = {
        user_account: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        current_salary:Joi.number().required(),
        is_annually_monthly: Joi.boolean().required(),
        currency: Joi.string().required()
    }

    return Joi.validate(sProfile, schema);

}

exports.validate = validateSeekerProfile;
exports.SeekerProfile = SeekerProfile;
exports.seeker_profile_schema = seeker_profile_schema;
