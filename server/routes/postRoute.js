import express from "express";
import {
  addInterviewQuestions,
  deleteInterviewQuestions,
  deleteJobPost,
  getAllJobPost,
  getByIdJobItemPost,
  getByIdJobPost,
  postJob,
  updateJobPost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", postJob);
router.get("/listJobs", getAllJobPost);

router
  .route("/job/:id")
  .get(getByIdJobPost) // tim tat ca bai dang cua cong ty
  .delete(deleteJobPost)
  .put(updateJobPost);
router.get("/job-item/:id", getByIdJobItemPost); // tim 1 bai theo id

router.post("/add-questions/:id", addInterviewQuestions);
router.delete("/delete-question/:id", deleteInterviewQuestions);
export default router;
