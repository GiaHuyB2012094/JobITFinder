import mongoose from "mongoose";
const { Schema } = mongoose;

const post = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    apply: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Successful",
    },
    name: {
      type: String,
      required: true,
    },
    imgPost: {
      type: [String],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    urlApply: {
      type: String,
      // required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    gender: {
      type: String,
      // required: true,
    },
    minSalary: {
      type: Number,
    },
    maxSalary: {
      type: Number,
    },
    skills: {
      type: [String],
      // required: true,
    },
    contract: {
      type: [String],
      // required: true,
    },
    typeJob: {
      type: [String],
      // required: true,
    },
    level: {
      type: [String],
      // required: true,
    },
    benefit: {
      type: [String],
      // required: true,
    },
    request: {
      type: [String],
      // required: true,
    },
    locations: {
      type: [String],
      // required: true,
    },
    interviewProcess: {
      type: [String],
      // required: true,
    },
    deadline: {
      type: Date,
    },
    urgentRecruitment: {
      type: Boolean,
      default: false,
    },
    userIDList: {
      type: [String],
      default: [],
    },
    interviewQuestions: {
      type: [],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", post);
export default Post;
