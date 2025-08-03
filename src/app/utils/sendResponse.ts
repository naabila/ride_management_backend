import { Response } from 'express';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T
) => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};