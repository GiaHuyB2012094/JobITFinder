import mongoose from "mongoose";
const { Schema } = mongoose;

const apply = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
    cv: {
      type: {},
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "await",
    },
    interviewSchedule: {
      type: {},
    },
    companyID: {
      type: String,
      required: true,
    },
    post: {
      type: {},
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    answerInterviewQuestion: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);
const Apply = mongoose.model("Apply", apply);
export default Apply;
