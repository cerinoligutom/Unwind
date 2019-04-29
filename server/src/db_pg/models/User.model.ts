import { BaseModel } from './common/BaseModel';
import Joi from 'joi';
import { RelationMappings, Model } from 'objection';
import { ConversationRoom } from './ConversationRoom.model';
const regexWebUrl = require('regex-weburl');

export class User extends BaseModel {
  static tableName = 'users';

  static relationMappings: RelationMappings = {
    conversationRooms: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/ConversationRoom.model',
      join: {
        from: 'users.id',
        through: {
          from: 'user_conversation_rooms.userId',
          to: 'user_conversation_rooms.conversationRoomId',
        },
        to: 'conversation_rooms.id',
      },
    },
  };

  static joiSchema: Joi.SchemaMap = {
    id: Joi.string()
      .uuid()
      .required(),

    username: Joi.string()
      .label('Username')
      .regex(/^\S+$/)
      .min(1)
      .trim()
      .required(),

    avatarUrl: Joi.string()
      .label('Avatar URL')
      .regex(regexWebUrl)
      .allow('', null),

    bio: Joi.string()
      .label('Bio Description')
      .allow('', null)
      .max(256),

    email: Joi.string()
      .label('Email')
      .email({ minDomainAtoms: 2 })
      .lowercase()
      .required(),

    hash: Joi.string()
      .label('Password')
      .min(8)
      .max(32)
      .required(),
  };

  static toDTO(user: User) {
    const { hash, salt, ...data } = user;
    return data;
  }

  username!: string;

  avatarUrl?: string;
  bio?: string;
  email!: string;

  hash!: string;
  salt!: string;

  conversationRooms?: ConversationRoom[];
}
