import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { AuthStateService } from '../authentication/auth-state.service';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const notification = inject(NotificationService);
  const authState = inject(AuthStateService);
  const router = inject(Router);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case 400:
          notification.error(getErrorMessage(error));
          break;

        case 401:

          authState.logout();

          notification.error('Your session has expired. Please sign in again.');

          router.navigate(['/auth/login']);

          break;

        case 403:

          notification.error(
            'You do not have permission to perform this action.'
          );

          break;

        case 404:

          notification.error(
            getErrorMessage(error) || 'Requested resource was not found.'
          );

          break;

        case 409:

          notification.warning(
            getErrorMessage(error)
          );

          break;

        case 500:

          notification.error(
            'An unexpected server error occurred.'
          );

          break;

        default:

          notification.error(
            getErrorMessage(error)
          );

          break;
      }

      return throwError(() => error);

    })

  );

};

/**
 * Extracts a friendly message from HttpErrorResponse.
 */
function getErrorMessage(error: HttpErrorResponse): string {

  if (!error.error) {

    return 'An unexpected error occurred.';
  }

  if (typeof error.error === 'string') {

    return error.error;

  }

  if (typeof error.error.message === 'string') {

    return error.error.message;

  }

  return 'An unexpected error occurred.';
}
