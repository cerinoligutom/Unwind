import produce from 'immer';
import { IGlobalState } from '../models/IGlobalState';
import { IReducerAction } from '../models/IReducerAction';
import { Message } from '../models/Message';

const ADD_NEW_MESSAGE = 'Add new message';
const ADD_OLD_MESSAGES = 'Add old messages';

interface IAddNewMessagePayload {
  conversationRoomId: string;
  message: Message;
}

const addNewMessage = (global: IGlobalState, { conversationRoomId, message }: IAddNewMessagePayload) => {
  return produce(global, ({ conversationRooms }: IGlobalState) => {
    const conversationRoom = conversationRooms.find(room => room.id === conversationRoomId);

    if (conversationRoom) {
      conversationRoom.messages = [message, ...conversationRoom.messages];
    }
  });
};

interface IAddOldMessagesPayload {
  conversationRoomId: string;
  messages: Message[];
  cursor: string;
  hasOldMessages: boolean;
}

const addOldMessages = (global: IGlobalState, payload: IAddOldMessagesPayload) => {
  return produce(global, ({ conversationRooms }: IGlobalState) => {
    const { conversationRoomId, messages, cursor, hasOldMessages } = payload;
    const conversationRoom = conversationRooms.find(room => room.id === conversationRoomId);

    if (conversationRoom) {
      if (conversationRoom.messages.length < 25) {
        // Means this is the first time it's retrieving the conversations
        conversationRoom.messages = messages;
      } else {
        conversationRoom.messages = [...conversationRoom.messages, ...messages];
      }

      conversationRoom.cursor = cursor;
      conversationRoom.hasOldMessages = hasOldMessages;
    }
  });
};

// export const messageReducer = (global: IGlobalState, action: IReducerAction) => {
export const messageReducer = (global: any, action: any) => {
  switch (action.type) {
    case ADD_NEW_MESSAGE:
      return addNewMessage(global, action.payload);
      break;
    case ADD_OLD_MESSAGES:
      return addOldMessages(global, action.payload);
    default:
      return global;
  }
};

export const actions = {
  addNewMessage: (payload: IAddNewMessagePayload) => ({ type: ADD_NEW_MESSAGE, payload }),
  addOldMessages: (payload: IAddOldMessagesPayload) => ({ type: ADD_OLD_MESSAGES, payload }),
};
