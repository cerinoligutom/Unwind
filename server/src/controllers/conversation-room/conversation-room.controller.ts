import { RequestHandler } from 'express';
import { conversationRoomService, roomInviteService } from '@app/services';
import { createConversationRoomForm, updateConversationRoomForm } from './conversation-room.validator';
import { IFormFieldValidationError } from '@app/utils';

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

  // Add the user who created the room to the room
  await conversationRoomService.addUserToConversationRoom(req.user.id, conversationRoom.id);

  res.send(await conversationRoomService.getById(conversationRoom.id));
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

const joinByInvitationKey: RequestHandler = async (req, res) => {
  const { key } = req.params;

  const roomId = await roomInviteService.getRoomIdFromInvitationKey(key);

  if (!roomId) {
    const error: IFormFieldValidationError = {
      key: 'key',
      message: 'The invitation code has expired.',
    };
    res.status(404).send({
      errors: [error],
    });
    return;
  }

  const room = await conversationRoomService.getById(roomId);

  if (!room) {
    const error: IFormFieldValidationError = {
      key: '',
      message: `The room you're trying to join does not exist anymore.`,
    };
    res.status(404).send({
      errors: [error],
    });
    return;
  }

  try {
    await conversationRoomService.addUserToConversationRoom(req.user.id, room.id);
    res.send(room);
  } catch {
    const error: IFormFieldValidationError = {
      key: '',
      message: `You're already in the room ${room.name}.`,
    };
    res.status(400).send({
      errors: [error],
    });
  }
};

const generateInvitationKey: RequestHandler = async (req, res) => {
  const { conversationRoomId } = req.params;

  const room = await conversationRoomService.getById(conversationRoomId);

  if (!room) {
    const error: IFormFieldValidationError = {
      key: '',
      message: `The room does not exist.`,
    };
    res.status(404).send({
      errors: [error],
    });
    return;
  }

  const invitationKey = await roomInviteService.createInvitationKey(room.id);

  res.send({ invitationKey });
};

export const conversationRoomController = {
  getById,
  create,
  update,
  addUserToConversationRoom,
  removeUserFromConversationRoom,
  joinByInvitationKey,
  generateInvitationKey,
};
