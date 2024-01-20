import { gql } from 'apollo-angular';

export const REPOSITORY_ISSUES = gql`
  query RepositoryIssues($name: String!, $owner: String!, $before: String, $after: String, $first: Int, $last: Int) {
    repository(name: $name, owner: $owner) {
      issues(
        before: $before
        after: $after
        first: $first
        last: $last
        orderBy: { direction: DESC, field: CREATED_AT }
      ) {
        pageInfo {
          startCursor
          endCursor
        }
        nodes {
          ... on Issue {
            id
            number
            author {
              login
              url
            }
            labels(first: 1) {
              nodes {
                ... on Label {
                  color
                  name
                }
              }
            }
            titleHTML
            url
            createdAt
            closedAt
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
`;
