import { env } from '@app/config/environment';
import { Request, Response, NextFunction } from 'express';

interface ICustomError extends Error {
  statusCode: number;
}

export const customErrorMiddleware = () => {
  return (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
    // Log error message in our server's console
    console.error(err.message);

    // All HTTP requests must have a response, so let's send back an error with its status code and message
    res.status(err.statusCode || 500).send({
      errors: {
        message: env.isProduction ? 'Oops. Something went wrong.' : err.message,
        data: env.isProduction ? {} : err,
      },
    });
  };
};
