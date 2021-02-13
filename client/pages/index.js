import { useQuery, useMutation } from '@apollo/client'
import { Container, Button } from 'react-bootstrap'
import { ME } from '../graphql/query'
import { LOG_OUT } from '../graphql/mutaion'

export default function Home() {
  const { data, error, loading } = useQuery(ME)
  const [logout, { data: d, error: e, loading: l }] = useMutation(LOG_OUT)
  const handleClick = async () => {
    await logout({
      refetchQueries: [{ query: ME }]
    })
  }
  return (
    <Container>
      <h1>Home page</h1>
      {e && <p>{e.message}</p>}
      {loading && <p>Loading</p>}
      {error && <p>{error.message}</p>}
      {data && <p>{data.me.name}</p>}
      <Button
        disabled={l}
        onClick={handleClick}
        type="button"
        varaint="primary"
      >
        Log out
      </Button>
    </Container>
  )
}
