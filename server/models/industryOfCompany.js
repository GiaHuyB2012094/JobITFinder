import mongoose from "mongoose";
const { Schema } = mongoose;

const industry = new Schema({
    value: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    }
})

const IndustryOfCompany = mongoose.model('IndustryOfCompany', industry);
export default IndustryOfCompany;
