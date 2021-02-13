import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'

import { SIGN_UP } from '../../graphql/mutaion'

const ActivateAccount = ({ query }) => {
  const [signup, { error, loading, data }] = useMutation(SIGN_UP)
  const handleClick = async () => {
    await signup({
      variables: {
        token: query.id
      }
    })
  }
  if (error) {
    return (
      <Container>
        <p className="lead text-danger">{error.message}</p>
      </Container>
    )
  }
  if (data && data.signup)
    return (
      <Container>
        <p className="lead text-primary">{data.signup}</p>
      </Container>
    )

  return (
    <Container>
      <h2 className="display-5">Ready to activate account</h2>

      <Button
        disabled={loading}
        onClick={handleClick}
        type="button"
        variant="info"
      >
        Activate Account
      </Button>
    </Container>
  )
}

export default ActivateAccount
