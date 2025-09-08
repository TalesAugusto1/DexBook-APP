/**
 * Gamification Store Types
 * Following BR-ACHIEVEMENT-001: Achievement triggers
 * Following BR-ACHIEVEMENT-002: Points and rewards system
 * Following BR-PROGRESS-001: Learning progress calculation
 */

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'reading' | 'learning' | 'ar' | 'progress' | 'social' | 'special';
  type: 'milestone' | 'streak' | 'collection' | 'mastery' | 'social' | 'time_based';
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';
  
  // Requirements
  requirements: {
    metric: string;
    value: number;
    operator: 'equals' | 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal';
    timeframe?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all_time';
  }[];
  
  // Rewards
  pointsReward: number;
  badgeIcon: string;
  badgeColor: string;
  unlocksContent?: string[];
  
  // Progress tracking
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress: number; // 0-100 percentage
  currentValue: number;
  targetValue: number;
  
  // Metadata
  createdAt: Date;
  isVisible: boolean;
  isSecret: boolean; // Hidden until unlocked
  prerequisiteAchievements?: string[];
}

// Badge Types
export interface Badge {
  id: string;
  achievementId: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  rarity: Achievement['rarity'];
  earnedAt: Date;
  displayOrder: number;
  isShowcase: boolean; // Featured in user profile
}

// Points System Types
export interface PointsTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'spent' | 'bonus' | 'penalty';
  amount: number;
  source: 'reading' | 'quiz' | 'ar_interaction' | 'achievement' | 'daily_bonus' | 'referral' | 'purchase';
  sourceId: string; // ID of book, quiz, achievement, etc.
  description: string;
  timestamp: Date;
  
  // Metadata
  multiplier?: number;
  bonusReason?: string;
  expiresAt?: Date;
}

// Rewards Types
export interface Reward {
  id: string;
  title: string;
  description: string;
  category: 'digital' | 'physical' | 'experience' | 'educational';
  type: 'content' | 'feature' | 'customization' | 'book' | 'merchandise' | 'event';
  
  // Cost and availability
  pointsCost: number;
  isAvailable: boolean;
  availableUntil?: Date;
  stockCount?: number;
  maxPerUser?: number;
  
  // Reward details
  digitalContent?: {
    type: 'ebook' | 'audiobook' | 'ar_content' | 'theme' | 'avatar';
    downloadUrl?: string;
    unlockCode?: string;
  };
  
  physicalItem?: {
    name: string;
    description: string;
    imageUrl: string;
    shippingRequired: boolean;
    estimatedDelivery: string;
  };
  
  experience?: {
    name: string;
    description: string;
    location?: string;
    dateTime?: Date;
    duration: string;
    participantLimit?: number;
  };
  
  // Requirements
  minimumLevel?: number;
  requiredAchievements?: string[];
  ageRestriction?: { min: number; max?: number };
  
  // Metadata
  createdAt: Date;
  popularity: number; // How often it's redeemed
  userRating: number; // Average user rating
}

// Redemption Types
export interface RewardRedemption {
  id: string;
  userId: string;
  rewardId: string;
  pointsSpent: number;
  redeemedAt: Date;
  status: 'pending' | 'processing' | 'fulfilled' | 'cancelled' | 'refunded';
  
  // Fulfillment details
  fulfillmentMethod: 'automatic' | 'manual' | 'shipping' | 'pickup';
  trackingNumber?: string;
  fulfillmentNotes?: string;
  completedAt?: Date;
  
  // User details (for shipping)
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Feedback
  userRating?: number;
  userReview?: string;
  reviewedAt?: Date;
}

// Progress Tracking Types
export interface ProgressMilestone {
  id: string;
  category: 'reading' | 'learning' | 'ar' | 'social';
  name: string;
  description: string;
  targetValue: number;
  currentValue: number;
  isCompleted: boolean;
  completedAt?: Date;
  
  // Rewards for completion
  pointsReward: number;
  achievementReward?: string;
  
  // Progress visualization
  icon: string;
  color: string;
  progressBarColor: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  rank: number;
  score: number;
  metric: 'total_points' | 'books_read' | 'quiz_scores' | 'ar_interactions' | 'reading_streak';
  timeframe: 'daily' | 'weekly' | 'monthly' | 'all_time';
  
  // Additional stats
  booksRead?: number;
  averageQuizScore?: number;
  readingStreak?: number;
  arInteractions?: number;
  
  // Change indicators
  rankChange: number; // +/- from previous period
  scoreChange: number;
}

// Streak Types
export interface Streak {
  id: string;
  type: 'reading' | 'quiz' | 'ar' | 'login';
  currentStreak: number;
  longestStreak: number;
  lastActivity: Date;
  streakStartDate: Date;
  
  // Milestone rewards
  milestones: {
    day: number;
    pointsReward: number;
    achievementReward?: string;
    isReached: boolean;
    reachedAt?: Date;
  }[];
  
  // Streak protection
  freezesUsed: number;
  maxFreezes: number;
  freezeExpiresAt?: Date;
}

