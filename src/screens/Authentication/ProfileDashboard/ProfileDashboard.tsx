/**
 * ProfileDashboard Screen Component for AR Book Explorer
 * 
 * This screen displays user profile and learning progress.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const ProfileDashboard: React.FC = () => {
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('ProfileSetup' as never);
  };

  const handleViewAchievements = () => {
    navigation.navigate('Achievement' as never);
  };

  const handleViewProgress = () => {
    navigation.navigate('ProgressDashboard' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>
          Track your learning journey
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="User Profile"
          subtitle="Student • Level 5"
          variant="elevated"
          size="medium"
          style={styles.profileCard}
        >
          <View style={styles.profileInfo}>
            <Text style={styles.profileIcon}>👤</Text>
            <Text style={styles.profileName}>Student Name</Text>
            <Text style={styles.profileEmail}>student@example.com</Text>
          </View>
        </Card>

        <Card
          title="Learning Statistics"
          subtitle="Your progress this month"
          variant="outlined"
          size="medium"
          style={styles.statsCard}
        >
          <View style={styles.statsList}>
            <Text style={styles.statItem}>📚 Books Read: 12</Text>
            <Text style={styles.statItem}>🎯 Quizzes Completed: 45</Text>
            <Text style={styles.statItem}>🏆 Achievements: 8</Text>
            <Text style={styles.statItem}>⭐ Current Streak: 7 days</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Edit Profile"
            onPress={handleEditProfile}
            variant="primary"
            size="large"
            style={styles.editButton}
          />

          <Button
            title="View Achievements"
            onPress={handleViewAchievements}
            variant="outline"
            size="large"
            style={styles.achievementsButton}
          />

          <Button
            title="View Progress"
            onPress={handleViewProgress}
            variant="outline"
            size="large"
            style={styles.progressButton}
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
  profileCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#64748b',
  },
  statsCard: {
    marginBottom: 30,
  },
  statsList: {
    paddingVertical: 8,
  },
  statItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  actions: {
    gap: 16,
  },
  editButton: {
    marginBottom: 8,
  },
  achievementsButton: {
    marginBottom: 8,
  },
  progressButton: {
    marginBottom: 8,
  },
});

export default ProfileDashboard;
