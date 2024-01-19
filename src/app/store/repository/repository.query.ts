import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Query } from '@datorama/akita';
import { RepositoryState } from '@shared/interface/repository.state.interface';
import { RepositoryStore } from './repository.store';

@Injectable({ providedIn: 'root' })
export class RepositoryQuery extends Query<RepositoryState> {
  isLoading = toSignal(this.selectLoading());

  pageInfo = toSignal(
    this.select(({ pageInfo }) => pageInfo),
    { initialValue: null },
  );

  repositoryCount = toSignal(
    this.select(({ repositoryCount }) => repositoryCount),
    { initialValue: 0 },
  );

  repositories = toSignal(
    this.select(({ repositories }) => repositories),
    { initialValue: [] },
  );

  constructor(private _store: RepositoryStore) {
    super(_store);
  }
}
