/**
 * Quiz Store Types
 * Following BR-QUIZ-001: Adaptive quiz creation
 * Following BR-QUIZ-002: Quiz interaction rules
 * Following BR-MULTIMODAL-001: Learning style adaptation
 */

// Quiz Question Types
export interface QuizQuestion {
  id: string;
  bookId: string;
  questionText: string;
  questionType: 'multiple_choice' | 'true_false' | 'fill_blank' | 'visual' | 'audio' | 'interactive';
  options: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'universal';
  keyConceptsTargeted: string[];
  estimatedTimeSeconds: number;
  
  // Multimedia content
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  interactiveElements?: {
    type: 'drag_drop' | 'tap_sequence' | 'gesture';
    data: any;
  };
  
  // Accessibility features
  screenReaderText?: string;
  altText?: string;
  captions?: string[];
}

// Quiz Answer Types
export interface QuizAnswer {
  questionId: string;
  userAnswer: string | number;
  isCorrect: boolean;
  timeSpentSeconds: number;
  hintsUsed: number;
  attempts: number;
  confidence: 'low' | 'medium' | 'high';
  answeredAt: Date;
}

// Quiz Session Types
export interface QuizSession {
  sessionId: string;
  bookId: string;
  userId: string;
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  currentQuestionIndex: number;
  startTime: Date;
  endTime?: Date;
  totalTimeSeconds: number;
  
  // Quiz settings
  timerEnabled: boolean;
  hintsEnabled: boolean;
  skipEnabled: boolean;
  reviewEnabled: boolean;
  
  // Progress tracking
  questionsAnswered: number;
  questionsCorrect: number;
  questionsSkipped: number;
  hintsUsedTotal: number;
  
  // Scoring
  rawScore: number;
  percentageScore: number;
  adjustedScore: number; // Accounting for difficulty and time
  
  // Learning metrics
  conceptsMastered: string[];
  conceptsNeedingWork: string[];
  learningStrengths: string[];
  learningWeaknesses: string[];
  
  // Adaptive metrics
  difficultyProgression: ('easy' | 'medium' | 'hard')[];
  confidenceProgression: ('low' | 'medium' | 'high')[];
  engagementScore: number; // 1-10 scale
}

// Quiz Results Types
export interface QuizResults {
  sessionId: string;
  bookId: string;
  userId: string;
  completedAt: Date;
  
  // Performance metrics
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
  percentageScore: number;
  timeBonus: number;
  finalScore: number;
  
  // Learning analysis
  comprehensionLevel: 'excellent' | 'good' | 'fair' | 'needs_improvement';
  keyConcepts: {
    concept: string;
    mastery: 'mastered' | 'learning' | 'struggling';
    examples: string[];
  }[];
  
  // Recommendations
  nextSteps: string[];
  recommendedBooks: string[];
  skillsToImprove: string[];
  
  // Achievement triggers
  achievementsEarned: string[];
  pointsEarned: number;
  badgesUnlocked: string[];
  
  // Feedback
  encouragingMessage: string;
  improvementTips: string[];
  parentTeacherSummary: string;
}

// Quiz Generation Types
export interface QuizGenerationParams {
  bookId: string;
  userId: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  readingLevel: 'beginner' | 'intermediate' | 'advanced';
  focusAreas?: string[];
  difficulty: 'adaptive' | 'easy' | 'medium' | 'hard';
  questionCount: number;
  timeLimit?: number;
  includeMultimedia: boolean;
  accessibilityFeatures: string[];
}

// Hint System Types
export interface QuizHint {
  questionId: string;
  hintLevel: 1 | 2 | 3;
  hintText: string;
  hintType: 'text' | 'image' | 'audio' | 'interactive';
  mediaUrl?: string;
  pointDeduction: number;
}

// Quiz Analytics Types
export interface QuizAnalytics {
  userId: string;
  totalQuizzesTaken: number;
  averageScore: number;
  improvementTrend: 'improving' | 'stable' | 'declining';
  strongConcepts: string[];
  weakConcepts: string[];
  preferredQuestionTypes: string[];
  averageTimePerQuestion: number;
  hintsUsagePattern: 'frequent' | 'moderate' | 'rare';
  
  // Learning insights
  learningVelocity: number; // Concepts mastered per week
  retentionRate: number; // Percentage of concepts retained
  engagementPattern: 'consistent' | 'sporadic' | 'declining';
  optimalStudyTime: string; // Best time of day for learning
}

// Quiz State
export interface QuizState {
  // Current quiz session
  currentSession: QuizSession | null;
  
  // Quiz generation
  isGenerating: boolean;
  generationProgress: number;
  generationError: string | null;
  
  // Quiz interaction
  isAnswering: boolean;
  currentHints: QuizHint[];
  hintsRemaining: number;
  timeRemaining: number;
  
  // Quiz results
  lastResults: QuizResults | null;
  resultsHistory: QuizResults[];
  
  // User analytics
  analytics: QuizAnalytics | null;
  
  // Quiz bank
  availableQuizzes: {
    bookId: string;
    questionsCount: number;
    lastGenerated: Date;
    difficulty: string;
  }[];
  
  // Settings
  settings: {
    defaultTimerEnabled: boolean;
    defaultHintsEnabled: boolean;
    defaultSkipEnabled: boolean;
    audioEnabled: boolean;
    visualEffectsEnabled: boolean;
    accessibilityMode: boolean;
  };
  
