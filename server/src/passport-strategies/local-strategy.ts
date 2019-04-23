import { User } from '@app/models';
import { passwordUtil } from '@app/utils';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.query().findOne('email', email);

        if (user) {
          const isValidPassword = await passwordUtil.verify(password, user.hash, user.salt);

          if (isValidPassword) {
            return done(undefined, user, {
              message: 'Logged in successfully ',
            });
          }
          return done(undefined, false, { message: 'Wrong email or password.' });
        }
        return done(undefined, false, { message: 'Wrong email or password.' });
      } catch (error) {
        return done(error, false, {
          message: '[local-strategy] Something went wrong.',
        });
      }
    },
  ),
);
