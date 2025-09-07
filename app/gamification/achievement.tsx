/**
 * Achievement Screen for AR Book Explorer
 * 
 * Achievement system using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function Achievement() {
  const router = useRouter();

  const handleRewardsStore = () => {
    router.push('/gamification/rewards');
  };

  const handleBackToProfile = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Achievements</Text>
        <Text style={styles.subtitle}>
          Your learning accomplishments and milestones
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="🎯 Progress Overview"
          subtitle="Your achievement stats"
          variant="elevated"
          size="medium"
          style={styles.progressCard}
        >
          <View style={styles.statsList}>
            <Text style={styles.statItem}>🏅 Total Achievements: 8/15</Text>
            <Text style={styles.statItem}>⭐ Total Points: 1,250</Text>
            <Text style={styles.statItem}>🎮 Current Level: Explorer</Text>
            <Text style={styles.statItem}>🔥 Current Streak: 7 days</Text>
          </View>
        </Card>

        <Card
          title="✅ Completed Achievements"
          subtitle="What you've accomplished"
          variant="outlined"
          size="medium"
          style={styles.achievementsCard}
        >
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🥇</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Book Explorer</Text>
                <Text style={styles.achievementDescription}>Read 10 different books</Text>
                <Text style={styles.achievementPoints}>+150 points</Text>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🧠</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Quiz Master</Text>
                <Text style={styles.achievementDescription}>90% average quiz score</Text>
                <Text style={styles.achievementPoints}>+200 points</Text>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🔥</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>7-Day Streak</Text>
                <Text style={styles.achievementDescription}>Read for 7 consecutive days</Text>
                <Text style={styles.achievementPoints}>+100 points</Text>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>📱</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>AR Pioneer</Text>
                <Text style={styles.achievementDescription}>First AR experience completed</Text>
                <Text style={styles.achievementPoints}>+75 points</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card
          title="🎯 Next Goals"
          subtitle="Achievements to unlock"
          variant="outlined"
          size="medium"
          style={styles.goalsCard}
        >
          <View style={styles.goalsList}>
            <View style={styles.goalItem}>
              <Text style={styles.goalIcon}>🏆</Text>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Chapter Champion</Text>
                <Text style={styles.goalDescription}>Complete 50 chapters</Text>
                <Text style={styles.goalProgress}>Progress: 32/50</Text>
              </View>
            </View>

            <View style={styles.goalItem}>
              <Text style={styles.goalIcon}>🎨</Text>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>AR Artist</Text>
                <Text style={styles.goalDescription}>Create 5 AR bookmarks</Text>
                <Text style={styles.goalProgress}>Progress: 2/5</Text>
              </View>
            </View>

            <View style={styles.goalItem}>
              <Text style={styles.goalIcon}>👥</Text>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Social Reader</Text>
                <Text style={styles.goalDescription}>Share 10 book reviews</Text>
                <Text style={styles.goalProgress}>Progress: 4/10</Text>
              </View>
            </View>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="🛍️ Visit Rewards Store"
            onPress={handleRewardsStore}
            variant="primary"
            size="large"
            style={styles.rewardsButton}
          />
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
  progressCard: {
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
    gap: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  achievementPoints: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  goalsCard: {
    marginBottom: 8,
  },
  goalsList: {
    gap: 16,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fefefe',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  goalIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  goalDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  goalProgress: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
  actions: {
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  rewardsButton: {
    width: '100%',
  },
  backButton: {
    width: '60%',
  },
});
