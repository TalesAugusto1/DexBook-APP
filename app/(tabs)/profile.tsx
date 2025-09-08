/**
 * Profile Tab Screen for AR Book Explorer
 * 
 * User profile dashboard using expo-router navigation with real user data.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthGuard, Button, Card } from '../../src/components/foundation';
import { useAuth } from '../../src/stores/auth/AuthContext';
import { useGamification } from '../../src/stores/gamification';
import { useEnhancedUser } from '../../src/stores/user/EnhancedUserContext';

export default function ProfileDashboard() {
  const router = useRouter();
  const { state: authState, logout } = useAuth();
  const { state: userState } = useEnhancedUser();
  const { state: gamificationState } = useGamification();

  const handleEditProfile = () => {
    router.push('/auth/profile-setup');
  };

  const handleViewAchievements = () => {
    router.push('/gamification/achievement');
  };

  const handleViewProgress = () => {
    router.push('/gamification/progress');
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/welcome');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading state for user data (AuthGuard handles auth loading)
  if (userState.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  // Show error state if no user data
  if (!authState.user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load profile data</Text>
        <Button
          title="Try Again"
          onPress={() => router.replace('/welcome')}
          variant="primary"
          size="medium"
        />
      </View>
    );
  }

  const user = authState.user;
  const userStats = userState.userStatistics;
  const learningProfile = userState.learningProfile;
  const recentAchievements = gamificationState.unlockedAchievements.slice(0, 3);

  return (
    <AuthGuard>
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
            <Text style={styles.infoItem}>Name: {user.name || 'Not set'}</Text>
            <Text style={styles.infoItem}>Email: {user.email}</Text>
            <Text style={styles.infoItem}>Grade: {user.grade || 'Not set'}</Text>
            <Text style={styles.infoItem}>
              Reading Level: {learningProfile?.readingLevel || 'Not assessed'}
            </Text>
            <Text style={styles.infoItem}>
              Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
            </Text>
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
            <Text style={styles.statItem}>
              📚 Books Read: {userStats?.totalBooksRead || 0}
            </Text>
            <Text style={styles.statItem}>
              🎯 Quizzes Completed: {userStats?.totalQuizzesTaken || 0}
            </Text>
            <Text style={styles.statItem}>
              ⭐ Current Streak: {userStats?.currentReadingStreak || 0} days
            </Text>
            <Text style={styles.statItem}>
              🏆 Achievements: {gamificationState.unlockedAchievements.length}
            </Text>
            <Text style={styles.statItem}>
              🎮 Total Points: {gamificationState.totalPointsEarned || 0}
            </Text>
            <Text style={styles.statItem}>
              📖 Reading Time: {userStats?.totalReadingTime || 0} minutes
            </Text>
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
            {recentAchievements.length > 0 ? (
              recentAchievements.map((achievement) => (
                <Text key={achievement.id} style={styles.achievementItem}>
                  {achievement.badgeIcon} {achievement.title}
                </Text>
              ))
            ) : (
              <Text style={styles.noAchievementsText}>
                No achievements yet. Keep learning to unlock your first achievement!
              </Text>
            )}
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
          <Button
            title="🚪 Sign Out"
            onPress={handleLogout}
            variant="outline"
            size="medium"
            style={styles.logoutButton}
          />
        </View>
      </View>
    </ScrollView>
    </AuthGuard>
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
  logoutButton: {
    width: '100%',
    marginTop: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  noAchievementsText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 8,
  },
});
