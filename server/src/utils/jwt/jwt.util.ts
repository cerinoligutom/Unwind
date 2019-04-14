import 'tsconfig-paths/register';

import { JWT_OPTIONS } from '@app/config/jwt-options';
import jwt from 'jsonwebtoken';

export interface IJwtPayload {
  userId: string;
}

const sign = (payload: {}) => {
  const secretKey = `${JWT_OPTIONS.secretOrKey}`;

  return jwt.sign(payload, secretKey, {
    expiresIn: '30d',
  });
};

export const jwtUtil = {
  sign,
};
