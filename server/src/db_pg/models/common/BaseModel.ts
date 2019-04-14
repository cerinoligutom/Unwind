import objection, { compose } from 'objection';
import knex from '../../knex-config';

// Attach knex to objection model
objection.Model.knex(knex);

// Insert plugins if there's any, e.g. objection-timestamps
// but timestamps should be generated
// in the DB level instead of app level.
const enhancedModel = compose([])(objection.Model);

export class BaseModel extends enhancedModel {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
