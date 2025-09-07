/**
 * AR Book Progress Screen for AR Book Explorer
 * 
 * Reading progress tracking using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function BookProgress() {
  const router = useRouter();

  const handleContinueReading = () => {
    router.push('/ar/camera');
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
        <Text style={styles.title}>Reading Progress</Text>
        <Text style={styles.subtitle}>Track your learning journey</Text>
      </View>

      <View style={styles.content}>
        <Card
          title="📊 Current Progress"
          subtitle="The Great Adventure"
          variant="elevated"
          size="large"
          style={styles.progressCard}
        >
          <View style={styles.progressInfo}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65% Complete (117/180 pages)</Text>
            
            <View style={styles.stats}>
              <Text style={styles.statItem}>📖 Pages Read: 117</Text>
              <Text style={styles.statItem}>⏱️ Time Spent: 2h 45m</Text>
              <Text style={styles.statItem}>🎯 Quiz Score: 92%</Text>
              <Text style={styles.statItem}>⭐ AR Interactions: 15</Text>
            </View>
          </View>
          
          <Button
            title="Continue Reading"
            onPress={handleContinueReading}
            variant="primary"
            size="large"
            style={styles.continueButton}
          />
        </Card>

        <Card
          title="🏆 Achievements Unlocked"
          subtitle="Your accomplishments"
          variant="outlined"
          size="medium"
          style={styles.achievementsCard}
        >
          <View style={styles.achievements}>
            <Text style={styles.achievementItem}>🥇 Fast Reader - Read 50 pages in one session</Text>
            <Text style={styles.achievementItem}>🎯 Quiz Master - 90%+ average score</Text>
            <Text style={styles.achievementItem}>🔍 Explorer - Interacted with 10 AR elements</Text>
          </View>
          
          <Button
            title="View All Achievements"
            onPress={handleViewAchievements}
            variant="outline"
            size="medium"
            style={styles.achievementButton}
          />
        </Card>

        <Card
          title="🧠 Learning Summary"
          subtitle="What you've learned"
          variant="outlined"
          size="medium"
          style={styles.learningCard}
        >
          <View style={styles.learning}>
            <Text style={styles.learningItem}>📚 New vocabulary words: 25</Text>
            <Text style={styles.learningItem}>🎯 Comprehension quizzes: 8 completed</Text>
            <Text style={styles.learningItem}>💡 Key concepts mastered: 12</Text>
            <Text style={styles.learningItem}>🔄 Review sessions: 3</Text>
          </View>
          
          <Button
            title="Take Quiz"
            onPress={handleStartQuiz}
            variant="secondary"
            size="medium"
            style={styles.quizButton}
          />
        </Card>

        <View style={styles.actions}>
          <Button
            title="← Back"
            onPress={() => router.back()}
            variant="outline"
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
  progressCard: {
    marginBottom: 8,
  },
  progressInfo: {
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  stats: {
    gap: 8,
  },
  statItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  continueButton: {
    width: '100%',
  },
  achievementsCard: {
    marginBottom: 8,
  },
  achievements: {
    gap: 8,
    marginBottom: 16,
  },
  achievementItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 4,
  },
  achievementButton: {
    width: '100%',
  },
  learningCard: {
    marginBottom: 8,
  },
  learning: {
    gap: 8,
    marginBottom: 16,
  },
  learningItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  quizButton: {
    width: '100%',
  },
  actions: {
    alignItems: 'center',
    marginTop: 8,
  },
  backButton: {
    width: '60%',
  },
});
