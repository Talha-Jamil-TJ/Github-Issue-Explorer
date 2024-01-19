import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenQuery } from '@store/token/token.query';

export const tokenGuard: CanActivateFn = () => {
  const tokenQuery = inject(TokenQuery);
  const router = inject(Router);

  if (!tokenQuery.token()) {
    router.navigate(['/']);

    return false;
  }

  return true;
};
