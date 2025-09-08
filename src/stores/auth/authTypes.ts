/**
 * Authentication Types for AR Book Explorer
 * 
 * TypeScript type definitions for authentication state management.
 */

import { User } from '../../types/user';

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
 * COPPA compliance status
 */
export interface COPPAStatus {
  isMinor: boolean;
  parentConsentRequired: boolean;
  parentConsentGiven: boolean;
  parentEmail?: string;
  consentDate?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: number;
  grade: string;
}

export interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  registerWithCOPPA: (credentials: COPPARegistrationCredentials) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendEmailVerification: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  clearError: () => void;
  checkCOPPAStatus: (age: number) => COPPAStatus;
  requestParentConsent: (parentEmail: string) => Promise<void>;
}
