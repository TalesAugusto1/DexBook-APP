/**
 * Book Recognition Screen for AR Book Explorer
 * 
 * Book recognition processing using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Loading } from '../../src/components/foundation';

export default function BookRecognition() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [recognizedBook, setRecognizedBook] = useState<any>(null);

  useEffect(() => {
    // Simulate book recognition process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          // Simulate recognized book data
          setRecognizedBook({
            title: "The Great Adventure",
            author: "John Smith",
            isbn: "978-0-123456-78-9",
            genre: "Adventure",
            readingLevel: "Grade 5-7",
            pages: 180,
            description: "An exciting adventure story about friendship and discovery."
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleViewDetails = () => {
    router.push('/books/details');
  };

  const handleStartReading = () => {
    router.push('/ar/camera');
  };

  const handleTryAgain = () => {
    setIsProcessing(true);
    setProgress(0);
    setRecognizedBook(null);
    // Restart recognition process
    setTimeout(() => {
      setIsProcessing(false);
      setRecognizedBook(null);
    }, 3000);
  };

  if (isProcessing) {
    return (
      <View style={styles.container}>
        <View style={styles.processingContainer}>
          <Loading size="large" color="#2563eb" />
          <Text style={styles.processingText}>Recognizing Book...</Text>
          <Text style={styles.processingSubtext}>Analyzing book cover and content</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>

          <View style={styles.stepsContainer}>
            <Text style={styles.stepText}>🔍 Scanning cover... {progress > 20 ? '✓' : ''}</Text>
            <Text style={styles.stepText}>📚 Identifying book... {progress > 50 ? '✓' : ''}</Text>
            <Text style={styles.stepText}>🎯 Loading content... {progress > 80 ? '✓' : ''}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Recognized!</Text>
        <Text style={styles.subtitle}>
          We found your book and loaded the AR content
        </Text>
      </View>

      <View style={styles.content}>
        {recognizedBook ? (
          <Card
            title="📖 Book Details"
            subtitle="Recognition successful"
            variant="elevated"
            size="large"
            style={styles.bookCard}
          >
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{recognizedBook.title}</Text>
              <Text style={styles.bookAuthor}>by {recognizedBook.author}</Text>
              <Text style={styles.bookDetail}>📚 Genre: {recognizedBook.genre}</Text>
              <Text style={styles.bookDetail}>📊 Level: {recognizedBook.readingLevel}</Text>
              <Text style={styles.bookDetail}>📄 Pages: {recognizedBook.pages}</Text>
              <Text style={styles.bookDetail}>🔢 ISBN: {recognizedBook.isbn}</Text>
              <Text style={styles.bookDescription}>{recognizedBook.description}</Text>
            </View>

            <View style={styles.bookActions}>
              <Button
                title="🎯 Start AR Experience"
                onPress={handleStartReading}
                variant="primary"
                size="large"
                style={styles.startButton}
              />
              <Button
                title="📋 View Full Details"
                onPress={handleViewDetails}
                variant="secondary"
                size="medium"
                style={styles.detailsButton}
              />
            </View>
          </Card>
        ) : (
          <Card
            title="❌ Recognition Failed"
            subtitle="Couldn't identify this book"
            variant="outlined"
            size="medium"
            style={styles.errorCard}
          >
            <Text style={styles.errorText}>
              We couldn't recognize this book. This might happen if:
              {'\n'}• The cover is damaged or unclear
              {'\n'}• The book is not in our database
              {'\n'}• Lighting conditions are poor
            </Text>
            <Button
              title="Try Again"
              onPress={handleTryAgain}
              variant="primary"
              size="medium"
              style={styles.retryButton}
            />
          </Card>
        )}

        <View style={styles.actions}>
          <Button
            title="← Back to Scanner"
            onPress={() => router.back()}
            variant="outline"
            size="medium"
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 22,
    textAlign: 'center',
  },
  content: {
    padding: 24,
    gap: 20,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  processingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 8,
  },
  processingSubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
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
  stepsContainer: {
    alignItems: 'flex-start',
    gap: 8,
  },
  stepText: {
    fontSize: 14,
    color: '#64748b',
  },
  bookCard: {
    marginBottom: 8,
  },
  bookInfo: {
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 12,
  },
  bookDetail: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  bookDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginTop: 8,
  },
  bookActions: {
    gap: 12,
  },
  startButton: {
    width: '100%',
  },
  detailsButton: {
    width: '100%',
  },
  errorCard: {
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  retryButton: {
    width: '100%',
  },
  actions: {
    alignItems: 'center',
  },
  backButton: {
    width: '60%',
  },
});
