import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return from(authService.isLoggedIn()).pipe(
    map((token) => {
      if (token) {
        return true; // Allow access if the user is authenticated
      } else {
        router.navigateByUrl('/login', { replaceUrl: true });
        return false; // Deny access if the user is not authenticated
      }
    })
  );
};
