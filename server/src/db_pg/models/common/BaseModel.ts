import objection, { compose } from 'objection';
import knex from '../../knex-config';

import objectionCursorPlugin from 'objection-cursor';

const cursorMixin = objectionCursorPlugin({
  pageInfo: {
    total: true,
    hasNext: true,
    hasPrevious: true,
    remaining: true,
  },
});

// Attach knex to objection model
objection.Model.knex(knex);

// Insert plugins if there's any, e.g. objection-timestamps
// but timestamps should be generated
// in the DB level instead of app level.
const enhancedModel = compose([cursorMixin])(objection.Model);

export class BaseModel extends enhancedModel {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
