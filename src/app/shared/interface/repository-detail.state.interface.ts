import { Issue, PageInfo, Repository } from './generated.interface';

export type RepositoryDetailState = {
  repository: Repository | null;
  issuePageInfo: PageInfo | null;
  issues: Issue[];
};
