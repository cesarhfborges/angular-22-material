import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  console.log('authGuard is', session.isAuthenticated());

  if (session.isAuthenticated()) {
    return true;
  }

  void router.navigate(['/login']);
  return router.createUrlTree(['/login']);
};
