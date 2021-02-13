import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/link-error'
import { createUploadLink } from 'apollo-upload-client'
import withApollo from 'next-with-apollo'

const createClient = ({ headers, initailState }) => {
  console.log(headers)
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, location, path }) =>
            console.log(`[GraphQL Error]: Messasge: ${message},
        Location: ${location},
        Path: ${path}`)
          )
        if (networkError)
          console.log(`[Network error]: ${networkError}. Server blocked!!`)
      }),
      createUploadLink({
        uri: process.env.NEXT_PUBLIC_GQL_URL,
        // fetchOptions: {
        //   credentials: 'include'
        // },
        headers
      })
    ]),
    cache: new InMemoryCache().restore(initailState || {})
  })
}

export default withApollo(createClient)
