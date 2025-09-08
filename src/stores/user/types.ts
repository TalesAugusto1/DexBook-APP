/**
 * User Store Types
 * Following BR-PROFILE-001: Learning style assessment
 * Following BR-ACCESS-001: Accessibility adaptation
 * Following BR-PRIVACY-001: Data protection
 */

// User Profile Types
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  age?: number;
  
  // Profile customization
  avatar?: string;
  bio?: string;
  location?: string;
  timezone?: string;
  language: string;
  
  // Educational information
  school?: string;
  grade?: string;
  teacherId?: string;
  classroomId?: string;
  
  // Parent/Guardian information (for users under 13)
  parentEmail?: string;
  parentName?: string;
  parentPhone?: string;
  coppaCompliant: boolean;
  parentConsent: boolean;
  parentConsentDate?: Date;
  
  // Account metadata
  createdAt: Date;
  lastLoginAt: Date;
  isActive: boolean;
  isVerified: boolean;
  subscriptionType: 'free' | 'premium' | 'school';
  subscriptionExpiresAt?: Date;
  
  // Learning path reference
  learningPath?: string;
}

// Learning Profile Types
export interface LearningProfile {
  userId: string;
  
  // Learning style assessment results
  learningStyles: {
    visual: number; // 0-100 score
    auditory: number; // 0-100 score
    kinesthetic: number; // 0-100 score
    reading: number; // 0-100 score
  };
  primaryLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
  
  // Reading level assessment
  readingLevel: 'beginner' | 'intermediate' | 'advanced';
  readingSpeed: number; // words per minute
  comprehensionLevel: number; // 0-100 score
  
  // Interests and preferences
  favoriteGenres: string[];
  favoriteSubjects: string[];
  interests: string[];
  dislikedTopics: string[];
  
  // Learning goals
  dailyReadingGoal: number; // minutes
  weeklyBookGoal: number; // books
  currentGoals: {
    type: 'reading_time' | 'books_completed' | 'quiz_score' | 'ar_sessions';
    target: number;
    deadline: Date;
    progress: number;
  }[];
  
  // Learning preferences
  preferredDifficulty: 'easy' | 'medium' | 'hard' | 'adaptive';
  timerPreference: boolean;
  hintsPreference: boolean;
  audioNarrationPreference: boolean;
  
  // Assessment history
  assessmentDate: Date;
  lastReassessment?: Date;
  assessmentHistory: {
    date: Date;
    results: any;
    notes?: string;
  }[];
}

// Accessibility Settings Types
export interface AccessibilitySettings {
  userId: string;
  
  // Visual accessibility
  fontSize: 'small' | 'medium' | 'large' | 'extra_large';
  fontFamily: 'default' | 'dyslexia_friendly' | 'high_contrast';
  colorContrast: 'standard' | 'high' | 'extra_high';
  colorBlindnessType?: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy';
  colorBlindnessAdjustment: boolean;
  
  // Audio accessibility
  screenReaderEnabled: boolean;
  voiceOverEnabled: boolean;
  audioDescriptionsEnabled: boolean;
  soundEffectsEnabled: boolean;
  backgroundMusicEnabled: boolean;
  audioVolume: number; // 0-100
  narrationSpeed: number; // 0.5-2.0
  narrationVoice: 'male' | 'female' | 'child' | 'robot';
  
  // Motor accessibility
  touchTargetSize: 'small' | 'medium' | 'large';
  gestureAlternatives: boolean;
  voiceControlEnabled: boolean;
  switchControlEnabled: boolean;
  dwellTimeControl: boolean;
  dwellTime: number; // milliseconds
  
  // Cognitive accessibility
  adhd: {
    focusModeEnabled: boolean;
    distractionReduction: boolean;
    movementBreaksEnabled: boolean;
    movementBreakInterval: number; // minutes
    simplifiedInterface: boolean;
  };
  
