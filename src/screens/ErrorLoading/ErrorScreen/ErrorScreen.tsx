/**
 * ErrorScreen Component for AR Book Explorer
 * 
 * This screen displays error messages and recovery options.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const ErrorScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleRetry = () => {
    // TODO: Implement retry logic
    navigation.navigate('MainTabs' as never);
  };

  const handleGoHome = () => {
    navigation.navigate('MainTabs' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Oops! Something went wrong</Text>
        <Text style={styles.subtitle}>
          We encountered an error, but don't worry!
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Error Details"
          subtitle="What happened?"
          variant="elevated"
          size="medium"
          style={styles.errorCard}
        >
          <View style={styles.errorInfo}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorMessage}>
              The app encountered an unexpected error. This might be due to a network issue or a temporary problem.
            </Text>
          </View>
        </Card>

        <View style={styles.actions}>
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
            variant="outline"
            size="large"
            style={styles.homeButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  errorCard: {
    marginBottom: 30,
    alignItems: 'center',
  },
  errorInfo: {
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  actions: {
    gap: 16,
  },
  retryButton: {
    marginBottom: 8,
  },
  homeButton: {
    marginBottom: 8,
  },
});

export default ErrorScreen;
