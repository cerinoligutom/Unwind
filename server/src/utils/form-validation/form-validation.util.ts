import Joi from 'joi';

export interface IFormFieldValidationError {
  message: string;
  key: string;
}

export interface IFormValidatorData {
  // tslint:disable-next-line: no-any
  [key: string]: any;
}

export type IFormValidator<V> = (data: IFormValidatorData) => Promise<IFormValidatorResult<V>>;

export interface IFormValidatorResult<V> {
  errors: IFormFieldValidationError[] | null;
  form: V;
}

// * Async by default to encourage users of this method to make their
// * implementation promise-based for consistency since some validators
// * will need to query the database to validate a form field.
// tslint:disable-next-line: no-any
export const createFormValidator = <V>(schema: Joi.ObjectSchema): IFormValidator<V> => async (
  data: IFormValidatorData,
) => {
  const { error, value } = Joi.validate(data, schema, { abortEarly: false, stripUnknown: true });

  const errors = error
    ? error.details.map(x => {
        const { message, context } = x;

        const key = context ? context.key : null;

        return {
          message,
          key,
        } as IFormFieldValidationError;
      })
    : null;

  return {
    errors: errors ? errors : null,
    form: value,
  } as IFormValidatorResult<V>;
};

interface IService {
  // tslint:disable-next-line: no-any
  getById: (id: string) => any;
}

export const createUpdateFormValidator = <V>(schema: Joi.ObjectSchema, service: IService): IFormValidator<V> => async (
  data: IFormValidatorData,
) => {
  const validator = createFormValidator<V>(schema);
  const result = await validator(data);

  const entityToBeUpdated = await service.getById(data.id);

  if (!entityToBeUpdated) {
    const error: IFormFieldValidationError = { key: 'id', message: 'Target ID does not exist' };
    result.errors = appendError(error, result.errors);
  }

  return result;
};

export const appendError = (
  error: IFormFieldValidationError,
  errors: IFormFieldValidationError[] | null = [],
  addAsFirstItem: boolean = true, // * Typically when this is used, it's a custom validation error so add it as first
) => {
  if (!errors) {
    return [error];
  }
  return addAsFirstItem ? [...errors, error] : [error, ...errors];
};
