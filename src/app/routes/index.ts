import { Router } from 'express';
//import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
// import { RideRoutes } from '../modules/ride/ride.route';
// import { DriverRoutes } from '../modules/driver/driver.route';

export const router = Router();

const moduleRoutes = [
//   {
//     path: '/auth',
//     route: AuthRoutes,
//   },
  {
    path: '/users',
    route: UserRoutes,
  },
//   {
//     path: '/rides',
//     route: RideRoutes,
//   },
//   {
//     path: '/drivers',
//     route: DriverRoutes,
//   },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const AppRoutes = router;