  dyslexia: {
    dyslexiaFriendlyFont: boolean;
    lineSpacing: number; // 1.0-3.0
    letterSpacing: number; // 0-5px
    wordSpacing: number; // 0-10px
    readingRuler: boolean;
    syllableHighlighting: boolean;
  };
  
  autism: {
    predictableNavigation: boolean;
    reducedAnimations: boolean;
    consistentLayout: boolean;
    clearInstructions: boolean;
    sensoryFriendlyMode: boolean;
  };
  
  // Haptic and motion
  hapticFeedbackEnabled: boolean;
  hapticIntensity: number; // 0-100
  motionSensitivity: boolean;
  reducedMotion: boolean;
  
  // Emergency accessibility
  emergencyModeEnabled: boolean;
  emergencyContact?: string;
  emergencyInstructions?: string;
  
  // Assistive technology integration
  assistiveTechnologyConnected: string[]; // List of connected AT devices
  customKeyboardShortcuts: { [action: string]: string };
  
  // Learning support
  processingTime: number; // seconds for timed activities
  breakReminders: boolean;
  breakReminderInterval: number; // minutes
  encouragementLevel: 'none' | 'minimal' | 'moderate' | 'high';
  
  // Last updated
  lastUpdated: Date;
}

// Privacy Settings Types
export interface PrivacySettings {
  userId: string;
  
  // Data collection preferences
  analyticsEnabled: boolean;
  personalizedAdsEnabled: boolean;
  locationTrackingEnabled: boolean;
  usageDataSharingEnabled: boolean;
  
  // Social features
  publicProfile: boolean;
  shareReadingProgress: boolean;
  shareAchievements: boolean;
  allowFriendRequests: boolean;
  showOnlineStatus: boolean;
  
  // Communication preferences
  emailNotificationsEnabled: boolean;
  pushNotificationsEnabled: boolean;
  smsNotificationsEnabled: boolean;
  marketingCommunicationsEnabled: boolean;
  
  // Parent/Teacher access (for minors)
  parentDashboardAccess: boolean;
  teacherDashboardAccess: boolean;
  shareProgressWithParents: boolean;
  shareProgressWithTeachers: boolean;
  
  // Data export and deletion
  dataExportRequested: boolean;
  dataExportDate?: Date;
  accountDeletionRequested: boolean;
  accountDeletionDate?: Date;
  
  // Compliance
  gdprCompliant: boolean;
  coppaCompliant: boolean;
  consentDate: Date;
  consentVersion: string;
  
  lastUpdated: Date;
}

// Notification Preferences Types
export interface NotificationPreferences {
  userId: string;
  
  // General notifications
  enabled: boolean;
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:MM format
    endTime: string; // HH:MM format
    timezone: string;
  };
  
  // Reading reminders
  dailyReadingReminder: {
    enabled: boolean;
    time: string; // HH:MM format
    message: string;
  };
  
  // Achievement notifications
  achievementUnlocked: boolean;
  levelUp: boolean;
  streakMilestone: boolean;
  pointsEarned: boolean;
  
  // Learning notifications
  quizAvailable: boolean;
  newBookRecommendations: boolean;
  learningPathUpdates: boolean;
  challengeInvitations: boolean;
  
  // Social notifications
  friendRequests: boolean;
  friendActivity: boolean;
  challengeUpdates: boolean;
  leaderboardChanges: boolean;
  
  // System notifications
  appUpdates: boolean;
  maintenanceAlerts: boolean;
  securityAlerts: boolean;
  
  // Delivery methods
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  inAppNotifications: boolean;
  
  lastUpdated: Date;
}

// User Statistics Types
export interface UserStatistics {
  userId: string;
  
  // Reading statistics
  totalBooksRead: number;
  totalReadingTime: number; // minutes
  averageReadingSpeed: number; // words per minute
  currentReadingStreak: number; // days
  longestReadingStreak: number; // days
  favoriteGenres: { genre: string; count: number }[];
  
  // Learning statistics
  totalQuizzesTaken: number;
  averageQuizScore: number;
  totalConceptsLearned: string[];
  learningEfficiency: number; // 0-100 score
  
