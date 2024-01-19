import { PageInfo, Repository } from './generated.interface';

export type RepositoryState = {
  pageInfo: PageInfo | null;
  repositoryCount: number;
  repositories: Repository[];
};
