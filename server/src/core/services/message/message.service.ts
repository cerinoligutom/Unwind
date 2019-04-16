import { Message } from '@app/models';
import { ICursorResult } from 'objection-cursor';

interface IGetByPageFilters {
  conversationRoomId: string;
}

const getByPage = async (
  cursor: string = '',
  pageSize: number = 25,
  filters: IGetByPageFilters,
): Promise<ICursorResult<Message>> => {
  const query = Message.query()
    .where('conversationRoomId', filters.conversationRoomId)
    .orderBy('createdAt', 'desc')
    .limit(pageSize);

  // * https://github.com/olavim/objection-cursor/issues/1
  // tslint:disable-next-line: no-any
  return (query as any).cursorPage(cursor);
};

const create = async (message: Message) => {
  return Message.query().insertAndFetch(message);
};

const update = async (id: string, message: Message) => {
  return Message.query().patchAndFetchById(id, message);
};

export const messageService = {
  getByPage,
  create,
  update,
};
