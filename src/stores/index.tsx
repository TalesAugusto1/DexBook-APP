/**
 * Main Store Configuration for AR Book Explorer
 * 
 * Exports all Context providers and hooks.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 * Using Context API + useReducer pattern for state management.
 */

import React from 'react';

// Authentication Context
export { AuthProvider, useAuth } from './auth';
export type { AuthState, AuthAction, AuthContextType } from './auth';

// Book Management Context
export { BookProvider, useBook } from './book';
export type { 
  BookState, 
  BookAction, 
  BookContextProps, 
  Book, 
  BookProgress, 
  BookRecognition,
  ReadingSession 
} from './book';

// Quiz Management Context
export { QuizProvider, useQuiz } from './quiz';
export type { 
  QuizState, 
  QuizAction, 
  QuizContextProps, 
  QuizQuestion, 
  QuizSession, 
  QuizResults,
  QuizAnalytics 
} from './quiz';

// AR Management Context
export { ARProvider, useAR } from './ar';
export type { 
  ARState, 
  ARAction, 
  ARContextProps, 
  ARContent, 
  ARSession, 
  AR3DModel,
  ARInteraction 
} from './ar';

// Gamification Context
export { GamificationProvider, useGamification } from './gamification';
export type { 
  GamificationState, 
  GamificationAction, 
  GamificationContextProps, 
  Achievement, 
  Reward, 
  PointsTransaction,
  LeaderboardEntry 
} from './gamification';

// User Management Context
export { UserProvider, useUser } from './user';
export { EnhancedUserProvider, useEnhancedUser } from './user/EnhancedUserContext';
export type { 
  UserState, 
  UserAction, 
  UserContextProps, 
  UserProfile, 
  LearningProfile, 
  AccessibilitySettings,
  PrivacySettings 
} from './user';

// Import providers for StoreProvider
import { AuthProvider, useAuth } from './auth';
import { BookProvider, useBook } from './book';
import { QuizProvider, useQuiz } from './quiz';
import { ARProvider, useAR } from './ar';
import { GamificationProvider, useGamification } from './gamification';
import { EnhancedUserProvider, useEnhancedUser } from './user/EnhancedUserContext';

// Combined Provider Component for easy app-wide setup
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <EnhancedUserProvider>
        <BookProvider>
          <QuizProvider>
            <ARProvider>
              <GamificationProvider>
                {children}
              </GamificationProvider>
            </ARProvider>
          </QuizProvider>
        </BookProvider>
      </EnhancedUserProvider>
    </AuthProvider>
  );
};

// Utility hooks for accessing multiple contexts
export const useAppState = () => {
  const auth = useAuth();
  const book = useBook();
  const quiz = useQuiz();
  const ar = useAR();
  const gamification = useGamification();
  const user = useEnhancedUser();
  
  return {
    auth,
    book,
    quiz,
    ar,
    gamification,
    user,
  };
};