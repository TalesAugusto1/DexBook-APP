/**
 * Book Scanner Screen for AR Book Explorer
 * 
 * Dedicated book scanner using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Loading } from '../../src/components/foundation';

export default function BookScanner() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      Alert.alert(
        'Book Found!',
        'Would you like to view book details?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'View Details', onPress: () => router.push('/books/details') },
        ]
      );
    }, 3000);
  };

  const handleARMode = () => {
    router.push('/ar/camera');
  };

  const handleBackToHome = () => {
    router.back();
  };

  if (isScanning) {
    return (
      <View style={styles.container}>
        <View style={styles.scanningContainer}>
          <Loading size="large" color="#2563eb" />
          <Text style={styles.scanningText}>Scanning book...</Text>
          <Text style={styles.scanningSubtext}>Point your camera at the book cover</Text>
        </View>
        <Button
          title="Cancel Scan"
          onPress={() => setIsScanning(false)}
          variant="secondary"
          size="large"
          style={styles.cancelButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Advanced Book Scanner</Text>
        <Text style={styles.subtitle}>
          Scan books to unlock AR experiences and interactive content
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="📱 Standard Scan"
          subtitle="Quick book recognition"
          variant="elevated"
          size="large"
          style={styles.scanCard}
        >
          <Text style={styles.cardDescription}>
            Point your camera at any book cover to:
            {'\n'}• Identify the book instantly
            {'\n'}• Access reading progress
            {'\n'}• Get personalized quizzes
            {'\n'}• View book information
          </Text>
          <Button
            title="Start Standard Scan"
            onPress={handleStartScan}
            variant="primary"
            size="large"
            style={styles.scanButton}
          />
        </Card>

        <Card
          title="🎯 AR Scanner Mode"
          subtitle="Enhanced AR experiences"
          variant="outlined"
          size="medium"
          style={styles.arCard}
        >
          <Text style={styles.cardDescription}>
            Use advanced AR scanning for:
            {'\n'}• 3D interactive content
            {'\n'}• Immersive storytelling
            {'\n'}• Virtual character interactions
            {'\n'}• Enhanced learning features
          </Text>
          <Button
            title="Start AR Scan"
            onPress={handleARMode}
            variant="secondary"
            size="medium"
            style={styles.arButton}
          />
        </Card>

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>📋 Scanning Tips:</Text>
          <Text style={styles.instructionsText}>
            • Ensure good lighting{'\n'}
            • Hold camera steady{'\n'}
            • Keep book cover in frame{'\n'}
            • Avoid glare on the cover
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="← Back"
            onPress={handleBackToHome}
            variant="outline"
            size="large"
            style={styles.backButton}
          />
        </View>
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
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 22,
  },
  content: {
    padding: 24,
    gap: 20,
  },
  scanCard: {
    marginBottom: 8,
  },
  arCard: {
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  scanButton: {
    width: '100%',
  },
  arButton: {
    width: '100%',
  },
  instructions: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  actions: {
    alignItems: 'center',
    marginTop: 8,
  },
  backButton: {
    width: '60%',
  },
  scanningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  scanningText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 8,
  },
  scanningSubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  cancelButton: {
    margin: 24,
  },
});
