import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  AuthResponse,
  LoginRequest,
  RegisterRequest
} from '../../shared/models/auth.model';

import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly authState = inject(AuthStateService);

  private readonly apiUrl = `${environment.apiUrl}/auth`;

  /**
   * POST api/auth/login
   */
  login(request: LoginRequest): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(
        tap(response => {

          this.authState.login(response);

        })
      );
  }

  /**
   * POST api/auth/register
   */
  register(request: RegisterRequest): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/register`,
        request
      )
      .pipe(
        tap(response => {

          this.authState.login(response);

        })
      );
  }

  /**
   * Client-side logout.
   *
   * Your backend does not expose
   * POST /logout,
   * therefore logout only clears
   * the local authentication state.
   */
  logout(): void {

    this.authState.logout();

  }

}
