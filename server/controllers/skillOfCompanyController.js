import asyncHandler from 'express-async-handler'
import SkillOfCompany from '../models/skillOfCompany.js';

// route POST /api/skillofcompany/
const postSkill = asyncHandler(async (req, res) => {
    const { value, label } = req.body;
    const skillExists = await SkillOfCompany.findOne({value});

    if (skillExists) {
        res.status(400);
        throw new Error('Skill already exists');
    } 
    const skill = await SkillOfCompany.create({value, label})
    if (skill) {
        res.status(201).json({
            _id: skill._id,
            value: skill.value,
            label: skill.label,
        })
    } else {
        res.status(400);
        throw new Error('Invalid skill data');
    }
});
// route GET /api/skillofcompany/skills
const getSkills = asyncHandler(async (req, res) => {
    const skills = await SkillOfCompany.find({});
    res.status(200).json(skills);
})

// route PUT /api/skillofcompany/skill:{id}
const updateSkill = asyncHandler(async (req, res) => {
    try {
        const { value, label } = req.body;
        const skillUpdate = await SkillOfCompany.findByIdAndUpdate(req.params.id,{value, label});
        return res.status(200).json(skillUpdate);

    } catch (err) {
        throw new Error('Error update skill')
    }
})

// route Delete /api/skillofcompany/skill:{id}
const deleteSkill = asyncHandler(async (req, res) => {
    try {
        await SkillOfCompany.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Delete skill successfully"})
    } catch (error) {
        throw new Error('Error delete skill')
    }
})
 export {
    postSkill,
    getSkills,
    updateSkill,
    deleteSkill,
 }
