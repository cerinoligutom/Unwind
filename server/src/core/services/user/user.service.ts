import { User } from '@app/models';

const getById = async (id: string) => {
  let user = await User.query().findOne('username', id);

  if (!user) {
    user = await User.query().findById(id);
  }

  return user;
};

const create = async (user: User) => {
  return User.query().insertAndFetch(user);
};

const update = async (id: string, user: User) => {
  return User.query().patchAndFetchById(id, user);
};

export const userService = {
  getById,
  create,
  update,
};
