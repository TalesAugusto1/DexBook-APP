/**
 * Custom hook for handling authentication redirects
 * 
 * Provides better control over authentication state and redirects.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../stores/auth/AuthContext';

interface UseAuthRedirectOptions {
  requireAuth?: boolean;
  redirectTo?: string;
  preventRedirect?: boolean;
  onRedirect?: () => void;
}

export const useAuthRedirect = (options: UseAuthRedirectOptions = {}) => {
  const {
    requireAuth = true,
    redirectTo = '/welcome',
    preventRedirect = false,
    onRedirect
  } = options;

  const { state: authState } = useAuth();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Don't do anything if still loading
    if (authState.isLoading) {
      setIsReady(false);
      return;
    }

    // Mark as ready when loading is complete
    setIsReady(true);
  }, [authState.isLoading]);

  useEffect(() => {
    // Don't redirect if still loading or prevented
    if (authState.isLoading || preventRedirect) {
      return;
    }

    // Handle authentication requirements
    if (requireAuth && !authState.isAuthenticated) {
      // User needs to be authenticated but isn't
      if (!hasRedirected) {
        setHasRedirected(true);
        onRedirect?.();
        router.replace(redirectTo);
      }
    } else if (!requireAuth && authState.isAuthenticated) {
      // User is authenticated but shouldn't be on this screen (e.g., login screen)
      if (!hasRedirected) {
        setHasRedirected(true);
        onRedirect?.();
        router.replace('/(tabs)');
      }
    }
  }, [
    authState.isAuthenticated, 
    authState.isLoading, 
    requireAuth, 
    redirectTo, 
    router, 
    preventRedirect,
    onRedirect
  ]);

  // Reset redirect flag when auth state changes
  useEffect(() => {
    setHasRedirected(false);
  }, [authState.isAuthenticated, authState.isLoading]);

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    isReady,
    hasRedirected,
    user: authState.user,
    error: authState.error
  };
};

export default useAuthRedirect;
