import { Route } from '@angular/router';
import { tokenGuard } from '@shared/guard/token.guard';

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
    loadComponent: () =>
      import('./page/repositories/repositories.component').then(({ RepositoriesComponent }) => RepositoriesComponent),
  },
];
