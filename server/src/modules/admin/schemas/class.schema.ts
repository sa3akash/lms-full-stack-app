import Joi, { ObjectSchema } from 'joi';

export const CreateSchema: ObjectSchema = Joi.object().keys({
  className: Joi.string().required().messages({
    'string.base': 'className must be of type string.',
    'string.email': 'className must be valid.',
    'string.empty': 'className is a required field.'
  })
});
