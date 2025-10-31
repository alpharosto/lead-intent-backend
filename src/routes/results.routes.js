import { Router } from 'express';
import { listResults } from '../controllers/results.controller.js';

const router = Router();
router.get('/results', listResults);
export default router;
