/**
 * AR Book Validation Screen for AR Book Explorer
 * 
 * Book validation for AR features using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Loading } from '../../src/components/foundation';

export default function BookValidation() {
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(false);

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      router.push('/ar/progress');
    }, 3000);
  };

  if (isValidating) {
    return (
      <View style={styles.container}>
        <View style={styles.validatingContainer}>
          <Loading size="large" color="#2563eb" />
          <Text style={styles.validatingText}>Validating Book...</Text>
          <Text style={styles.validatingSubtext}>Checking AR compatibility</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Validation</Text>
        <Text style={styles.subtitle}>Verify your book for AR features</Text>
      </View>

      <View style={styles.content}>
        <Card
          title="📖 Validation Required"
          subtitle="Confirm this is the correct book"
          variant="elevated"
          size="large"
          style={styles.validationCard}
        >
          <Text style={styles.description}>
            To ensure the best AR experience, we need to validate that this is the correct book 
            and that all AR content is properly aligned.
          </Text>
          <Button
            title="Start Validation"
            onPress={handleValidate}
            variant="primary"
            size="large"
            style={styles.validateButton}
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
  validationCard: {
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  validateButton: {
    width: '100%',
  },
  validatingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  validatingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 8,
  },
  validatingSubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});
