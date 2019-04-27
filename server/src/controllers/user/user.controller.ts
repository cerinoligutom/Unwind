import { RequestHandler } from 'express';
import { userService, conversationRoomService } from '@app/services';
import { createUserForm, updateUserForm } from './user.validator';
import { passwordUtil } from '@app/utils';
import { env } from '@app/config/environment';

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  user ? res.send(user) : res.status(404).send();
};

const getConversationRooms: RequestHandler = async (req, res) => {
  if (req.user) {
    const conversationRooms = await userService.getConversationRooms(req.user.id);
    res.send(conversationRooms);
    return;
  }

  res.status(404).send();
};

const create: RequestHandler = async (req, res) => {
  const { errors, form } = await createUserForm.validate({ ...req.body });

  if (errors) {
    res.status(400).send({ errors });
    return;
  }

  const salt = await passwordUtil.generateSalt();
  const hash = await passwordUtil.generateHash(form.hash, salt);

  form.hash = hash;
  form.salt = salt;

  const user = await userService.create(form);

  // Add user to default public room
  await conversationRoomService.addUserToConversationRoom(user.id, env.defaults.chatRoom);

  res.send(user);
};

const update: RequestHandler = async (req, res) => {
  const { errors, form } = await updateUserForm.validate({ ...req.params, ...req.body });

  if (errors) {
    res.status(400).send({ errors });
    return;
  }

  const user = await userService.update(form.id, form);

  res.send(user);
};

export const userController = {
  getById,
  getConversationRooms,
  create,
  update,
};
