/**
 * User Types for AR Book Explorer
 * 
 * TypeScript type definitions for user data and preferences.
 */

export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  grade: string;
  avatar: string | null;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  accessibilityLevel: number; // 1-5 scale
  notifications: boolean;
  language?: string;
  timezone?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  interests: string[];
  learningGoals: string[];
  achievements: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  bookId: string;
  progress: number; // 0-100
  timeSpent: number; // in minutes
  lastReadAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
