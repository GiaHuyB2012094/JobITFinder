import express from 'express';
const router = express.Router()
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile, 
    getAllCompany,
    getCompanyItem} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.get('/companyList', getAllCompany);

router.get('/:id',getCompanyItem);
export default router;