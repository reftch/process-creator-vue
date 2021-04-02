import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { DefaultOptions } from 'apollo-client'

const httpLink = new HttpLink({
  // We should use an absolute URL here
  // uri: 'http://localhost:3000/graphql',
   uri: 'https://process-creator-api-dcnbtxtbv-reftch.vercel.app/graphql',
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  // uri: 'ws://localhost:3000/graphql',
  uri: 'wss://process-creator-api-dcnbtxtbv-reftch.vercel.app/graphql',
  options: {
    reconnect: true,
  },
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: defaultOptions,
})

export default apolloClient;