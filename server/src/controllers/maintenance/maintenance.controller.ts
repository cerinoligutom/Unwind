import { Request, Response } from 'express';

const healthCheck = (req: Request, res: Response) => {
  res.send({
    status: 'OK',
  });
};

const serverTime = (req: Request, res: Response) => {
  const now = new Date();
  res.send({
    utcTime: now.toUTCString(),
    localTime: now.toString(),
    ms: now.getTime(),
    iso: now.toISOString(),
  });
};

export const maintenanceController = {
  healthCheck,
  serverTime,
};
