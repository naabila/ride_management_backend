import { Request } from 'express';

// Define the structure of the user object (matches jwt.ts)
interface DecodedToken {
  userId: string;
  role: string;
}

// Extend Express Request interface
declare module 'express' {
  interface Request {
    user?: DecodedToken;
  }
}