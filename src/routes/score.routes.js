import { Router } from 'express';
import { runScoring } from '../controllers/score.controller.js';

const router = Router();
router.post('/score', runScoring);
export default router;
