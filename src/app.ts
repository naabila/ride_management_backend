import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import router from './app/routes';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
// app.use('/api/v1', router);

// Routes
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello from floor 6th",
  });
});

// Global Error Handler
// app.use(globalErrorHandler);

export default app;