// Challenge Types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'reading' | 'learning' | 'ar' | 'social';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  
  // Timeline
  startDate: Date;
  endDate: Date;
  duration: string;
  
  // Requirements
  requirements: {
    metric: string;
    targetValue: number;
    timeframe: string;
  }[];
  
  // Rewards
  pointsReward: number;
  achievementReward?: string;
  badgeReward?: string;
  
  // Participation
  isActive: boolean;
  participantCount: number;
  maxParticipants?: number;
  userProgress?: {
    joined: boolean;
    joinedAt?: Date;
    progress: number;
    isCompleted: boolean;
    completedAt?: Date;
  };
}

// Gamification Analytics Types
export interface GamificationAnalytics {
  userId: string;
  
  // Points analytics
  totalPointsEarned: number;
  totalPointsSpent: number;
  currentPoints: number;
  pointsEarnedThisWeek: number;
  averagePointsPerDay: number;
  
  // Achievement analytics
  totalAchievements: number;
  achievementsByRarity: {
    bronze: number;
    silver: number;
    gold: number;
    platinum: number;
    legendary: number;
  };
  recentAchievements: Achievement[];
  achievementRate: number; // Achievements per week
  
  // Progress analytics
  booksReadTotal: number;
  quizzesTaken: number;
  arSessionsTotal: number;
  currentReadingStreak: number;
  longestReadingStreak: number;
  
  // Engagement analytics
  dailyActiveStreak: number;
  averageSessionDuration: number;
  preferredActivities: string[];
  peakActivityTime: string;
  
  // Social analytics
  leaderboardRanks: {
    [timeframe: string]: {
      rank: number;
      totalParticipants: number;
    };
  };
  challengesCompleted: number;
  socialInteractions: number;
  
  // Reward analytics
  rewardsRedeemed: number;
  favoriteRewardCategories: string[];
  redemptionFrequency: 'frequent' | 'moderate' | 'rare';
}

// Gamification State
export interface GamificationState {
  // Current user status
  currentPoints: number;
  totalPointsEarned: number;
  totalPointsSpent: number;
  userLevel: number;
  levelProgress: number; // 0-100 percentage to next level
  
  // Achievements
  achievements: Achievement[];
  unlockedAchievements: Achievement[];
  featuredAchievements: Achievement[];
  badges: Badge[];
  
  // Points and transactions
  recentTransactions: PointsTransaction[];
  pointsHistory: PointsTransaction[];
  
  // Rewards
  availableRewards: Reward[];
  redeemedRewards: RewardRedemption[];
  pendingRedemptions: RewardRedemption[];
  
  // Progress tracking
  milestones: ProgressMilestone[];
  streaks: Streak[];
  activeChallenges: Challenge[];
  
  // Leaderboards
  leaderboards: {
    [key: string]: LeaderboardEntry[];
  };
  userRankings: {
    [metric: string]: {
      rank: number;
      score: number;
      timeframe: string;
    };
  };
  
  // Analytics
  analytics: GamificationAnalytics | null;
  
  // Settings
  settings: {
    showAchievementNotifications: boolean;
    showPointsAnimations: boolean;
    showLeaderboards: boolean;
    shareAchievements: boolean;
    publicProfile: boolean;
    challengeReminders: boolean;
  };
  
  // Loading states
  isLoading: boolean;
  isLoadingRewards: boolean;
  isLoadingAchievements: boolean;
  isLoadingLeaderboards: boolean;
  
  // Error states
  error: string | null;
  rewardsError: string | null;
  achievementsError: string | null;
  leaderboardsError: string | null;
  
  // Cache management
  lastUpdated: Date;
  cacheExpiryMinutes: number;
}

