import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/apolloClient';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = initializeApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
