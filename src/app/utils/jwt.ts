import jwt from 'jsonwebtoken';
import { envVars } from '../config/env';


export const generateToken = (payload: { userId: string; role: string }) => {
  return jwt.sign(payload, envVars.JWT_SECRET, { expiresIn: envVars.JWT_EXPIRES_IN  } as jwt.SignOptions);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, envVars.JWT_SECRET) as { userId: string; role: string };
};