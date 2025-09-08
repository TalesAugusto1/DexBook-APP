/**
 * Gamification Store Index
 * Following BR-ACHIEVEMENT-001: Achievement triggers
 * Following BR-ACHIEVEMENT-002: Points and rewards system
 * Clean exports for gamification functionality
 */

// Core gamification context and provider
export { GamificationProvider, useGamification } from './GamificationContext';
export { gamificationReducer, initialGamificationState } from './gamificationReducer';

// Types and interfaces
export type {
  Achievement,
  Badge,
  PointsTransaction,
  Reward,
  RewardRedemption,
  ProgressMilestone,
  Streak,
  Challenge,
  LeaderboardEntry,
  GamificationAnalytics,
  GamificationState,
  GamificationAction,
  GamificationContextProps,
  GamificationValidationRules,
} from './types';

// Default export
export { default as GamificationContext } from './GamificationContext';

