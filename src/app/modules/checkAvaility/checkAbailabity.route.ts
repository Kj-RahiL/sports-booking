import { Router } from 'express';
import { checkAvailabilityController } from './checkAvailability.controller';

const router = Router();
router.get('/check-availability', checkAvailabilityController);

export const checkAvailabilityRoutes = router;