// Gamification Actions
export type GamificationAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  
  // Points Actions
  | { type: 'ADD_POINTS'; payload: { amount: number; source: string; sourceId: string; description: string } }
  | { type: 'SPEND_POINTS'; payload: { amount: number; rewardId: string; description: string } }
  | { type: 'SET_CURRENT_POINTS'; payload: number }
  | { type: 'ADD_POINTS_TRANSACTION'; payload: PointsTransaction }
  | { type: 'SET_POINTS_HISTORY'; payload: PointsTransaction[] }
  
  // Achievement Actions
  | { type: 'SET_ACHIEVEMENTS'; payload: Achievement[] }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: Achievement }
  | { type: 'UPDATE_ACHIEVEMENT_PROGRESS'; payload: { achievementId: string; progress: number; currentValue: number } }
  | { type: 'SET_FEATURED_ACHIEVEMENTS'; payload: Achievement[] }
  | { type: 'ADD_BADGE'; payload: Badge }
  | { type: 'SET_ACHIEVEMENTS_LOADING'; payload: boolean }
  | { type: 'SET_ACHIEVEMENTS_ERROR'; payload: string | null }
  
  // Rewards Actions
  | { type: 'SET_AVAILABLE_REWARDS'; payload: Reward[] }
  | { type: 'ADD_REWARD_REDEMPTION'; payload: RewardRedemption }
  | { type: 'UPDATE_REDEMPTION_STATUS'; payload: { redemptionId: string; status: RewardRedemption['status'] } }
  | { type: 'SET_REWARDS_LOADING'; payload: boolean }
  | { type: 'SET_REWARDS_ERROR'; payload: string | null }
  
  // Progress Actions
  | { type: 'SET_MILESTONES'; payload: ProgressMilestone[] }
  | { type: 'UPDATE_MILESTONE_PROGRESS'; payload: { milestoneId: string; currentValue: number } }
  | { type: 'COMPLETE_MILESTONE'; payload: string }
  | { type: 'UPDATE_STREAK'; payload: { streakId: string; updates: Partial<Streak> } }
  | { type: 'SET_USER_LEVEL'; payload: { level: number; progress: number } }
  
  // Challenge Actions
  | { type: 'SET_ACTIVE_CHALLENGES'; payload: Challenge[] }
  | { type: 'JOIN_CHALLENGE'; payload: string }
  | { type: 'UPDATE_CHALLENGE_PROGRESS'; payload: { challengeId: string; progress: number } }
  | { type: 'COMPLETE_CHALLENGE'; payload: string }
  
  // Leaderboard Actions
  | { type: 'SET_LEADERBOARDS'; payload: { [key: string]: LeaderboardEntry[] } }
  | { type: 'UPDATE_USER_RANKING'; payload: { metric: string; rank: number; score: number; timeframe: string } }
  | { type: 'SET_LEADERBOARDS_LOADING'; payload: boolean }
  | { type: 'SET_LEADERBOARDS_ERROR'; payload: string | null }
  
  // Analytics Actions
  | { type: 'SET_GAMIFICATION_ANALYTICS'; payload: GamificationAnalytics }
  | { type: 'UPDATE_ANALYTICS'; payload: Partial<GamificationAnalytics> }
  
  // Settings Actions
  | { type: 'UPDATE_GAMIFICATION_SETTINGS'; payload: Partial<GamificationState['settings']> }
  | { type: 'TOGGLE_ACHIEVEMENT_NOTIFICATIONS' }
  | { type: 'TOGGLE_POINTS_ANIMATIONS' }
  | { type: 'TOGGLE_LEADERBOARDS' }
  | { type: 'TOGGLE_SHARE_ACHIEVEMENTS' }
  | { type: 'TOGGLE_PUBLIC_PROFILE' }
  
  // Cache Actions
  | { type: 'UPDATE_CACHE_TIMESTAMP' }
  | { type: 'CLEAR_GAMIFICATION_CACHE' };

// Gamification Context Props
export interface GamificationContextProps {
  state: GamificationState;
  dispatch: React.Dispatch<GamificationAction>;
  
  // Points Functions
  addPoints: (amount: number, source: string, sourceId: string, description: string) => void;
  spendPoints: (amount: number, rewardId: string, description: string) => Promise<boolean>;
  getPointsBalance: () => number;
  
  // Achievement Functions
  checkAchievements: (userAction: string, value: number) => Promise<Achievement[]>;
  unlockAchievement: (achievementId: string) => Promise<void>;
  getAchievementProgress: (achievementId: string) => number;
  getFeaturedAchievements: () => Achievement[];
  
  // Reward Functions
  getAvailableRewards: () => Promise<Reward[]>;
  redeemReward: (rewardId: string) => Promise<RewardRedemption>;
  getRedemptionHistory: () => RewardRedemption[];
  
  // Progress Functions
  updateProgress: (metric: string, value: number) => void;
  getMilestones: () => ProgressMilestone[];
  getStreaks: () => Streak[];
  updateStreak: (streakType: string) => void;
  
  // Challenge Functions
  getActiveChallenges: () => Promise<Challenge[]>;
  joinChallenge: (challengeId: string) => Promise<void>;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  
  // Leaderboard Functions
  getLeaderboards: (metric: string, timeframe: string) => Promise<LeaderboardEntry[]>;
  getUserRanking: (metric: string, timeframe: string) => { rank: number; score: number } | null;
  
  // Analytics Functions
  getGamificationAnalytics: () => Promise<GamificationAnalytics>;
  trackActivity: (activity: string, value: number) => void;
  
  // Utility Functions
  calculateLevel: (totalPoints: number) => { level: number; progress: number };
  getNextLevelRequirement: () => number;
  isRewardAffordable: (rewardId: string) => boolean;
  canUnlockAchievement: (achievementId: string) => boolean;
}

// Business Rule Validation Types
export interface GamificationValidationRules {
  // BR-ACHIEVEMENT-001: Achievement triggers
  validateAchievementTrigger: (achievement: Achievement, userMetrics: any) => boolean;
  calculateAchievementProgress: (achievement: Achievement, userMetrics: any) => number;
  
  // BR-ACHIEVEMENT-002: Points and rewards system
  validatePointsTransaction: (transaction: PointsTransaction) => boolean;
  validateRewardRedemption: (redemption: RewardRedemption, userPoints: number) => boolean;
  
  // BR-PROGRESS-001: Learning progress calculation
  calculateProgressMetrics: (userActivity: any) => any;
  validateProgressMilestone: (milestone: ProgressMilestone) => boolean;
}

export default GamificationState;
