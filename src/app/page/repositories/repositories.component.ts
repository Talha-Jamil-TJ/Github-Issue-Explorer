import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RepositoryQuery } from '@store/repository/repository.query';
import { RepositoryService } from '@store/repository/repository.service';
import { RepositoryItemComponent } from './repository-item/repository-item.component';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule, RepositoryItemComponent, MatProgressSpinner],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
})
export class RepositoriesComponent implements OnInit {
  isLoading = this._repoQuery.isLoading;
  repositories = this._repoQuery.repositories;
  repositoryCount = this._repoQuery.repositoryCount;
  pageInfo = this._repoQuery.pageInfo;

  constructor(private _repoQuery: RepositoryQuery, private _repoService: RepositoryService) {}

  ngOnInit(): void {
    this._repoService.getRepositories({ first: 10, after: null, before: null });
  }
}
