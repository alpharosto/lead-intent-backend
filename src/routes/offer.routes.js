import { Router } from 'express';
import { upsertOffer } from '../controllers/offer.controller.js';
const router = Router();

router.post('/', upsertOffer);
export default router;
