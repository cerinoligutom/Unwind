import { MessageRecipient } from '@app/models';

const create = async (messageRecipient: MessageRecipient) => {
  return MessageRecipient.query().insertAndFetch(messageRecipient);
};

const markAsRead = async (id: string) => {
  return MessageRecipient.query().updateAndFetchById(id, {
    isRead: true,
  });
};

export const messageRecipientService = {
  create,
  markAsRead,
};
