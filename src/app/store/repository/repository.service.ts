import { Injectable } from '@angular/core';
import { REPOSITORY_SEARCH } from '@shared/graphql/queries/repository-search.query';
import {
  RepositoriesSearchQuery,
  RepositoriesSearchQueryVariables,
  Repository,
} from '@shared/interface/generated.interface';
import { ApolloService } from '@shared/service/apollo.service';
import { finalize, map, Observable, tap } from 'rxjs';
import { RepositoryStore } from './repository.store';

@Injectable({ providedIn: 'root' })
export class RepositoryService {
  constructor(private _repoStore: RepositoryStore, private _apolloService: ApolloService) {}

  getRepositories(variables: RepositoriesSearchQueryVariables): Observable<RepositoriesSearchQuery> {
    this._repoStore.setLoading(true);

    return this._apolloService
      .query<RepositoriesSearchQuery>({
        query: REPOSITORY_SEARCH,
        variables,
      })
      .pipe(
        map((res) => res.data as RepositoriesSearchQuery),
        tap({
          next: (response) => {
            const { pageInfo, repositoryCount, nodes } = response.search;

            this._repoStore.update({
              pageInfo,
              repositoryCount,
              repositories: nodes as Repository[],
            });
          },
          error: (err) => {
            this._repoStore.setError(err.message);
          },
        }),
        finalize(() => {
          this._repoStore.setLoading(false);
        }),
      );
  }
}
