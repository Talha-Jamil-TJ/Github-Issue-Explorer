import { gql } from 'apollo-angular';

export const GET_USER = gql`
  query GetUser {
    viewer {
      login
    }
  }
`;
