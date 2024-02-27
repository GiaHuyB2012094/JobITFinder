import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;

const skill = new Schema({
    value: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    }
})

const SkillOfCompany = mongoose.model('SkillOfCompany', skill);
export default SkillOfCompany;
