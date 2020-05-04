import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import absintheSocketLink from './absinthe-socket-link';
import { split, from } from 'apollo-link';
import { hasSubscription } from '@jumpn/utils-graphql';
import { onError } from 'apollo-link-error';

const HTTP_URI = 'http://localhost:4000/graphiql';

const link = split(
  operation => hasSubscription(operation.query),
  absintheSocketLink,
  new HttpLink({ uri: HTTP_URI })
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    alert('Service is temporary unavailable');
  }
});

export const createClient = new ApolloClient({
  link: from([ errorLink, link]),
  cache: new InMemoryCache()
});
