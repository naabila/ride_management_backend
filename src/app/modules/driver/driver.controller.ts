import { Request, Response } from 'express';
import { DriverService } from './driver.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsyncHandler } from '../../utils/catchAsyncHandler';

export const DriverController = {
  createDriver: catchAsyncHandler(async (req: Request, res: Response) => {
    const driver = await DriverService.createDriver(req.body);
    sendResponse(res,200,'Driver created successfully',driver);
  }),

  approveDriver: catchAsyncHandler(async (req: Request, res: Response) => {
    const driver = await DriverService.updateDriver(req.params.id, { isApproved: true });
    sendResponse(res, 200, 'Driver approved successfully', driver);
     }),

  setDriverAvailability: catchAsyncHandler(async (req: Request, res: Response) => {
    const driver = await DriverService.updateDriver(req.params.id, { isOnline: req.body.isOnline });
    sendResponse(res, 200, 'Driver availability updated', driver);

  }),

  getAvailableDrivers: catchAsyncHandler(async (req: Request, res: Response) => {
    const drivers = await DriverService.getAvailableDrivers();
    sendResponse(res, 200, 'Available drivers retrieved successfully', drivers);
    
  }),

  getEarnings: catchAsyncHandler(async (req: any, res: Response) => {
    const earnings = await DriverService.getDriverEarnings(req.user.id);
    sendResponse(res, 200, 'Earnings retrieved successfully', earnings);
 }),
};