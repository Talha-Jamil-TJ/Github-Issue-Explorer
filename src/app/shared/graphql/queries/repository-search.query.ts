import { gql } from 'apollo-angular';

export const REPOSITORY_SEARCH = gql`
  query RepositoriesSearch($first: Int, $after: String, $before: String) {
    search(query: "is:public sort:stars-desc", type: REPOSITORY, first: $first, after: $after, before: $before) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }

      repositoryCount

      nodes {
        ... on Repository {
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
        }
      }
    }
  }
`;
