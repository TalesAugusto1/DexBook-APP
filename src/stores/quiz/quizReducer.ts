/**
 * Quiz Reducer
 * Following BR-QUIZ-001: Adaptive quiz creation
 * Following BR-QUIZ-002: Quiz interaction rules
 * Following BR-MULTIMODAL-001: Learning style adaptation
 */

import { QuizState, QuizAction } from './types';

// Initial quiz state
export const initialQuizState: QuizState = {
  // Current quiz session
  currentSession: null,
  
  // Quiz generation
  isGenerating: false,
  generationProgress: 0,
  generationError: null,
  
  // Quiz interaction
  isAnswering: false,
  currentHints: [],
  hintsRemaining: 3,
  timeRemaining: 0,
  
  // Quiz results
  lastResults: null,
  resultsHistory: [],
  
  // User analytics
  analytics: null,
  
  // Quiz bank
  availableQuizzes: [],
  
  // Settings
  settings: {
    defaultTimerEnabled: false,
    defaultHintsEnabled: true,
    defaultSkipEnabled: true,
    audioEnabled: true,
    visualEffectsEnabled: true,
    accessibilityMode: false,
  },
  
  // Loading states
  isLoading: false,
  isLoadingResults: false,
  isLoadingAnalytics: false,
  
  // Error states
  error: null,
  resultsError: null,
  analyticsError: null,
  
  // Cache management
  lastUpdated: new Date(),
  cacheExpiryMinutes: 15,
};

