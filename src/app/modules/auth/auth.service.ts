import { User } from '../user/user.model';

import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt';
import AppError from '../../middlewares/AppError';

export const AuthService = {
  login: async (data: { email: string; password: string }) => {
    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      throw new AppError(401,'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401,'Invalid email or password');
    }

    if (user.isBlocked) {
      throw new AppError(403,'Account is blocked');
    }

    const token = generateToken({ userId: user._id.toString(), role: user.role });
    
    return { user: { _id: user._id, email: user.email, role: user.role }, token };
  },
};