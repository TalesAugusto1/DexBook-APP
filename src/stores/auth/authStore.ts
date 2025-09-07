/**
 * Authentication Store for AR Book Explorer
 * 
 * Manages authentication state using React useReducer.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { User } from '../../types/user';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Action creators
export const loginStart = (): AuthAction => ({ type: 'LOGIN_START' });
export const loginSuccess = (user: User): AuthAction => ({ type: 'LOGIN_SUCCESS', payload: user });
export const loginFailure = (error: string): AuthAction => ({ type: 'LOGIN_FAILURE', payload: error });
export const logout = (): AuthAction => ({ type: 'LOGOUT' });
export const updateProfile = (updates: Partial<User>): AuthAction => ({ type: 'UPDATE_PROFILE', payload: updates });
export const clearError = (): AuthAction => ({ type: 'CLEAR_ERROR' });