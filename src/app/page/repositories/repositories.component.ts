import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RepositoryItemComponent } from '@shared/component/repository-item/repository-item.component';
import { RepositoryQuery } from '@store/repository/repository.query';
import { RepositoryService } from '@store/repository/repository.service';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule, RepositoryItemComponent, MatProgressSpinner, MatPaginator],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
})
export class RepositoriesComponent {
  isLoading = this._repoQuery.isLoading;
  repositories = this._repoQuery.repositories;
  repositoryCount = this._repoQuery.repositoryCount;
  pageInfo = this._repoQuery.pageInfo;

  pageSize = 10;

  constructor(private _repoQuery: RepositoryQuery, private _repoService: RepositoryService) {}

  handlePageEvent({ pageSize, previousPageIndex, pageIndex }: PageEvent) {
    const isForward = pageIndex > (previousPageIndex ?? 0);

    this._repoService
      .getRepositories(
        isForward
          ? {
              first: pageSize,
              after: this.pageInfo()?.endCursor,
            }
          : {
              last: pageSize,
              before: this.pageInfo()?.startCursor,
            },
      )
      .subscribe();
  }
}
