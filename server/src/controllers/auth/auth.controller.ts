import { RequestHandler } from 'express';
import passport from 'passport';
import { User } from '@app/models';
import { IJwtPayload, jwtUtil } from '@app/utils';
import { userController } from '../user/user.controller';

const login: RequestHandler = (req, res, next) => {
  passport.authenticate('local', async (err, user: User, info) => {
    if (err || !user) {
      if (!err) {
        res.status(401).send(info);
      }
      return next(err);
    }

    req.login(user, { session: false }, async error => {
      if (error) {
        return next(error);
      }

      const payload: IJwtPayload = {
        userId: user.id,
      };

      const token = jwtUtil.sign(payload);

      return res.json({ token });
    });
  })(req, res, next);
};

const register: RequestHandler = async (req, res, next) => {
  await userController.create(req, res, next);
};

const isAuthenticated: RequestHandler = (req, res) => {
  if (req.user) {
    res.send({ isAuthenticated: true });
  } else {
    res.status(401).send({
      message: 'Unauthenticated.',
    });
  }
};

const me: RequestHandler = (req, res) => {
  if (req.user) {
    // Don't send the hash and salt details
    const { hash, salt, ...user } = req.user;
    res.send(user);
  } else {
    res.status(401).send({
      message: 'Unauthenticated.',
    });
  }
};

export const authController = {
  login,
  register,
  isAuthenticated,
  me,
};
