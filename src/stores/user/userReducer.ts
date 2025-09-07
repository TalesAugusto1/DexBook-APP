/**
 * User Reducer
 * Following BR-PROFILE-001: Learning style assessment
 * Following BR-ACCESS-001: Accessibility adaptation
 * Following BR-PRIVACY-001: Data protection
 */

import { UserState, UserAction } from './types';

// Initial user state
export const initialUserState: UserState = {
  // Current user
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  
  // User profiles
  learningProfile: null,
  isLoadingLearningProfile: false,
  
  // Settings
  accessibilitySettings: null,
  privacySettings: null,
  notificationPreferences: null,
  
  // Statistics
  userStatistics: null,
  
  // Profile management
  profileUpdateInProgress: false,
  profilePictureUploading: false,
  
  // Assessment
  assessmentInProgress: false,
  assessmentResults: null,
  
  // Social features
  friends: [],
  friendRequests: {
    incoming: [],
    outgoing: [],
  },
  
  // Loading states
  isLoadingSettings: false,
  isLoadingStatistics: false,
  isLoadingFriends: false,
  
  // Error states
  error: null,
  profileError: null,
  settingsError: null,
  statisticsError: null,
  
  // Cache management
  lastUpdated: new Date(),
  cacheExpiryMinutes: 60,
};

// User reducer function
export function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    // Basic user actions
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
      
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
      
    // Profile Actions
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: !!action.payload,
        profileError: null,
      };
      
    case 'UPDATE_USER_PROFILE':
      if (!state.currentUser) return state;
      
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
        profileError: null,
      };
      
    case 'SET_PROFILE_LOADING':
      return {
        ...state,
        profileUpdateInProgress: action.payload,
      };
      
    case 'SET_PROFILE_ERROR':
      return {
        ...state,
        profileError: action.payload,
        profileUpdateInProgress: false,
      };
      
    case 'SET_PROFILE_PICTURE_UPLOADING':
      return {
        ...state,
        profilePictureUploading: action.payload,
      };
      
    // Learning Profile Actions
    case 'SET_LEARNING_PROFILE':
      return {
        ...state,
        learningProfile: action.payload,
        isLoadingLearningProfile: false,
      };
      
    case 'UPDATE_LEARNING_PROFILE':
      if (!state.learningProfile) return state;
      
      return {
        ...state,
        learningProfile: {
          ...state.learningProfile,
          ...action.payload,
        },
      };
      
    case 'SET_LEARNING_PROFILE_LOADING':
      return {
        ...state,
        isLoadingLearningProfile: action.payload,
      };
      
    case 'ADD_ASSESSMENT_RESULT':
      return {
        ...state,
        assessmentResults: action.payload,
        assessmentInProgress: false,
        learningProfile: state.learningProfile ? {
          ...state.learningProfile,
          assessmentHistory: [
            ...state.learningProfile.assessmentHistory,
            {
              date: new Date(),
              results: action.payload,
            },
          ],
        } : null,
      };
      
    case 'SET_ASSESSMENT_IN_PROGRESS':
      return {
        ...state,
        assessmentInProgress: action.payload,
      };
      
    // Settings Actions
    case 'SET_ACCESSIBILITY_SETTINGS':
      return {
        ...state,
        accessibilitySettings: action.payload,
        settingsError: null,
        isLoadingSettings: false,
      };
      
    case 'UPDATE_ACCESSIBILITY_SETTINGS':
      if (!state.accessibilitySettings) return state;
      
      return {
        ...state,
        accessibilitySettings: {
          ...state.accessibilitySettings,
          ...action.payload,
          lastUpdated: new Date(),
        },
      };
      
    case 'SET_PRIVACY_SETTINGS':
      return {
        ...state,
        privacySettings: action.payload,
        settingsError: null,
        isLoadingSettings: false,
      };
      
    case 'UPDATE_PRIVACY_SETTINGS':
      if (!state.privacySettings) return state;
      
      return {
        ...state,
        privacySettings: {
          ...state.privacySettings,
          ...action.payload,
          lastUpdated: new Date(),
        },
      };
      
    case 'SET_NOTIFICATION_PREFERENCES':
      return {
        ...state,
        notificationPreferences: action.payload,
        settingsError: null,
        isLoadingSettings: false,
      };
      
    case 'UPDATE_NOTIFICATION_PREFERENCES':
      if (!state.notificationPreferences) return state;
      
      return {
        ...state,
        notificationPreferences: {
          ...state.notificationPreferences,
          ...action.payload,
          lastUpdated: new Date(),
        },
      };
      
    case 'SET_SETTINGS_LOADING':
      return {
        ...state,
        isLoadingSettings: action.payload,
      };
      
    case 'SET_SETTINGS_ERROR':
      return {
        ...state,
        settingsError: action.payload,
        isLoadingSettings: false,
      };
      
    // Statistics Actions
    case 'SET_USER_STATISTICS':
      return {
        ...state,
        userStatistics: action.payload,
        statisticsError: null,
        isLoadingStatistics: false,
      };
      
    case 'UPDATE_USER_STATISTICS':
      if (!state.userStatistics) return state;
      
      return {
        ...state,
        userStatistics: {
          ...state.userStatistics,
          ...action.payload,
          lastCalculated: new Date(),
        },
      };
      
    case 'SET_STATISTICS_LOADING':
      return {
        ...state,
        isLoadingStatistics: action.payload,
      };
      
    case 'SET_STATISTICS_ERROR':
      return {
        ...state,
        statisticsError: action.payload,
        isLoadingStatistics: false,
      };
      
    // Social Actions
    case 'SET_FRIENDS':
      return {
        ...state,
        friends: action.payload,
        isLoadingFriends: false,
      };
      
    case 'ADD_FRIEND':
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };
      
    case 'REMOVE_FRIEND':
      return {
        ...state,
        friends: state.friends.filter(friend => friend.id !== action.payload),
      };
      
    case 'SET_FRIEND_REQUESTS':
      return {
        ...state,
        friendRequests: action.payload,
      };
      
    case 'ADD_INCOMING_FRIEND_REQUEST':
      return {
        ...state,
        friendRequests: {
          ...state.friendRequests,
          incoming: [...state.friendRequests.incoming, action.payload],
        },
      };
      
    case 'ADD_OUTGOING_FRIEND_REQUEST':
      return {
        ...state,
        friendRequests: {
          ...state.friendRequests,
          outgoing: [...state.friendRequests.outgoing, action.payload],
        },
      };
      
    case 'REMOVE_FRIEND_REQUEST':
      if (action.payload.type === 'incoming') {
        return {
          ...state,
          friendRequests: {
            ...state.friendRequests,
            incoming: state.friendRequests.incoming.filter(
              request => request.from.id !== action.payload.userId
            ),
          },
        };
      } else {
        return {
          ...state,
          friendRequests: {
            ...state.friendRequests,
            outgoing: state.friendRequests.outgoing.filter(
              request => request.to.id !== action.payload.userId
            ),
          },
        };
      }
      
    case 'SET_FRIENDS_LOADING':
      return {
        ...state,
        isLoadingFriends: action.payload,
      };
      
    // Cache Actions
    case 'UPDATE_CACHE_TIMESTAMP':
      return {
        ...state,
        lastUpdated: new Date(),
      };
      
    case 'CLEAR_USER_CACHE':
      return {
        ...initialUserState,
        currentUser: state.currentUser, // Preserve current user
        isAuthenticated: state.isAuthenticated,
      };
      
    default:
      return state;
  }
}

export default userReducer;
