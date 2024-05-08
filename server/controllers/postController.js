import asyncHandler from "express-async-handler";
import Post from "../models/post.js";

const currentDay = new Date();
// POST /api/jobPost/
const postJob = asyncHandler(async (req, res) => {
  const postJob = await Post.findOne({
    name: req.body.name,
    urlApply: req.body.urlApply,
    email: req.body.email,
  });
  if (postJob) {
    res.status(400);
    throw new Error("Jobs was posted");
  }

  const job = await Post.create(req.body);
  if (job) {
    res.status(201).json(job);
  } else {
    res.status(400);
    throw new Error("Invalid job post data");
  }
});

// route GET /api/jobPost/listJobs
const getAllJobPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  if (posts) {
    const results = posts.filter((post) => {
      const deadline = new Date(post.deadline);
      return (
        deadline.getTime() > currentDay.getTime() ||
        posts.quantity < posts.apply
      );
    });
    return res.status(200).json(results.sort((a, b) => 0.5 - Math.random()));
  } else {
    res.status(400);
    throw new Error("Invalid job post data");
  }
});

// route GET /api/jobPost/job/:{id}
// tim tat ca bai dang cua cong ty
const getByIdJobPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({ company: req.params.id }).exec();
  if (posts) {
    const results = posts.filter((post) => {
      const deadline = new Date(post.deadline);
      return deadline.getTime() > currentDay.getTime();
    });

    return res.status(200).json(results);
  } else {
    res.status(404);
    throw new Error(`Invalid job post with id = ${req.params.id}`);
  }
});
// route GET /api/jobPost/job-item/:id
const getByIdJobItemPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    const deadline = new Date(post.deadline);

    if (deadline.getTime() > currentDay.getTime()) {
      res.status(200).json(post);
    } else {
      res.status(400);
      throw new Error("Job expired");
    }
  } else {
    res.status(404);
    throw new Error(`Invalid job post with id = ${req.params.id}`);
  }
});
// route Delete /api/jobPost/job/:{id}
const deleteJobPost = asyncHandler(async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Delete job post successfully" });
  } catch (error) {
    throw new Error("Error delete post");
  }
});

// route Put /api/jobPost/job/:{id}
const updateJobPost = asyncHandler(async (req, res) => {
  try {
    const postExit = await Post.findById(req.params.id);
    if (!postExit) {
      res.status(400);
      throw new Error(`Invalid job post with id = ${req.params.id}`);
    }
    const result = await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("update successfully");
  } catch (error) {
    throw new Error("Error update post");
  }
});

const addInterviewQuestions = asyncHandler(async (req, res) => {
  try {
    const postExit = await Post.findById(req.params.id);
    if (!postExit) {
      res.status(400);
      throw new Error(`Invalid job post with id = ${req.params.id}`);
    }

    const questionArr = req.body.questions;
    questionArr.forEach((question) =>
      postExit.interviewQuestions.push(question)
    );
    postExit.save();

    return res.status(200).json(postExit);
  } catch (error) {
    throw new Error("Error add interview Questions");
  }
});

const deleteInterviewQuestions = asyncHandler(async (req, res) => {
  try {
    const postExit = await Post.findById(req.params.id);
    if (!postExit) {
      res.status(400);
      throw new Error(`Invalid job post with id = ${req.params.id}`);
    }

    const postInterviewQuestionsTemp = [...postExit.interviewQuestions];

    postInterviewQuestionsTemp.splice(req.body.idx, 1);

    postExit.interviewQuestions = postInterviewQuestionsTemp;

    postExit.save();

    return res.status(200).json(postExit);
  } catch (error) {
    throw new Error("Error add interview Questions");
  }
});

export {
  postJob,
  getAllJobPost,
  deleteJobPost,
  getByIdJobPost,
  updateJobPost,
  getByIdJobItemPost,
  addInterviewQuestions,
  deleteInterviewQuestions,
};