  // AR statistics
  totalARSessions: number;
  totalARTime: number; // minutes
  favoriteARContent: string[];
  arEngagementScore: number; // 0-100
  
  // Gamification statistics
  totalPointsEarned: number;
  currentLevel: number;
  totalAchievements: number;
  challengesCompleted: number;
  
  // App usage statistics
  totalSessions: number;
  averageSessionDuration: number; // minutes
  lastActiveDate: Date;
  deviceTypes: string[];
  mostActiveHour: number; // 0-23
  mostActiveDay: string; // day of week
  
  // Performance statistics
  improvementTrend: 'improving' | 'stable' | 'declining';
  strongAreas: string[];
  areasForImprovement: string[];
  
  lastCalculated: Date;
}

// User State
export interface UserState {
  // Current user
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // User profiles
  learningProfile: LearningProfile | null;
  isLoadingLearningProfile: boolean;
  
  // Settings
  accessibilitySettings: AccessibilitySettings | null;
  privacySettings: PrivacySettings | null;
  notificationPreferences: NotificationPreferences | null;
  
  // Statistics
  userStatistics: UserStatistics | null;
  
  // Profile management
  profileUpdateInProgress: boolean;
  profilePictureUploading: boolean;
  
  // Assessment
  assessmentInProgress: boolean;
  assessmentResults: any | null;
  
  // Social features
  friends: UserProfile[];
  friendRequests: {
    incoming: { from: UserProfile; date: Date }[];
    outgoing: { to: UserProfile; date: Date }[];
  };
  
  // Loading states
  isLoadingSettings: boolean;
  isLoadingStatistics: boolean;
  isLoadingFriends: boolean;
  
  // Error states
  error: string | null;
  profileError: string | null;
  settingsError: string | null;
  statisticsError: string | null;
  
  // Cache management
  lastUpdated: Date;
  cacheExpiryMinutes: number;
}

