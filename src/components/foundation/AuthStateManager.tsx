/**
 * Authentication State Manager Component
 * 
 * Manages authentication state and provides better session persistence.
 * Handles app initialization and authentication state restoration.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../stores/auth/AuthContext';

interface AuthStateManagerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showLoading?: boolean;
}

export const AuthStateManager: React.FC<AuthStateManagerProps> = ({
  children,
  fallback,
  showLoading = true
}) => {
  const { state: authState } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Mark as initialized when auth state is no longer loading
    if (!authState.isLoading) {
      setIsInitialized(true);
    }
  }, [authState.isLoading]);

  // Show loading state during initialization
  if (!isInitialized && showLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Initializing...</Text>
        <Text style={styles.loadingSubtext}>Setting up your learning experience</Text>
      </View>
    );
  }

  // Show custom fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Show children when ready
  return <>{children}</>;
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
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default AuthStateManager;
