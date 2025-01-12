import Joi, { ObjectSchema } from 'joi';

export const SubjectSchema: ObjectSchema = Joi.object().keys({
  subjectName: Joi.string().required().messages({
    'string.base': 'subjectName must be of type string.',
    'string.min': 'subjectName must be 3 characters.',
    'string.max': 'subjectName must be less then 8 characters.',
    'string.empty': 'subjectName is a required field.'
  }),
  classId: Joi.string().required().messages({
    'string.base': 'grade must be of type string.',
    'string.email': 'grade must be valid.',
    'string.empty': 'grade is a required field.'
  })
});

export const UpdateSubjectSchema: ObjectSchema = Joi.object().keys({
  subjectName: Joi.string().optional().messages({
    'string.base': 'subjectName must be of type string.',
    'string.min': 'subjectName must be 3 characters.',
    'string.max': 'subjectName must be less then 8 characters.',
    'string.empty': 'subjectName is a required field.'
  }),
  classId: Joi.string().optional().messages({
    'string.base': 'Email must be of type string.',
    'string.email': 'Email must be valid.',
    'string.empty': 'Email is a required field.'
  })
});
