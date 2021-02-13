import formatError from '../utils/formatError'
import { preSignUpSchema, signinSchema } from '../utils/validation'
import { preSignupToken, verifyAndDecodeToken } from '../utils/preSignupToken'
import { preSignUpMail } from '../utils/sendEmail'

const Mutation = {
  async preSignup(parent, args, { models }, info) {
    try {
      await preSignUpSchema.validate(args, { abortEarly: false })
    } catch (error) {
      return {
        __typename: 'SignUpError',
        ...formatError(error)
      }
    }
    const { name, email, password } = args
    const user = await models.User.findOne({ email: email.toLowerCase() })

    if (user) {
      return {
        __typename: 'SignUpError',
        emailError: 'Email already exists.'
      }
    }
    const token = preSignupToken(name, email, password)
    await preSignUpMail(email, token)

    return {
      __typename: 'Message',
      message:
        'Your Signup process is completed. Please check your email for account activation.'
    }
  },
  async signup(parent, { token }, { models }, info) {
    const { name, email, password } = verifyAndDecodeToken(token)

    const user = new models.User({ name, email, password })
    await user.save()

    return 'Your Signup process is completed!! Please Login to continue!!'
  },
  async signin(parent, args, { models }, info) {
    try {
      await signinSchema.validate(args, { abortEarly: false })
    } catch (error) {
      return {
        __typename: 'SignInError',
        ...formatError(error)
      }
    }
    const { email, password } = args
    const user = await models.User.findOne({ email })
    if (!user)
      return {
        __typename: 'SignInError',
        emailError: 'email do not exist!!'
      }
  }
}

export default Mutation
