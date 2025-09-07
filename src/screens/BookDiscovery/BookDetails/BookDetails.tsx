/**
 * BookDetails Screen Component for AR Book Explorer
 * 
 * This screen displays book information and AR content preview.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const BookDetails: React.FC = () => {
  const navigation = useNavigation();

  const handleStartReading = () => {
    navigation.navigate('ARCameraView' as never);
  };

  const handleAddToLibrary = () => {
    // TODO: Implement add to library functionality
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Details</Text>
        <Text style={styles.subtitle}>
          Interactive learning experience ready
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Sample Book Title"
          subtitle="Author Name • Genre"
          variant="elevated"
          size="large"
          style={styles.bookCard}
        >
          <View style={styles.bookInfo}>
            <Text style={styles.bookIcon}>📚</Text>
            <Text style={styles.bookDescription}>
              This book contains interactive AR content and personalized learning experiences.
            </Text>
          </View>
        </Card>

        <Card
          title="AR Features Available"
          subtitle="Interactive content ready"
          variant="outlined"
          size="medium"
          style={styles.featuresCard}
        >
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• 3D Models and Animations</Text>
            <Text style={styles.featureItem}>• Interactive Elements</Text>
            <Text style={styles.featureItem}>• Personalized Quizzes</Text>
            <Text style={styles.featureItem}>• Progress Tracking</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Start Reading with AR"
            onPress={handleStartReading}
            variant="primary"
            size="large"
            style={styles.startButton}
          />

          <Button
            title="Add to Library"
            onPress={handleAddToLibrary}
            variant="outline"
            size="large"
            style={styles.addButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 60,
    paddingHorizontal: 20,
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
    padding: 20,
  },
  bookCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  bookInfo: {
    alignItems: 'center',
  },
  bookIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  bookDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresCard: {
    marginBottom: 30,
  },
  featuresList: {
    paddingVertical: 8,
  },
  featureItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  actions: {
    gap: 16,
  },
  startButton: {
    marginBottom: 8,
  },
  addButton: {
    marginBottom: 8,
  },
});

export default BookDetails;
