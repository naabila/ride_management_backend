import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import router from './app/routes';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import { AppRoutes } from './app/routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1', AppRoutes);

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Ride Booking API is running!',
  });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;