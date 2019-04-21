import { ConversationRoom, User } from '@app/models';

const getById = async (id: string) => {
  return ConversationRoom.query()
    .findById(id)
    .eager('participants')
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
    return result.length > 0;
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
    return !!result;
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
