import { Router } from 'express';
import multer from 'multer';
import { uploadLeads } from '../controllers/leads.controller.js';

const router = Router();
const upload = multer(); // memory storage

router.post('/upload', upload.single('file'), uploadLeads);
export default router;
