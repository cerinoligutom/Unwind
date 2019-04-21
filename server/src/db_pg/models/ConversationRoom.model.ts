import { BaseModel } from './common/BaseModel';
import Joi from 'joi';
import { RelationMappings, Model } from 'objection';
import { User } from './User.model';
import { Message } from './Message.model';
const regexWebUrl = require('regex-weburl');

export class ConversationRoom extends BaseModel {
  static tableName = 'conversation_rooms';

  static relationMappings: RelationMappings = {
    participants: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/User.model',
      join: {
        from: 'conversation_rooms.id',
        through: {
          from: 'user_conversation_rooms.conversationRoomId',
          to: 'user_conversation_rooms.userId',
        },
        to: 'users.id',
      },
    },
    messages: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Message.model',
      join: {
        from: 'conversation_rooms.id',
        to: 'messages.conversationRoomId',
      },
    },
  };

  static joiSchema: Joi.SchemaMap = {
    id: Joi.string()
      .uuid()
      .required(),

    name: Joi.string()
      .label('Chat room name')
      .min(3)
      .required(),

    photoUrl: Joi.string()
      .label('Chat room picture')
      .regex(regexWebUrl)
      .allow('', null),
  };

  name!: string;
  photoUrl?: string;

  messages?: Message[];
  participants?: User[];
}
