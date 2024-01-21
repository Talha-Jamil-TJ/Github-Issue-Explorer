import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { RepositoryDetailState } from '@shared/interface/repository-detail.state.interface';

const createInitialState = (): RepositoryDetailState => ({
  issuePageInfo: null,
  repository: null,
  issues: [],
});

@Injectable()
@StoreConfig({ name: 'repository-detail' })
export class RepositoryDetailStore extends Store<RepositoryDetailState> {
  constructor() {
    super(createInitialState());
  }
}
