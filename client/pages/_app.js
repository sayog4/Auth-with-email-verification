import '../styles/styles.css'
import '../styles/globals.css'
import withApollo from '../lib/withApollo'
import { ApolloProvider } from '@apollo/client'

import Layout from '../components/Layout'

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}
MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query
  return { pageProps }
}
export default withApollo(MyApp)
