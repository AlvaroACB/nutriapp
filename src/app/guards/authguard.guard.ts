import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authguardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  return authService.isAuth();
};
