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

// tslint:disable-next-line: no-shadowed-variable
const checkIfEmailExists = async (email: string) => {
  const user = await User.query().findOne('email', email);

  if (user) {
    return { key: 'email', message: 'Email is already taken.' } as IFormFieldValidationError;
  }

  return null;
};

// tslint:disable-next-line: no-shadowed-variable
const checkIfUsernameExists = async (username: string) => {
  const user = await User.query().findOne('username', username);

  if (user) {
    return { key: 'username', message: 'Username is already taken.' } as IFormFieldValidationError;
  }

  return null;
};

const { id, ...createUserSchemaMap } = User.joiSchema;
const createUserSchema = Joi.object().keys(createUserSchemaMap);
export const createUserForm = {
  validate: async (data: IFormValidatorData) => {
    const validator = createFormValidator<User>(createUserSchema);
    const result = await validator(data);

    const emailIsAlreadyTaken = await checkIfEmailExists(data.email);
    if (emailIsAlreadyTaken) {
      result.errors = appendError(emailIsAlreadyTaken, result.errors);
    }

    const usernameIsAlreadyTaken = await checkIfUsernameExists(data.username);
    if (usernameIsAlreadyTaken) {
      result.errors = appendError(usernameIsAlreadyTaken, result.errors);
    }

    return result;
  },
};

const { username, email, hash, ...updateUserSchemaMap } = User.joiSchema;
const updateUserSchema = Joi.object().keys(updateUserSchemaMap);
export const updateUserForm = {
  validate: createUpdateFormValidator<User>(updateUserSchema, userService),
};
