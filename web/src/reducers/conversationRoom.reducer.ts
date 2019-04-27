import produce from 'immer';
import { IGlobalState } from '../models/IGlobalState';
import { ConversationRoom } from '../models/ConversationRoom';

const JOIN_ROOM = 'Join room';
const LEAVE_ROOM = 'Leave room';

interface IJoinRoomPayload {
  conversationRoom: ConversationRoom;
}

const joinRoom = (global: IGlobalState, { conversationRoom }: IJoinRoomPayload) => {
  return produce(global, ({ conversationRooms }: IGlobalState) => {
    conversationRooms.unshift(conversationRoom);
  });
};

interface ILeaveRoomPayload {
  conversationRoomId: string;
}

const leaveRoom = (global: IGlobalState, { conversationRoomId }: ILeaveRoomPayload) => {
  return produce(global, ({ conversationRooms }: IGlobalState) => {
    const index = conversationRooms.findIndex(x => x.id === conversationRoomId);
    conversationRooms.splice(index, 1);
  });
};

export const conversationRoomReducer = (global: any, action: any) => {
  switch (action.type) {
    case JOIN_ROOM:
      return joinRoom(global, action.payload);
    case LEAVE_ROOM:
      return leaveRoom(global, action.payload);
    default:
      return global;
  }
};

export const actions = {
  joinRoom: (payload: IJoinRoomPayload) => ({ type: JOIN_ROOM, payload }),
  leaveRoom: (payload: ILeaveRoomPayload) => ({ type: LEAVE_ROOM, payload }),
};
