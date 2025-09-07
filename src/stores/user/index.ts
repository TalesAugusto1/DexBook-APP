/**
 * User Store Index
 * Following BR-PROFILE-001: Learning style assessment
 * Following BR-ACCESS-001: Accessibility adaptation
 * Clean exports for user management functionality
 */

// Core user context and provider
export { UserProvider, useUser } from './UserContext';
export { userReducer, initialUserState } from './userReducer';

// Types and interfaces
export type {
  UserProfile,
  LearningProfile,
  AccessibilitySettings,
  PrivacySettings,
  NotificationPreferences,
  UserStatistics,
  UserState,
  UserAction,
  UserContextProps,
  UserValidationRules,
} from './types';

// Default export
export { default as UserContext } from './UserContext';
