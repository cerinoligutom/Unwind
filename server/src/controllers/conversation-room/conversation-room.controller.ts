import { RequestHandler } from 'express';
import { conversationRoomService } from '@app/services';
import { createConversationRoomForm, updateConversationRoomForm } from './conversation-room.validator';

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const conversationRoom = await conversationRoomService.getById(id);

  conversationRoom ? res.send(conversationRoom) : res.status(404).send();
};

const create: RequestHandler = async (req, res) => {
  const { errors, form } = await createConversationRoomForm.validate({ ...req.body });

  if (errors) {
    res.status(400).send({ errors });
    return;
  }

  const conversationRoom = await conversationRoomService.create(form);

  res.send(conversationRoom);
};

const update: RequestHandler = async (req, res) => {
  const { errors, form } = await updateConversationRoomForm.validate({ ...req.params, ...req.body });

  if (errors) {
    res.status(400).send({ errors });
    return;
  }

  const conversationRoom = await conversationRoomService.update(form.id, form);

  res.send(conversationRoom);
};

const addUserToConversationRoom: RequestHandler = async (req, res) => {
  const { conversationRoomId, userId } = req.params;

  const success = await conversationRoomService.addUserToConversationRoom(userId, conversationRoomId);

  res.send({ success });
};

const removeUserFromConversationRoom: RequestHandler = async (req, res) => {
  const { conversationRoomId, userId } = req.params;

  const success = await conversationRoomService.removeUserFromConversationRoom(userId, conversationRoomId);

  res.send({ success });
};

export const conversationRoomController = {
  getById,
  create,
  update,
  addUserToConversationRoom,
  removeUserFromConversationRoom,
};
