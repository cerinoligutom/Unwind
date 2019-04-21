import { User } from '@app/models';

const getById = async (id: string) => {
  let user;
  if (!user) {
    try {
      user = await User.query().findById(id);
    } catch {
      user = await User.query().findOne('username', id);
    }
  }

  return user;
};

const getConversationRooms = async (userId: string) => {
  const user = await User.query()
    .findById(userId)
    .eager('conversationRooms.[participants, messages.sender]')
    .modifyEager('conversationRooms.messages', builder => {
      builder.orderBy('createdAt', 'desc').limit(1);
    })
    .omit(User, ['hash', 'salt', 'createdAt', 'updatedAt']);

  if (user && user.conversationRooms) {
    user.conversationRooms.forEach(room => {
      if (room.participants) {
        room.participants = room.participants.map(participant => {
          // ! Don't return hash and salt for each participant
          const { hash, salt, ...filteredParticipant } = participant;
          return filteredParticipant as User;
        });
      }
    });
  }

  return user ? user.conversationRooms : [];
};

const create = async (user: User) => {
  return User.query().insertAndFetch(user);
};

const update = async (id: string, user: User) => {
  return User.query().patchAndFetchById(id, user);
};

export const userService = {
  getById,
  getConversationRooms,
  create,
  update,
};
