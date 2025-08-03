import { NextFunction, Request, Response } from "express";
import { success } from "zod";

export default function globalErrorHandler(err:any,req:Request,res:Response,next:NextFunction){
err.statusCode=err.statusCode || 500;
err.status=err.status || 'error';
res.status(err.statusCode).json({
success:false,    
status: err.status,
message: err.message,  
})
}