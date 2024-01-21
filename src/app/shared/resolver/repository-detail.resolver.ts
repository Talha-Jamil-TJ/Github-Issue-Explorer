import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RepositoryDetailService } from '../../page/repository-detail/store/repository-detail.service';
import { RepositoryDetailParams } from '../enum/repository-detail-params.enum';
import { RepositoryDetailQuery } from '../interface/generated.interface';

export const repositoriesDetailResolver: ResolveFn<RepositoryDetailQuery> = (route) => {
  const { repositoryOwner, repositoryName } = route.params as Record<RepositoryDetailParams, string>;

  return inject(RepositoryDetailService).getRepositoryDetailWithIssues({
    first: 10,
    owner: repositoryOwner,
    name: repositoryName,
  });
};
