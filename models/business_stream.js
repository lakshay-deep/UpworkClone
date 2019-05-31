const Joi = require('joi');
const mongoose = require('mongoose');

const business_stream_schema = new mongoose.Schema({
    business_stream_name: {
        type: String,
        required: true

    }
});

const BusinessStream = mongoose.model('BusinessStream', business_stream_schema );

function validateBusinessStream(stream){
    const schema = {
        business_stream_name: Joi.string().required()
    };
    return Joi.validate(stream, schema);

}

exports.BusinessStream = BusinessStream;
exports.validate = validateBusinessStream;