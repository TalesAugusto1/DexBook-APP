/**
 * HomeScreen Component for AR Book Explorer
 * 
 * This screen serves as the main dashboard for book discovery and learning.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleScanBook = () => {
    navigation.navigate('BookScanner' as never);
  };

  const handleViewLibrary = () => {
    // TODO: Implement library view
  };

  const handleStartQuiz = () => {
    navigation.navigate('AdaptiveQuiz' as never);
  };

  const handleViewAchievements = () => {
    navigation.navigate('Achievement' as never);
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
              title="Scan New Book"
              onPress={handleScanBook}
              variant="primary"
              size="large"
              style={styles.actionButton}
            />

            <Button
              title="View My Library"
              onPress={handleViewLibrary}
              variant="outline"
              size="large"
              style={styles.actionButton}
            />

            <Button
              title="Start Quiz"
              onPress={handleStartQuiz}
              variant="outline"
              size="large"
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
          subtitle="Based on your interests"
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
            title="View All Achievements"
            onPress={handleViewAchievements}
            variant="secondary"
            size="large"
            style={styles.achievementsButton}
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
  actionsCard: {
    marginBottom: 20,
  },
  actionsList: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  activityCard: {
    marginBottom: 20,
  },
  activityList: {
    paddingVertical: 8,
  },
  activityItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  recommendationsCard: {
    marginBottom: 30,
  },
  recommendationsList: {
    paddingVertical: 8,
  },
  recommendationItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  actions: {
    gap: 16,
  },
  achievementsButton: {
    marginBottom: 8,
  },
});

export default HomeScreen;