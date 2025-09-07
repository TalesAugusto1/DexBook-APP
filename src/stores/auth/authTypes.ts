/**
 * Authentication Types for AR Book Explorer
 * 
 * TypeScript type definitions for authentication state management.
 */

import { User } from '../../types/user';

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
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  clearError: () => void;
}
