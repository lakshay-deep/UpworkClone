const Joi = require('joi');
const mongoose = require('mongoose');

const education_detail_schema = new mongoose.Schema({
    user_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAccount"
    },

    certificate_degree_name: {
        type: String,
        required: true

    },

    major: {
        type: String,
        required: true
    },

    institute_university_name: {
        type: String,
        required: true
    },

    starting_date: {
        type: Date,
        required: true
    },

    completion_date: {
        type: Date,
        required: true
    },

    percentage: {
        type: Number,
        required: true
    },


});

const Education = mongoose.model('Education', education_detail_schema);

function validateEducation(education){
    const schema = {
        user_account: Joi.string().required(),
        certificate_degree_name: Joi.string().required(),
        major: Joi.string().required(),
        institute_university_name: Joi.string().required(),
        starting_date: Joi.date().required(),
        completion_date: Joi.date().required(),
        percentage: Joi.string().required()

    }

    return Joi.validate(education, schema);

}


exports.Education = Education;
exports.validate = validateEducation;