import { NextFunction, Request, Response } from 'express';
import { CustomError } from '@services/utils/errorHandler';

export const globalError = async (err: any, _req: Request, res: Response, _next: NextFunction) => {
  try {
    if (err instanceof CustomError) {
      res.status(err.serializeErrors().statusCode).json(err.serializeErrors());
    }
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      statusCode: 500
    });
  }
};
