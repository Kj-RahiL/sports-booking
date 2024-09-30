import { Router } from 'express';
import { PaymentController } from './payment.controller';

const router = Router();

router.post('/payment', PaymentController.confirmationController);

export const paymentRoutes = router;
