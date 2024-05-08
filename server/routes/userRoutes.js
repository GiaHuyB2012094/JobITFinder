import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllCompany,
  getUserItem,
  getCompanyItem,
  addQuestionsCompany,
  updateQuestionsCompany,
  deleteQuestionsCompany,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/companyList", getAllCompany);

router.get("/:id", getCompanyItem);
router.get("/user/:id", getUserItem);

router.post("/add-questions-company/:id", addQuestionsCompany);
router.post("/update-questions-company/:id", updateQuestionsCompany);

router.delete("/delete-question-company/:id", deleteQuestionsCompany);
export default router;
