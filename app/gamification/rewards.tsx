/**
 * Rewards Store Screen for AR Book Explorer
 * 
 * Rewards and achievements store using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function RewardsStore() {
  const router = useRouter();

  const handleRedeemReward = (reward: string) => {
    // TODO: Implement reward redemption
  };

  const handleBackToAchievements = () => {
    router.push('/gamification/achievement');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛍️ Rewards Store</Text>
        <Text style={styles.subtitle}>
          Redeem your points for exciting rewards
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="💰 Your Balance"
          subtitle="Available points to spend"
          variant="elevated"
          size="medium"
          style={styles.balanceCard}
        >
          <View style={styles.balance}>
            <Text style={styles.balanceNumber}>1,250</Text>
            <Text style={styles.balanceLabel}>Points Available</Text>
          </View>
        </Card>

        <Card
          title="🎁 Available Rewards"
          subtitle="Redeem with your points"
          variant="outlined"
          size="medium"
          style={styles.rewardsCard}
        >
          <View style={styles.rewardsList}>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>🎨</Text>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>Custom Avatar</Text>
                <Text style={styles.rewardDesc}>Personalize your profile</Text>
                <Text style={styles.rewardCost}>200 points</Text>
              </View>
              <Button
                title="Redeem"
                onPress={() => handleRedeemReward('avatar')}
                variant="primary"
                size="small"
              />
            </View>

            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>🎭</Text>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>AR Character Skin</Text>
                <Text style={styles.rewardDesc}>New look for AR characters</Text>
                <Text style={styles.rewardCost}>500 points</Text>
              </View>
              <Button
                title="Redeem"
                onPress={() => handleRedeemReward('skin')}
                variant="primary"
                size="small"
              />
            </View>

            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>📚</Text>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>Premium Book Access</Text>
                <Text style={styles.rewardDesc}>Unlock exclusive content</Text>
                <Text style={styles.rewardCost}>800 points</Text>
              </View>
              <Button
                title="Redeem"
                onPress={() => handleRedeemReward('book')}
                variant="primary"
                size="small"
              />
            </View>

            <View style={styles.rewardItem}>
              <Text style={styles.rewardIcon}>🎯</Text>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>Quiz Boost</Text>
                <Text style={styles.rewardDesc}>Extra hints for quizzes</Text>
                <Text style={styles.rewardCost}>300 points</Text>
              </View>
              <Button
                title="Redeem"
                onPress={() => handleRedeemReward('boost')}
                variant="primary"
                size="small"
              />
            </View>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="← Back to Achievements"
            onPress={handleBackToAchievements}
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
  balanceCard: {
    marginBottom: 8,
  },
  balance: {
    alignItems: 'center',
    gap: 8,
  },
  balanceNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#059669',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#374151',
  },
  rewardsCard: {
    marginBottom: 8,
  },
  rewardsList: {
    gap: 16,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  rewardIcon: {
    fontSize: 24,
  },
  rewardInfo: {
    flex: 1,
    gap: 2,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  rewardDesc: {
    fontSize: 14,
    color: '#64748b',
  },
  rewardCost: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  actions: {
    alignItems: 'center',
    marginTop: 8,
  },
  backButton: {
    width: '70%',
  },
});
