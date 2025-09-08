/**
 * Authentication Debugger Component
 * 
 * Development tool for debugging authentication state.
 * Only shows in development mode.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../stores/auth/AuthContext';

export const AuthDebugger: React.FC = () => {
  const { state: authState } = useAuth();

  // Only show in development
  if (__DEV__) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🔍 Auth Debug</Text>
        <ScrollView style={styles.content}>
          <Text style={styles.label}>Authentication State:</Text>
          <Text style={styles.value}>
            {authState.isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
          </Text>
          
          <Text style={styles.label}>Loading State:</Text>
          <Text style={styles.value}>
            {authState.isLoading ? '⏳ Loading...' : '✅ Ready'}
          </Text>
          
          <Text style={styles.label}>User Email:</Text>
          <Text style={styles.value}>
            {authState.user?.email || 'No user'}
          </Text>
          
          <Text style={styles.label}>User Name:</Text>
          <Text style={styles.value}>
            {authState.user?.name || 'No name'}
          </Text>
          
          <Text style={styles.label}>Error:</Text>
          <Text style={styles.value}>
            {authState.error || 'No errors'}
          </Text>
        </ScrollView>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    padding: 8,
    maxWidth: 200,
    maxHeight: 300,
    zIndex: 1000,
  },
  title: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  content: {
    maxHeight: 250,
  },
  label: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  value: {
    color: '#ffffff',
    fontSize: 9,
    marginBottom: 2,
  },
});

export default AuthDebugger;
