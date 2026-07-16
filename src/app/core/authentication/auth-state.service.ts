import { computed, inject, Injectable, signal } from '@angular/core';

import { AuthResponse } from '../../shared/models/auth.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private readonly tokenService = inject(TokenService);

  /**
   * Authentication state.
   */
  private readonly authenticatedSignal = signal(false);

  /**
   * Current authenticated user id.
   */
  private readonly userIdSignal = signal<string | null>(null);

  /**
   * Readonly authentication state.
   */
  readonly isAuthenticated = computed(() => this.authenticatedSignal());

  /**
   * Readonly current user id.
   */
  readonly userId = computed(() => this.userIdSignal());

  constructor() {
    this.restoreSession();
  }

  /**
   * Called after a successful login or registration.
   */
  login(response: AuthResponse): void {
    console.log('AuthState.login()', response);
    this.tokenService.setToken(response.token);

    this.authenticatedSignal.set(true);

    this.userIdSignal.set(response.userId);
  }

  /**
   * Logs the current user out.
   */
  logout(): void {

    this.tokenService.clearToken();

    this.authenticatedSignal.set(false);

    this.userIdSignal.set(null);
  }

  /**
   * Restores authentication after browser refresh.
   */
  restoreSession(): void {

    if (!this.tokenService.hasValidToken()) {

      this.logout();

      return;
    }

    this.authenticatedSignal.set(true);

    this.userIdSignal.set(
      this.tokenService.getUserId()
    );
  }
}
