import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { RepositoryState } from '@shared/interface/repository.state.interface';

const createInitialState = (): RepositoryState => ({
  pageInfo: null,
  repositoryCount: 0,
  repositories: [],
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'repository' })
export class RepositoryStore extends Store<RepositoryState> {
  constructor() {
    super(createInitialState());
  }
}
