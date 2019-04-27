import { Message, MessageRecipient, User } from '@app/models';
import { ICursorResult } from 'objection-cursor';
import { broadcastMessage } from '@app/socket';

interface IGetByPageFilters {
  conversationRoomId: string;
}

const getById = async (id: string) => {
  return Message.query()
    .findById(id)
    .eager('sender')
    .omit(User, ['hash', 'salt', 'createdAt', 'updatedAt']);
};

const getByPage = async (
  cursor: string = '',
  pageSize: number = 25,
  filters: IGetByPageFilters,
): Promise<ICursorResult<Message>> => {
  const query = Message.query()
    .eager('sender')
    .where('conversationRoomId', filters.conversationRoomId)
    .orderBy('createdAt', 'desc')
    .omit(User, ['hash', 'salt', 'createdAt', 'updatedAt'])
    .limit(pageSize);

  // * https://github.com/olavim/objection-cursor/issues/1
  // tslint:disable-next-line: no-any
  return (query as any).cursorPage(cursor);
};

const create = async (message: Message) => {
  const msg = await Message.query()
    .insertAndFetch(message)
    .eager('sender')
    .omit(User, ['hash', 'salt', 'createdAt', 'updatedAt']);

  broadcastMessage(msg);

  return msg;
};

const update = async (id: string, text: string) => {
  return Message.query().patchAndFetchById(id, {
    text,
    isEdited: true,
  });
};

export const messageService = {
  getById,
  getByPage,
  create,
  update,
};
