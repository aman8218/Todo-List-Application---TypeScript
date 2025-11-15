import { Request, Response, NextFunction } from 'express';
import { logError } from '../utils/logger';
import { AuthRequest } from './auth';

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error';

  // Log error to database
  await logError({
    message: message,
    stack: err.stack,
    statusCode,
    method: req.method,
    url: req.originalUrl,
    userId: (req as AuthRequest).user?.id,
  });

  // Mongoose duplicate key error
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(', ');
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};