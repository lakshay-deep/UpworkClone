const Joi = require('Joi');
const mongoose = require('mongoose');

const company_schema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },

    profile_description: {
        type: String,

    },

    business_stream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BussinessStream"
        
    },

    establishment_date: {
        type: Date,
        required: true
    },

    company_website_url: {
        type: String,
        required: true
    }

});


const Company = mongoose.model('Company', company_schema);

function  validateCompany(company){
    const schema = {
        company_name: Joi.string().required(),
        profile_description: Joi.string(),
        business_stream: Joi.string().required(),
        establishment_date: Joi.date().required(),
        company_website_url: Joi.string().required()

    }

    return Joi.validate(company, schema);
}

exports.Company = Company;
exports.validate = validateCompany;