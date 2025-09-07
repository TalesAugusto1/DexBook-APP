/**
 * Loading Screen for AR Book Explorer
 * 
 * Generic loading screen using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Loading, Card } from '../src/components/foundation';

export default function LoadingScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navigate to main screen after loading
          setTimeout(() => {
            router.push('/(tabs)');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.loadingContainer}>
          <Loading size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Loading...</Text>
          <Text style={styles.loadingSubtext}>Preparing your learning experience</Text>
        </View>

        <Card
          title="📚 AR Book Explorer"
          subtitle="Getting everything ready"
          variant="elevated"
          size="medium"
          style={styles.infoCard}
        >
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>

          <View style={styles.steps}>
            <Text style={styles.stepText}>
              📱 Initializing app... {progress > 20 ? '✓' : ''}
            </Text>
            <Text style={styles.stepText}>
              🔧 Loading components... {progress > 50 ? '✓' : ''}
            </Text>
            <Text style={styles.stepText}>
              🎯 Preparing content... {progress > 80 ? '✓' : ''}
            </Text>
          </View>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            AR Book Explorer v1.0.0
          </Text>
          <Text style={styles.footerSubtext}>
            Interactive Learning Experience
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 40,
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
  },
  loadingSubtext: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  infoCard: {
    width: '100%',
    maxWidth: 300,
  },
  progressContainer: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  steps: {
    gap: 8,
  },
  stepText: {
    fontSize: 14,
    color: '#64748b',
  },
  footer: {
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  footerSubtext: {
    fontSize: 14,
    color: '#64748b',
  },
});
