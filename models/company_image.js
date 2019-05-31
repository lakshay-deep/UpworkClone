const Joi = require('joi');
const mongoose = require('mongoose');

const company_image_schema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },

    company_image: {
        type: String,
        required: true
    }
});


const CompanyImage = mongoose.model('CompanyImage', company_image_schema);

function validateCompanyImage(image){
    const schema = {
        companyId: Joi.string().required(),
        company_image: Joi.string().required()
    }

    return Joi.validate(image, schema);
}


exports.CompanyImage = CompanyImage;
exports.validate = validateCompanyImage;