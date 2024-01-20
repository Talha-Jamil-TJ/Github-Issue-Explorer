import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RepositoryQuery } from '@store/repository/repository.query';
import { RepositoryService } from '@store/repository/repository.service';
import { RepositoryItemComponent } from './repository-item/repository-item.component';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule, RepositoryItemComponent, MatProgressSpinner, MatPaginator],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
})
export class RepositoriesComponent implements OnInit {
  isLoading = this._repoQuery.isLoading;
  repositories = this._repoQuery.repositories;
  repositoryCount = this._repoQuery.repositoryCount;
  pageInfo = this._repoQuery.pageInfo;

  pageSize = 10;

  constructor(private _repoQuery: RepositoryQuery, private _repoService: RepositoryService) {}

  ngOnInit(): void {
    this._repoService.getRepositories({ first: this.pageSize, after: null, before: null });
  }

  handlePageEvent({ pageSize, previousPageIndex, pageIndex }: PageEvent) {
    const isForward = pageIndex > (previousPageIndex ?? 0);

    if (isForward) {
      this._repoService.getRepositories({
        first: pageSize,
        after: this.pageInfo()?.endCursor,
      });
    } else {
      this._repoService.getRepositories({
        last: pageSize,
        before: this.pageInfo()?.startCursor,
      });
    }
  }
}
