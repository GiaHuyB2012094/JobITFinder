import express from 'express';
import { deleteSaved, getSavedOfUser, postSaved } from '../controllers/savedController.js';
const router = express.Router()

router.post('/:userID/:postID',postSaved);
router.delete('/:idSaved', deleteSaved);
router.get('/:id',getSavedOfUser);

export default router;