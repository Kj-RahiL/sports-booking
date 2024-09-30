import { Router } from 'express';
import { FacilityRoutes } from '../modules/Facility/facility.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
