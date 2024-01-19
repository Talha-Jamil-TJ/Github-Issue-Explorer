import { Injectable } from '@angular/core';
import { REPOSITORY_SEARCH } from '@shared/graphql/queries/repository-search.query';
import {
  RepositoriesSearchQuery,
  RepositoriesSearchQueryVariables,
  Repository,
} from '@shared/interface/generated.interface';
import { ApolloService } from '@shared/service/apollo.service';
import { finalize, map } from 'rxjs';
import { RepositoryStore } from './repository.store';

@Injectable({ providedIn: 'root' })
export class RepositoryService {
  constructor(private _repoStore: RepositoryStore, private _apolloService: ApolloService) {}

  getRepositories(variables: RepositoriesSearchQueryVariables) {
    this._repoStore.setLoading(true);

    this._apolloService
      .query<RepositoriesSearchQuery>({
        query: REPOSITORY_SEARCH,
        variables,
      })
      .pipe(
        map((res) => res.data.search),
        finalize(() => {
          this._repoStore.setLoading(false);
        }),
      )
      .subscribe({
        next: ({ pageInfo, repositoryCount, nodes }) => {
          this._repoStore.update({
            pageInfo,
            repositoryCount,
            repositories: nodes as Repository[],
          });
        },
        error: (err) => {
          this._repoStore.setError(err.message);
        },
      });
  }
}
