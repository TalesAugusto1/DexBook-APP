/**
 * Gamification Reducer
 * Following BR-ACHIEVEMENT-001: Achievement triggers
 * Following BR-ACHIEVEMENT-002: Points and rewards system
 * Following BR-PROGRESS-001: Learning progress calculation
 */

import { GamificationState, GamificationAction } from './types';

// Initial gamification state
export const initialGamificationState: GamificationState = {
  // Current user status
  currentPoints: 0,
  totalPointsEarned: 0,
  totalPointsSpent: 0,
  userLevel: 1,
  levelProgress: 0,
  
  // Achievements
  achievements: [],
  unlockedAchievements: [],
  featuredAchievements: [],
  badges: [],
  
  // Points and transactions
  recentTransactions: [],
  pointsHistory: [],
  
  // Rewards
  availableRewards: [],
  redeemedRewards: [],
  pendingRedemptions: [],
  
  // Progress tracking
  milestones: [],
  streaks: [],
  activeChallenges: [],
  
  // Leaderboards
  leaderboards: {},
  userRankings: {},
  
  // Analytics
  analytics: null,
  
  // Settings
  settings: {
    showAchievementNotifications: true,
    showPointsAnimations: true,
    showLeaderboards: true,
    shareAchievements: false,
    publicProfile: false,
    challengeReminders: true,
  },
  
  // Loading states
  isLoading: false,
  isLoadingRewards: false,
  isLoadingAchievements: false,
  isLoadingLeaderboards: false,
  
  // Error states
  error: null,
  rewardsError: null,
  achievementsError: null,
  leaderboardsError: null,
  
  // Cache management
  lastUpdated: new Date(),
  cacheExpiryMinutes: 30,
};

// Helper function to calculate user level from total points
function calculateLevel(totalPoints: number): { level: number; progress: number } {
  // Level calculation: Level = floor(sqrt(totalPoints / 100)) + 1
  // Points required for level N: (N-1)^2 * 100
  const level = Math.floor(Math.sqrt(totalPoints / 100)) + 1;
  const pointsForCurrentLevel = Math.pow(level - 1, 2) * 100;
  const pointsForNextLevel = Math.pow(level, 2) * 100;
  const progress = ((totalPoints - pointsForCurrentLevel) / (pointsForNextLevel - pointsForCurrentLevel)) * 100;
  
  return { level, progress: Math.min(100, Math.max(0, progress)) };
}

