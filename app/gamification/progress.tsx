/**
 * Progress Dashboard Screen for AR Book Explorer
 * 
 * Detailed progress tracking using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function ProgressDashboard() {
  const router = useRouter();

  const handleBackToProfile = () => {
    router.back();
  };

  const handleViewAchievements = () => {
    router.push('/gamification/achievement');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress Dashboard</Text>
        <Text style={styles.subtitle}>
          Detailed view of your learning journey
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="📊 Overall Statistics"
          subtitle="Your learning metrics"
          variant="elevated"
          size="large"
          style={styles.statsCard}
        >
          <View style={styles.stats}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statLabel}>Books Read</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>42</Text>
                <Text style={styles.statLabel}>Quizzes</Text>
              </View>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1,250</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>7</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card
          title="📈 Learning Trends"
          subtitle="Your progress over time"
          variant="outlined"
          size="medium"
          style={styles.trendsCard}
        >
          <View style={styles.trends}>
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>This Week</Text>
              <View style={styles.trendBar}>
                <View style={[styles.trendFill, { width: '80%' }]} />
              </View>
              <Text style={styles.trendValue}>4 hours reading</Text>
            </View>
            
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>This Month</Text>
              <View style={styles.trendBar}>
                <View style={[styles.trendFill, { width: '65%' }]} />
              </View>
              <Text style={styles.trendValue}>18 hours reading</Text>
            </View>
            
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>Quiz Accuracy</Text>
              <View style={styles.trendBar}>
                <View style={[styles.trendFill, { width: '92%' }]} />
              </View>
              <Text style={styles.trendValue}>92% average</Text>
            </View>
          </View>
        </Card>

        <Card
          title="🎯 Goals Progress"
          subtitle="Track your learning objectives"
          variant="outlined"
          size="medium"
          style={styles.goalsCard}
        >
          <View style={styles.goals}>
            <View style={styles.goalItem}>
              <Text style={styles.goalTitle}>📚 Read 20 Books This Year</Text>
              <View style={styles.goalProgress}>
                <View style={styles.goalBar}>
                  <View style={[styles.goalFill, { width: '75%' }]} />
                </View>
                <Text style={styles.goalText}>15/20 books</Text>
              </View>
            </View>
            
            <View style={styles.goalItem}>
              <Text style={styles.goalTitle}>🎯 Maintain 90% Quiz Average</Text>
              <View style={styles.goalProgress}>
                <View style={styles.goalBar}>
                  <View style={[styles.goalFill, { width: '92%' }]} />
                </View>
                <Text style={styles.goalText}>92% current</Text>
              </View>
            </View>
            
            <View style={styles.goalItem}>
              <Text style={styles.goalTitle}>🔥 30-Day Reading Streak</Text>
              <View style={styles.goalProgress}>
                <View style={styles.goalBar}>
                  <View style={[styles.goalFill, { width: '23%' }]} />
                </View>
                <Text style={styles.goalText}>7/30 days</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card
          title="🏆 Recent Achievements"
          subtitle="Your latest accomplishments"
          variant="outlined"
          size="medium"
          style={styles.achievementsCard}
        >
          <View style={styles.achievements}>
            <Text style={styles.achievementItem}>🥇 Book Explorer - 2 days ago</Text>
            <Text style={styles.achievementItem}>🧠 Quiz Master - 1 week ago</Text>
            <Text style={styles.achievementItem}>🔥 7-Day Streak - Today</Text>
          </View>
          
          <Button
            title="View All Achievements"
            onPress={handleViewAchievements}
            variant="outline"
            size="medium"
            style={styles.achievementButton}
          />
        </Card>

        <View style={styles.actions}>
          <Button
            title="← Back to Profile"
            onPress={handleBackToProfile}
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
  statsCard: {
    marginBottom: 8,
  },
  stats: {
    gap: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  trendsCard: {
    marginBottom: 8,
  },
  trends: {
    gap: 16,
  },
  trendItem: {
    gap: 8,
  },
  trendLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  trendBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  trendFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  trendValue: {
    fontSize: 12,
    color: '#64748b',
  },
  goalsCard: {
    marginBottom: 8,
  },
  goals: {
    gap: 16,
  },
  goalItem: {
    gap: 8,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  goalProgress: {
    gap: 6,
  },
  goalBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  goalFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
  goalText: {
    fontSize: 12,
    color: '#64748b',
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
    paddingVertical: 2,
  },
  achievementButton: {
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
