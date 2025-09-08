/**
 * Social Authentication Service for AR Book Explorer
 * 
 * Provides Google Sign-In and Apple Sign-In functionality.
 * Following AlLibrary coding rules for security-first architecture.
 */

import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';
import { User } from '../../../types/user';
import { authService } from './authService';
import { AuthServiceError } from './authTypes';

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
      clientId: process.env['EXPO_PUBLIC_GOOGLE_CLIENT_ID'] || '721919310516-vka2n6dbnu30lsuqaetvnlhlck2jn5in.apps.googleusercontent.com',
      iosClientId: process.env['EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID'] || '',
      androidClientId: process.env['EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID'] || '',
      webClientId: process.env['EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID'] || '',
    };
    
    // eslint-disable-next-line no-console
    console.log('SocialAuthService: Google config initialized:', {
      hasClientId: !!this.googleConfig.clientId,
      clientId: this.googleConfig.clientId,
    });
  }

  /**
   * Sign in with Google using expo-auth-session
   */
  async signInWithGoogle(): Promise<void> {
    try {
      // Check if Google client ID is configured
      if (!this.googleConfig.clientId) {
        // eslint-disable-next-line no-console
        console.error('Google Sign-In: No client ID configured. Check EXPO_PUBLIC_GOOGLE_CLIENT_ID environment variable.');
        throw new AuthServiceError(
          'Google Sign-In is not configured. Please contact support.',
          'UNKNOWN_ERROR'
        );
      }

      // eslint-disable-next-line no-console
      console.log('Google Sign-In: Starting authentication with client ID:', this.googleConfig.clientId);

      // Create auth request - use Expo proxy redirect during development (Expo Go)
      const redirectUri = AuthSession.makeRedirectUri();
      
      // eslint-disable-next-line no-console
      console.log('Google Sign-In: Using redirect URI:', redirectUri);
      
      const request = new AuthSession.AuthRequest({
        clientId: this.getGoogleClientId(),
        scopes: ['openid', 'profile', 'email'],
        responseType: AuthSession.ResponseType.Code,
        redirectUri,
        extraParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      });

      // Prompt for authentication using proper discovery
      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
      } as const;
      
      // eslint-disable-next-line no-console
      console.log('Google Sign-In: Prompting for authentication...');
      const result = await request.promptAsync(discovery);
      // eslint-disable-next-line no-console
      console.log('Google Sign-In: Auth result:', result.type);

      if (result.type === 'success' && result.params['code']) {
        // eslint-disable-next-line no-console
        console.log('Google Sign-In: Success, exchanging code for tokens...');
        
        // Exchange authorization code for tokens
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: this.getGoogleClientId(),
            code: result.params['code'],
            redirectUri,
          },
          discovery
        );

        if (tokenResponse.idToken) {
          // Use the ID token to authenticate with Firebase
          await authService.signInWithGoogle(tokenResponse.idToken);
          // Let onAuthStateChanged handle the user profile fetching
        } else {
          throw new AuthServiceError('No ID token received from Google', 'UNKNOWN_ERROR');
        }
      } else if (result.type === 'cancel') {
        // eslint-disable-next-line no-console
        console.log('Google Sign-In: User cancelled');
        throw new AuthServiceError('Google Sign-In was cancelled', 'UNKNOWN_ERROR');
      } else {
        // eslint-disable-next-line no-console
        console.error('Google Sign-In: Failed with result:', result);
        throw new AuthServiceError(`Google Sign-In failed: ${result.type}`, 'UNKNOWN_ERROR');
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
  async signInWithApple(): Promise<void> {
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
        await authService.signInWithApple(credential.identityToken, nonce);
        // Let onAuthStateChanged handle the user profile fetching
      } else {
        throw new AuthServiceError('Apple Sign-In failed: No identity token received', 'UNKNOWN_ERROR');
      }
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      
      // Handle Apple-specific errors
      if (error && typeof error === 'object' && 'code' in error) {
        switch ((error as { code: string }).code) {
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
      // eslint-disable-next-line no-console
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
    return AuthSession.makeRedirectUri();
  }

  /**
   * Handle deep link authentication response
   */
  async handleAuthenticationResponse(_url: string): Promise<User | null> {
    try {
      // Parse the response from the URL
      // TODO: Fix deprecated method - use AuthSession.parseReturnUrlAsync instead
      // const response = null; // Method deprecated - needs fixing
      
      // Method currently not implemented due to deprecated parseReturnUrlAsync
      return null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error handling authentication response:', error);
      return null;
    }
  }
}

// Export singleton instance
export const socialAuthService = new SocialAuthService();

