import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RepositoryService } from '@store/repository/repository.service';
import { RepositoriesSearchQuery } from '../interface/generated.interface';

export const repositoriesResolver: ResolveFn<RepositoriesSearchQuery> = () => {
  return inject(RepositoryService).getRepositories({ first: 10, after: null, before: null });
};
