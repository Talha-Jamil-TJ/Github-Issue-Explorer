import { ApplicationConfig } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

export const uri = 'https://api.github.com/graphql'; // <-- URL of the GraphQL server

export const apolloOptionsFactory = (httpLink: HttpLink): ApolloClientOptions<unknown> => ({
  link: httpLink.create({ uri }),
  cache: new InMemoryCache(),
});

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
    deps: [HttpLink],
  },
];
