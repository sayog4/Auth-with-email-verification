import React from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { Form, Button } from 'react-bootstrap'
import FormContainer from './FormContainer'
import useForm from '../lib/useForm'
import { SIGN_IN } from '../graphql/mutaion'

const Login = () => {
  const router = useRouter()
  const { values, updateValue } = useForm({
    email: '',
    password: ''
  })

  const [signin, { error, loading, data }] = useMutation(SIGN_IN)

  if (data && data.signin && data.signin.__typename === 'AuthPayload') {
    router.push('/')
  }
  const checkErr =
    data && data.signin && data.signin.__typename === 'SignInError'

  const handleSubmit = async e => {
    e.preventDefault()
    await signin({
      variables: {
        email: values.email,
        password: values.password
      }
    })
  }
  return (
    <FormContainer>
      <h2 className="display-3">Log In</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            autoComplete="email"
            placeholder="Enter Email"
            value={values.email}
            onChange={updateValue}
            isInvalid={checkErr && data.signin.emailError}
          />
          {checkErr && data.signin.emailError && (
            <Form.Control.Feedback type="invalid">
              {data.signin.emailError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="password"
            type="password"
            autoComplete="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={updateValue}
            isInvalid={checkErr && data.signin.passwordError}
          />
          {checkErr && data.signin.passwordError && (
            <Form.Control.Feedback type="invalid">
              {data.signin.passwordError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button disabled={loading} variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Login
