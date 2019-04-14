import Joi from 'joi';
import { User } from '@app/models';
import { userService } from '@app/services';
import {
  createFormValidator,
  createUpdateFormValidator,
  IFormValidatorData,
  IFormFieldValidationError,
  appendError,
} from '@app/utils';

const checkIfEmailExists = async (email: string) => {
  const user = await User.query().findOne('email', email);

  if (user) {
    return { key: 'email', message: 'Email is already in use.' } as IFormFieldValidationError;
  }

  return null;
};

const { id, ...createUserSchemaMap } = User.joiSchema;
const createUserSchema = Joi.object().keys(createUserSchemaMap);
export const createUserForm = {
  validate: async (data: IFormValidatorData) => {
    const validator = createFormValidator<User>(createUserSchema);
    const result = await validator(data);

    const emailIsAlreadyInUse = await checkIfEmailExists(data.email);

    if (emailIsAlreadyInUse) {
      result.errors = appendError(emailIsAlreadyInUse, result.errors);
    }

    return result;
  },
};

const updateUserSchemaMap = User.joiSchema;
const updateUserSchema = Joi.object().keys(updateUserSchemaMap);
export const updateUserForm = {
  validate: createUpdateFormValidator<User>(updateUserSchema, userService),
};
