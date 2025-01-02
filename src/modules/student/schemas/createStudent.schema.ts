import Joi from 'joi';

export const CreateStudentSchema = Joi.object().keys({
  studentName: Joi.string().required().min(3).max(150).messages({
    'string.base': 'Student name must be of type string.',
    'string.min': 'Student name must be 3 characters.',
    'string.max': 'Student name must be less then 8 characters.',
    'string.empty': 'Student name is a required field.'
  }),

  dateOfBirth: Joi.string().required().max(50).messages({
    'string.base': 'dateOfBirth must be of type string.',
    'string.empty': 'dateOfBirth is a required field.'
  }),
  bloodGroup: Joi.string().optional().max(50).messages({
    'string.base': 'bloodGroup must be of type string.',
    'string.empty': 'bloodGroup is a required field.'
  }),

  class: Joi.string().required().max(50).messages({
    'string.base': 'class must be of type string.',
    'string.empty': 'class is a required field.'
  }),

  religion: Joi.string().required().max(50).messages({
    'string.base': 'religion must be of type string.',
    'string.empty': 'religion is a required field.'
  }),

  fatherName: Joi.string().required().min(3).max(150).messages({
    'string.base': 'fatherName must be of type string.',
    'string.empty': 'fatherName is a required field.'
  }),
  motherName: Joi.string().required().min(3).max(150).messages({
    'string.base': 'motherName must be of type string.',
    'string.empty': 'motherName is a required field.'
  }),

  parentPhoneNumber: Joi.string().optional().min(10).max(15).messages({
    'string.base': 'parentPhoneNumber must be of type string.',
    'string.empty': 'parentPhoneNumber is a required field.'
  }),

  parentAddress: Joi.string().optional().max(500).messages({
    'string.base': 'parentAddress must be of type string.',
    'string.empty': 'parentAddress is a required field.'
  }),

  fatherProfession: Joi.string().optional().max(50).messages({
    'string.base': 'fatherProfession must be of type string.',
    'string.empty': 'fatherProfession is a required field.'
  }),

  motherProfession: Joi.string().optional().max(50).messages({
    'string.base': 'motherProfession must be of type string.',
    'string.empty': 'motherProfession is a required field.'
  })
});
