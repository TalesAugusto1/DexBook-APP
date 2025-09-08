/**
 * Authentication Status Indicator Component
 * 
 * Shows current authentication status for debugging.
 * Only visible in development mode.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../stores/auth/AuthContext';

export const AuthStatusIndicator: React.FC = () => {
  const { state: authState } = useAuth();

  // Only show in development
  if (!__DEV__) {
    return null;
  }

  const getStatusColor = () => {
    if (authState.isLoading) return '#f59e0b'; // yellow
    if (authState.isAuthenticated) return '#10b981'; // green
    return '#ef4444'; // red
  };

  const getStatusText = () => {
    if (authState.isLoading) return 'Loading...';
    if (authState.isAuthenticated) return 'Authenticated';
    return 'Not Authenticated';
  };

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.text}>{getStatusText()}</Text>
      {authState.user && (
        <Text style={styles.userText}>{authState.user.email}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1000,
  },
  text: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userText: {
    color: '#ffffff',
    fontSize: 8,
    marginTop: 2,
  },
});

export default AuthStatusIndicator;
