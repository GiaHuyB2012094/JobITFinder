import mongoose from "mongoose";

const { Schema } = mongoose;

const saved = new Schema({
    userID: {
        type: String,
        required: true,
    },
    postID: {
        type: String,
        required: true,
    }
})

const SavedPostOfUser = mongoose.model('SavedPostOfUser', saved);
export default SavedPostOfUser;