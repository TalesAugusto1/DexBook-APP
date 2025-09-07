/**
 * RewardsStore Screen Component for AR Book Explorer
 * 
 * This screen displays available rewards and allows users to redeem them.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const RewardsStore: React.FC = () => {
  const navigation = useNavigation();

  const handleRedeemReward = (reward: string) => {
    // TODO: Implement reward redemption
    console.log(`Redeeming reward: ${reward}`);
  };

  const handleBackToAchievements = () => {
    navigation.navigate('Achievement' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rewards Store</Text>
        <Text style={styles.subtitle}>
          Redeem your points for amazing rewards
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Available Rewards"
          subtitle="Use your points to unlock content"
          variant="elevated"
          size="medium"
          style={styles.rewardsCard}
        >
          <View style={styles.rewardsList}>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>🎨</Text>
              <Text style={styles.rewardName}>AR Themes</Text>
              <Text style={styles.rewardCost}>100 points</Text>
            </View>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>🎵</Text>
              <Text style={styles.rewardName}>Sound Effects</Text>
              <Text style={styles.rewardCost}>50 points</Text>
            </View>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>📖</Text>
              <Text style={styles.rewardName}>Bonus Books</Text>
              <Text style={styles.rewardCost}>200 points</Text>
            </View>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>🎮</Text>
              <Text style={styles.rewardName}>Mini Games</Text>
              <Text style={styles.rewardCost}>150 points</Text>
            </View>
          </View>
        </Card>

        <Card
          title="Your Points"
          subtitle="Current balance"
          variant="outlined"
          size="medium"
          style={styles.pointsCard}
        >
          <View style={styles.pointsInfo}>
            <Text style={styles.pointsIcon}>⭐</Text>
            <Text style={styles.pointsAmount}>1,250 points</Text>
            <Text style={styles.pointsDescription}>Keep learning to earn more!</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Back to Achievements"
            onPress={handleBackToAchievements}
            variant="primary"
            size="large"
            style={styles.backButton}
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
  rewardsCard: {
    marginBottom: 20,
  },
  rewardsList: {
    paddingVertical: 8,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  rewardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  rewardName: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  rewardCost: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  pointsCard: {
    marginBottom: 30,
    alignItems: 'center',
  },
  pointsInfo: {
    alignItems: 'center',
  },
  pointsIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  pointsAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  pointsDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  actions: {
    gap: 16,
  },
  backButton: {
    marginBottom: 8,
  },
});

export default RewardsStore;
