import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { TokenService } from '../authentication/token.service';

const AUTH_ENDPOINTS = [
  '/api/auth/login',
  '/api/auth/register'
] as const;

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);

  // Don't attach a token to authentication requests.
  if (AUTH_ENDPOINTS.some(endpoint => req.url.endsWith(endpoint))) {
    return next(req);
  }

  const token = tokenService.getToken();

  if (!token) {
    return next(req);
  }

  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(request);
};
