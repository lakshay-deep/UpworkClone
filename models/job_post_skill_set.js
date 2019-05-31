const Joi = require('joi');
const mongoose = require('mongoose');

const job_post_skill_set_schema = new mongoose.Schema({
    skill_set: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SkillSet"

    },

    job_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost"
    },

    skill_level:{
        type: Number,
        required: true
    },

});


const JobPostSkillSet = mongoose.model('JobPostSkillSet', job_post_skill_set_schema );

function validateJobPostSkillSet(jobpostskillset){
    const schema = {
        skill_set: Joi.string().required(),
        job_post: Joi.string().required(),
        skill_level: Joi.number().required()
    };
    return Joi.validate(jobpostskillset, job_post_skill_set_schema);

}

exports.JobPostSkillSet = JobPostSkillSet;
exports.validate = validateJobPostSkillSet;