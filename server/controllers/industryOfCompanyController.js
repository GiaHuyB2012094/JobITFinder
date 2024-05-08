import asyncHandler from "express-async-handler";
import IndustryOfCompany from "../models/industryOfCompany.js";

// route POST /api/industryofcompany/
const postIndustry = asyncHandler(async (req, res) => {
  const { value, label } = req.body;
  const industryExists = await IndustryOfCompany.findOne({ value });

  if (industryExists) {
    res.status(400);
    throw new Error("Industry already exists");
  }
  const industry = await IndustryOfCompany.create({ value, label });
  if (industry) {
    res.status(201).json({
      _id: industry._id,
      value: industry.value,
      label: industry.label,
    });
  } else {
    res.status(400);
    throw new Error("Invalid industry data");
  }
});
// route GET /api/industryofcompany/industryList
const getIndustry = asyncHandler(async (req, res) => {
  const industryList = await IndustryOfCompany.find({});
  res.status(200).json(industryList);
});

// route PUT /api/industryofcompany/industry:{id}
const updateIndustry = asyncHandler(async (req, res) => {
  try {
    const { value, label } = req.body;
    const industryUpdate = await IndustryOfCompany.findByIdAndUpdate(
      req.params.id,
      { value, label }
    );
    return res.status(200).json(industryUpdate);
  } catch (err) {
    throw new Error("Error update industry");
  }
});

// route Delete /api/industryofcompany/industry:{id}
const deleteIndustry = asyncHandler(async (req, res) => {
  try {
    await IndustryOfCompany.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Delete industry successfully" });
  } catch (error) {
    throw new Error("Error delete industry");
  }
});
export { postIndustry, getIndustry, updateIndustry, deleteIndustry };
