import 'tsconfig-paths/register';

import { JWT_OPTIONS } from '@app/config/jwt-options';
import jwt from 'jsonwebtoken';

export interface IJwtPayload {
  userId: string;
}

const secretKey = `${JWT_OPTIONS.secretOrKey}`;

const sign = (payload: {}) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: '30d',
  });
};

const verify = (token: string) => {
  return jwt.verify(token, secretKey);
};

export const jwtUtil = {
  sign,
  verify,
};
