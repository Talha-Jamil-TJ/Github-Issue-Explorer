import { Route } from '@angular/router';
import { tokenGuard } from '@shared/guard/token.guard';
import { repositoriesResolver } from '@shared/resolver/repositories.resolver';
import { repositoriesDetailResolver } from '@shared/resolver/repository-detail.resolver';
import { repositoryDetailStoreProvider } from './page/repository-detail/store/repository-detail-store.provider';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./page/token-form/token-form.component').then(({ TokenFormComponent }) => TokenFormComponent),
  },
  {
    path: 'repositories',
    canActivate: [tokenGuard],
    resolve: { data: repositoriesResolver },
    loadComponent: () =>
      import('./page/repositories/repositories.component').then(({ RepositoriesComponent }) => RepositoriesComponent),
  },
  {
    path: ':repositoryOwner/:repositoryName',
    canActivate: [tokenGuard],
    resolve: { data: repositoriesDetailResolver },
    providers: [repositoryDetailStoreProvider],
    loadComponent: () =>
      import('./page/repository-detail/repository-detail.component').then(
        ({ RepositoryDetailComponent }) => RepositoryDetailComponent,
      ),
  },
];
