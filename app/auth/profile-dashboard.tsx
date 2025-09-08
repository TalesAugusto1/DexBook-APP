/**
 * Profile Dashboard Screen for AR Book Explorer
 * 
 * Screen 2.3: Profile Dashboard - User's learning overview and progress
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 * 
 * Elements from screens.md:
 * - Profile picture and name
 * - Reading streak counter
 * - Total books read
 * - Achievement badges
 * - Recent activity feed
 * - Settings and preferences access
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';
import { useAuth } from '../../src/stores/auth/AuthContext';
import { useEnhancedUser } from '../../src/stores/user/EnhancedUserContext';

export default function ProfileDashboard() {
  const { state: authState, logout } = useAuth();
  const { state: userState } = useEnhancedUser();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateToSettings = () => {
    router.push('/settings/settings');
  };

  const navigateToAchievements = () => {
    router.push('/gamification/achievement');
  };

  const navigateToHome = () => {
    router.push('/(tabs)');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Dashboard</Text>
        <Text style={styles.subtitle}>Your Learning Journey</Text>
      </View>

      <View style={styles.content}>
        {/* Profile Information */}
        <Card
          title="Profile Information"
          variant="elevated"
          size="medium"
          style={styles.profileCard}
        >
          <View style={styles.profileInfo}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: authState.user?.profilePicture || 'https://via.placeholder.com/80' }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.userName}>{authState.user?.name || 'User'}</Text>
              <Text style={styles.userEmail}>{authState.user?.email}</Text>
              <Text style={styles.userGrade}>Grade: {authState.user?.grade || 'Not specified'}</Text>
            </View>
          </View>
        </Card>

        {/* Learning Statistics */}
        <Card
          title="Learning Statistics"
          variant="elevated"
          size="medium"
          style={styles.statsCard}
        >
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userState.statistics?.booksRead || 0}</Text>
              <Text style={styles.statLabel}>Books Read</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userState.statistics?.readingStreak || 0}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userState.statistics?.totalReadingTime || 0}</Text>
              <Text style={styles.statLabel}>Hours Read</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userState.statistics?.averageScore || 0}%</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
          </View>
        </Card>

        {/* Recent Achievements */}
        <Card
          title="Recent Achievements"
          variant="elevated"
          size="medium"
          style={styles.achievementsCard}
        >
          <View style={styles.achievementsList}>
            {userState.recentAchievements?.length > 0 ? (
              userState.recentAchievements.slice(0, 3).map((achievement, index) => (
                <View key={index} style={styles.achievementItem}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noAchievements}>No achievements yet. Start reading to earn badges!</Text>
            )}
          </View>
          <Button
            title="View All Achievements"
            onPress={navigateToAchievements}
            variant="outline"
            size="medium"
            style={styles.viewAchievementsButton}
          />
        </Card>

        {/* Learning Profile */}
        <Card
          title="Learning Profile"
          variant="elevated"
          size="medium"
          style={styles.profileCard}
        >
          <View style={styles.learningProfile}>
            <Text style={styles.profileLabel}>Learning Style:</Text>
            <Text style={styles.profileValue}>
              {userState.learningProfile?.primaryStyle || 'Not assessed'}
            </Text>
            
            <Text style={styles.profileLabel}>Reading Level:</Text>
            <Text style={styles.profileValue}>
              {userState.learningProfile?.readingLevel || 'Not assessed'}
            </Text>
            
            <Text style={styles.profileLabel}>Interests:</Text>
            <Text style={styles.profileValue}>
              {userState.learningProfile?.interests?.join(', ') || 'Not specified'}
            </Text>
          </View>
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Start Learning"
            onPress={navigateToHome}
            variant="primary"
            size="large"
            style={styles.startButton}
          />
          
          <Button
            title="Settings"
            onPress={navigateToSettings}
            variant="outline"
            size="large"
            style={styles.settingsButton}
          />
          
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="secondary"
            size="large"
            style={styles.logoutButton}
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
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  userGrade: {
    fontSize: 14,
    color: '#64748b',
  },
  statsCard: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  achievementsCard: {
    marginBottom: 20,
  },
  achievementsList: {
    marginBottom: 16,
  },
  achievementItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#64748b',
  },
  noAchievements: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  viewAchievementsButton: {
    marginTop: 8,
  },
  learningProfile: {
    gap: 8,
  },
  profileLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  profileValue: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  actions: {
    gap: 16,
    marginTop: 20,
  },
  startButton: {
    marginBottom: 8,
  },
  settingsButton: {
    marginBottom: 8,
  },
  logoutButton: {
    marginBottom: 8,
  },
});