// Gamification reducer function
export function gamificationReducer(state: GamificationState, action: GamificationAction): GamificationState {
  switch (action.type) {
    // Basic gamification actions
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
      
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
      
    // Points Actions
    case 'ADD_POINTS':
      const newTransaction = {
        id: `transaction_${Date.now()}`,
        userId: '', // Will be set from AuthContext
        type: 'earned' as const,
        amount: action.payload.amount,
        source: action.payload.source as any,
        sourceId: action.payload.sourceId,
        description: action.payload.description,
        timestamp: new Date(),
      };
      
      const newTotalEarned = state.totalPointsEarned + action.payload.amount;
      const newCurrentPoints = state.currentPoints + action.payload.amount;
      const levelInfo = calculateLevel(newTotalEarned);
      
      return {
        ...state,
        currentPoints: newCurrentPoints,
        totalPointsEarned: newTotalEarned,
        userLevel: levelInfo.level,
        levelProgress: levelInfo.progress,
        recentTransactions: [newTransaction, ...state.recentTransactions.slice(0, 9)],
        pointsHistory: [newTransaction, ...state.pointsHistory],
      };
      
    case 'SPEND_POINTS':
      if (state.currentPoints < action.payload.amount) {
        return state; // Not enough points
      }
      
      const spendTransaction = {
        id: `transaction_${Date.now()}`,
        userId: '', // Will be set from AuthContext
        type: 'spent' as const,
        amount: -action.payload.amount,
        source: 'purchase' as any,
        sourceId: action.payload.rewardId,
        description: action.payload.description,
        timestamp: new Date(),
      };
      
      return {
        ...state,
        currentPoints: state.currentPoints - action.payload.amount,
        totalPointsSpent: state.totalPointsSpent + action.payload.amount,
        recentTransactions: [spendTransaction, ...state.recentTransactions.slice(0, 9)],
        pointsHistory: [spendTransaction, ...state.pointsHistory],
      };
      
    case 'SET_CURRENT_POINTS':
      return {
        ...state,
        currentPoints: action.payload,
      };
      
    case 'ADD_POINTS_TRANSACTION':
      return {
        ...state,
        recentTransactions: [action.payload, ...state.recentTransactions.slice(0, 9)],
        pointsHistory: [action.payload, ...state.pointsHistory],
      };
      
    case 'SET_POINTS_HISTORY':
      return {
        ...state,
        pointsHistory: action.payload,
      };
      
    // Achievement Actions
    case 'SET_ACHIEVEMENTS':
      return {
        ...state,
        achievements: action.payload,
        achievementsError: null,
        isLoadingAchievements: false,
      };
      
    case 'UNLOCK_ACHIEVEMENT':
      const unlockedAchievement = { 
        ...action.payload, 
        isUnlocked: true, 
        unlockedAt: new Date(),
        progress: 100,
      };
      
      // Create badge for the achievement
      const newBadge = {
        id: `badge_${action.payload.id}`,
        achievementId: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        icon: action.payload.badgeIcon,
        color: action.payload.badgeColor,
        rarity: action.payload.rarity,
        earnedAt: new Date(),
        displayOrder: state.badges.length,
        isShowcase: action.payload.rarity === 'gold' || action.payload.rarity === 'platinum' || action.payload.rarity === 'legendary',
      };
      
      return {
        ...state,
        achievements: state.achievements.map(achievement =>
          achievement.id === action.payload.id ? unlockedAchievement : achievement
        ),
        unlockedAchievements: [...state.unlockedAchievements, unlockedAchievement],
        badges: [...state.badges, newBadge],
      };
      
    case 'UPDATE_ACHIEVEMENT_PROGRESS':
      return {
        ...state,
        achievements: state.achievements.map(achievement =>
          achievement.id === action.payload.achievementId
            ? {
                ...achievement,
                progress: action.payload.progress,
                currentValue: action.payload.currentValue,
              }
            : achievement
        ),
      };
      
    case 'SET_FEATURED_ACHIEVEMENTS':
      return {
        ...state,
        featuredAchievements: action.payload,
      };
      
    case 'ADD_BADGE':
      return {
        ...state,
        badges: [...state.badges, action.payload],
      };
      
    case 'SET_ACHIEVEMENTS_LOADING':
      return {
        ...state,
        isLoadingAchievements: action.payload,
      };
      
    case 'SET_ACHIEVEMENTS_ERROR':
      return {
        ...state,
        achievementsError: action.payload,
        isLoadingAchievements: false,
      };
      
    // Rewards Actions
    case 'SET_AVAILABLE_REWARDS':
      return {
        ...state,
        availableRewards: action.payload,
        rewardsError: null,
        isLoadingRewards: false,
      };
      
    case 'ADD_REWARD_REDEMPTION':
      return {
        ...state,
        redeemedRewards: [...state.redeemedRewards, action.payload],
        pendingRedemptions: action.payload.status === 'pending' 
          ? [...state.pendingRedemptions, action.payload]
          : state.pendingRedemptions,
      };
      
    case 'UPDATE_REDEMPTION_STATUS':
      return {
        ...state,
        redeemedRewards: state.redeemedRewards.map(redemption =>
          redemption.id === action.payload.redemptionId
            ? { ...redemption, status: action.payload.status }
            : redemption
        ),
        pendingRedemptions: state.pendingRedemptions.map(redemption =>
          redemption.id === action.payload.redemptionId
            ? { ...redemption, status: action.payload.status }
            : redemption
        ).filter(redemption => redemption.status === 'pending'),
      };
      
    case 'SET_REWARDS_LOADING':
      return {
        ...state,
        isLoadingRewards: action.payload,
      };
      
    case 'SET_REWARDS_ERROR':
      return {
        ...state,
        rewardsError: action.payload,
        isLoadingRewards: false,
      };
      
    // Progress Actions
    case 'SET_MILESTONES':
      return {
        ...state,
        milestones: action.payload,
      };
      
    case 'UPDATE_MILESTONE_PROGRESS':
      return {
        ...state,
        milestones: state.milestones.map(milestone =>
          milestone.id === action.payload.milestoneId
            ? {
                ...milestone,
                currentValue: action.payload.currentValue,
                isCompleted: action.payload.currentValue >= milestone.targetValue,
                completedAt: action.payload.currentValue >= milestone.targetValue ? new Date() : milestone.completedAt,
              }
            : milestone
        ),
      };
      
    case 'COMPLETE_MILESTONE':
      return {
        ...state,
        milestones: state.milestones.map(milestone =>
          milestone.id === action.payload
            ? {
                ...milestone,
                isCompleted: true,
                completedAt: new Date(),
                currentValue: milestone.targetValue,
              }
            : milestone
        ),
      };
      
    case 'UPDATE_STREAK':
      return {
        ...state,
        streaks: state.streaks.map(streak =>
          streak.id === action.payload.streakId
            ? { ...streak, ...action.payload.updates }
            : streak
        ),
      };
      
    case 'SET_USER_LEVEL':
      return {
        ...state,
        userLevel: action.payload.level,
        levelProgress: action.payload.progress,
      };
      
    // Challenge Actions
    case 'SET_ACTIVE_CHALLENGES':
      return {
        ...state,
        activeChallenges: action.payload,
      };
      
    case 'JOIN_CHALLENGE':
      return {
        ...state,
        activeChallenges: state.activeChallenges.map(challenge =>
          challenge.id === action.payload
            ? {
                ...challenge,
                userProgress: {
                  joined: true,
                  joinedAt: new Date(),
                  progress: 0,
                  isCompleted: false,
                },
              }
            : challenge
        ),
      };
      
    case 'UPDATE_CHALLENGE_PROGRESS':
      return {
        ...state,
        activeChallenges: state.activeChallenges.map(challenge =>
          challenge.id === action.payload.challengeId && challenge.userProgress
            ? {
                ...challenge,
                userProgress: {
                  ...challenge.userProgress,
                  progress: action.payload.progress,
                  isCompleted: action.payload.progress >= 100,
                  completedAt: action.payload.progress >= 100 ? new Date() : challenge.userProgress.completedAt,
                },
              }
            : challenge
        ),
      };
      
    case 'COMPLETE_CHALLENGE':
      return {
        ...state,
        activeChallenges: state.activeChallenges.map(challenge =>
          challenge.id === action.payload && challenge.userProgress
            ? {
                ...challenge,
                userProgress: {
                  ...challenge.userProgress,
                  progress: 100,
                  isCompleted: true,
                  completedAt: new Date(),
                },
              }
            : challenge
        ),
      };
      
    // Leaderboard Actions
    case 'SET_LEADERBOARDS':
      return {
        ...state,
        leaderboards: action.payload,
        leaderboardsError: null,
        isLoadingLeaderboards: false,
      };
      
    case 'UPDATE_USER_RANKING':
      const rankingKey = `${action.payload.metric}_${action.payload.timeframe}`;
      return {
        ...state,
        userRankings: {
          ...state.userRankings,
          [rankingKey]: {
            rank: action.payload.rank,
            score: action.payload.score,
            timeframe: action.payload.timeframe,
          },
        },
      };
      
    case 'SET_LEADERBOARDS_LOADING':
      return {
        ...state,
        isLoadingLeaderboards: action.payload,
      };
      
    case 'SET_LEADERBOARDS_ERROR':
      return {
        ...state,
        leaderboardsError: action.payload,
        isLoadingLeaderboards: false,
      };
      
    // Analytics Actions
    case 'SET_GAMIFICATION_ANALYTICS':
      return {
        ...state,
        analytics: action.payload,
      };
      
    case 'UPDATE_ANALYTICS':
      return {
        ...state,
        analytics: state.analytics ? {
          ...state.analytics,
          ...action.payload,
        } : null,
      };
      
    // Settings Actions
    case 'UPDATE_GAMIFICATION_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
      
    case 'TOGGLE_ACHIEVEMENT_NOTIFICATIONS':
      return {
        ...state,
        settings: {
          ...state.settings,
          showAchievementNotifications: !state.settings.showAchievementNotifications,
        },
      };
      
    case 'TOGGLE_POINTS_ANIMATIONS':
      return {
        ...state,
        settings: {
          ...state.settings,
          showPointsAnimations: !state.settings.showPointsAnimations,
        },
      };
      
    case 'TOGGLE_LEADERBOARDS':
      return {
        ...state,
        settings: {
          ...state.settings,
          showLeaderboards: !state.settings.showLeaderboards,
        },
      };
      
    case 'TOGGLE_SHARE_ACHIEVEMENTS':
      return {
        ...state,
        settings: {
          ...state.settings,
          shareAchievements: !state.settings.shareAchievements,
        },
      };
      
    case 'TOGGLE_PUBLIC_PROFILE':
      return {
        ...state,
        settings: {
          ...state.settings,
          publicProfile: !state.settings.publicProfile,
        },
      };
      
    // Cache Actions
    case 'UPDATE_CACHE_TIMESTAMP':
      return {
        ...state,
        lastUpdated: new Date(),
      };
      
    case 'CLEAR_GAMIFICATION_CACHE':
      return {
        ...initialGamificationState,
        settings: state.settings, // Preserve user settings
      };
      
    default:
      return state;
  }
}

export default gamificationReducer;
