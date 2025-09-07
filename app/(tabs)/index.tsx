/**
 * Home Tab Screen for AR Book Explorer
 * 
 * Main home screen using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function HomeScreen() {
  const router = useRouter();

  const handleScanBook = () => {
    router.push('/books/scanner');
  };

  const handleStartQuiz = () => {
    router.push('/learning/quiz');
  };

  const handleViewAchievements = () => {
    router.push('/gamification/achievement');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Ready to discover your next learning adventure?
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Quick Actions"
          subtitle="Start learning right away"
          variant="elevated"
          size="medium"
          style={styles.actionsCard}
        >
          <View style={styles.actionsList}>
            <Button
              title="📱 Scan a Book"
              onPress={handleScanBook}
              variant="primary"
              size="medium"
              style={styles.actionButton}
            />
            <Button
              title="🧠 Take a Quiz"
              onPress={handleStartQuiz}
              variant="secondary"
              size="medium"
              style={styles.actionButton}
            />
          </View>
        </Card>

        <Card
          title="Recent Activity"
          subtitle="Your learning progress"
          variant="outlined"
          size="medium"
          style={styles.activityCard}
        >
          <View style={styles.activityList}>
            <Text style={styles.activityItem}>📚 Last read: &quot;The Great Adventure&quot;</Text>
            <Text style={styles.activityItem}>🎯 Quiz score: 95%</Text>
            <Text style={styles.activityItem}>🏆 New achievement: &quot;Book Explorer&quot;</Text>
            <Text style={styles.activityItem}>⭐ Current streak: 7 days</Text>
          </View>
        </Card>

        <Card
          title="Recommended Books"
          subtitle="Discover new content"
          variant="outlined"
          size="medium"
          style={styles.recommendationsCard}
        >
          <View style={styles.recommendationsList}>
            <Text style={styles.recommendationItem}>📖 &quot;Space Exploration&quot;</Text>
            <Text style={styles.recommendationItem}>📖 &quot;Ocean Mysteries&quot;</Text>
            <Text style={styles.recommendationItem}>📖 &quot;Ancient History&quot;</Text>
            <Text style={styles.recommendationItem}>📖 &quot;Future Technology&quot;</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="🏆 View Achievements"
            onPress={handleViewAchievements}
            variant="outline"
            size="large"
            style={styles.achievementButton}
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
  actionsCard: {
    marginBottom: 8,
  },
  actionsList: {
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  activityCard: {
    marginBottom: 8,
  },
  activityList: {
    gap: 8,
  },
  activityItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 4,
  },
  recommendationsCard: {
    marginBottom: 8,
  },
  recommendationsList: {
    gap: 8,
  },
  recommendationItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 4,
  },
  actions: {
    alignItems: 'center',
    marginTop: 8,
  },
  achievementButton: {
    width: '100%',
  },
});
