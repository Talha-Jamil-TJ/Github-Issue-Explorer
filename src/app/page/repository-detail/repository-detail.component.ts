import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { RepositoryItemComponent } from '@shared/component/repository-item/repository-item.component';
import { RepositoryDetailParams } from '@shared/enum/repository-detail-params.enum';
import { IssueItemComponent } from './child/issue-item/issue-item.component';
import { RepositoryDetailQuery } from './store/repository-detail.query';
import { RepositoryDetailService } from './store/repository-detail.service';

@Component({
  selector: 'app-repository-detail',
  standalone: true,
  imports: [CommonModule, RepositoryItemComponent, IssueItemComponent, MatPaginator, MatProgressSpinner],
  templateUrl: './repository-detail.component.html',
  styleUrl: './repository-detail.component.scss',
})
export class RepositoryDetailComponent {
  isLoading = this._query.isLoading;
  repository = this._query.repository;
  issues = this._query.issues;
  issuePageInfo = this._query.issuePageInfo;

  pageSize = 10;

  constructor(
    private _route: ActivatedRoute,
    private _query: RepositoryDetailQuery,
    private _service: RepositoryDetailService,
  ) {}

  handlePageEvent({ pageSize, previousPageIndex, pageIndex }: PageEvent) {
    const { repositoryOwner, repositoryName } = this._route.snapshot.params as Record<RepositoryDetailParams, string>;

    const isForward = pageIndex > (previousPageIndex ?? 0);

    this._service
      .getRepositoryIssues({
        owner: repositoryOwner,
        name: repositoryName,
        ...(isForward
          ? {
              first: pageSize,
              after: this.issuePageInfo()?.endCursor,
            }
          : {
              last: pageSize,
              before: this.issuePageInfo()?.startCursor,
            }),
      })
      .subscribe();
  }
}
