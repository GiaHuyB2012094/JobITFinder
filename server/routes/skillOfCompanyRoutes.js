import express from 'express';
const router = express.Router()
import { deleteSkill, getSkills, postSkill, updateSkill } from '../controllers/skillOfCompanyController.js';

router.post('/',postSkill);
router.get('/skills',getSkills);
router.put('/skill/:id',updateSkill);
router.delete('/skill/:id',deleteSkill);

export default router;