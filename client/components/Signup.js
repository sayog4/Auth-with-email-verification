import React from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'

import useForm from '../lib/useForm'
import FormContainer from './FormContainer'
import { PRE_SIGN_UP } from '../graphql/mutaion'

const Signup = () => {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    password: ''
  })
  const [preSignup, { data, error, loading }] = useMutation(PRE_SIGN_UP)

  const checkErr =
    data && data.preSignup && data.preSignup.__typename === 'SignUpError'

  const handleSubmit = async e => {
    e.preventDefault()
    await preSignup({
      variables: {
        name: values.name,
        email: values.email,
        password: values.password
      }
    })
  }
  if (data && data.preSignup && data.preSignup.__typename === 'Message') {
    return (
      <Container>
        <Card>
          <p className="lead">{data.preSignup.message}</p>
        </Card>
      </Container>
    )
  }
  return (
    <FormContainer>
      <h2 className="display-3">Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter Name"
            value={values.name}
            autoComplete="name"
            onChange={updateValue}
            isInvalid={checkErr && data.preSignup.nameError}
          />
          {checkErr && data.preSignup.nameError && (
            <Form.Control.Feedback type="invalid">
              {data.preSignup.nameError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            autoComplete="email"
            placeholder="Enter Email"
            value={values.email}
            onChange={updateValue}
            isInvalid={checkErr && data.preSignup.emailError}
          />
          {checkErr && data.preSignup.emailError && (
            <Form.Control.Feedback type="invalid">
              {data.preSignup.emailError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            autoComplete="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={updateValue}
            isInvalid={checkErr && data.preSignup.passwordError}
          />
          {checkErr && data.preSignup.passwordError && (
            <Form.Control.Feedback type="invalid">
              {data.preSignup.passwordError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button disabled={loading} type="submit" variant="primary">
          Sign Up
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Signup
