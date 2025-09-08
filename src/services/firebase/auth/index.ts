/**
 * Authentication Services Index for AR Book Explorer
 * 
 * Exports all authentication-related services and types.
 * Following AlLibrary coding rules for clean exports and module organization.
 */

// Services
export { AuthService, authService } from './authService';
export { COPPAService, coppaService } from './coppaService';
export { SocialAuthService, socialAuthService } from './socialAuthService';

// Types
export type {
  LoginCredentials,
  RegisterCredentials,
  COPPARegistrationCredentials,
  AuthErrorCode,
  AuthServiceError,
  SocialAuthProvider,
  AuthResult,
  PasswordResetRequest,
  EmailVerificationStatus,
  UserSession,
  AuthState,
  COPPAStatus,
  EnhancedAuthContextType,
  AuthProviderConfig,
  AuthValidationRules,
} from './authTypes';

export { defaultAuthValidationRules } from './authTypes';

// COPPA types
export type {
  COPPAComplianceData,
  ParentConsentRequest,
} from './coppaService';
