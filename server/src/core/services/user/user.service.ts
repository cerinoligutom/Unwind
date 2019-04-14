import { User } from '@app/models';

const getById = async (id: string) => {
  return User.query().findById(id);
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
