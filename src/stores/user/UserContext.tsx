/**
 * User Context
 * Following BR-PROFILE-001: Learning style assessment
 * Following BR-ACCESS-001: Accessibility adaptation
 * Following BR-PRIVACY-001: Data protection
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { 
  UserState, 
  UserAction, 
  UserContextProps, 
  UserProfile,
  LearningProfile,
  AccessibilitySettings,
  PrivacySettings,
  NotificationPreferences,
  UserStatistics
} from './types';
import { userReducer, initialUserState } from './userReducer';

// Create User Context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// User Provider Component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  // Profile Functions
  const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    try {
      dispatch({ type: 'SET_PROFILE_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'UPDATE_USER_PROFILE', payload: updates });
      dispatch({ type: 'SET_PROFILE_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      dispatch({ type: 'SET_PROFILE_ERROR', payload: errorMessage });
    }
  }, []);

  const uploadProfilePicture = useCallback(async (imageUri: string): Promise<string> => {
    try {
      dispatch({ type: 'SET_PROFILE_PICTURE_UPLOADING', payload: true });
      
      // TODO: Replace with actual Firebase Storage upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAvatarUrl = `https://example.com/avatars/${Date.now()}.jpg`;
      
      dispatch({ 
        type: 'UPDATE_USER_PROFILE', 
        payload: { avatar: mockAvatarUrl } 
      });
      dispatch({ type: 'SET_PROFILE_PICTURE_UPLOADING', payload: false });
      
      return mockAvatarUrl;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload profile picture';
      dispatch({ type: 'SET_PROFILE_ERROR', payload: errorMessage });
      throw error;
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // TODO: Replace with actual account deletion logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch({ type: 'SET_CURRENT_USER', payload: null });
      dispatch({ type: 'SET_AUTHENTICATED', payload: false });
      dispatch({ type: 'CLEAR_USER_CACHE' });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete account';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, []);

  // Learning Profile Functions
  const takeLearningAssessment = useCallback(async (): Promise<LearningProfile> => {
    try {
      dispatch({ type: 'SET_ASSESSMENT_IN_PROGRESS', payload: true });
      
      // TODO: Replace with actual assessment logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock assessment results
      const assessmentResults = {
        visual: Math.floor(Math.random() * 40) + 60, // 60-100
        auditory: Math.floor(Math.random() * 40) + 40, // 40-80
        kinesthetic: Math.floor(Math.random() * 40) + 30, // 30-70
        reading: Math.floor(Math.random() * 40) + 50, // 50-90
      };
      
      // Determine primary learning style
      let primaryStyle: LearningProfile['primaryLearningStyle'] = 'visual';
      let maxScore = assessmentResults.visual;
      
      if (assessmentResults.auditory > maxScore) {
        maxScore = assessmentResults.auditory;
        primaryStyle = 'auditory';
      }
      if (assessmentResults.kinesthetic > maxScore) {
        maxScore = assessmentResults.kinesthetic;
        primaryStyle = 'kinesthetic';
      }
      if (assessmentResults.reading > maxScore) {
        maxScore = assessmentResults.reading;
        primaryStyle = 'reading';
      }
      
      const learningProfile: LearningProfile = {
        userId: state.currentUser?.id || '',
        learningStyles: assessmentResults,
        primaryLearningStyle: primaryStyle,
        readingLevel: 'intermediate',
        readingSpeed: Math.floor(Math.random() * 100) + 150, // 150-250 WPM
        comprehensionLevel: Math.floor(Math.random() * 30) + 70, // 70-100
        favoriteGenres: ['Fantasy', 'Science Fiction'],
        favoriteSubjects: ['Literature', 'Science'],
        interests: ['Adventure', 'Technology', 'Nature'],
        dislikedTopics: [],
        dailyReadingGoal: 30,
        weeklyBookGoal: 2,
        currentGoals: [],
        preferredDifficulty: 'adaptive',
        timerPreference: false,
        hintsPreference: true,
        audioNarrationPreference: primaryStyle === 'auditory',
        assessmentDate: new Date(),
        assessmentHistory: [],
      };
      
      dispatch({ type: 'SET_LEARNING_PROFILE', payload: learningProfile });
      dispatch({ type: 'ADD_ASSESSMENT_RESULT', payload: assessmentResults });
      
      return learningProfile;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Assessment failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.currentUser?.id]);

  const updateLearningProfile = useCallback(async (updates: Partial<LearningProfile>) => {
    try {
      dispatch({ type: 'SET_LEARNING_PROFILE_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'UPDATE_LEARNING_PROFILE', payload: updates });
      dispatch({ type: 'SET_LEARNING_PROFILE_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update learning profile';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, []);

  const retakeLearningAssessment = useCallback(async (): Promise<LearningProfile> => {
    // Same as takeLearningAssessment but updates existing profile
    const newProfile = await takeLearningAssessment();
    
    if (state.learningProfile) {
      const updatedProfile = {
        ...newProfile,
        lastReassessment: new Date(),
        assessmentHistory: [
          ...state.learningProfile.assessmentHistory,
          {
            date: new Date(),
            results: newProfile.learningStyles,
          },
        ],
      };
      
      dispatch({ type: 'SET_LEARNING_PROFILE', payload: updatedProfile });
      return updatedProfile;
    }
    
    return newProfile;
  }, [takeLearningAssessment, state.learningProfile]);

  // Settings Functions
  const updateAccessibilitySettings = useCallback(async (updates: Partial<AccessibilitySettings>) => {
    try {
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      dispatch({ type: 'UPDATE_ACCESSIBILITY_SETTINGS', payload: updates });
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update accessibility settings';
      dispatch({ type: 'SET_SETTINGS_ERROR', payload: errorMessage });
    }
  }, []);

  const updatePrivacySettings = useCallback(async (updates: Partial<PrivacySettings>) => {
    try {
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      dispatch({ type: 'UPDATE_PRIVACY_SETTINGS', payload: updates });
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update privacy settings';
      dispatch({ type: 'SET_SETTINGS_ERROR', payload: errorMessage });
    }
  }, []);

  const updateNotificationPreferences = useCallback(async (updates: Partial<NotificationPreferences>) => {
    try {
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      dispatch({ type: 'UPDATE_NOTIFICATION_PREFERENCES', payload: updates });
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update notification preferences';
      dispatch({ type: 'SET_SETTINGS_ERROR', payload: errorMessage });
    }
  }, []);

  const resetSettingsToDefault = useCallback(async () => {
    try {
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: true });
      
      // TODO: Load default settings from configuration
      const defaultAccessibilitySettings: AccessibilitySettings = {
        userId: state.currentUser?.id || '',
        fontSize: 'medium',
        fontFamily: 'default',
        colorContrast: 'standard',
        colorBlindnessAdjustment: false,
        screenReaderEnabled: false,
        voiceOverEnabled: false,
        audioDescriptionsEnabled: false,
        soundEffectsEnabled: true,
        backgroundMusicEnabled: true,
        audioVolume: 75,
        narrationSpeed: 1.0,
        narrationVoice: 'female',
        touchTargetSize: 'medium',
        gestureAlternatives: false,
        voiceControlEnabled: false,
        switchControlEnabled: false,
        dwellTimeControl: false,
        dwellTime: 1000,
        adhd: {
          focusModeEnabled: false,
          distractionReduction: false,
          movementBreaksEnabled: false,
          movementBreakInterval: 30,
          simplifiedInterface: false,
        },
        dyslexia: {
          dyslexiaFriendlyFont: false,
          lineSpacing: 1.5,
          letterSpacing: 0,
          wordSpacing: 0,
          readingRuler: false,
          syllableHighlighting: false,
        },
        autism: {
          predictableNavigation: false,
          reducedAnimations: false,
          consistentLayout: false,
          clearInstructions: false,
          sensoryFriendlyMode: false,
        },
        hapticFeedbackEnabled: true,
        hapticIntensity: 50,
        motionSensitivity: false,
        reducedMotion: false,
        emergencyModeEnabled: false,
        assistiveTechnologyConnected: [],
        customKeyboardShortcuts: {},
        processingTime: 30,
        breakReminders: false,
        breakReminderInterval: 60,
        encouragementLevel: 'moderate',
        lastUpdated: new Date(),
      };
      
      dispatch({ type: 'SET_ACCESSIBILITY_SETTINGS', payload: defaultAccessibilitySettings });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reset settings';
      dispatch({ type: 'SET_SETTINGS_ERROR', payload: errorMessage });
    }
  }, [state.currentUser?.id]);

  // Statistics Functions
  const getUserStatistics = useCallback(async (): Promise<UserStatistics> => {
    try {
      dispatch({ type: 'SET_STATISTICS_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock statistics data
      const mockStatistics: UserStatistics = {
        userId: state.currentUser?.id || '',
        totalBooksRead: 25,
        totalReadingTime: 1500, // 25 hours
        averageReadingSpeed: 220,
        currentReadingStreak: 7,
        longestReadingStreak: 15,
        favoriteGenres: [
          { genre: 'Fantasy', count: 8 },
          { genre: 'Science Fiction', count: 6 },
          { genre: 'Mystery', count: 4 },
        ],
        totalQuizzesTaken: 45,
        averageQuizScore: 87,
        totalConceptsLearned: ['Character Development', 'Plot Structure', 'Theme Analysis'],
        learningEfficiency: 92,
        totalARSessions: 18,
        totalARTime: 320, // 5.3 hours
        favoriteARContent: ['Character Models', 'Interactive Maps'],
        arEngagementScore: 89,
        totalPointsEarned: 3500,
        currentLevel: 8,
        totalAchievements: 15,
        challengesCompleted: 4,
        totalSessions: 156,
        averageSessionDuration: 28,
        lastActiveDate: new Date(),
        deviceTypes: ['mobile', 'tablet'],
        mostActiveHour: 19, // 7 PM
        mostActiveDay: 'Saturday',
        improvementTrend: 'improving',
        strongAreas: ['Reading Comprehension', 'AR Interaction'],
        areasForImprovement: ['Quiz Speed', 'Vocabulary'],
        lastCalculated: new Date(),
      };
      
      dispatch({ type: 'SET_USER_STATISTICS', payload: mockStatistics });
      return mockStatistics;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load statistics';
      dispatch({ type: 'SET_STATISTICS_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.currentUser?.id]);

  const refreshStatistics = useCallback(async () => {
    await getUserStatistics();
  }, [getUserStatistics]);

  // Social Functions
  const sendFriendRequest = useCallback(async (userId: string) => {
    try {
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock friend profile
      const mockFriend: UserProfile = {
        id: userId,
        email: `user${userId}@example.com`,
        username: `user${userId}`,
        displayName: `User ${userId}`,
        language: 'en',
        coppaCompliant: false,
        parentConsent: false,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
        isVerified: true,
        subscriptionType: 'free',
      };
      
      dispatch({
        type: 'ADD_OUTGOING_FRIEND_REQUEST',
        payload: { to: mockFriend, date: new Date() },
      });
      
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  }, []);

  const acceptFriendRequest = useCallback(async (userId: string) => {
    try {
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find the friend request
      const request = state.friendRequests.incoming.find(req => req.from.id === userId);
      if (request) {
        dispatch({ type: 'ADD_FRIEND', payload: request.from });
        dispatch({ type: 'REMOVE_FRIEND_REQUEST', payload: { type: 'incoming', userId } });
      }
      
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    }
  }, [state.friendRequests.incoming]);

  const rejectFriendRequest = useCallback(async (userId: string) => {
    try {
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      dispatch({ type: 'REMOVE_FRIEND_REQUEST', payload: { type: 'incoming', userId } });
      
    } catch (error) {
      console.error('Failed to reject friend request:', error);
    }
  }, []);

  const removeFriend = useCallback(async (userId: string) => {
    try {
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      dispatch({ type: 'REMOVE_FRIEND', payload: userId });
      
    } catch (error) {
      console.error('Failed to remove friend:', error);
    }
  }, []);

  const getFriends = useCallback(async (): Promise<UserProfile[]> => {
    try {
      dispatch({ type: 'SET_FRIENDS_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return current friends
      dispatch({ type: 'SET_FRIENDS_LOADING', payload: false });
      return state.friends;
      
    } catch (error) {
      console.error('Failed to load friends:', error);
      dispatch({ type: 'SET_FRIENDS_LOADING', payload: false });
      return [];
    }
  }, [state.friends]);

  // Data Management Functions
  const exportUserData = useCallback(async (): Promise<string> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // TODO: Replace with actual data export logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockDownloadUrl = `https://example.com/exports/${state.currentUser?.id}_${Date.now()}.json`;
      
      dispatch({ type: 'SET_LOADING', payload: false });
      return mockDownloadUrl;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to export data';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.currentUser?.id]);

  const requestAccountDeletion = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // TODO: Replace with actual account deletion request logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({
        type: 'UPDATE_PRIVACY_SETTINGS',
        payload: {
          accountDeletionRequested: true,
          accountDeletionDate: new Date(),
        },
      });
      
      dispatch({ type: 'SET_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to request account deletion';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, []);

  // Utility Functions
  const isProfileComplete = useCallback((): boolean => {
    if (!state.currentUser) return false;
    
    const requiredFields = ['email', 'username', 'displayName', 'language'];
    return requiredFields.every(field => state.currentUser![field as keyof UserProfile]);
  }, [state.currentUser]);

  const needsLearningAssessment = useCallback((): boolean => {
    if (!state.learningProfile) return true;
    
    // Check if assessment is older than 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    return state.learningProfile.assessmentDate < sixMonthsAgo;
  }, [state.learningProfile]);

  const hasAccessibilityNeeds = useCallback((): boolean => {
    if (!state.accessibilitySettings) return false;
    
    return (
      state.accessibilitySettings.screenReaderEnabled ||
      state.accessibilitySettings.voiceOverEnabled ||
      state.accessibilitySettings.adhd.focusModeEnabled ||
      state.accessibilitySettings.dyslexia.dyslexiaFriendlyFont ||
      state.accessibilitySettings.autism.sensoryFriendlyMode ||
      state.accessibilitySettings.colorBlindnessAdjustment
    );
  }, [state.accessibilitySettings]);

  const getRecommendedSettings = useCallback((): Partial<AccessibilitySettings> => {
    const recommendations: Partial<AccessibilitySettings> = {};
    
    // Base recommendations on learning profile
    if (state.learningProfile) {
      if (state.learningProfile.primaryLearningStyle === 'auditory') {
        recommendations.audioDescriptionsEnabled = true;
        recommendations.soundEffectsEnabled = true;
      }
      
      if (state.learningProfile.primaryLearningStyle === 'visual') {
        recommendations.fontSize = 'large';
        recommendations.colorContrast = 'high';
      }
    }
    
    return recommendations;
  }, [state.learningProfile]);

  const validateAge = useCallback((dateOfBirth: Date): { isMinor: boolean; age: number } => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return {
      isMinor: age < 18,
      age,
    };
  }, []);

  // Context value
  const contextValue: UserContextProps = {
    state,
    dispatch,
    
    // Profile Functions
    updateUserProfile,
    uploadProfilePicture,
    deleteAccount,
    
    // Learning Profile Functions
    takeLearningAssessment,
    updateLearningProfile,
    retakeLearningAssessment,
    
    // Settings Functions
    updateAccessibilitySettings,
    updatePrivacySettings,
    updateNotificationPreferences,
    resetSettingsToDefault,
    
    // Statistics Functions
    getUserStatistics,
    refreshStatistics,
    
    // Social Functions
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    getFriends,
    
    // Data Management Functions
    exportUserData,
    requestAccountDeletion,
    
    // Utility Functions
    isProfileComplete,
    needsLearningAssessment,
    hasAccessibilityNeeds,
    getRecommendedSettings,
    validateAge,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use User Context
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};

export default UserContext;
