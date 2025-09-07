/**
 * BookProgress Screen Component for AR Book Explorer
 * 
 * This screen displays reading progress and learning analytics.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const BookProgress: React.FC = () => {
  const navigation = useNavigation();

  const handleContinueReading = () => {
    navigation.navigate('ARCameraView' as never);
  };

  const handleStartQuiz = () => {
    // TODO: Implement quiz start
  };

  const handleViewAchievements = () => {
    navigation.navigate('Achievement' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reading Progress</Text>
        <Text style={styles.subtitle}>
          Track your learning journey
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Current Book"
          subtitle="The Great Adventure"
          variant="elevated"
          size="medium"
          style={styles.bookCard}
        >
          <View style={styles.bookInfo}>
            <Text style={styles.bookIcon}>📚</Text>
            <Text style={styles.progressText}>Progress: 75%</Text>
            <Text style={styles.timeText}>Time spent: 2 hours 30 minutes</Text>
          </View>
        </Card>

        <Card
          title="Learning Statistics"
          subtitle="Your performance this session"
          variant="outlined"
          size="medium"
          style={styles.statsCard}
        >
          <View style={styles.statsList}>
            <Text style={styles.statItem}>📖 Pages read: 45/60</Text>
            <Text style={styles.statItem}>🎯 AR interactions: 23</Text>
            <Text style={styles.statItem}>🧠 Concepts learned: 12</Text>
            <Text style={styles.statItem}>⭐ Engagement score: 92%</Text>
          </View>
        </Card>

        <Card
          title="Next Steps"
          subtitle="Continue your learning"
          variant="outlined"
          size="medium"
          style={styles.nextStepsCard}
        >
          <View style={styles.nextStepsList}>
            <Text style={styles.nextStepItem}>📖 Complete remaining chapters</Text>
            <Text style={styles.nextStepItem}>🎯 Take comprehension quiz</Text>
            <Text style={styles.nextStepItem}>🏆 Unlock new achievements</Text>
            <Text style={styles.nextStepItem}>📚 Explore related books</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Continue Reading"
            onPress={handleContinueReading}
            variant="primary"
            size="large"
            style={styles.continueButton}
          />

          <Button
            title="Start Quiz"
            onPress={handleStartQuiz}
            variant="outline"
            size="large"
            style={styles.quizButton}
          />

          <Button
            title="View Achievements"
            onPress={handleViewAchievements}
            variant="outline"
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
  progressText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    color: '#64748b',
  },
  statsCard: {
    marginBottom: 20,
  },
  statsList: {
    paddingVertical: 8,
  },
  statItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  nextStepsCard: {
    marginBottom: 30,
  },
  nextStepsList: {
    paddingVertical: 8,
  },
  nextStepItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  actions: {
    gap: 16,
  },
  continueButton: {
    marginBottom: 8,
  },
  quizButton: {
    marginBottom: 8,
  },
  achievementsButton: {
    marginBottom: 8,
  },
});

export default BookProgress;
