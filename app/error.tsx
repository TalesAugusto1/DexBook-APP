/**
 * Error Screen for AR Book Explorer
 * 
 * Generic error handling screen using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../src/components/foundation';

export default function ErrorScreen() {
  const router = useRouter();

  const handleRetry = () => {
    // TODO: Implement retry logic
    router.push('/(tabs)');
  };

  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Oops! Something went wrong</Text>
        <Text style={styles.subtitle}>
          We encountered an unexpected error
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="❌ Error Occurred"
          subtitle="Don't worry, we can fix this"
          variant="elevated"
          size="large"
          style={styles.errorCard}
        >
          <Text style={styles.errorDescription}>
            Something unexpected happened, but it's usually easy to fix. Here are some things you can try:
            {'\n\n'}
            • Check your internet connection
            {'\n'}• Restart the app
            {'\n'}• Try again in a few moments
            {'\n'}• Contact support if the problem persists
          </Text>
          
          <View style={styles.errorActions}>
            <Button
              title="Try Again"
              onPress={handleRetry}
              variant="primary"
              size="large"
              style={styles.retryButton}
            />
            <Button
              title="Go to Home"
              onPress={handleGoHome}
              variant="secondary"
              size="medium"
              style={styles.homeButton}
            />
          </View>
        </Card>

        <Card
          title="📞 Need Help?"
          subtitle="Contact our support team"
          variant="outlined"
          size="medium"
          style={styles.supportCard}
        >
          <Text style={styles.supportText}>
            If you continue to experience issues, please contact our support team:
            {'\n\n'}
            📧 Email: help@arbookexplorer.com
            {'\n'}🌐 Website: support.arbookexplorer.com
            {'\n'}📱 In-app support chat available
          </Text>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#991b1b',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 20,
    justifyContent: 'center',
  },
  errorCard: {
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 20,
  },
  errorActions: {
    gap: 12,
  },
  retryButton: {
    width: '100%',
  },
  homeButton: {
    width: '100%',
  },
  supportCard: {
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});
