/**
 * Authentication Types for AR Book Explorer
 * 
 * TypeScript definitions for authentication service.
 * Following AlLibrary coding rules for comprehensive type safety.
 */

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration credentials interface
 */
export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: number;
  grade: string;
}

/**
 * COPPA registration credentials for users under 13
 */
export interface COPPARegistrationCredentials extends RegisterCredentials {
  parentEmail: string;
  parentName: string;
  consentGiven: boolean;
  parentPhoneNumber?: string;
}

/**
 * Authentication service error codes
 */
export type AuthErrorCode =
  | 'USER_NOT_FOUND'
  | 'INVALID_PASSWORD'
  | 'EMAIL_IN_USE'
  | 'WEAK_PASSWORD'
  | 'INVALID_EMAIL'
  | 'USER_DISABLED'
  | 'TOO_MANY_REQUESTS'
  | 'NETWORK_ERROR'
  | 'PROFILE_NOT_FOUND'
  | 'PROFILE_CREATION_FAILED'
  | 'PROFILE_UPDATE_FAILED'
  | 'COPPA_COMPLIANCE_REQUIRED'
  | 'NO_USER'
  | 'UNKNOWN_ERROR';

/**
 * Custom authentication service error
 */
export class AuthServiceError extends Error {
  constructor(
    message: string,
    public code: AuthErrorCode,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AuthServiceError';
  }
}

/**
 * Social authentication providers
 */
export type SocialAuthProvider = 'google' | 'apple';

/**
 * Authentication result interface
 */
export interface AuthResult {
  success: boolean;
  user?: any; // Will be User type from user types
  error?: AuthServiceError;
}

/**
 * Password reset request interface
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Email verification status
 */
export interface EmailVerificationStatus {
  isVerified: boolean;
  lastSentAt?: Date;
  canResend: boolean;
}

/**
 * User session information
 */
export interface UserSession {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastSignInTime?: Date;
  creationTime?: Date;
}

/**
 * Authentication state interface
 */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null; // Will be User type from user types
  error: string | null;
  emailVerificationStatus?: EmailVerificationStatus;
  session?: UserSession;
}

/**
 * COPPA compliance status
 */
export interface COPPAStatus {
  isMinor: boolean;
  parentConsentRequired: boolean;
  parentConsentGiven: boolean;
  parentEmail?: string;
  consentDate?: Date;
}

/**
 * Enhanced authentication context type
 */
export interface EnhancedAuthContextType {
  state: AuthState;
  
  // Email/Password authentication
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  registerWithCOPPA: (credentials: COPPARegistrationCredentials) => Promise<void>;
  
  // Social authentication
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  
  // Password management
  resetPassword: (email: string) => Promise<void>;
  resendEmailVerification: () => Promise<void>;
  
  // User management
  logout: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>; // Will be Partial<User>
  
  // Error handling
  clearError: () => void;
  
  // COPPA compliance
  checkCOPPAStatus: (age: number) => COPPAStatus;
  requestParentConsent: (parentEmail: string) => Promise<void>;
}

/**
 * Firebase Auth provider configuration
 */
export interface AuthProviderConfig {
  google: {
    clientId: string;
    scopes: string[];
  };
  apple: {
    clientId: string;
    scopes: string[];
  };
}

/**
 * Authentication validation rules
 */
export interface AuthValidationRules {
  password: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  email: {
    allowedDomains?: string[];
    blockedDomains?: string[];
  };
  age: {
    minimumAge: number;
    maximumAge: number;
    coppaThreshold: number;
  };
}

/**
 * Default validation rules
 */
export const defaultAuthValidationRules: AuthValidationRules = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  email: {
    allowedDomains: undefined,
    blockedDomains: ['tempmail.com', '10minutemail.com', 'guerrillamail.com'],
  },
  age: {
    minimumAge: 5,
    maximumAge: 100,
    coppaThreshold: 13,
  },
};
