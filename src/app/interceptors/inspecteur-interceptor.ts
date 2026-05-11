import { HttpInterceptorFn } from '@angular/common/http';
import { Authentification } from '../services/authentification';
import { inject } from 'vitest';
import { catchError, throwError } from 'rxjs';

export const inspecteurInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Authentification);

  const token = authService.accessToken; //le jwt

  console.log(req.url);

  if (!req.url.includes('/auth/login')) {
    const token = authService.accessToken;

    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(clonedReq).pipe(
      catchError((err) => {

        if (err.status === 401) {
          authService.logout();
        }

        return throwError(() => err);
      }),
    );
  }

  return next(req);
};
