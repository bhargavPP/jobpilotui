import { Injectable, inject } from '@angular/core';

import { JwtPayload } from '../../shared/models/jwt-payload.model';
import { StorageService } from '../services/storage.service';
import { StorageKeys } from '../../shared/constants/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly storage = inject(StorageService);

  /**
   * Save JWT token.
   */
  setToken(token: string): void {
    this.storage.set(StorageKeys.AccessToken, token);
  }

  /**
   * Returns stored JWT.
   */
  getToken(): string | null {
    return this.storage.get<string>(StorageKeys.AccessToken);
  }

  /**
   * Removes JWT.
   */
  clearToken(): void {
    this.storage.remove(StorageKeys.AccessToken);
  }

  /**
   * Returns true if a valid JWT exists.
   */
  hasValidToken(): boolean {

    const payload = this.getPayload();

    if (!payload) {
      return false;
    }

    if (!payload.exp) {
      return false;
    }

    const now = Math.floor(Date.now() / 1000);

    return payload.exp > now;
  }

  /**
   * Returns current authenticated user's id.
   */
  getUserId(): string | null {

    const payload = this.getPayload();

    return payload?.sub ?? null;
  }

  /**
   * Returns decoded JWT payload.
   */
  getPayload(): JwtPayload | null {

    const token = this.getToken();

    if (!token) {
      return null;
    }

    return this.decode(token);
  }

  /**
   * Decodes JWT without third-party libraries.
   */
  private decode(token: string): JwtPayload | null {

    try {

      const parts = token.split('.');

      if (parts.length !== 3) {
        return null;
      }

      const payload = parts[1];

      const base64 = payload
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const decoded = atob(base64);

      return JSON.parse(decoded) as JwtPayload;

    } catch {

      return null;

    }

  }

}
