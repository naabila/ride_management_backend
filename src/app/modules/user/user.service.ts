import AppError from '../../middlewares/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';


export const UserService = {
  register: async (data: IUser) => {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError(400,'Email already exists');
    }
    return await User.create(data);
  },

  getAllUsers: async () => {
    return await User.find().select('-password');
  },

  blockUser: async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404,'User not found');
    }
    user.isBlocked = true;
    return await user.save();
  },
};