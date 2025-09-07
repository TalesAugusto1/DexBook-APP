/**
 * Achievement Screen Component for AR Book Explorer
 * 
 * This screen displays user achievements and rewards.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const Achievement: React.FC = () => {
  const navigation = useNavigation();

  const handleRewardsStore = () => {
    navigation.navigate('RewardsStore' as never);
  };

  const handleProgressDashboard = () => {
    navigation.navigate('ProgressDashboard' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.subtitle}>
          Celebrate your learning milestones
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Recent Achievements"
          subtitle="Your latest accomplishments"
          variant="elevated"
          size="medium"
          style={styles.achievementsCard}
        >
          <View style={styles.achievementsList}>
            <Text style={styles.achievementItem}>🏆 First Book Completed</Text>
            <Text style={styles.achievementItem}>📚 10 Books Read</Text>
            <Text style={styles.achievementItem}>🎯 Quiz Master</Text>
            <Text style={styles.achievementItem}>⭐ 7-Day Streak</Text>
          </View>
        </Card>

        <Card
          title="Available Rewards"
          subtitle="Unlock new content"
          variant="outlined"
          size="medium"
          style={styles.rewardsCard}
        >
          <View style={styles.rewardsList}>
            <Text style={styles.rewardItem}>🎨 New AR Themes</Text>
            <Text style={styles.rewardItem}>🎵 Sound Effects</Text>
            <Text style={styles.rewardItem}>📖 Bonus Books</Text>
            <Text style={styles.rewardItem}>🎮 Mini Games</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Visit Rewards Store"
            onPress={handleRewardsStore}
            variant="primary"
            size="large"
            style={styles.rewardsButton}
          />

          <Button
            title="View Progress"
            onPress={handleProgressDashboard}
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
  achievementsCard: {
    marginBottom: 20,
  },
  achievementsList: {
    paddingVertical: 8,
  },
  achievementItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  rewardsCard: {
    marginBottom: 30,
  },
  rewardsList: {
    paddingVertical: 8,
  },
  rewardItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  actions: {
    gap: 16,
  },
  rewardsButton: {
    marginBottom: 8,
  },
  progressButton: {
    marginBottom: 8,
  },
});

export default Achievement;
