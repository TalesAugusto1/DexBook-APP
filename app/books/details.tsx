/**
 * Book Details Screen for AR Book Explorer
 * 
 * Detailed book information using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function BookDetails() {
  const router = useRouter();

  const handleStartReading = () => {
    router.push('/ar/camera');
  };

  const handleStartQuiz = () => {
    router.push('/learning/quiz');
  };

  const handleAddToLibrary = () => {
    // TODO: Add to user library
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Details</Text>
        <Text style={styles.subtitle}>
          Everything you need to know about this book
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="📖 The Great Adventure"
          subtitle="by John Smith"
          variant="elevated"
          size="large"
          style={styles.bookCard}
        >
          <View style={styles.bookInfo}>
            <Text style={styles.description}>
              An exciting adventure story about friendship and discovery. Follow the main characters 
              as they embark on a journey that will change their lives forever.
            </Text>
            
            <View style={styles.details}>
              <Text style={styles.detailItem}>📚 Genre: Adventure</Text>
              <Text style={styles.detailItem}>📊 Reading Level: Grade 5-7</Text>
              <Text style={styles.detailItem}>📄 Pages: 180</Text>
              <Text style={styles.detailItem}>⏱️ Estimated Reading Time: 3 hours</Text>
              <Text style={styles.detailItem}>🔢 ISBN: 978-0-123456-78-9</Text>
              <Text style={styles.detailItem}>📅 Published: 2023</Text>
            </View>
          </View>
        </Card>

        <Card
          title="🎯 AR Features"
          subtitle="Interactive content available"
          variant="outlined"
          size="medium"
          style={styles.arCard}
        >
          <View style={styles.arFeatures}>
            <Text style={styles.featureItem}>🎮 Interactive character models</Text>
            <Text style={styles.featureItem}>🌍 3D environment exploration</Text>
            <Text style={styles.featureItem}>🔊 Immersive sound effects</Text>
            <Text style={styles.featureItem}>📱 Touch-based interactions</Text>
            <Text style={styles.featureItem}>🎨 Visual storytelling elements</Text>
          </View>
        </Card>

        <Card
          title="🧠 Learning Opportunities"
          subtitle="Educational content"
          variant="outlined"
          size="medium"
          style={styles.learningCard}
        >
          <View style={styles.learningFeatures}>
            <Text style={styles.featureItem}>❓ Comprehension quizzes</Text>
            <Text style={styles.featureItem}>📝 Vocabulary building</Text>
            <Text style={styles.featureItem}>🎯 Critical thinking exercises</Text>
            <Text style={styles.featureItem}>📊 Progress tracking</Text>
            <Text style={styles.featureItem}>🏆 Achievement rewards</Text>
          </View>
        </Card>

        <Card
          title="⭐ Reviews & Ratings"
          subtitle="What others are saying"
          variant="outlined"
          size="medium"
          style={styles.reviewsCard}
        >
          <View style={styles.reviews}>
            <Text style={styles.rating}>⭐⭐⭐⭐⭐ 4.8/5 (124 reviews)</Text>
            <Text style={styles.reviewText}>
              "Amazing interactive experience! My kids love the AR features."
            </Text>
            <Text style={styles.reviewText}>
              "Great story with educational value. Highly recommended!"
            </Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="🎯 Start AR Reading"
            onPress={handleStartReading}
            variant="primary"
            size="large"
            style={styles.readButton}
          />
          <Button
            title="🧠 Take Quiz"
            onPress={handleStartQuiz}
            variant="secondary"
            size="medium"
            style={styles.quizButton}
          />
          <Button
            title="📚 Add to Library"
            onPress={handleAddToLibrary}
            variant="outline"
            size="medium"
            style={styles.libraryButton}
          />
          <Button
            title="← Back"
            onPress={() => router.back()}
            variant="secondary"
            size="medium"
            style={styles.backButton}
          />
        </View>
      </View>
    </ScrollView>
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
  bookCard: {
    marginBottom: 8,
  },
  bookInfo: {
    gap: 16,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  details: {
    gap: 8,
  },
  detailItem: {
    fontSize: 14,
    color: '#64748b',
    paddingVertical: 2,
  },
  arCard: {
    marginBottom: 8,
  },
  arFeatures: {
    gap: 8,
  },
  learningCard: {
    marginBottom: 8,
  },
  learningFeatures: {
    gap: 8,
  },
  reviewsCard: {
    marginBottom: 8,
  },
  reviews: {
    gap: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  reviewText: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  featureItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  actions: {
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  readButton: {
    width: '100%',
  },
  quizButton: {
    width: '100%',
  },
  libraryButton: {
    width: '100%',
  },
  backButton: {
    width: '60%',
  },
});
