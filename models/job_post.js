const Joi = require('joi');
const mongoose = require('mongoose');

const job_post_Schema = new mongoose.Schema({
    user_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },

    job_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobType"
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    is_company_name_hidden:{
        type: Boolean,
        required: true
    },

    created_date: {
        type: Date,
        required: true
    },

    job_description: {
        type: String,
        required: true

    },

    job_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobLocation"
    },
    
    is_active: {
        type: String,
        required: true
    }
});


const JobPost = mongoose.model('JobPost', job_post_Schema );

function validateJobPost(jobpost){
    const schema = {
        user_type: Joi.string().required(),
        job_type: Joi.string().required(),
        company: Joi.string().required(),
        is_company_name_hidden: Joi.boolean().required(),
        created_date: Joi.date().required(),
        job_description: Joi.string().required(),
        job_location: Joi.string().required(),
        is_active: Joi.boolean().required()
    };
    return Joi.validate(jobpost, job_post_Schema);

}

exports.JobPost = JobPost;
exports.validate = validateJobPost;