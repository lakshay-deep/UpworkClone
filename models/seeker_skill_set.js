const Joi = require('joi');
const mongoose = require('mongoose');

const seeker_skill_set_schema = new mongoose.Schema({
    user_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAccount"
    },

    skill_set: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SkillSet"
    },

    skill_level: {
        type: Number,
        required: true
    }


});

const SSkSet = mongoose.model('SSkSet', seeker_skill_set_schema);

function validateSeekerSkillSet(sSkSet){
    const schema = {
        user_account: Joi.string().required(),
        skill_set: Joi.string().required(),
        skill_level: Joi.number().required()
    }

    return Joi.validate(sSkSet, schema);
}

exports.SSkSet = SSkSet;
exports.validate = validateSeekerSkillSet;