// User Actions
export type UserAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  
  // Profile Actions
  | { type: 'SET_CURRENT_USER'; payload: UserProfile | null }
  | { type: 'UPDATE_USER_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'SET_PROFILE_LOADING'; payload: boolean }
  | { type: 'SET_PROFILE_ERROR'; payload: string | null }
  | { type: 'SET_PROFILE_PICTURE_UPLOADING'; payload: boolean }
  
  // Learning Profile Actions
  | { type: 'SET_LEARNING_PROFILE'; payload: LearningProfile | null }
  | { type: 'UPDATE_LEARNING_PROFILE'; payload: Partial<LearningProfile> }
  | { type: 'SET_LEARNING_PROFILE_LOADING'; payload: boolean }
  | { type: 'ADD_ASSESSMENT_RESULT'; payload: any }
  | { type: 'SET_ASSESSMENT_IN_PROGRESS'; payload: boolean }
  
  // Settings Actions
  | { type: 'SET_ACCESSIBILITY_SETTINGS'; payload: AccessibilitySettings | null }
  | { type: 'UPDATE_ACCESSIBILITY_SETTINGS'; payload: Partial<AccessibilitySettings> }
  | { type: 'SET_PRIVACY_SETTINGS'; payload: PrivacySettings | null }
  | { type: 'UPDATE_PRIVACY_SETTINGS'; payload: Partial<PrivacySettings> }
  | { type: 'SET_NOTIFICATION_PREFERENCES'; payload: NotificationPreferences | null }
  | { type: 'UPDATE_NOTIFICATION_PREFERENCES'; payload: Partial<NotificationPreferences> }
  | { type: 'SET_SETTINGS_LOADING'; payload: boolean }
  | { type: 'SET_SETTINGS_ERROR'; payload: string | null }
  
  // Statistics Actions
  | { type: 'SET_USER_STATISTICS'; payload: UserStatistics | null }
  | { type: 'UPDATE_USER_STATISTICS'; payload: Partial<UserStatistics> }
  | { type: 'SET_STATISTICS_LOADING'; payload: boolean }
  | { type: 'SET_STATISTICS_ERROR'; payload: string | null }
  
  // Social Actions
  | { type: 'SET_FRIENDS'; payload: UserProfile[] }
  | { type: 'ADD_FRIEND'; payload: UserProfile }
  | { type: 'REMOVE_FRIEND'; payload: string }
  | { type: 'SET_FRIEND_REQUESTS'; payload: UserState['friendRequests'] }
  | { type: 'ADD_INCOMING_FRIEND_REQUEST'; payload: { from: UserProfile; date: Date } }
  | { type: 'ADD_OUTGOING_FRIEND_REQUEST'; payload: { to: UserProfile; date: Date } }
  | { type: 'REMOVE_FRIEND_REQUEST'; payload: { type: 'incoming' | 'outgoing'; userId: string } }
  | { type: 'SET_FRIENDS_LOADING'; payload: boolean }
  
  // Cache Actions
  | { type: 'UPDATE_CACHE_TIMESTAMP' }
  | { type: 'CLEAR_USER_CACHE' };

// User Context Props
export interface UserContextProps {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  
  // Profile Functions
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  uploadProfilePicture: (imageUri: string) => Promise<string>;
  deleteAccount: () => Promise<void>;
  
  // Learning Profile Functions
  takeLearningAssessment: () => Promise<LearningProfile>;
  processAssessmentResults: (results: any) => Promise<LearningProfile>; // AssessmentResults type from AI service
  updateLearningProfile: (updates: Partial<LearningProfile>) => Promise<void>;
  retakeLearningAssessment: () => Promise<LearningProfile>;
  
  // AI-Powered Functions
  getContentRecommendations: (limit?: number) => Promise<any[]>; // ContentRecommendation[] type from AI service
  generateLearningPath: (duration?: number) => Promise<any>; // LearningPath type from AI service
  
  // Settings Functions
  updateAccessibilitySettings: (updates: Partial<AccessibilitySettings>) => Promise<void>;
  updatePrivacySettings: (updates: Partial<PrivacySettings>) => Promise<void>;
  updateNotificationPreferences: (updates: Partial<NotificationPreferences>) => Promise<void>;
  resetSettingsToDefault: () => Promise<void>;
  
  // Statistics Functions
  getUserStatistics: () => Promise<UserStatistics>;
  refreshStatistics: () => Promise<void>;
  
  // Social Functions
  sendFriendRequest: (userId: string) => Promise<void>;
  acceptFriendRequest: (userId: string) => Promise<void>;
  rejectFriendRequest: (userId: string) => Promise<void>;
  removeFriend: (userId: string) => Promise<void>;
  getFriends: () => Promise<UserProfile[]>;
  
  // Data Management Functions
  exportUserData: () => Promise<string>; // Returns download URL
  requestAccountDeletion: () => Promise<void>;
  
  // Utility Functions
  isProfileComplete: () => boolean;
  needsLearningAssessment: () => boolean;
  hasAccessibilityNeeds: () => boolean;
  getRecommendedSettings: () => Partial<AccessibilitySettings>;
  validateAge: (dateOfBirth: Date) => { isMinor: boolean; age: number };
}

// Business Rule Validation Types
export interface UserValidationRules {
  // BR-PROFILE-001: Learning style assessment
  validateLearningAssessment: (assessment: any) => boolean;
  calculateLearningStyle: (responses: any[]) => LearningProfile['learningStyles'];
  
  // BR-ACCESS-001: Accessibility adaptation
  validateAccessibilitySettings: (settings: AccessibilitySettings) => boolean;
  adaptInterfaceForAccessibility: (settings: AccessibilitySettings) => any;
  
  // BR-PRIVACY-001: Data protection
  validatePrivacySettings: (settings: PrivacySettings, userAge: number) => boolean;
  applyCoppaRestrictions: (settings: PrivacySettings) => PrivacySettings;
}

export default UserState;
