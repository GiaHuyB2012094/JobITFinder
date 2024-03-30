import asyncHandler from "express-async-handler";
import Apply from "../models/apply.js";
import Post from "../models/post.js";
// route POST /api/apply/
const createApply = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, email, phone, cv, intro, companyID, post, userID, status } =
    req.body;

  const applied = await Apply.findOne({
    name: name,
    email: email,
    userID: userID,
    phone: phone,
    companyID: companyID,
    post: {
      _id: post.id,
    },
  });

  if (applied) {
    res.status(400);
    throw new Error("You was applied this job");
  }
  const postExit = await Post.findById(post._id);

  if (!postExit) {
    res.status(400);
    throw new Error("Job don't exit");
  }
  postExit.apply += 1;
  if (!postExit.userIDList.includes(userID)) {
    postExit.userIDList.push(userID);
  }

  const apply = await Apply.create({
    name,
    email,
    phone,
    cv,
    intro,
    companyID,
    post,
    userID,
    status,
    interviewSchedule: {},
  });
  if (apply) {
    postExit.save();
    res.status(201).json(apply);
  } else {
    res.status(400);
    throw new Error("Invalid apply data");
  }
});
// route GET /api/apply/userID/:id
const getAppliesByUserID = asyncHandler(async (req, res) => {
  const apply = await Apply.find({ userID: req.params.id });
  if (apply) {
    res.status(200).json(apply);
  } else {
    res.status(404);
    throw new Error(`Not found apply by user with id = ${req.params.id}`);
  }
});
// route GET /api/apply/companyID/:id
const getAppliesByCompanyID = asyncHandler(async (req, res) => {
  const apply = await Apply.find({ companyID: req.params.id });
  if (apply) {
    res.status(200).json(apply);
  } else {
    res.status(404);
    throw new Error(`Not found apply by company with id = ${req.params.id}`);
  }
});
const uploadFile = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({
      pdf: req.file.filename,
      title: req.body.title,
    });
  } catch (error) {
    throw new Error(`error upload file with ${error}`);
  }
});
// route PUT /api/apply/apply-conform/:id
const applyConform = asyncHandler(async (req, res) => {
  try {
    const applyUpdated = await Apply.findByIdAndUpdate(
      req.params.id,
      {
        status: "successful",
      },
      {
        returnDocument: "after",
      }
    );
    return res.status(200).json(applyUpdated);
  } catch (error) {
    throw new Error(`error conform apply with ${error}`);
  }
});
// route PUT /api/apply/apply-reject/:id
const applyReject = asyncHandler(async (req, res) => {
  try {
    const applyUpdated = await Apply.findByIdAndUpdate(
      req.params.id,
      {
        status: "cancel",
      },
      {
        returnDocument: "after",
      }
    );
    const postExit = await Post.findById(applyUpdated.post._id);
    if (postExit.apply > 0) {
      postExit.apply -= 1;
    }
    postExit.save();
    return res.status(200).json(applyUpdated);
  } catch (error) {
    throw new Error(`error reject apply with ${error}`);
  }
});
// route PUT /api/apply/apply-schedule/:id
const applySchedule = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.id);

    const applyUpdated = await Apply.findByIdAndUpdate(
      req.params.id,
      {
        status: "scheduled",
        interviewSchedule: req.body,
      },
      {
        returnDocument: "after",
      }
    );
    return res.status(200).json(applyUpdated);
  } catch (error) {
    throw new Error(`error schedule apply with ${error}`);
  }
});
export {
  createApply,
  getAppliesByUserID,
  getAppliesByCompanyID,
  applyConform,
  uploadFile,
  applyReject,
  applySchedule,
};
