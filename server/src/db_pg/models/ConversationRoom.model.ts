import { BaseModel } from './common/BaseModel';
import Joi from 'joi';
import { RelationMappings, Model } from 'objection';
import { User } from './User.model';

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
  };

  static joiSchema: Joi.SchemaMap = {
    id: Joi.string().required(),

    name: Joi.string()
      .label('Chat room name')
      .min(1)
      .required(),

    photoUrl: Joi.string()
      .label('Chat room picture')
      .allow('', null),
  };

  name!: string;
  photoUrl?: string;

  participants?: User[];
}
