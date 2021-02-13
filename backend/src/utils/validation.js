import * as yup from 'yup'

export const preSignUpSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .trim()
    .min(3)
    .max(255),
  email: yup
    .string()
    .required()
    .max(255)
    .email(),
  password: yup
    .string()
    .required()
    .min(7)
    .max(255)
})

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .max(255),
  password: yup
    .string()
    .required()
    .min(7)
    .max(255)
})
