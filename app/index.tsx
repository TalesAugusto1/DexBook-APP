/**
 * Splash Screen for AR Book Explorer
 * 
 * Initial screen using expo-router navigation with authentication guard.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../src/stores/auth/AuthContext';

export default function SplashScreen() {
  const router = useRouter();
  const { state: authState } = useAuth();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  // Handle navigation based on authentication state
  useEffect(() => {
    // Don't navigate if still loading
    if (authState.isLoading) {
      return;
    }

    // Navigate after a short delay to show splash screen
    const timer = setTimeout(() => {
      if (authState.isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/welcome');
      }
    }, 1500); // Reduced delay for better UX

    return () => clearTimeout(timer);
  }, [authState.isAuthenticated, authState.isLoading, router]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.title}>AR Book Explorer</Text>
        <Text style={styles.subtitle}>Interactive Learning Experience</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 16,
    textAlign: 'center',
  },
  version: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