// Quiz reducer function
export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    // Basic quiz actions
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
      
    // Quiz Generation Actions
    case 'START_QUIZ_GENERATION':
      return {
        ...state,
        isGenerating: true,
        generationProgress: 0,
        generationError: null,
      };
      
    case 'UPDATE_GENERATION_PROGRESS':
      return {
        ...state,
        generationProgress: Math.min(100, Math.max(0, action.payload)),
      };
      
    case 'SET_GENERATION_ERROR':
      return {
        ...state,
        generationError: action.payload,
        isGenerating: false,
        generationProgress: 0,
      };
      
    case 'COMPLETE_QUIZ_GENERATION':
      return {
        ...state,
        isGenerating: false,
        generationProgress: 100,
        generationError: null,
      };
      
    // Quiz Session Actions
    case 'START_QUIZ_SESSION':
      return {
        ...state,
        currentSession: {
          sessionId: action.payload.sessionId,
          bookId: action.payload.bookId,
          userId: '', // Will be set from AuthContext
          questions: action.payload.questions,
          answers: [],
          currentQuestionIndex: 0,
          startTime: new Date(),
          totalTimeSeconds: 0,
          
          // Quiz settings
          timerEnabled: state.settings.defaultTimerEnabled,
          hintsEnabled: state.settings.defaultHintsEnabled,
          skipEnabled: state.settings.defaultSkipEnabled,
          reviewEnabled: true,
          
          // Progress tracking
          questionsAnswered: 0,
          questionsCorrect: 0,
          questionsSkipped: 0,
          hintsUsedTotal: 0,
          
          // Scoring
          rawScore: 0,
          percentageScore: 0,
          adjustedScore: 0,
          
          // Learning metrics
          conceptsMastered: [],
          conceptsNeedingWork: [],
          learningStrengths: [],
          learningWeaknesses: [],
          
          // Adaptive metrics
          difficultyProgression: [],
          confidenceProgression: [],
          engagementScore: 10,
        },
        hintsRemaining: 3,
        timeRemaining: 0,
        error: null,
      };
      
    case 'ANSWER_QUESTION':
      if (!state.currentSession) return state;
      
      const updatedAnswers = [...state.currentSession.answers, action.payload];
      const questionsAnswered = updatedAnswers.length;
      const questionsCorrect = updatedAnswers.filter(answer => answer.isCorrect).length;
      const percentageScore = questionsAnswered > 0 ? (questionsCorrect / questionsAnswered) * 100 : 0;
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          answers: updatedAnswers,
          questionsAnswered,
          questionsCorrect,
          percentageScore,
          rawScore: questionsCorrect,
          adjustedScore: questionsCorrect * (action.payload.isCorrect ? 1 : 0),
          hintsUsedTotal: state.currentSession.hintsUsedTotal + action.payload.hintsUsed,
        },
      };
      
    case 'SKIP_QUESTION':
      if (!state.currentSession) return state;
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          questionsSkipped: state.currentSession.questionsSkipped + 1,
        },
      };
      
    case 'USE_HINT':
      if (!state.currentSession) return state;
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          hintsUsedTotal: state.currentSession.hintsUsedTotal + 1,
        },
        hintsRemaining: Math.max(0, state.hintsRemaining - 1),
      };
      
    case 'NEXT_QUESTION':
      if (!state.currentSession) return state;
      
      const nextIndex = Math.min(
        state.currentSession.currentQuestionIndex + 1,
        state.currentSession.questions.length - 1
      );
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          currentQuestionIndex: nextIndex,
        },
        currentHints: [],
        hintsRemaining: 3, // Reset hints for new question
      };
      
    case 'PREVIOUS_QUESTION':
      if (!state.currentSession) return state;
      
      const prevIndex = Math.max(0, state.currentSession.currentQuestionIndex - 1);
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          currentQuestionIndex: prevIndex,
        },
        currentHints: [],
        hintsRemaining: 3, // Reset hints for previous question
      };
      
    case 'COMPLETE_QUIZ_SESSION':
      return {
        ...state,
        currentSession: state.currentSession ? {
          ...state.currentSession,
          endTime: new Date(),
        } : null,
        lastResults: action.payload,
        resultsHistory: [action.payload, ...state.resultsHistory.slice(0, 19)],
      };
      
    case 'PAUSE_QUIZ_SESSION':
      return {
        ...state,
        isAnswering: false,
      };
      
    case 'RESUME_QUIZ_SESSION':
      return {
        ...state,
        isAnswering: true,
      };
      
    case 'END_QUIZ_SESSION':
      return {
        ...state,
        currentSession: null,
        currentHints: [],
        hintsRemaining: 3,
        timeRemaining: 0,
        isAnswering: false,
      };
      
    // Timer Actions
    case 'START_TIMER':
      return {
        ...state,
        timeRemaining: action.payload,
      };
      
    case 'UPDATE_TIMER':
      return {
        ...state,
        timeRemaining: Math.max(0, action.payload),
      };
      
    case 'PAUSE_TIMER':
      return state; // Timer logic handled externally
      
    case 'RESUME_TIMER':
      return state; // Timer logic handled externally
      
    case 'STOP_TIMER':
      return {
        ...state,
        timeRemaining: 0,
      };
      
    // Hint System Actions
    case 'LOAD_HINTS':
      return {
        ...state,
        currentHints: action.payload.hints,
      };
      
    case 'SET_HINTS_REMAINING':
      return {
        ...state,
        hintsRemaining: action.payload,
      };
      
    case 'CLEAR_CURRENT_HINTS':
      return {
        ...state,
        currentHints: [],
      };
      
    // Results Actions
    case 'SET_QUIZ_RESULTS':
      return {
        ...state,
        lastResults: action.payload,
        resultsError: null,
        isLoadingResults: false,
      };
      
    case 'SET_RESULTS_LOADING':
      return {
        ...state,
        isLoadingResults: action.payload,
      };
      
    case 'SET_RESULTS_ERROR':
      return {
        ...state,
        resultsError: action.payload,
        isLoadingResults: false,
      };
      
    case 'ADD_TO_RESULTS_HISTORY':
      return {
        ...state,
        resultsHistory: [action.payload, ...state.resultsHistory.slice(0, 19)],
      };
      
    case 'CLEAR_RESULTS':
      return {
        ...state,
        lastResults: null,
        resultsError: null,
      };
      
    // Analytics Actions
    case 'SET_QUIZ_ANALYTICS':
      return {
        ...state,
        analytics: action.payload,
        analyticsError: null,
        isLoadingAnalytics: false,
      };
      
    case 'UPDATE_ANALYTICS':
      return {
        ...state,
        analytics: state.analytics ? {
          ...state.analytics,
          ...action.payload,
        } : null,
      };
      
    case 'SET_ANALYTICS_LOADING':
      return {
        ...state,
        isLoadingAnalytics: action.payload,
      };
      
    case 'SET_ANALYTICS_ERROR':
      return {
        ...state,
        analyticsError: action.payload,
        isLoadingAnalytics: false,
      };
      
    // Settings Actions
    case 'UPDATE_QUIZ_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
      
    case 'TOGGLE_TIMER_ENABLED':
      return {
        ...state,
        settings: {
          ...state.settings,
          defaultTimerEnabled: !state.settings.defaultTimerEnabled,
        },
      };
      
    case 'TOGGLE_HINTS_ENABLED':
      return {
        ...state,
        settings: {
          ...state.settings,
          defaultHintsEnabled: !state.settings.defaultHintsEnabled,
        },
      };
      
    case 'TOGGLE_SKIP_ENABLED':
      return {
        ...state,
        settings: {
          ...state.settings,
          defaultSkipEnabled: !state.settings.defaultSkipEnabled,
        },
      };
      
    case 'TOGGLE_AUDIO_ENABLED':
      return {
        ...state,
        settings: {
          ...state.settings,
          audioEnabled: !state.settings.audioEnabled,
        },
      };
      
    case 'TOGGLE_ACCESSIBILITY_MODE':
      return {
        ...state,
        settings: {
          ...state.settings,
          accessibilityMode: !state.settings.accessibilityMode,
        },
      };
      
    // Cache Management Actions
    case 'UPDATE_CACHE_TIMESTAMP':
      return {
        ...state,
        lastUpdated: new Date(),
      };
      
    case 'CLEAR_QUIZ_CACHE':
      return {
        ...initialQuizState,
        settings: state.settings, // Preserve user settings
      };
      
    default:
      return state;
  }
}

export default quizReducer;
