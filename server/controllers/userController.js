import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// Auth user get/set token
// route POST /api/users/auth

import { v4 as uuidv4 } from "uuid";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    if (user.position === "user") {
      res.status(201).json({
        _id: user._id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        avatar: user.avatar,
        coverImg: user.coverImg,
        date: user.date,
        address: user.address,
        phone: user.phone,
        position: user.position,
      });
    } else if (user.position === "company") {
      res.status(201).json({
        _id: user._id,
        position: user.position,
        email: user.email,
        nameCompany: user.nameCompany,
        address: user.address,
        phone: user.phone,
        website: user.website,
        industryCompany: user.industryCompany,
        skillOfCompany: user.skillOfCompany,
        infoOfCompany: user.infoOfCompany,
        sizeCompany: user.sizeCompany,
        nationality: user.nationality,
        coverImg: user.coverImg,
        avatar: user.avatar,
        benefits: user.benefits,
        addressDetail: user.addressDetail,
        imagesCompany: user.imagesCompany,
        setOfQuestions: user.setOfQuestions,
      });
    }
  } else {
    res.status(401);
    throw new Error("Email hoặc mật khẩu không hợp lệ");
  }
});

// route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  // company-----------------------------------------
  const { position } = req.body;
  if (position === "company") {
    console.log("company");
    console.log(req.body);
    const {
      email,
      password,
      nameCompany,
      phone,
      industryCompany,
      skillOfCompany,
      address,
    } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Tài khoản công ty đã tồn tại");
    }
    const user = await User.create({
      position,
      email,
      password,
      nameCompany,
      phone,
      industryCompany,
      skillOfCompany,
      address,
    });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        email: user.email,
        nameCompany: user.nameCompany,
        phone: user.phone,
        industryCompany: user.industryCompany,
        skillOfCompany: user.skillOfCompany,
        position: user.position,
      });
    } else {
      res.status(400);
      throw new Error("Thông tin công ty không hợp lệ");
    }
  }
  // user---------------------------
  else if (position === "user") {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const { firstName, lastName, password, email, position } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Tài khoản người dùng đẵ tồn tại");
    }

    if (!email) {
      res.status(400);
      throw new Error("Email không được bỏ trống");
    } else {
      let validEmail = emailRegex.test(email);
      let parts = email.split("@");
      let domainParts = parts[1].split(".");

      let checkEmailFormat = domainParts.some(function (part) {
        return part.length > 63;
      });

      if (!validEmail || checkEmailFormat || parts[0].length > 64) {
        res.status(400);
        throw new Error("Email không đúng định dạng");
      }
    }

    const user = await User.create({
      lastName,
      firstName,
      email,
      password,
      position,
    });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        position: user.position,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// route POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout User" });
});

// route GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    nameCompany: req.user.nameCompany,
    email: req.user.email,
    phone: req.user.phone,
    avatar: req.user.avatar,
    coverImg: req.user.coverImg,
    address: req.user.address,
    website: req.user.website,
    industryCompany: req.user.industryCompany,
    skillOfCompany: req.user.skillOfCompany,
    sizeCompany: req.user.sizeCompany,
    infoOfCompany: req.user.infoOfCompany,
    nationality: req.user.nationality,
  };
  res.status(200).json(user);
});

// route GET /api/users/:id
const getCompanyItem = asyncHandler(async (req, res) => {
  const companyExit = await User.findById(req.params.id);
  if (!companyExit || companyExit.position !== "company") {
    res.status(404);
    throw new Error("Not Found Company");
  }
  return res.status(200).json(companyExit);
});

// route GET /api/users/user/:id
const getUserItem = asyncHandler(async (req, res) => {
  const userExit = await User.findById(req.params.id);
  if (!userExit || userExit.position !== "user") {
    res.status(404);
    throw new Error("Not Found User");
  }
  return res.status(200).json(userExit);
});

