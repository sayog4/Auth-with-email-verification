import * as yup from 'yup'

export const preSignUpSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3)
    .max(255),
  email: yup
    .string()
    .max(255)
    .email(),
  password: yup
    .string()
    .min(7)
    .max(255)
})

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .max(255)
    .email(),
  password: yup
    .string()
    .min(7)
    .max(255)
})
