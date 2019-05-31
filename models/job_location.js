const Joi = require('joi');
const mongoose = require('mongoose');


const job_location_schema = new mongoose.Schema({
    street_address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true

    },

    country: {
        type: String,
        required: true
    },

    zip: {
        type: String,
    }
});


const JobLocation = mongoose.model('JobLocation', job_location_schema);


function validateJobLocation(joblocation){
    const schema = {
        street_address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        zip: Joi.string()
    }

    return Joi.validate(joblocation, schema);
}

exports.JobLocation = JobLocation;
exports.validate = validateJobLocation;
