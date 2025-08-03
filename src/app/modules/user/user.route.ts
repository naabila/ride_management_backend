import { Router } from 'express';
import { UserController } from './user.controller';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { registerValidation } from './user.validation';

const router = Router();

router.post('/register', validateRequest(registerValidation), UserController.register);
router.get('/', auth('admin'), UserController.getAllUsers);
router.patch('/block/:id', auth('admin'), UserController.blockUser);

export const UserRoutes = router;