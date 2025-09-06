/**
 * WelcomeScreen Component for AR Book Explorer
 * 
 * This screen welcomes users and introduces the app features.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { appInfo } from '../../../config/app.config';

interface WelcomeScreenProps {
  // No props needed for welcome screen
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/learning-assessment');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to AR Book Explorer</Text>
        <Text style={styles.subtitle}>
          Transform your reading experience with interactive AR content and AI-powered learning
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>📚</Text>
          <Text style={styles.featureTitle}>AR-Enhanced Reading</Text>
          <Text style={styles.featureDescription}>
            Bring books to life with interactive 3D models and animations
          </Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🤖</Text>
          <Text style={styles.featureTitle}>AI-Powered Learning</Text>
          <Text style={styles.featureDescription}>
            Personalized quizzes and adaptive learning paths
          </Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🎮</Text>
          <Text style={styles.featureTitle}>Gamification</Text>
          <Text style={styles.featureDescription}>
            Earn achievements and rewards as you learn
          </Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>♿</Text>
          <Text style={styles.featureTitle}>Accessibility First</Text>
          <Text style={styles.featureDescription}>
            Universal design for all learners
          </Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleSignIn}>
          <Text style={styles.secondaryButtonText}>I Already Have an Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  feature: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionsContainer: {
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default WelcomeScreen;
