import asyncHandler from "express-async-handler";
import Post from "../models/post.js";

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
  return res.status(200).json(posts.sort((a, b) => 0.5 - Math.random()));
});

// route GET /api/jobPost/job/:{id}
// tim tat ca bai dang cua cong ty
const getByIdJobPost = asyncHandler(async (req, res) => {
  const post = await Post.find({ company: req.params.id }).exec();
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error(`Invalid job post with id = ${req.params.id}`);
  }
});
// route GET /api/jobPost/job-item/:id
const getByIdJobItemPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.status(200).json(post);
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
    console.log("update job post");
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
export {
  postJob,
  getAllJobPost,
  deleteJobPost,
  getByIdJobPost,
  updateJobPost,
  getByIdJobItemPost,
};
