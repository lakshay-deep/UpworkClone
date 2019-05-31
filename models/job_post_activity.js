const Joi = require('joi');
const mongoose = require('mongoose');


const job_post_activity_schema = new mongoose.Schema({
    user_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userAccount"
    },

    job_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost"
    },

    apply_date: {
        type: Date,
        required: true
    }
});

const JobPostActivity = mongoose.model('JobPostActivity', job_post_activity_schema);


function validateJobPostActivity(jobpostactivity){
    const schema = {
        user_account: Joi.string().required(),
        apply_date: Joi.string().required()
    }

    return Joi.validate(jobpostactivity, schema);
}

exports.JobPostActivity = JobPostActivity;
exports.validate = validateJobPostActivity;