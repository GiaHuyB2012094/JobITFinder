import express from 'express';
import { deleteIndustry, getIndustry, postIndustry, updateIndustry } from '../controllers/industryOfCompanyController.js';
const router = express.Router()

router.post('/',postIndustry);
router.get('/industryList',getIndustry);
router.put('/industry/:id',updateIndustry);
router.delete('/industry/:id',deleteIndustry);

export default router;