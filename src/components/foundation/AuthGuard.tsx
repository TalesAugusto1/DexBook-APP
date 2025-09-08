/**
 * Enhanced Authentication Guard Component
 * 
 * Protects routes that require authentication and handles loading states.
 * Prevents authenticated users from accessing login/signup screens.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../stores/auth/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
  fallback?: React.ReactNode;
  showLoading?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/welcome',
  requireAuth = true,
  fallback,
  showLoading = true
}) => {
  const { state: authState } = useAuth();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Don't redirect if still loading
    if (authState.isLoading) {
      return;
    }

    // Handle authentication requirements
    if (requireAuth && !authState.isAuthenticated) {
      // User needs to be authenticated but isn't
      if (!hasRedirected) {
        setHasRedirected(true);
        router.replace(redirectTo);
      }
    } else if (!requireAuth && authState.isAuthenticated) {
      // User is authenticated but shouldn't be on this screen (e.g., login screen)
      if (!hasRedirected) {
        setHasRedirected(true);
        router.replace('/(tabs)');
      }
    }
  }, [authState.isAuthenticated, authState.isLoading, requireAuth, redirectTo, router]);

  // Reset redirect flag when auth state changes
  useEffect(() => {
    setHasRedirected(false);
  }, [authState.isAuthenticated, authState.isLoading]);

  // Show loading state while checking authentication
  if (authState.isLoading && showLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Show custom fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Show children if authentication state matches requirements
  const shouldShowChildren = (requireAuth && authState.isAuthenticated) || 
                           (!requireAuth && !authState.isAuthenticated);

  if (shouldShowChildren) {
    return <>{children}</>;
  }

  // Return null while redirecting or if conditions don't match
  return null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default AuthGuard;
