import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./page/token-form/token-form.component').then(({ TokenFormComponent }) => TokenFormComponent),
  },
];
