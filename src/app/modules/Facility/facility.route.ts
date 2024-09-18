import express from 'express';
import { FacilityControllers } from './facility.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacilityValidationSchema } from './facility.validation';

const router = express.Router();

// only for admin create
router.post(
  '/',
  validateRequest(updateFacilityValidationSchema),
  FacilityControllers.createFacility,
);
router.get('/:id', FacilityControllers.getSingleFacility);

// only for admin update and delete
router.patch('/:id', FacilityControllers.updateFacility);
router.delete('/:id', FacilityControllers.deleteFacility);
router.get('/', FacilityControllers.getAllFacility);

export const FacilityRoutes = router;
