/**
 * BookRecognition Screen Component for AR Book Explorer
 * 
 * This screen handles book recognition processing and AI analysis.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Loading } from '../../../components/foundation';

export const BookRecognition: React.FC = () => {
  const navigation = useNavigation();
  const [isProcessing, setIsProcessing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate book recognition process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsProcessing(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    navigation.navigate('BookDetails' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recognizing Book</Text>
        <Text style={styles.subtitle}>
          Analyzing book content and generating AR experience
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Book Analysis"
          subtitle="Processing book information..."
          variant="elevated"
          size="large"
          style={styles.processingCard}
        >
          {isProcessing ? (
            <Loading
              variant="pulse"
              size="large"
              text={`Processing... ${progress}%`}
              style={styles.loadingContainer}
            />
          ) : (
            <View style={styles.successContainer}>
              <Text style={styles.successIcon}>✅</Text>
              <Text style={styles.successText}>Book recognized successfully!</Text>
            </View>
          )}
        </Card>

        {!isProcessing && (
          <View style={styles.actions}>
            <Button
              title="Continue to Book Details"
              onPress={handleContinue}
              variant="primary"
              size="large"
              style={styles.continueButton}
            />
          </View>
        )}
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
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  processingCard: {
    marginBottom: 30,
    alignItems: 'center',
    minHeight: 300,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successText: {
    fontSize: 18,
    color: '#22c55e',
    fontWeight: '600',
    textAlign: 'center',
  },
  actions: {
    gap: 16,
  },
  continueButton: {
    marginBottom: 8,
  },
});

export default BookRecognition;
