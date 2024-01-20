import { Injectable } from '@angular/core';
import { REPOSITORY_DETAIL_QUERY } from '@shared/graphql/queries/repository-detail.query';
import { REPOSITORY_ISSUES } from '@shared/graphql/queries/repository-issues.query';
import {
  Issue,
  PageInfo,
  Repository,
  RepositoryDetailQuery,
  RepositoryDetailQueryVariables,
  RepositoryIssuesQuery,
  RepositoryIssuesQueryVariables,
} from '@shared/interface/generated.interface';
import { ApolloService } from '@shared/service/apollo.service';
import { finalize, map, tap } from 'rxjs';
import { RepositoryDetailStore } from './repository-detail.store';

@Injectable()
export class RepositoryDetailService {
  constructor(private _store: RepositoryDetailStore, private _apolloService: ApolloService) {}

  getRepositoryDetailWithIssues(variables: RepositoryDetailQueryVariables) {
    this._store.setLoading(true);

    return this._apolloService
      .query<RepositoryDetailQuery>({
        query: REPOSITORY_DETAIL_QUERY,
        variables,
      })
      .pipe(
        map((res) => res.data),
        tap({
          next: ({ repository }) => {
            this._store.update({
              repository: repository as Repository,
              issues: (repository?.issues.nodes ?? []) as Issue[],
              issuePageInfo: repository?.issues?.pageInfo as PageInfo,
            });
          },
          error: (err) => {
            this._store.setError(err.message);
          },
        }),
        finalize(() => {
          this._store.setLoading(false);
        }),
      );
  }

  getRepositoryIssues(variables: RepositoryIssuesQueryVariables) {
    this._store.setLoading(true);

    return this._apolloService
      .query<RepositoryIssuesQuery>({
        query: REPOSITORY_ISSUES,
        variables,
      })
      .pipe(
        map((res) => res.data),
        tap({
          next: ({ repository }) => {
            this._store.update({
              issues: (repository?.issues.nodes ?? []) as Issue[],
              issuePageInfo: repository?.issues?.pageInfo as PageInfo,
            });
          },
          error: (err) => {
            this._store.setError(err.message);
          },
        }),
        finalize(() => {
          this._store.setLoading(false);
        }),
      );
  }
}
