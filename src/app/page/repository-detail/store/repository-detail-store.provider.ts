import { Provider } from '@angular/core';
import { RepositoryDetailQuery } from './repository-detail.query';
import { RepositoryDetailService } from './repository-detail.service';
import { RepositoryDetailStore } from './repository-detail.store';

export const repositoryDetailStoreProvider: Provider = [
  RepositoryDetailService,
  RepositoryDetailQuery,
  RepositoryDetailStore,
];
