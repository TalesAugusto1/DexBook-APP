/**
 * SplashScreen Component for AR Book Explorer
 * 
 * This is the first screen users see when opening the app.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface SplashScreenProps {
  // No props needed for splash screen
}

export const SplashScreen: React.FC<SplashScreenProps> = () => {
  const navigation = useNavigation();
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

    // Navigate to welcome screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Welcome' as never);
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

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
};

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

export default SplashScreen;
