import { Router } from 'express';
import { RideController } from './ride.controller';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { requestRideValidation, updateRideStatusValidation } from './ride.validation';
import { checkRole } from '../../middlewares/checkRoles';

const router = Router();

router.post('/request', auth(),checkRole(['rider']), validateRequest(requestRideValidation), RideController.requestRide);
router.patch('/:id/status', auth(),checkRole(['driver']), validateRequest(updateRideStatusValidation), RideController.updateRideStatus);
router.get('/me', auth(),checkRole(['rider']), RideController.getRideHistory);

export const RideRoutes = router;