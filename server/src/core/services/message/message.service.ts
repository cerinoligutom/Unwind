import { Message, MessageRecipient } from '@app/models';
import { ICursorResult } from 'objection-cursor';
import { conversationRoomService } from '../conversation-room/conversation-room.service';
import { messageRecipientService } from '../message-recipient/message-recipient.service';

interface IGetByPageFilters {
  conversationRoomId: string;
}

const getById = async (id: string) => {
  return Message.query().findById(id);
};

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
  // ? Check if user is a participant of the conversation room?
  const msg = await Message.query().insertAndFetch(message);
  const conversationRoom = await conversationRoomService.getById(message.conversationRoomId);

  if (conversationRoom && conversationRoom.participants) {
    const participantIds = conversationRoom.participants.map(x => x.id).filter(id => id !== msg.senderId);

    // TODO: Property isRead should be set accordingly based if user is online and on the current chat room
    participantIds.forEach(id => {
      messageRecipientService.create({
        recipientId: id,
        conversationRoomId: conversationRoom.id,
        messageId: msg.id,
      } as MessageRecipient);
    });
  }

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
