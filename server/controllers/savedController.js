import asyncHandler from "express-async-handler";
import SavedPostOfUser from "../models/saved.js";
import User from "../models/userModel.js";
import Post from "../models/post.js";

// route Post /api/saved/:idUser/:idPost
const postSaved = asyncHandler(async (req, res) => {
  try {
    const { userID, postID } = req.params;

    const postSaved = await Post.findById(postID);
    console.log(postSaved);
    if (postSaved) {
      const companySaved = await User.findById(postSaved.company);
      companySaved.saved++;
      await companySaved.save();

      console.log(companySaved);

      const saved = await SavedPostOfUser.create({ userID, postID });

      res.status(201).json({
        _id: saved._id,
        userID: saved.userID,
        postID: saved.postID,
      });
    }
    return res.status(404).json({ message: "not found post" });
  } catch (error) {
    res.status(400);
    throw new Error("Error create save");
  }
});

// route Delete /api/saved/:idSaved
const deleteSaved = asyncHandler(async (req, res) => {
  try {
    const Saved = await SavedPostOfUser.findById(req.params.isSaved);
    if (Saved) {
      const postSaved = await Post.findById(Saved.postID);
      const companySaved = await User.findById(postSaved.company);
      companySaved.saved--;
      await companySaved.save();

      await SavedPostOfUser.findByIdAndDelete(req.params.idSaved);
      return res.status(200).json({ message: "Delete save post successfully" });
    }
    return res.status(404).json({ message: "not found saved" });
  } catch (error) {
    res.status(400);
    throw new Error("Error delete save");
  }
});

// route Get /api/saved/:userID
const getSavedOfUser = asyncHandler(async (req, res) => {
  try {
    const result = await SavedPostOfUser.find({ userID: req.params.id }).exec();

    if (SavedPostOfUser) return res.status(200).json(result);
    return res.status(404).json({ message: "not post saved" });
  } catch (error) {
    res.status(400);
    throw new Error("Error delete save");
  }
});
export { postSaved, deleteSaved, getSavedOfUser };