const getAllCompany = asyncHandler(async (req, res) => {
  const companyList = await User.find({ position: "company" });
  if (companyList) {
    return res
      .status(200)
      .json(companyList.sort((a, b) => 0.5 - Math.random()));
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// route PUT /api/users/proflie
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (user.position === "company") {
      user.nameCompany = req.body.nameCompany || user.nameCompany;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user?.phone;
      user.avatar = req.body.avatar || user?.avatar || "";
      user.coverImg = req.body.coverImg || user?.coverImg || "";
      user.address = req.body.address || user.address;
      user.addressDetail = req.body.addressDetail || user.addressDetail || [];
      user.website = req.body.website || user.website || "";
      user.industryCompany =
        req.body.industryCompany || user.industryCompany || [];
      user.skillOfCompany =
        req.body.skillOfCompany || user.skillOfCompany || [];
      user.sizeCompany = req.body.sizeCompany || user.sizeCompany || "";
      user.infoOfCompany = req.body.infoOfCompany || user.infoOfCompany || "";
      user.nationality = req.body.nationality || user.nationality || "";
      user.benefits = req.body.benefits || user.benefits || [];
      user.imagesCompany = req.body.imagesCompany || user.imagesCompany || [];
    } else if (user.position === "user") {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.avatar = req.body.avatar || user?.avatar || "";
      user.phone = req.body.phone || user?.phone;
      user.coverImg = req.body.coverImg || user?.coverImg || "";
      user.address = req.body.address || user.address;
      user.date = req.body.date || user.date;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    if (user.position === "company") {
      return res.status(200).json({
        _id: updatedUser._id,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        coverImg: updatedUser.coverImg,
        address: updatedUser.address,
        addressDetail: updatedUser.addressDetail,
        website: updatedUser.website,
        industryCompany: updatedUser.industryCompany,
        skillOfCompany: updatedUser.skillOfCompany,
        sizeCompany: updatedUser.sizeCompany,
        infoOfCompany: updatedUser.infoOfCompany,
        nationality: updatedUser.nationality,
        nameCompany: updatedUser.nameCompany,
        email: updatedUser.email,
        benefits: updatedUser.benefits,
        imagesCompany: updatedUser.imagesCompany,
      });
    } else if (user) {
      return res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        coverImg: updatedUser.coverImg,
        address: updatedUser.address,
        email: updatedUser.email,
        date: updatedUser.date,
      });
    }
  } else {
    res.status(401);
    throw new Error("User not found");
  }
  // route PUT /api/users/proflie

  //route POST /api/users/add-questions-company/
});

const addQuestionsCompany = asyncHandler(async (req, res) => {
  try {
    const userExit = await User.findById(req.params.id);

    let questionsObs = Object.assign(
      {},
      {
        id: uuidv4(),
        name: req.body.name,
        questions: req.body.questions,
        date: req.body.date,
      }
    );

    userExit.setOfQuestions.push(questionsObs);
    userExit.save();

    return res.status(200).json(userExit);
  } catch (error) {
    res.status(401);
    throw new Error("User not found");
  }
});

const updateQuestionsCompany = asyncHandler(async (req, res) => {
  try {
    const userExit = await User.findById(req.params.id);

    for (let i = 0; i < userExit.setOfQuestions.length; i++) {
      if (userExit.setOfQuestions[i].id === req.body.id) {
        userExit.setOfQuestions[i] = req.body;
      }
    }

    userExit.save();

    return res.status(200).json(userExit);
  } catch (error) {
    res.status(401);
    throw new Error("User not found");
  }
});

const deleteQuestionsCompany = asyncHandler(async (req, res) => {
  try {
    console.log(req.body, req.params.id);
    const userExit = await User.findById(req.params.id);

    userExit.setOfQuestions = userExit.setOfQuestions.filter(
      (question) => question.id !== req.body.id
    );

    userExit.save();

    // console.log(userExit.setOfQuestions);
    return res.status(200).json(userExit);
  } catch (error) {
    res.status(401);
    throw new Error("User not found");
  }
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllCompany,
  getCompanyItem,
  getUserItem,
  addQuestionsCompany,
  updateQuestionsCompany,
  deleteQuestionsCompany,
};
