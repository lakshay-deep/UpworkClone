const Joi = require('joi');
const mongoose = require('mongoose');

const job_type_schema = new mongoose.Schema({
    job_type_name: {
        type: String,
        required: true,

    }
});

const JobType = mongoose.model('JobType', job_type_schema );

function validateJobType(jobtype){
    const schema = {
        job_type_name: Joi.string().required()
    };
    return Joi.validate(jobtype, schema);

}

exports.JobType = JobType;
exports.validate = validateJobType;