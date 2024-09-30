import express from 'express';
import { FacilityControllers } from './facility.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
} from './facility.validation';
import Auth from '../../middlewares/auth';
import { USER_Role } from '../User/user.constant';

const router = express.Router();

// only for admin create
router.post(
  '/',
  validateRequest(createFacilityValidationSchema),

  FacilityControllers.createFacility,
);
router.get('/:id', FacilityControllers.getSingleFacility);

// only for admin update and delete
router.patch(
  '/:id',
  validateRequest(updateFacilityValidationSchema),
  Auth(USER_Role.admin),
  FacilityControllers.updateFacility,
);
router.delete(
  '/:id',
  Auth(USER_Role.admin),
  FacilityControllers.deleteFacility,
);
router.get('/', FacilityControllers.getAllFacility);

export const FacilityRoutes = router;
