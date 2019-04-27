import { ConversationRoom, User, Message } from '@app/models';
import { broadcastParticipantJoinedTheRoom, broadcastParticipantLeftTheRoom } from '@app/socket';
import { messageService } from '../message/message.service';
import { userService } from '../user/user.service';
import { env } from '@app/config/environment';

const getById = async (id: string) => {
  return ConversationRoom.query()
    .findById(id)
    .eager('[participants, messages.sender]')
    .modifyEager('messages', builder => {
      builder.orderBy('createdAt', 'desc').limit(1);
    })
    .omit(User, ['hash', 'salt', 'createdAt', 'updatedAt']);
};

const create = async (conversationRoom: ConversationRoom) => {
  return ConversationRoom.query().insertAndFetch(conversationRoom);
};

const update = async (id: string, conversationRoom: ConversationRoom) => {
  return ConversationRoom.query().patchAndFetchById(id, conversationRoom);
};

const addUserToConversationRoom = async (userId: string, conversationRoomId: string) => {
  const conversationRoom = await ConversationRoom.query().findById(conversationRoomId);

  if (conversationRoom) {
    /**
     * * Note:
     * * As of ObjectionJS v1.6.7, the definition types (*.d.ts) of the lib
     * * thinks it returns an array but in actuality, it returns a model.
     *
     * * Postgres allows multiple relates (array as input in relate).
     * * https://vincit.github.io/objection.js/api/query-builder/mutate-methods.html#relate
     * * We're currently using this as a workaround to determine if the operation was successful
     * * by checking if the list contains anything.
     *
     * * This also throws an error if unique and/or foreign key constraints are violated.
     */
    const result = await conversationRoom.$relatedQuery('participants').relate([userId]);

    // * Since we get an array of objects as result, we just check if the list contains anything.
    const isSuccess = result.length > 0;

    if (isSuccess) {
      const user = await userService.getById(userId);

      if (user) {
        const newParticipantMessage = `${user.username} has joined the chat.`;

        const message = await messageService.create({
          conversationRoomId,
          senderId: env.defaults.systemUser,
          text: newParticipantMessage,
          isEdited: false,
        } as Message);

        broadcastParticipantJoinedTheRoom(message);
      }
    }

    return isSuccess;
  }

  return false;
};

const removeUserFromConversationRoom = async (userId: string, conversationRoomId: string) => {
  const conversationRoom = await ConversationRoom.query().findById(conversationRoomId);

  if (conversationRoom) {
    /**
     * * Note:
     * * As of ObjectionJS v1.6.7, the definition types (*.d.ts) of the lib
     * * thinks it returns an array but in actuality, it returns the number
     * * of deleted rows.
     */
    const result = await conversationRoom
      .$relatedQuery('participants')
      .unrelate()
      .where('id', userId);

    // * So we convert the result to boolean
    const isSuccess = !!result;

    if (isSuccess) {
      const user = await userService.getById(userId);

      if (user) {
        const newParticipantMessage = `${user.username} has left the chat.`;

        const message = await messageService.create({
          conversationRoomId,
          senderId: env.defaults.systemUser,
          text: newParticipantMessage,
          isEdited: false,
        } as Message);

        broadcastParticipantLeftTheRoom(message);
      }
    }

    return isSuccess;
  }

  return false;
};

export const conversationRoomService = {
  getById,
  create,
  update,
  addUserToConversationRoom,
  removeUserFromConversationRoom,
};
