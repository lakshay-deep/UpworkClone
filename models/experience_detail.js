const Joi = require('joi');
const mongoose = require('mongoose');

const experience_detail_schema = new mongoose.Schema({
    user_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAccount"
    },

    is_current_job: {
        type: Boolean,
        required: true

    },
    start_date: {
        type: Date,
        required: true
    },

    end_date: {
        type: Date,
        required: true
    },

    job_title: {
        type: String,
        required: true
    },

    company_name: {
        type: String,
        required: true
    },

    

    job_location_city: {
        type: String,
        required: true
    },

    job_location_state: {
        type: String,
        required: true
    },

    job_location_country: {
        type: String,
        required: true
    },

    description: {
        type: String,

    }


});

const Experience = mongoose.model('Experience', experience_detail_schema);

function validateExperience(experience){
    const schema = {
        user_account: Joi.string().required(),
        is_current_job: Joi.boolean().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        job_title: Joi.string().required(),
        company_name: Joi.string().required(),
        job_location_city: Joi.string().required(),
        job_location_state: Joi.string().required(),
        job_location_country: Joi.string().required(),
        description: Joi.string().required()

    }

    return Joi.validate(experience, schema);

}


exports.Experience = Experience;
exports.validate = validateExperience;