import { gql } from 'apollo-angular';

export const REPOSITORY_DETAIL_QUERY = gql`
  query RepositoryDetail($name: String!, $owner: String!, $first: Int) {
    repository(name: $name, owner: $owner) {
      owner {
        login
        avatarUrl(size: 25)
      }
      id
      name
      nameWithOwner
      isArchived
      url
      updatedAt
      descriptionHTML
      primaryLanguage {
        name
        color
      }
      stargazers {
        totalCount
      }
      repositoryTopics(first: 5) {
        nodes {
          topic {
            name
          }
          url
        }
      }

      issues(first: $first, orderBy: { direction: DESC, field: CREATED_AT }) {
        pageInfo {
          startCursor
          endCursor
        }
        totalCount
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
