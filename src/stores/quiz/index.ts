/**
 * Quiz Store Index
 * Following BR-QUIZ-001: Adaptive quiz creation
 * Following BR-QUIZ-002: Quiz interaction rules
 * Clean exports for quiz management functionality
 */

// Core quiz context and provider
export { QuizProvider, useQuiz } from './QuizContext';
export { quizReducer, initialQuizState } from './quizReducer';

// Types and interfaces
export type {
  QuizQuestion,
  QuizAnswer,
  QuizSession,
  QuizResults,
  QuizGenerationParams,
  QuizHint,
  QuizAnalytics,
  QuizState,
  QuizAction,
  QuizContextProps,
  QuizValidationRules,
} from './types';

// Default export
export { default as QuizContext } from './QuizContext';