  // Loading states
  isLoading: boolean;
  isLoadingResults: boolean;
  isLoadingAnalytics: boolean;
  
  // Error states
  error: string | null;
  resultsError: string | null;
  analyticsError: string | null;
  
  // Cache management
  lastUpdated: Date;
  cacheExpiryMinutes: number;
}

// Quiz Actions
export type QuizAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  
  // Quiz Generation Actions
  | { type: 'START_QUIZ_GENERATION'; payload: QuizGenerationParams }
  | { type: 'UPDATE_GENERATION_PROGRESS'; payload: number }
  | { type: 'SET_GENERATION_ERROR'; payload: string }
  | { type: 'COMPLETE_QUIZ_GENERATION'; payload: QuizQuestion[] }
  
  // Quiz Session Actions
  | { type: 'START_QUIZ_SESSION'; payload: { questions: QuizQuestion[]; sessionId: string; bookId: string } }
  | { type: 'ANSWER_QUESTION'; payload: QuizAnswer }
  | { type: 'SKIP_QUESTION'; payload: string }
  | { type: 'USE_HINT'; payload: { questionId: string; hintLevel: 1 | 2 | 3 } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'COMPLETE_QUIZ_SESSION'; payload: QuizResults }
  | { type: 'PAUSE_QUIZ_SESSION' }
  | { type: 'RESUME_QUIZ_SESSION' }
  | { type: 'END_QUIZ_SESSION' }
  
  // Quiz Timer Actions
  | { type: 'START_TIMER'; payload: number }
  | { type: 'UPDATE_TIMER'; payload: number }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESUME_TIMER' }
  | { type: 'STOP_TIMER' }
  
  // Hint System Actions
  | { type: 'LOAD_HINTS'; payload: { questionId: string; hints: QuizHint[] } }
  | { type: 'SET_HINTS_REMAINING'; payload: number }
  | { type: 'CLEAR_CURRENT_HINTS' }
  
  // Results Actions
  | { type: 'SET_QUIZ_RESULTS'; payload: QuizResults }
  | { type: 'SET_RESULTS_LOADING'; payload: boolean }
  | { type: 'SET_RESULTS_ERROR'; payload: string | null }
  | { type: 'ADD_TO_RESULTS_HISTORY'; payload: QuizResults }
  | { type: 'CLEAR_RESULTS' }
  
  // Analytics Actions
  | { type: 'SET_QUIZ_ANALYTICS'; payload: QuizAnalytics }
  | { type: 'UPDATE_ANALYTICS'; payload: Partial<QuizAnalytics> }
  | { type: 'SET_ANALYTICS_LOADING'; payload: boolean }
  | { type: 'SET_ANALYTICS_ERROR'; payload: string | null }
  
  // Settings Actions
  | { type: 'UPDATE_QUIZ_SETTINGS'; payload: Partial<QuizState['settings']> }
  | { type: 'TOGGLE_TIMER_ENABLED' }
  | { type: 'TOGGLE_HINTS_ENABLED' }
  | { type: 'TOGGLE_SKIP_ENABLED' }
  | { type: 'TOGGLE_AUDIO_ENABLED' }
  | { type: 'TOGGLE_ACCESSIBILITY_MODE' }
  
  // Cache Management Actions
  | { type: 'UPDATE_CACHE_TIMESTAMP' }
  | { type: 'CLEAR_QUIZ_CACHE' };

// Quiz Context Props
export interface QuizContextProps {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
  
  // Quiz Generation Functions
  generateQuiz: (params: QuizGenerationParams) => Promise<void>;
  cancelGeneration: () => void;
  
  // Quiz Session Functions
  startQuizSession: (bookId: string, questions: QuizQuestion[]) => void;
  answerQuestion: (answer: QuizAnswer) => void;
  skipQuestion: (questionId: string) => void;
  useHint: (questionId: string, hintLevel: 1 | 2 | 3) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeQuiz: () => Promise<QuizResults>;
  pauseQuiz: () => void;
  resumeQuiz: () => void;
  endQuiz: () => void;
  
  // Timer Functions
  startTimer: (seconds: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => void;
  
  // Results Functions
  getQuizResults: (sessionId: string) => Promise<QuizResults>;
  clearResults: () => void;
  
  // Analytics Functions
  getAnalytics: (userId: string) => Promise<QuizAnalytics>;
  updateAnalytics: (updates: Partial<QuizAnalytics>) => void;
  
  // Utility Functions
  getCurrentQuestion: () => QuizQuestion | null;
  getProgressPercentage: () => number;
  getTimeRemaining: () => number;
  getHintsRemaining: () => number;
  isQuizComplete: () => boolean;
  calculateScore: () => number;
}

// Business Rule Validation Types
export interface QuizValidationRules {
  // BR-QUIZ-001: Adaptive quiz creation
  validateQuizGeneration: (params: QuizGenerationParams) => boolean;
  validateQuestionQuality: (question: QuizQuestion) => boolean;
  
  // BR-QUIZ-002: Quiz interaction rules
  validateAnswer: (question: QuizQuestion, answer: string | number) => boolean;
  validateHintUsage: (hintsUsed: number, maxHints: number) => boolean;
  
  // BR-MULTIMODAL-001: Learning style adaptation
  adaptQuestionForLearningStyle: (question: QuizQuestion, style: string) => QuizQuestion;
  validateAccessibilityCompliance: (question: QuizQuestion) => boolean;
}

export default QuizState;

