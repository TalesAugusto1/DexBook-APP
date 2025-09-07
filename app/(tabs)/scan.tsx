/**
 * Scan Tab Screen for AR Book Explorer
 * 
 * Book scanner screen using expo-router navigation.
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

  const handleManualEntry = () => {
    router.push('/books/recognition');
  };

  const handleViewLibrary = () => {
    // TODO: Navigate to library
    Alert.alert('Feature Coming Soon', 'Library view will be available soon!');
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
        <Text style={styles.title}>Book Scanner</Text>
        <Text style={styles.subtitle}>
          Scan books to unlock AR experiences and interactive content
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="📱 Camera Scan"
          subtitle="Use your camera to scan book covers"
          variant="elevated"
          size="large"
          style={styles.scanCard}
        >
          <Text style={styles.cardDescription}>
            Point your camera at any book cover to:
            {'\n'}• Unlock AR content
            {'\n'}• Access interactive features
            {'\n'}• Get personalized quizzes
            {'\n'}• Track reading progress
          </Text>
          <Button
            title="Start Camera Scan"
            onPress={handleStartScan}
            variant="primary"
            size="large"
            style={styles.scanButton}
          />
        </Card>

        <Card
          title="✏️ Manual Entry"
          subtitle="Enter book information manually"
          variant="outlined"
          size="medium"
          style={styles.manualCard}
        >
          <Text style={styles.cardDescription}>
            Can't scan? Enter book details manually to access content.
          </Text>
          <Button
            title="Manual Entry"
            onPress={handleManualEntry}
            variant="secondary"
            size="medium"
            style={styles.manualButton}
          />
        </Card>

        <Card
          title="📚 My Library"
          subtitle="View your scanned books"
          variant="outlined"
          size="medium"
          style={styles.libraryCard}
        >
          <Text style={styles.cardDescription}>
            Access all your previously scanned books and continue reading.
          </Text>
          <Button
            title="View Library"
            onPress={handleViewLibrary}
            variant="outline"
            size="medium"
            style={styles.libraryButton}
          />
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
  manualCard: {
    marginBottom: 8,
  },
  libraryCard: {
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
  manualButton: {
    width: '100%',
  },
  libraryButton: {
    width: '100%',
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
