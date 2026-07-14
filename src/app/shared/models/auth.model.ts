// src/app/shared/models/auth.model.ts

/**
 * Request payload for POST /api/auth/login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Request payload for POST /api/auth/register
 */
export interface RegisterRequest {
  email: string;
  password: string;
}

/**
 * Response returned from:
 * POST /api/auth/login
 * POST /api/auth/register
 *
 * Matches the ASP.NET Core AuthResponse record:
 * public record AuthResponse(string Token, Guid UserId);
 */
export interface AuthResponse {
  token: string;
  userId: string;
}
