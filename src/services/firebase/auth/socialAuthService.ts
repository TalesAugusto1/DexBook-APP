/**
 * Social Authentication Service for AR Book Explorer
 * 
 * Provides Google Sign-In and Apple Sign-In functionality.
 * Following AlLibrary coding rules for security-first architecture.
 */

import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
import { authService } from './authService';
import { AuthServiceError } from './authTypes';
import { User } from '../../../types/user';

/**
 * Google Auth Configuration
 */
interface GoogleAuthConfig {
  clientId: string;
  iosClientId?: string;
  androidClientId?: string;
  webClientId?: string;
}

/**
 * Social Authentication Service
 * Handles Google and Apple Sign-In authentication
 */
export class SocialAuthService {
  private googleConfig: GoogleAuthConfig;

  constructor() {
    // TODO: Move these to environment configuration
    this.googleConfig = {
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '',
      androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '',
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
    };
  }

  /**
   * Sign in with Google using expo-auth-session
   */
  async signInWithGoogle(): Promise<User> {
    try {
      // Check if Google client ID is configured
      if (!this.googleConfig.clientId) {
        throw new AuthServiceError(
          'Google Sign-In is not configured. Please contact support.',
          'UNKNOWN_ERROR'
        );
      }

      // Create auth request
      const request = new AuthSession.AuthRequest({
        clientId: this.getGoogleClientId(),
        scopes: ['openid', 'profile', 'email'],
        responseType: AuthSession.ResponseType.IdToken,
        redirectUri: AuthSession.makeRedirectUri({
          useProxy: true,
        }),
        additionalParameters: {},
        extraParams: {
          nonce: await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            Math.random().toString(),
            { encoding: Crypto.CryptoEncoding.HEX }
          ),
        },
      });

      // Prompt for authentication
      const result = await request.promptAsync({
        authorizationEndpoint: 'https://accounts.google.com/oauth/authorize',
      });

      if (result.type === 'success' && result.params.id_token) {
        // Use the ID token to authenticate with Firebase
        const user = await authService.signInWithGoogle(result.params.id_token);
        return user;
      } else if (result.type === 'cancel') {
        throw new AuthServiceError('Google Sign-In was cancelled', 'UNKNOWN_ERROR');
      } else {
        throw new AuthServiceError('Google Sign-In failed', 'UNKNOWN_ERROR');
      }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      throw new AuthServiceError(
        `Google Sign-In failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'UNKNOWN_ERROR'
      );
    }
  }

  /**
   * Sign in with Apple (iOS only)
   */
  async signInWithApple(): Promise<User> {
    try {
      // Check if Apple Sign-In is available
      if (Platform.OS !== 'ios') {
        throw new AuthServiceError(
          'Apple Sign-In is only available on iOS devices',
          'UNKNOWN_ERROR'
        );
      }

      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (!isAvailable) {
        throw new AuthServiceError(
          'Apple Sign-In is not available on this device',
          'UNKNOWN_ERROR'
        );
      }

      // Generate nonce for security
      const nonce = Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);
      
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce,
        { encoding: Crypto.CryptoEncoding.HEX }
      );

      // Request Apple authentication
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      if (credential.identityToken) {
        // Use the identity token to authenticate with Firebase
        const user = await authService.signInWithApple(credential.identityToken, nonce);
        return user;
      } else {
        throw new AuthServiceError('Apple Sign-In failed: No identity token received', 'UNKNOWN_ERROR');
      }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      
      // Handle Apple-specific errors
      if (error && typeof error === 'object' && 'code' in error) {
        switch ((error as any).code) {
          case 'ERR_CANCELED':
            throw new AuthServiceError('Apple Sign-In was cancelled', 'UNKNOWN_ERROR');
          case 'ERR_INVALID_RESPONSE':
            throw new AuthServiceError('Invalid response from Apple', 'UNKNOWN_ERROR');
          case 'ERR_NOT_HANDLED':
            throw new AuthServiceError('Apple Sign-In request was not handled', 'UNKNOWN_ERROR');
          case 'ERR_UNKNOWN':
            throw new AuthServiceError('Unknown Apple Sign-In error', 'UNKNOWN_ERROR');
          default:
            throw new AuthServiceError('Apple Sign-In failed', 'UNKNOWN_ERROR');
        }
      }

      throw new AuthServiceError(
        `Apple Sign-In failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'UNKNOWN_ERROR'
      );
    }
  }

  /**
   * Check if Google Sign-In is available
   */
  isGoogleSignInAvailable(): boolean {
    return !!this.googleConfig.clientId;
  }

  /**
   * Check if Apple Sign-In is available
   */
  async isAppleSignInAvailable(): Promise<boolean> {
    if (Platform.OS !== 'ios') {
      return false;
    }
    
    try {
      return await AppleAuthentication.isAvailableAsync();
    } catch (error) {
      console.error('Error checking Apple Sign-In availability:', error);
      return false;
    }
  }

  /**
   * Get platform-specific Google client ID
   */
  private getGoogleClientId(): string {
    switch (Platform.OS) {
      case 'ios':
        return this.googleConfig.iosClientId || this.googleConfig.clientId;
      case 'android':
        return this.googleConfig.androidClientId || this.googleConfig.clientId;
      case 'web':
        return this.googleConfig.webClientId || this.googleConfig.clientId;
      default:
        return this.googleConfig.clientId;
    }
  }

  /**
   * Configure Google authentication
   */
  configureGoogle(config: GoogleAuthConfig): void {
    this.googleConfig = { ...this.googleConfig, ...config };
  }

  /**
   * Get Google OAuth redirect URI
   */
  getGoogleRedirectUri(): string {
    return AuthSession.makeRedirectUri({
      useProxy: true,
    });
  }

  /**
   * Handle deep link authentication response
   */
  async handleAuthenticationResponse(url: string): Promise<User | null> {
    try {
      // Parse the response from the URL
      const response = AuthSession.AuthRequest.parseReturnUrlAsync(url);
      
      if (response && 'params' in response && response.params.id_token) {
        // This is a Google Sign-In response
        const user = await authService.signInWithGoogle(response.params.id_token);
        return user;
      }
      
      return null;
    } catch (error) {
      console.error('Error handling authentication response:', error);
      return null;
    }
  }
}

// Export singleton instance
export const socialAuthService = new SocialAuthService();
