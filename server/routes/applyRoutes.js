import express from 'express';
import { applyConform, applyReject, applySchedule, createApply, getAppliesByCompanyID, getAppliesByUserID, uploadFile } from '../controllers/applyController.js';
// import { upload } from '../utils/uploadFile.js';

import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./files");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
const upload = multer({ storage: storage });

const router = express.Router()

router.post('/', createApply);
router.get('/userID/:id', getAppliesByUserID);
router.get('/companyID/:id', getAppliesByCompanyID);
router.put('/conform-apply/:id', applyConform);
router.put('/reject-apply/:id', applyReject);
router.put('/schedule-apply/:id', applySchedule);

router.post('/upload-file', upload.single('file'), uploadFile)
export default router;