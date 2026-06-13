import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../service/auth.service';

export const permissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredPermission = route.data['permission'] as string;

  return authService.getUser().pipe(
    map(user => {
      if (!requiredPermission || user.permissions.includes(requiredPermission)) {
        return true;
      } else {
        router.navigate(['/dashboard']); // o página de acceso denegado
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
