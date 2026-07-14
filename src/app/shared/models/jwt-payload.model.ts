// src/app/shared/models/jwt-payload.model.ts

/**
 * Standard JWT payload used by JobPilot.
 *
 * The backend issues JWT tokens where:
 * - sub = User Id (Guid)
 *
 * Additional claims are optional and will be ignored if absent.
 */
export interface JwtPayload {

  /**
   * Subject (User Id)
   * JwtRegisteredClaimNames.Sub
   */
  sub: string;

  /**
   * Expiration (Unix timestamp)
   */
  exp: number;

  /**
   * Issued At (Unix timestamp)
   */
  iat?: number;

  /**
   * Not Before (Unix timestamp)
   */
  nbf?: number;

  /**
   * JWT Id
   */
  jti?: string;

  /**
   * Issuer
   */
  iss?: string;

  /**
   * Audience
   */
  aud?: string | string[];

  /**
   * Email (optional)
   */
  email?: string;

  /**
   * Name (optional)
   */
  name?: string;

  /**
   * ASP.NET Role Claim
   */
  role?: string | string[];

  /**
   * Allow any additional custom claims
   */
  [claim: string]: unknown;
}
