import { RequestHandler } from 'express';
import { messageService } from '@app/services';
import { createMessageForm, updateMessageForm } from './message.validator';

const getByPage: RequestHandler = async (req, res) => {
  let { cursor, pageSize } = req.query;
  const { conversationRoomId } = req.params;
  cursor = cursor ? cursor : '';
  pageSize = pageSize ? pageSize : 25;

  const messages = await messageService.getByPage(cursor, pageSize, { conversationRoomId });
  res.send(messages);
};

const create: RequestHandler = async (req, res) => {
  req.body.senderId = req.user.id;
  const { errors, form } = await createMessageForm.validate({ ...req.params, ...req.body });

  if (errors) {
    res.status(400).send({ errors });
    return;
  }

  const message = await messageService.create(form);

  res.send(message);
};

const update: RequestHandler = async (req, res) => {
  req.body.senderId = req.user.id;
  const { errors, form } = await updateMessageForm.validate({ ...req.params, ...req.body });

  if (errors) {
    res.status(400).send({ errors });
    return;
  }

  const message = await messageService.update(form.id, form.text);

  res.send(message);
};

export const messageController = {
  getByPage,
  create,
  update,
};
