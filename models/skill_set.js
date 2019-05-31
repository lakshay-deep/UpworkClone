const Joi = require('joi');
const mongoose = require('mongoose');


const skill_set_schema = new mongoose.Schema({
    skill_set_name: {
        type: String,
        required: true
    }
});


const SkillSet = mongoose.model('SkillSet', skill_set_schema);

function validateSkillSet(skSet) {
    const schema = {
        skill_set_name: Joi.string().required()
    }

    return Joi.validate(skSet, skill_set_schema);

}

exports.SkillSet = SkillSet;
exports.validate = validateSkillSet;
