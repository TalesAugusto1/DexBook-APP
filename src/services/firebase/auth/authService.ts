/**
 * Firebase Authentication Service for AR Book Explorer
 * 
 * Provides authentication methods including email/password, Google Sign-In, and Apple Sign-In.
 * Following AlLibrary coding rules for security-first architecture and COPPA compliance.
 */

import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri, ResponseType } from 'expo-auth-session';
import {
    AuthError,
    createUserWithEmailAndPassword,
    User as FirebaseUser,
    GoogleAuthProvider,
    OAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    UserCredential,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../../../config/firebase.config';
import { User } from '../../../types/user';
import { AuthServiceError, LoginCredentials, RegisterCredentials } from './authTypes';

/**
 * Firebase Authentication Service
 * Handles all authentication operations with Firebase
 */
export class AuthService {
  constructor() {}

  /**
   * Sign in with email and password
   */
  async signInWithEmail(credentials: LoginCredentials): Promise<void> {
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      // Let onAuthStateChanged handle the user profile fetching
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Register new user with email and password
   */
  async registerWithEmail(credentials: RegisterCredentials): Promise<void> {
    try {
      // Validate age for COPPA compliance
      if (credentials.age < 13) {
        throw new AuthServiceError(
          'Users under 13 require parent/guardian consent',
          'COPPA_COMPLIANCE_REQUIRED'
        );
      }

      // Add a network timeout to avoid hanging if connectivity is poor
      const TIMEOUT_MS = 15000;
      const userCredential = await Promise.race<UserCredential | never>([
        createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        ),
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new AuthServiceError('Network timeout during registration', 'NETWORK_TIMEOUT')),
            TIMEOUT_MS,
          )
        ),
      ]);

      // Update Firebase Auth profile
      await updateProfile(userCredential.user, {
        displayName: credentials.name,
      });

      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Create user profile in Firestore
      const userProfile: User = {
        id: userCredential.user.uid,
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

      // Profile write with timeout as well to prevent indefinite loading
      await Promise.race([
        this.createUserProfile(userProfile),
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new AuthServiceError('Network timeout creating user profile', 'NETWORK_TIMEOUT')),
            TIMEOUT_MS,
          )
        ),
      ]);

      // Let onAuthStateChanged handle the state update
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Sign in with Google. If an ID token is provided, uses it directly.
   * Otherwise falls back to initiating the AuthSession flow.
   */
  async signInWithGoogle(idToken?: string): Promise<void> {
    try {
      // If an ID token is provided (preferred path via SocialAuthService)
      if (idToken) {
        const googleCredential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, googleCredential);
        // Let onAuthStateChanged handle the user profile fetching
        return;
      }

      // Fallback: initiate AuthSession to obtain id_token
      const redirectUri = makeRedirectUri({ useProxy: true });
      const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';
      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
      } as const;

      const authRequest = new AuthSession.AuthRequest({
        clientId,
        redirectUri,
        responseType: ResponseType.IdToken,
        scopes: ['openid', 'profile', 'email'],
        extraParams: { nonce: Math.random().toString(36).slice(2) },
      });

      await authRequest.makeAuthUrlAsync(discovery);
      const result = await authRequest.promptAsync(discovery, {} as any);

      if (result.type !== 'success' || !result.params['id_token']) {
        throw new AuthServiceError('Google Sign-In cancelled or failed', 'GOOGLE_SIGNIN_FAILED');
      }

      const googleCredential = GoogleAuthProvider.credential(result.params['id_token']);
      await signInWithCredential(auth, googleCredential);
      // Let onAuthStateChanged handle the user profile fetching
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Sign out from Google
   */
  async signOutGoogle(): Promise<void> {
    // No-op for AuthSession; Firebase signOut is sufficient.
    return;
  }

  /**
   * Sign in with Apple
   */
  async signInWithApple(identityToken: string, nonce: string): Promise<void> {
    try {
      const provider = new OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: identityToken,
        rawNonce: nonce,
      });

      await signInWithCredential(auth, credential);
      // Let onAuthStateChanged handle the user profile fetching
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Resend email verification
   */
  async resendEmailVerification(): Promise<void> {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      } else {
        throw new AuthServiceError('No authenticated user', 'NO_USER');
      }
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Get user profile from Firestore
   */
  async getUserProfile(uid: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(firestore, 'users', uid));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          createdAt: data['createdAt']?.toDate() || new Date(),
          updatedAt: data['updatedAt']?.toDate() || new Date(),
        } as User;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * Create user profile in Firestore
   */
  private async createUserProfile(user: User): Promise<void> {
    try {
      await setDoc(doc(firestore, 'users', user.id), {
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new AuthServiceError('Failed to create user profile', 'PROFILE_CREATION_FAILED');
    }
  }

  /**
   * Update user profile in Firestore
   */
  async updateUserProfile(uid: string, updates: Partial<User>): Promise<void> {
    try {
      await updateDoc(doc(firestore, 'users', uid), {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new AuthServiceError('Failed to update user profile', 'PROFILE_UPDATE_FAILED');
    }
  }

  /**
   * Create user profile for Google sign-in
   */
  private async createGoogleUserProfile(firebaseUser: FirebaseUser): Promise<User> {
    const userProfile: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || 'Google User',
      age: 13, // Default age for social sign-ins (requires profile completion)
      grade: '', // To be filled during profile setup
      avatar: firebaseUser.photoURL,
      preferences: {
        learningStyle: 'visual',
        accessibilityLevel: 1,
        notifications: true,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.createUserProfile(userProfile);
    return userProfile;
  }

  /**
   * Create user profile for Apple sign-in
   */
  private async createAppleUserProfile(firebaseUser: FirebaseUser): Promise<User> {
    const userProfile: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || 'Apple User',
      age: 13, // Default age for social sign-ins (requires profile completion)
      grade: '', // To be filled during profile setup
      avatar: firebaseUser.photoURL,
      preferences: {
        learningStyle: 'visual',
        accessibilityLevel: 1,
        notifications: true,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.createUserProfile(userProfile);
    return userProfile;
  }

  /**
   * Handle Firebase Auth errors
   */
  private handleAuthError(error: AuthError): AuthServiceError {
    switch (error.code) {
      case 'auth/user-not-found':
        return new AuthServiceError('User not found', 'USER_NOT_FOUND');
      case 'auth/wrong-password':
        return new AuthServiceError('Invalid password', 'INVALID_PASSWORD');
      case 'auth/email-already-in-use':
        return new AuthServiceError('Email already in use', 'EMAIL_IN_USE');
      case 'auth/weak-password':
        return new AuthServiceError('Password is too weak', 'WEAK_PASSWORD');
      case 'auth/invalid-email':
        return new AuthServiceError('Invalid email address', 'INVALID_EMAIL');
      case 'auth/user-disabled':
        return new AuthServiceError('User account has been disabled', 'USER_DISABLED');
      case 'auth/too-many-requests':
        return new AuthServiceError('Too many failed attempts. Try again later.', 'TOO_MANY_REQUESTS');
      case 'auth/network-request-failed':
        return new AuthServiceError('Network error. Please check your connection.', 'NETWORK_ERROR');
      default:
        return new AuthServiceError(error.message || 'Authentication failed', 'UNKNOWN_ERROR');
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
