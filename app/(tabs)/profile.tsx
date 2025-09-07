/**
 * Profile Tab Screen for AR Book Explorer
 * 
 * User profile dashboard using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function ProfileDashboard() {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/auth/profile-setup');
  };

  const handleViewAchievements = () => {
    router.push('/gamification/achievement');
  };

  const handleViewProgress = () => {
    router.push('/gamification/progress');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>
          Track your learning journey and achievements
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="👤 Profile Information"
          subtitle="Your account details"
          variant="elevated"
          size="medium"
          style={styles.profileCard}
        >
          <View style={styles.profileInfo}>
            <Text style={styles.infoItem}>Name: Student User</Text>
            <Text style={styles.infoItem}>Grade: 5th Grade</Text>
            <Text style={styles.infoItem}>Reading Level: Advanced</Text>
            <Text style={styles.infoItem}>Member since: January 2024</Text>
          </View>
          <Button
            title="Edit Profile"
            onPress={handleEditProfile}
            variant="secondary"
            size="medium"
            style={styles.editButton}
          />
        </Card>

        <Card
          title="📊 Learning Statistics"
          subtitle="Your progress overview"
          variant="outlined"
          size="medium"
          style={styles.statsCard}
        >
          <View style={styles.statsList}>
            <Text style={styles.statItem}>📚 Books Read: 15</Text>
            <Text style={styles.statItem}>🎯 Quizzes Completed: 42</Text>
            <Text style={styles.statItem}>⭐ Current Streak: 7 days</Text>
            <Text style={styles.statItem}>🏆 Achievements: 8</Text>
            <Text style={styles.statItem}>🎮 Total Points: 1,250</Text>
          </View>
        </Card>

        <Card
          title="🏆 Recent Achievements"
          subtitle="Your latest accomplishments"
          variant="outlined"
          size="medium"
          style={styles.achievementsCard}
        >
          <View style={styles.achievementsList}>
            <Text style={styles.achievementItem}>🥇 Book Explorer - Read 10 books</Text>
            <Text style={styles.achievementItem}>🧠 Quiz Master - 90% average score</Text>
            <Text style={styles.achievementItem}>🔥 7-Day Streak - Daily reading</Text>
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
            title="📈 Detailed Progress"
            onPress={handleViewProgress}
            variant="primary"
            size="large"
            style={styles.progressButton}
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
  profileCard: {
    marginBottom: 8,
  },
  profileInfo: {
    gap: 8,
    marginBottom: 16,
  },
  infoItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  editButton: {
    width: '100%',
  },
  statsCard: {
    marginBottom: 8,
  },
  statsList: {
    gap: 8,
  },
  statItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 4,
  },
  achievementsCard: {
    marginBottom: 8,
  },
  achievementsList: {
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
  actions: {
    alignItems: 'center',
    marginTop: 8,
  },
  progressButton: {
    width: '100%',
  },
});
