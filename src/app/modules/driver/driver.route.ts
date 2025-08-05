import { Router } from 'express';
import { DriverController } from './driver.controller';
import { auth } from '../../middlewares/auth';

import { validateRequest } from '../../middlewares/validateRequest';
import { driverValidationSchema, suspendDriverValidationSchema, updateDriverValidationSchema } from './driver.validation';
import { checkRole } from '../../middlewares/checkRoles';

export const DriverRoutes = Router();

DriverRoutes.post(
  '/createDriver',
  auth(),
  checkRole(['admin', 'driver']),
  validateRequest(driverValidationSchema),
  DriverController.createDriver,
);

DriverRoutes.patch(
  '/approve/:id',
  auth(),
  checkRole(['admin']),
  DriverController.approveDriver,
);

DriverRoutes.patch(
  '/availability/:id',
  auth(),
  checkRole(['driver']),
  validateRequest(updateDriverValidationSchema),
  DriverController.setDriverAvailability,
);
//Suspend Driver Route
DriverRoutes.patch(
  '/suspend/:id',
  auth(),
  checkRole(['admin']),
  validateRequest(suspendDriverValidationSchema),
  DriverController.suspendDriver,
);

//Unsuspend Driver Route
DriverRoutes.patch(
  '/unsuspend/:id',
  auth(),
  checkRole(['admin']),
  DriverController.unsuspendDriver,
);
DriverRoutes.get(
  '/available',
  auth(),
  checkRole(['admin', 'rider']),
  DriverController.getAvailableDrivers,
);

DriverRoutes.get(
  '/earnings',
  auth(),
  checkRole(['driver']),
  DriverController.getEarnings,
);

export default DriverRoutes;