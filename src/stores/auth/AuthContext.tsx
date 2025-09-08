/**
 * Enhanced Authentication Context for AR Book Explorer
 * 
 * Provides authentication state and actions to components with Firebase integration.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { auth } from '../../config/firebase.config';
import {
    authService,
    COPPARegistrationCredentials,
    coppaService
} from '../../services/firebase/auth';
import { AuthServiceError } from '../../services/firebase/auth/authTypes';
import { socialAuthService } from '../../services/firebase/auth/socialAuthService';
import { User } from '../../types/user';
import { authReducer, clearError, loginFailure, loginStart, loginSuccess, logout, updateProfile } from './authStore';
import { AuthContextType, LoginCredentials, RegisterCredentials } from './authTypes';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start with loading to check auth state
    error: null,
  });

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // eslint-disable-next-line no-console
      console.log('AuthContext: onAuthStateChanged triggered', { 
        hasUser: !!firebaseUser, 
        uid: firebaseUser?.uid,
        email: firebaseUser?.email 
      });

      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          const userProfile = await authService.getUserProfile(firebaseUser.uid);
          if (userProfile) {
            // eslint-disable-next-line no-console
            console.log('AuthContext: User profile loaded successfully', { email: userProfile.email });
            dispatch(loginSuccess(userProfile));
          } else {
            // eslint-disable-next-line no-console
            console.warn('AuthContext: Firebase user exists but no profile found');
            // Firebase user exists but no profile, handle edge case
            dispatch(loginFailure('User profile not found'));
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('AuthContext: Error fetching user profile:', error);
          dispatch(loginFailure('Failed to load user profile'));
        }
      } else {
        // eslint-disable-next-line no-console
        console.log('AuthContext: User is not authenticated, dispatching logout');
        // User is not authenticated
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch(loginStart());
      // Let Firebase handle the authentication and let onAuthStateChanged handle the state update
      await authService.signInWithEmail(credentials);
      // Don't manually dispatch loginSuccess here - let onAuthStateChanged handle it
    } catch (error) {
      const errorMessage = error instanceof AuthServiceError 
        ? error.message 
        : 'Login failed';
      dispatch(loginFailure(errorMessage));
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      dispatch(loginStart());
      
      // Check if user is under 13 for COPPA compliance
      if (credentials.age < 13) {
        dispatch(loginFailure('Users under 13 require parent/guardian consent. Please use the COPPA registration process.'));
        return;
      }
      
      // Let Firebase handle the registration and let onAuthStateChanged handle the state update
      await authService.registerWithEmail(credentials);
      // Don't manually dispatch loginSuccess here - let onAuthStateChanged handle it
    } catch (error) {
      const errorMessage = error instanceof AuthServiceError 
        ? error.message 
        : 'Registration failed';
      dispatch(loginFailure(errorMessage));
    }
  };

  const registerWithCOPPA = async (credentials: COPPARegistrationCredentials): Promise<void> => {
    try {
      dispatch(loginStart());
      
      // This will create a user profile and send parent consent email
      const user = await coppaService.registerWithCOPPA(credentials, 'temp-id');
      dispatch(loginSuccess(user));
    } catch (error) {
      const errorMessage = error instanceof AuthServiceError 
        ? error.message 
        : 'COPPA registration failed';
      dispatch(loginFailure(errorMessage));
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      dispatch(loginStart());
      // eslint-disable-next-line no-console
      console.log('AuthContext: Starting Google Sign-In...');
      // Let Firebase handle the authentication and let onAuthStateChanged handle the state update
      await socialAuthService.signInWithGoogle();
      // eslint-disable-next-line no-console
      console.log('AuthContext: Google Sign-In successful');
      // Don't manually dispatch loginSuccess here - let onAuthStateChanged handle it
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('AuthContext: Google Sign-In error:', error);
      const errorMessage = error instanceof AuthServiceError 
        ? error.message 
        : 'Google Sign-In failed';
      dispatch(loginFailure(errorMessage));
    }
  };

  const signInWithApple = async (): Promise<void> => {
    try {
      dispatch(loginStart());
      // Let Firebase handle the authentication and let onAuthStateChanged handle the state update
      await socialAuthService.signInWithApple();
      // Don't manually dispatch loginSuccess here - let onAuthStateChanged handle it
    } catch (error) {
      const errorMessage = error instanceof AuthServiceError 
        ? error.message 
        : 'Apple Sign-In failed';
      dispatch(loginFailure(errorMessage));
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      const errorMessage = error instanceof AuthServiceError 
        ? error.message 
        : 'Password reset failed';
      dispatch(loginFailure(errorMessage));
    }
  };

  const resendEmailVerification = async (): Promise<void> => {
    try {
      await authService.resendEmailVerification();
    } catch (error) {
      const errorMessage = error instanceof AuthServiceError 
        ? error.message 
        : 'Failed to resend verification email';
      dispatch(loginFailure(errorMessage));
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      // eslint-disable-next-line no-console
      console.log('AuthContext: Starting logout process');
      
      // Sign out from Firebase
      await authService.signOut();
      
      // Sign out from Google if the user was signed in with Google
      await authService.signOutGoogle();
      
      // eslint-disable-next-line no-console
      console.log('AuthContext: Logout completed successfully');
      dispatch(logout());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('AuthContext: Logout error:', error);
      // Force logout even if signOut fails
      dispatch(logout());
    }
  };

  const handleUpdateProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      if (state.user) {
        await authService.updateUserProfile(state.user.id, updates);
        dispatch(updateProfile(updates));
      }
    } catch (error) {
      const errorMessage = error instanceof AuthServiceError 
        ? error.message 
        : 'Profile update failed';
      dispatch(loginFailure(errorMessage));
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const checkCOPPAStatus = (age: number) => {
    return coppaService.checkCOPPARequirement(age);
  };

  const requestParentConsent = async (parentEmail: string): Promise<void> => {
    try {
      if (state.user) {
        await coppaService.requestParentConsent(state.user.id, parentEmail);
      } else {
        throw new Error('No authenticated user');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to request parent consent';
      dispatch(loginFailure(errorMessage));
    }
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    registerWithCOPPA,
    signInWithGoogle,
    signInWithApple,
    resetPassword,
    resendEmailVerification,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    clearError: handleClearError,
    checkCOPPAStatus,
    requestParentConsent,
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
