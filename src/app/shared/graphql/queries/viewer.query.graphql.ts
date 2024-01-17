import { gql } from 'apollo-angular';

export const VIEWER_QUERY = gql`
  query MeQuery {
    viewer {
      login
    }
  }
`;
