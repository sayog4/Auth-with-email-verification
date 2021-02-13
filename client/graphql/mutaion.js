import { gql } from '@apollo/client'

export const PRE_SIGN_UP = gql`
  mutation PRE_SIGN_UP($name: String!, $email: String!, $password: String!) {
    preSignup(name: $name, email: $email, password: $password) {
      __typename
      ... on Message {
        message
      }
      ... on SignUpError {
        emailError
        nameError
        passwordError
      }
    }
  }
`

export const SIGN_UP = gql`
  mutation SIGN_UP($token: String!) {
    signup(token: $token)
  }
`
