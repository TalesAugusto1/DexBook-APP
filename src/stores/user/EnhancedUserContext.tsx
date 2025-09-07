/**
 * Enhanced User Context with Firebase Integration
 * Integrates with AuthContext for unified user management
 * Following BR-PROFILE-001: Learning style assessment
 * Following BR-ACCESS-001: Accessibility adaptation
 * Following BR-PRIVACY-001: Data protection
 */

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
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
import { userProfileService, UserProfileServiceError } from '../../services/firebase/user';
import { useAuth } from '../auth/AuthContext';

// Create Enhanced User Context
const EnhancedUserContext = createContext<UserContextProps | undefined>(undefined);

// Enhanced User Provider Component
export const EnhancedUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const { state: authState } = useAuth();

  // Load user data when authentication state changes
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      loadUserData(authState.user.id);
    } else {
      // Clear user data when logged out
      dispatch({ type: 'SET_CURRENT_USER', payload: null });
      dispatch({ type: 'SET_AUTHENTICATED', payload: false });
      dispatch({ type: 'CLEAR_USER_CACHE' });
    }
  }, [authState.isAuthenticated, authState.user]);

  // Load complete user data from Firebase
  const loadUserData = useCallback(async (userId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Load all user data in parallel
      const [
        profile,
        learningProfile,
        accessibilitySettings,
        privacySettings,
        notificationPreferences,
        statistics
      ] = await Promise.all([
        userProfileService.getUserProfile(userId),
        userProfileService.getLearningProfile(userId),
        userProfileService.getAccessibilitySettings(userId),
        userProfileService.getPrivacySettings(userId),
        userProfileService.getNotificationPreferences(userId),
        userProfileService.getUserStatistics(userId),
      ]);

      // Update state with loaded data
      if (profile) {
        dispatch({ type: 'SET_CURRENT_USER', payload: profile });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      }
      
      if (learningProfile) {
        dispatch({ type: 'SET_LEARNING_PROFILE', payload: learningProfile });
      }
      
      if (accessibilitySettings) {
        dispatch({ type: 'SET_ACCESSIBILITY_SETTINGS', payload: accessibilitySettings });
      }
      
      if (privacySettings) {
        dispatch({ type: 'SET_PRIVACY_SETTINGS', payload: privacySettings });
      }
      
      if (notificationPreferences) {
        dispatch({ type: 'SET_NOTIFICATION_PREFERENCES', payload: notificationPreferences });
      }
      
      if (statistics) {
        dispatch({ type: 'SET_USER_STATISTICS', payload: statistics });
      }

      dispatch({ type: 'SET_LOADING', payload: false });
      
    } catch (error) {
      console.error('Error loading user data:', error);
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to load user data';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, []);

  // Profile Functions with Firebase integration
  const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    try {
      dispatch({ type: 'SET_PROFILE_LOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      await userProfileService.updateUserProfile(state.currentUser.id, updates);
      dispatch({ type: 'UPDATE_USER_PROFILE', payload: updates });
      dispatch({ type: 'SET_PROFILE_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to update profile';
      dispatch({ type: 'SET_PROFILE_ERROR', payload: errorMessage });
    }
  }, [state.currentUser]);

  const uploadProfilePicture = useCallback(async (imageUri: string): Promise<string> => {
    try {
      dispatch({ type: 'SET_PROFILE_PICTURE_UPLOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      // Convert image URI to blob (simplified - in real app would handle different platforms)
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      const avatarUrl = await userProfileService.uploadProfilePicture(state.currentUser.id, blob);
      
      dispatch({ 
        type: 'UPDATE_USER_PROFILE', 
        payload: { avatar: avatarUrl } 
      });
      dispatch({ type: 'SET_PROFILE_PICTURE_UPLOADING', payload: false });
      
      return avatarUrl;
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to upload profile picture';
      dispatch({ type: 'SET_PROFILE_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.currentUser]);

  const deleteAccount = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      await userProfileService.deleteUserProfile(state.currentUser.id);
      
      dispatch({ type: 'SET_CURRENT_USER', payload: null });
      dispatch({ type: 'SET_AUTHENTICATED', payload: false });
      dispatch({ type: 'CLEAR_USER_CACHE' });
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to delete account';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, [state.currentUser]);

  // Learning Profile Functions with Firebase integration
  const takeLearningAssessment = useCallback(async (): Promise<LearningProfile> => {
    try {
      dispatch({ type: 'SET_ASSESSMENT_IN_PROGRESS', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      // TODO: Replace with actual assessment logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock assessment results (same as before)
      const assessmentResults = {
        visual: Math.floor(Math.random() * 40) + 60,
        auditory: Math.floor(Math.random() * 40) + 40,
        kinesthetic: Math.floor(Math.random() * 40) + 30,
        reading: Math.floor(Math.random() * 40) + 50,
      };
      
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
        userId: state.currentUser.id,
        learningStyles: assessmentResults,
        primaryLearningStyle: primaryStyle,
        readingLevel: 'intermediate',
        readingSpeed: Math.floor(Math.random() * 100) + 150,
        comprehensionLevel: Math.floor(Math.random() * 30) + 70,
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
      
      // Save to Firebase
      await userProfileService.saveLearningProfile(learningProfile);
      
      dispatch({ type: 'SET_LEARNING_PROFILE', payload: learningProfile });
      dispatch({ type: 'ADD_ASSESSMENT_RESULT', payload: assessmentResults });
      
      return learningProfile;
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Assessment failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.currentUser]);

  const updateLearningProfile = useCallback(async (updates: Partial<LearningProfile>) => {
    try {
      dispatch({ type: 'SET_LEARNING_PROFILE_LOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      await userProfileService.updateLearningProfile(state.currentUser.id, updates);
      dispatch({ type: 'UPDATE_LEARNING_PROFILE', payload: updates });
      dispatch({ type: 'SET_LEARNING_PROFILE_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to update learning profile';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, [state.currentUser]);

  const retakeLearningAssessment = useCallback(async (): Promise<LearningProfile> => {
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
      
      await userProfileService.updateLearningProfile(newProfile.userId, updatedProfile);
      dispatch({ type: 'SET_LEARNING_PROFILE', payload: updatedProfile });
      return updatedProfile;
    }
    
    return newProfile;
  }, [takeLearningAssessment, state.learningProfile]);

  // Settings Functions with Firebase integration
  const updateAccessibilitySettings = useCallback(async (updates: Partial<AccessibilitySettings>) => {
    try {
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      await userProfileService.updateAccessibilitySettings(state.currentUser.id, updates);
      dispatch({ type: 'UPDATE_ACCESSIBILITY_SETTINGS', payload: updates });
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to update accessibility settings';
      dispatch({ type: 'SET_SETTINGS_ERROR', payload: errorMessage });
    }
  }, [state.currentUser]);

  const updatePrivacySettings = useCallback(async (updates: Partial<PrivacySettings>) => {
    try {
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      await userProfileService.updatePrivacySettings(state.currentUser.id, updates);
      dispatch({ type: 'UPDATE_PRIVACY_SETTINGS', payload: updates });
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to update privacy settings';
      dispatch({ type: 'SET_SETTINGS_ERROR', payload: errorMessage });
    }
  }, [state.currentUser]);

  const updateNotificationPreferences = useCallback(async (updates: Partial<NotificationPreferences>) => {
    try {
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      await userProfileService.updateNotificationPreferences(state.currentUser.id, updates);
      dispatch({ type: 'UPDATE_NOTIFICATION_PREFERENCES', payload: updates });
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to update notification preferences';
      dispatch({ type: 'SET_SETTINGS_ERROR', payload: errorMessage });
    }
  }, [state.currentUser]);

  const resetSettingsToDefault = useCallback(async () => {
    try {
      dispatch({ type: 'SET_SETTINGS_LOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      const defaultAccessibilitySettings: AccessibilitySettings = {
        userId: state.currentUser.id,
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
      
      await userProfileService.saveAccessibilitySettings(defaultAccessibilitySettings);
      dispatch({ type: 'SET_ACCESSIBILITY_SETTINGS', payload: defaultAccessibilitySettings });
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to reset settings';
      dispatch({ type: 'SET_SETTINGS_ERROR', payload: errorMessage });
    }
  }, [state.currentUser]);

  // Statistics Functions with Firebase integration
  const getUserStatistics = useCallback(async (): Promise<UserStatistics> => {
    try {
      dispatch({ type: 'SET_STATISTICS_LOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      let statistics = await userProfileService.getUserStatistics(state.currentUser.id);
      
      if (!statistics) {
        // Create initial statistics if none exist
        statistics = {
          userId: state.currentUser.id,
          totalBooksRead: 0,
          totalReadingTime: 0,
          averageReadingSpeed: 200,
          currentReadingStreak: 0,
          longestReadingStreak: 0,
          favoriteGenres: [],
          totalQuizzesTaken: 0,
          averageQuizScore: 0,
          totalConceptsLearned: [],
          learningEfficiency: 0,
          totalARSessions: 0,
          totalARTime: 0,
          favoriteARContent: [],
          arEngagementScore: 0,
          totalPointsEarned: 0,
          currentLevel: 1,
          totalAchievements: 0,
          challengesCompleted: 0,
          totalSessions: 0,
          averageSessionDuration: 0,
          lastActiveDate: new Date(),
          deviceTypes: [],
          mostActiveHour: 12,
          mostActiveDay: 'Monday',
          improvementTrend: 'stable',
          strongAreas: [],
          areasForImprovement: [],
          lastCalculated: new Date(),
        };
        
        await userProfileService.saveUserStatistics(statistics);
      }
      
      dispatch({ type: 'SET_USER_STATISTICS', payload: statistics });
      return statistics;
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to load statistics';
      dispatch({ type: 'SET_STATISTICS_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.currentUser]);

  const refreshStatistics = useCallback(async () => {
    await getUserStatistics();
  }, [getUserStatistics]);

  // Data Management Functions with Firebase integration
  const exportUserData = useCallback(async (): Promise<string> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      const userData = await userProfileService.exportUserData(state.currentUser.id);
      
      // Convert to JSON and create download URL (simplified)
      const dataBlob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const downloadUrl = URL.createObjectURL(dataBlob);
      
      dispatch({ type: 'SET_LOADING', payload: false });
      return downloadUrl;
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to export data';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.currentUser]);

  const requestAccountDeletion = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      if (!state.currentUser) {
        throw new Error('No authenticated user');
      }

      await userProfileService.updatePrivacySettings(state.currentUser.id, {
        accountDeletionRequested: true,
        accountDeletionDate: new Date(),
      });

      dispatch({
        type: 'UPDATE_PRIVACY_SETTINGS',
        payload: {
          accountDeletionRequested: true,
          accountDeletionDate: new Date(),
        },
      });
      
      dispatch({ type: 'SET_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof UserProfileServiceError 
        ? error.message 
        : 'Failed to request account deletion';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, [state.currentUser]);

  // Utility Functions (keep existing implementations)
  const isProfileComplete = useCallback((): boolean => {
    if (!state.currentUser) return false;
    
    const requiredFields = ['email', 'username', 'displayName', 'language'];
    return requiredFields.every(field => state.currentUser![field as keyof UserProfile]);
  }, [state.currentUser]);

  const needsLearningAssessment = useCallback((): boolean => {
    if (!state.learningProfile) return true;
    
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

  // Social Functions (keep existing mock implementations for now)
  const sendFriendRequest = useCallback(async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
      await new Promise(resolve => setTimeout(resolve, 300));
      dispatch({ type: 'REMOVE_FRIEND_REQUEST', payload: { type: 'incoming', userId } });
    } catch (error) {
      console.error('Failed to reject friend request:', error);
    }
  }, []);

  const removeFriend = useCallback(async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      dispatch({ type: 'REMOVE_FRIEND', payload: userId });
    } catch (error) {
      console.error('Failed to remove friend:', error);
    }
  }, []);

  const getFriends = useCallback(async (): Promise<UserProfile[]> => {
    try {
      dispatch({ type: 'SET_FRIENDS_LOADING', payload: true });
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'SET_FRIENDS_LOADING', payload: false });
      return state.friends;
    } catch (error) {
      console.error('Failed to load friends:', error);
      dispatch({ type: 'SET_FRIENDS_LOADING', payload: false });
      return [];
    }
  }, [state.friends]);

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
    <EnhancedUserContext.Provider value={contextValue}>
      {children}
    </EnhancedUserContext.Provider>
  );
};

// Custom hook to use Enhanced User Context
export const useEnhancedUser = () => {
  const context = useContext(EnhancedUserContext);
  
  if (context === undefined) {
    throw new Error('useEnhancedUser must be used within an EnhancedUserProvider');
  }
  
  return context;
};

export default EnhancedUserContext;
