/**
 * Authentication Context for AR Book Explorer
 * 
 * Provides authentication state and actions to components.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { authReducer, AuthState, loginStart, loginSuccess, loginFailure, logout, updateProfile, clearError } from './authStore';
import { AuthContextType, LoginCredentials, RegisterCredentials } from './authTypes';
import { User } from '../../types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch(loginStart());
      
      // TODO: Implement actual authentication with Firebase
      // For now, simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'Test User',
        age: 12,
        grade: '6th',
        avatar: null,
        preferences: {
          learningStyle: 'visual',
          accessibilityLevel: 1,
          notifications: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      dispatch(loginStart());
      
      // TODO: Implement actual registration with Firebase
      // For now, simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '1',
        email: credentials.email,
        name: credentials.name,
        age: credentials.age,
        grade: credentials.grade,
        avatar: null,
        preferences: {
          learningStyle: 'visual',
          accessibilityLevel: 1,
          notifications: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Registration failed'));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    dispatch(updateProfile(updates));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    clearError: handleClearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
