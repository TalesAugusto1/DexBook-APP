/**
 * Gamification Context
 * Following BR-ACHIEVEMENT-001: Achievement triggers
 * Following BR-ACHIEVEMENT-002: Points and rewards system
 * Following BR-PROGRESS-001: Learning progress calculation
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { 
  GamificationState, 
  GamificationAction, 
  GamificationContextProps, 
  Achievement,
  Reward,
  RewardRedemption,
  ProgressMilestone,
  Streak,
  Challenge,
  LeaderboardEntry,
  GamificationAnalytics
} from './types';
import { gamificationReducer, initialGamificationState } from './gamificationReducer';

// Create Gamification Context
const GamificationContext = createContext<GamificationContextProps | undefined>(undefined);

// Gamification Provider Component
export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gamificationReducer, initialGamificationState);

  // Points Functions
  const addPoints = useCallback((amount: number, source: string, sourceId: string, description: string) => {
    dispatch({ 
      type: 'ADD_POINTS', 
      payload: { amount, source, sourceId, description } 
    });
    
    // Check for level-up achievements
    const newLevel = Math.floor(Math.sqrt((state.totalPointsEarned + amount) / 100)) + 1;
    if (newLevel > state.userLevel) {
      // TODO: Trigger level-up achievement
      console.log(`Level up! Now level ${newLevel}`);
    }
  }, [state.totalPointsEarned, state.userLevel]);

  const spendPoints = useCallback(async (amount: number, rewardId: string, description: string): Promise<boolean> => {
    if (state.currentPoints < amount) {
      return false; // Not enough points
    }
    
    try {
      dispatch({ 
        type: 'SPEND_POINTS', 
        payload: { amount, rewardId, description } 
      });
      
      return true;
    } catch (error) {
      console.error('Failed to spend points:', error);
      return false;
    }
  }, [state.currentPoints]);

  const getPointsBalance = useCallback(() => {
    return state.currentPoints;
  }, [state.currentPoints]);

  // Achievement Functions
  const checkAchievements = useCallback(async (userAction: string, value: number): Promise<Achievement[]> => {
    const triggeredAchievements: Achievement[] = [];
    
    // Check all locked achievements
    const lockedAchievements = state.achievements.filter(achievement => !achievement.isUnlocked);
    
    for (const achievement of lockedAchievements) {
      let shouldTrigger = false;
      
      // Check achievement requirements
      for (const requirement of achievement.requirements) {
        if (requirement.metric === userAction) {
          switch (requirement.operator) {
            case 'greater_than':
              shouldTrigger = value > requirement.value;
              break;
            case 'greater_equal':
              shouldTrigger = value >= requirement.value;
              break;
            case 'equals':
              shouldTrigger = value === requirement.value;
              break;
            default:
              break;
          }
          
          if (shouldTrigger) {
            triggeredAchievements.push(achievement);
            await unlockAchievement(achievement.id);
          } else {
            // Update progress
            const progress = Math.min(100, (value / requirement.value) * 100);
            dispatch({
              type: 'UPDATE_ACHIEVEMENT_PROGRESS',
              payload: {
                achievementId: achievement.id,
                progress,
                currentValue: value,
              },
            });
          }
        }
      }
    }
    
    return triggeredAchievements;
  }, [state.achievements]);

  const unlockAchievement = useCallback(async (achievementId: string) => {
    try {
      const achievement = state.achievements.find(a => a.id === achievementId);
      if (!achievement || achievement.isUnlocked) return;
      
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievement });
      
      // Award points for the achievement
      addPoints(achievement.pointsReward, 'achievement', achievement.id, `Achievement unlocked: ${achievement.title}`);
      
      // TODO: Show achievement notification
      if (state.settings.showAchievementNotifications) {
        console.log(`Achievement unlocked: ${achievement.title}`);
      }
      
    } catch (error) {
      console.error('Failed to unlock achievement:', error);
    }
  }, [state.achievements, state.settings.showAchievementNotifications, addPoints]);

  const getAchievementProgress = useCallback((achievementId: string): number => {
    const achievement = state.achievements.find(a => a.id === achievementId);
    return achievement?.progress || 0;
  }, [state.achievements]);

  const getFeaturedAchievements = useCallback((): Achievement[] => {
    return state.featuredAchievements;
  }, [state.featuredAchievements]);

  // Reward Functions
  const getAvailableRewards = useCallback(async (): Promise<Reward[]> => {
    try {
      dispatch({ type: 'SET_REWARDS_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock rewards data
      const mockRewards: Reward[] = [
        {
          id: 'reward_1',
          title: 'Digital Bookmark Set',
          description: 'Beautiful digital bookmarks for your reading collection',
          category: 'digital',
          type: 'customization',
          pointsCost: 100,
          isAvailable: true,
          digitalContent: {
            type: 'theme',
            unlockCode: 'BOOKMARK_SET_1',
          },
          createdAt: new Date(),
          popularity: 85,
          userRating: 4.5,
        },
        {
          id: 'reward_2',
          title: 'Physical Book',
          description: 'Choose any book from our curated collection',
          category: 'physical',
          type: 'book',
          pointsCost: 500,
          isAvailable: true,
          physicalItem: {
            name: 'Curated Book Collection',
            description: 'High-quality books delivered to your door',
            imageUrl: '/images/book_collection.jpg',
            shippingRequired: true,
            estimatedDelivery: '7-10 business days',
          },
          createdAt: new Date(),
          popularity: 95,
          userRating: 4.8,
        },
      ];
      
      dispatch({ type: 'SET_AVAILABLE_REWARDS', payload: mockRewards });
      return mockRewards;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load rewards';
      dispatch({ type: 'SET_REWARDS_ERROR', payload: errorMessage });
      throw error;
    }
  }, []);

  const redeemReward = useCallback(async (rewardId: string): Promise<RewardRedemption> => {
    try {
      const reward = state.availableRewards.find(r => r.id === rewardId);
      if (!reward) {
        throw new Error('Reward not found');
      }
      
      if (state.currentPoints < reward.pointsCost) {
        throw new Error('Insufficient points');
      }
      
      // Create redemption record
      const redemption: RewardRedemption = {
        id: `redemption_${Date.now()}`,
        userId: '', // Will be set from AuthContext
        rewardId: reward.id,
        pointsSpent: reward.pointsCost,
        redeemedAt: new Date(),
        status: reward.category === 'digital' ? 'fulfilled' : 'pending',
        fulfillmentMethod: reward.category === 'digital' ? 'automatic' : 'manual',
        ...(reward.category === 'digital' && { completedAt: new Date() }),
      };
      
      // Spend points
      const success = await spendPoints(reward.pointsCost, reward.id, `Redeemed: ${reward.title}`);
      if (!success) {
        throw new Error('Failed to spend points');
      }
      
      dispatch({ type: 'ADD_REWARD_REDEMPTION', payload: redemption });
      
      // TODO: Process digital rewards immediately
      if (reward.category === 'digital') {
        console.log('Digital reward processed:', reward.digitalContent);
      }
      
      return redemption;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to redeem reward';
      dispatch({ type: 'SET_REWARDS_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.availableRewards, state.currentPoints, spendPoints]);

  const getRedemptionHistory = useCallback((): RewardRedemption[] => {
    return state.redeemedRewards;
  }, [state.redeemedRewards]);

  // Progress Functions
  const updateProgress = useCallback((metric: string, value: number) => {
    // Update relevant milestones
    state.milestones.forEach(milestone => {
      if (milestone.category === metric || milestone.name.toLowerCase().includes(metric.toLowerCase())) {
        dispatch({
          type: 'UPDATE_MILESTONE_PROGRESS',
          payload: {
            milestoneId: milestone.id,
            currentValue: value,
          },
        });
      }
    });
    
    // Check achievements
    checkAchievements(metric, value);
  }, [state.milestones, checkAchievements]);

  const getMilestones = useCallback((): ProgressMilestone[] => {
    return state.milestones;
  }, [state.milestones]);

  const getStreaks = useCallback((): Streak[] => {
    return state.streaks;
  }, [state.streaks]);

  const updateStreak = useCallback((streakType: string) => {
    const existingStreak = state.streaks.find(s => s.type === streakType);
    
    if (existingStreak) {
      const today = new Date();
      const lastActivity = new Date(existingStreak.lastActivity);
      const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
      
      let updates: Partial<Streak>;
      
      if (daysDiff === 1) {
        // Continue streak
        updates = {
          currentStreak: existingStreak.currentStreak + 1,
          lastActivity: today,
          longestStreak: Math.max(existingStreak.longestStreak, existingStreak.currentStreak + 1),
        };
      } else if (daysDiff === 0) {
        // Same day, just update last activity
        updates = { lastActivity: today };
      } else {
        // Streak broken, start new one
        updates = {
          currentStreak: 1,
          lastActivity: today,
          streakStartDate: today,
        };
      }
      
      dispatch({
        type: 'UPDATE_STREAK',
        payload: {
          streakId: existingStreak.id,
          updates,
        },
      });
    }
  }, [state.streaks]);

  // Challenge Functions
  const getActiveChallenges = useCallback(async (): Promise<Challenge[]> => {
    try {
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock challenges data
      const mockChallenges: Challenge[] = [
        {
          id: 'challenge_1',
          title: 'Reading Marathon',
          description: 'Read 5 books this month',
          category: 'reading',
          difficulty: 'medium',
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000), // 23 days from now
          duration: '30 days',
          requirements: [
            {
              metric: 'books_read',
              targetValue: 5,
              timeframe: 'monthly',
            },
          ],
          pointsReward: 500,
          achievementReward: 'reading_marathon_badge',
          isActive: true,
          participantCount: 1247,
          maxParticipants: 10000,
        },
      ];
      
      dispatch({ type: 'SET_ACTIVE_CHALLENGES', payload: mockChallenges });
      return mockChallenges;
      
    } catch (error) {
      console.error('Failed to load challenges:', error);
      return [];
    }
  }, []);

  const joinChallenge = useCallback(async (challengeId: string) => {
    try {
      dispatch({ type: 'JOIN_CHALLENGE', payload: challengeId });
      
      // TODO: Sync with Firebase
      await new Promise(resolve => setTimeout(resolve, 300));
      
    } catch (error) {
      console.error('Failed to join challenge:', error);
    }
  }, []);

  const updateChallengeProgress = useCallback((challengeId: string, progress: number) => {
    dispatch({
      type: 'UPDATE_CHALLENGE_PROGRESS',
      payload: { challengeId, progress },
    });
  }, []);

  // Leaderboard Functions
  const getLeaderboards = useCallback(async (metric: string, timeframe: string): Promise<LeaderboardEntry[]> => {
    try {
      dispatch({ type: 'SET_LEADERBOARDS_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock leaderboard data
      const mockLeaderboard: LeaderboardEntry[] = [
        {
          userId: 'user_1',
          username: 'BookLover123',
          avatar: '/avatars/user1.jpg',
          rank: 1,
          score: 2500,
          metric: metric as any,
          timeframe: timeframe as any,
          booksRead: 25,
          averageQuizScore: 95,
          readingStreak: 30,
          arInteractions: 150,
          rankChange: 0,
          scoreChange: 100,
        },
        {
          userId: 'user_2',
          username: 'ReadingNinja',
          rank: 2,
          score: 2300,
          metric: metric as any,
          timeframe: timeframe as any,
          booksRead: 23,
          averageQuizScore: 92,
          readingStreak: 25,
          arInteractions: 140,
          rankChange: 1,
          scoreChange: 80,
        },
      ];
      
      const leaderboardKey = `${metric}_${timeframe}`;
      dispatch({
        type: 'SET_LEADERBOARDS',
        payload: { [leaderboardKey]: mockLeaderboard },
      });
      
      return mockLeaderboard;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load leaderboards';
      dispatch({ type: 'SET_LEADERBOARDS_ERROR', payload: errorMessage });
      throw error;
    }
  }, []);

  const getUserRanking = useCallback((metric: string, timeframe: string): { rank: number; score: number } | null => {
    const rankingKey = `${metric}_${timeframe}`;
    return state.userRankings[rankingKey] || null;
  }, [state.userRankings]);

  // Analytics Functions
  const getGamificationAnalytics = useCallback(async (): Promise<GamificationAnalytics> => {
    try {
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock analytics data
      const mockAnalytics: GamificationAnalytics = {
        userId: '', // Will be set from AuthContext
        totalPointsEarned: state.totalPointsEarned,
        totalPointsSpent: state.totalPointsSpent,
        currentPoints: state.currentPoints,
        pointsEarnedThisWeek: 150,
        averagePointsPerDay: 25,
        totalAchievements: state.unlockedAchievements.length,
        achievementsByRarity: {
          bronze: state.unlockedAchievements.filter(a => a.rarity === 'bronze').length,
          silver: state.unlockedAchievements.filter(a => a.rarity === 'silver').length,
          gold: state.unlockedAchievements.filter(a => a.rarity === 'gold').length,
          platinum: state.unlockedAchievements.filter(a => a.rarity === 'platinum').length,
          legendary: state.unlockedAchievements.filter(a => a.rarity === 'legendary').length,
        },
        recentAchievements: state.unlockedAchievements.slice(-5),
        achievementRate: 2.5,
        booksReadTotal: 12,
        quizzesTaken: 35,
        arSessionsTotal: 18,
        currentReadingStreak: 7,
        longestReadingStreak: 15,
        dailyActiveStreak: 12,
        averageSessionDuration: 25,
        preferredActivities: ['reading', 'quizzes', 'ar'],
        peakActivityTime: 'evening',
        leaderboardRanks: {
          weekly: { rank: 15, totalParticipants: 1000 },
          monthly: { rank: 42, totalParticipants: 5000 },
        },
        challengesCompleted: 3,
        socialInteractions: 8,
        rewardsRedeemed: state.redeemedRewards.length,
        favoriteRewardCategories: ['digital', 'educational'],
        redemptionFrequency: 'moderate',
      };
      
      dispatch({ type: 'SET_GAMIFICATION_ANALYTICS', payload: mockAnalytics });
      return mockAnalytics;
      
    } catch (error) {
      console.error('Failed to load analytics:', error);
      throw error;
    }
  }, [state.totalPointsEarned, state.totalPointsSpent, state.currentPoints, state.unlockedAchievements, state.redeemedRewards]);

  const trackActivity = useCallback((activity: string, value: number) => {
    // Update progress and check achievements
    updateProgress(activity, value);
    
    // Update streaks based on activity
    if (activity === 'book_completed') {
      updateStreak('reading');
    } else if (activity === 'quiz_completed') {
      updateStreak('quiz');
    } else if (activity === 'ar_session') {
      updateStreak('ar');
    }
  }, [updateProgress, updateStreak]);

  // Utility Functions
  const calculateLevel = useCallback((totalPoints: number): { level: number; progress: number } => {
    const level = Math.floor(Math.sqrt(totalPoints / 100)) + 1;
    const pointsForCurrentLevel = Math.pow(level - 1, 2) * 100;
    const pointsForNextLevel = Math.pow(level, 2) * 100;
    const progress = ((totalPoints - pointsForCurrentLevel) / (pointsForNextLevel - pointsForCurrentLevel)) * 100;
    
    return { level, progress: Math.min(100, Math.max(0, progress)) };
  }, []);

  const getNextLevelRequirement = useCallback((): number => {
    const nextLevel = state.userLevel + 1;
    const pointsRequired = Math.pow(nextLevel - 1, 2) * 100;
    return pointsRequired - state.totalPointsEarned;
  }, [state.userLevel, state.totalPointsEarned]);

  const isRewardAffordable = useCallback((rewardId: string): boolean => {
    const reward = state.availableRewards.find(r => r.id === rewardId);
    return reward ? state.currentPoints >= reward.pointsCost : false;
  }, [state.availableRewards, state.currentPoints]);

  const canUnlockAchievement = useCallback((achievementId: string): boolean => {
    const achievement = state.achievements.find(a => a.id === achievementId);
    return achievement ? achievement.progress >= 100 && !achievement.isUnlocked : false;
  }, [state.achievements]);

  // Context value
  const contextValue: GamificationContextProps = {
    state,
    dispatch,
    
    // Points Functions
    addPoints,
    spendPoints,
    getPointsBalance,
    
    // Achievement Functions
    checkAchievements,
    unlockAchievement,
    getAchievementProgress,
    getFeaturedAchievements,
    
    // Reward Functions
    getAvailableRewards,
    redeemReward,
    getRedemptionHistory,
    
    // Progress Functions
    updateProgress,
    getMilestones,
    getStreaks,
    updateStreak,
    
    // Challenge Functions
    getActiveChallenges,
    joinChallenge,
    updateChallengeProgress,
    
    // Leaderboard Functions
    getLeaderboards,
    getUserRanking,
    
    // Analytics Functions
    getGamificationAnalytics,
    trackActivity,
    
    // Utility Functions
    calculateLevel,
    getNextLevelRequirement,
    isRewardAffordable,
    canUnlockAchievement,
  };

  return (
    <GamificationContext.Provider value={contextValue}>
      {children}
    </GamificationContext.Provider>
  );
};

// Custom hook to use Gamification Context
export const useGamification = () => {
  const context = useContext(GamificationContext);
  
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  
  return context;
};

export default GamificationContext;

