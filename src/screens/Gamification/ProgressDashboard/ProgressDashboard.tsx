/**
 * ProgressDashboard Screen Component for AR Book Explorer
 * 
 * This screen displays detailed learning progress and analytics.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const ProgressDashboard: React.FC = () => {
  const navigation = useNavigation();

  const handleBackToProfile = () => {
    navigation.navigate('ProfileDashboard' as never);
  };

  const handleViewAchievements = () => {
    navigation.navigate('Achievement' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress Dashboard</Text>
        <Text style={styles.subtitle}>
          Track your learning journey
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Learning Statistics"
          subtitle="This month's progress"
          variant="elevated"
          size="medium"
          style={styles.statsCard}
        >
          <View style={styles.statsList}>
            <Text style={styles.statItem}>📚 Books Read: 12</Text>
            <Text style={styles.statItem}>🎯 Quizzes Completed: 45</Text>
            <Text style={styles.statItem}>🏆 Achievements: 8</Text>
            <Text style={styles.statItem}>⭐ Current Streak: 7 days</Text>
            <Text style={styles.statItem}>⏱️ Total Study Time: 24 hours</Text>
          </View>
        </Card>

        <Card
          title="Learning Goals"
          subtitle="Your targets for this month"
          variant="outlined"
          size="medium"
          style={styles.goalsCard}
        >
          <View style={styles.goalsList}>
            <Text style={styles.goalItem}>📖 Read 15 books (80% complete)</Text>
            <Text style={styles.goalItem}>🎯 Complete 50 quizzes (90% complete)</Text>
            <Text style={styles.goalItem}>🏆 Earn 10 achievements (80% complete)</Text>
            <Text style={styles.goalItem}>⭐ Maintain 10-day streak (70% complete)</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Back to Profile"
            onPress={handleBackToProfile}
            variant="primary"
            size="large"
            style={styles.backButton}
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
  goalsCard: {
    marginBottom: 30,
  },
  goalsList: {
    paddingVertical: 8,
  },
  goalItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  actions: {
    gap: 16,
  },
  backButton: {
    marginBottom: 8,
  },
  achievementsButton: {
    marginBottom: 8,
  },
});

export default ProgressDashboard;
