import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;


const userSchema = new Schema({
    lastName: {
        type : String,
    },
    firstName: {
        type : String,
    },
    email: {
        type : String,
        required: true,
        unique: true,
    },
    password: {
        type : String,
        required: true
    },
    position: {
        type: String,
        required: true,
        default: "user",
    },
    avatar: {
        type: String,
    },
    coverImg: {
        type: String, 
    },
    address: {
        type: String,
    },
    addressDetail: {
        type: [String],
    },
    phone: {
        type: String,
    }, 
    date: {
        type: Date,
    },
    // company
    nameCompany: {
        type: String,
    },
    website: {
        type: String,
    },
    industryCompany:  {
        type:  [String],
    },
    skillOfCompany:  {
        type:  [String],
    },
    infoOfCompany: {
        type: String,
    },
    sizeCompany: {
        type: Number,
    },
    nationality: {
        type: String,
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;