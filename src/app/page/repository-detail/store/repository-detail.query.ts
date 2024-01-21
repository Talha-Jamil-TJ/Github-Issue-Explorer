import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Query } from '@datorama/akita';
import { RepositoryDetailState } from '@shared/interface/repository-detail.state.interface';
import { RepositoryDetailStore } from './repository-detail.store';

@Injectable()
export class RepositoryDetailQuery extends Query<RepositoryDetailState> {
  isLoading = toSignal(this.selectLoading());

  repository = toSignal(
    this.select(({ repository }) => repository),
    { initialValue: null },
  );

  issues = toSignal(
    this.select(({ issues }) => issues),
    { initialValue: [] },
  );

  issuePageInfo = toSignal(
    this.select(({ issuePageInfo }) => issuePageInfo),
    { initialValue: null },
  );

  constructor(override store: RepositoryDetailStore) {
    super(store);
  }
}
