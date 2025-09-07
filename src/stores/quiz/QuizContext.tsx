/**
 * Quiz Context
 * Following BR-QUIZ-001: Adaptive quiz creation
 * Following BR-QUIZ-002: Quiz interaction rules
 * Following BR-MULTIMODAL-001: Learning style adaptation
 */

import React, { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import { 
  QuizState, 
  QuizAction, 
  QuizContextProps, 
  QuizGenerationParams,
  QuizQuestion,
  QuizAnswer,
  QuizResults,
  QuizAnalytics 
} from './types';
import { quizReducer, initialQuizState } from './quizReducer';

// Create Quiz Context
const QuizContext = createContext<QuizContextProps | undefined>(undefined);

// Quiz Provider Component
export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Quiz Generation Functions
  const generateQuiz = useCallback(async (params: QuizGenerationParams) => {
    try {
      dispatch({ type: 'START_QUIZ_GENERATION', payload: params });
      
      // Simulate AI quiz generation process
      // TODO: Replace with actual OpenAI API call
      dispatch({ type: 'UPDATE_GENERATION_PROGRESS', payload: 10 });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'UPDATE_GENERATION_PROGRESS', payload: 30 });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'UPDATE_GENERATION_PROGRESS', payload: 60 });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'UPDATE_GENERATION_PROGRESS', payload: 90 });
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock generated questions
      const mockQuestions: QuizQuestion[] = [
        {
          id: 'q1',
          bookId: params.bookId,
          questionText: 'What is the main theme of the book?',
          questionType: 'multiple_choice',
          options: ['Adventure', 'Romance', 'Mystery', 'Science Fiction'],
          correctAnswer: 0,
          explanation: 'The book primarily focuses on adventure and exploration.',
          difficulty: 'medium',
          learningStyle: params.learningStyle,
          keyConceptsTargeted: ['theme', 'analysis'],
          estimatedTimeSeconds: 60,
          screenReaderText: 'Multiple choice question about the main theme of the book',
        },
        {
          id: 'q2',
          bookId: params.bookId,
          questionText: 'Which character shows the most growth throughout the story?',
          questionType: 'multiple_choice',
          options: ['Character A', 'Character B', 'Character C', 'Character D'],
          correctAnswer: 1,
          explanation: 'Character B demonstrates significant personal growth and development.',
          difficulty: 'hard',
          learningStyle: params.learningStyle,
          keyConceptsTargeted: ['character development', 'analysis'],
          estimatedTimeSeconds: 90,
          screenReaderText: 'Multiple choice question about character development',
        },
      ];
      
      dispatch({ type: 'UPDATE_GENERATION_PROGRESS', payload: 100 });
      dispatch({ type: 'COMPLETE_QUIZ_GENERATION', payload: mockQuestions });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Quiz generation failed';
      dispatch({ type: 'SET_GENERATION_ERROR', payload: errorMessage });
    }
  }, []);

  const cancelGeneration = useCallback(() => {
    dispatch({ type: 'SET_GENERATION_ERROR', payload: 'Generation cancelled by user' });
  }, []);

  // Quiz Session Functions
  const startQuizSession = useCallback((bookId: string, questions: QuizQuestion[]) => {
    const sessionId = `quiz_${Date.now()}`;
    dispatch({ 
      type: 'START_QUIZ_SESSION', 
      payload: { questions, sessionId, bookId } 
    });
  }, []);

  const answerQuestion = useCallback((answer: QuizAnswer) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: answer });
    
    // Auto-advance to next question after answering
    setTimeout(() => {
      dispatch({ type: 'NEXT_QUESTION' });
    }, 1500);
  }, []);

  const skipQuestion = useCallback((questionId: string) => {
    dispatch({ type: 'SKIP_QUESTION', payload: questionId });
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const useHint = useCallback((questionId: string, hintLevel: 1 | 2 | 3) => {
    if (state.hintsRemaining > 0) {
      dispatch({ type: 'USE_HINT', payload: { questionId, hintLevel } });
      
      // TODO: Load actual hint from database
      const mockHints = {
        1: 'Think about the overall message the author is trying to convey.',
        2: 'Consider how the main events relate to the central idea.',
        3: 'Look at how conflicts are resolved in the story.',
      };
      
      // For now, just show hint in console (TODO: Implement hint display UI)
      console.log(`Hint ${hintLevel}: ${mockHints[hintLevel]}`);
    }
  }, [state.hintsRemaining]);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const previousQuestion = useCallback(() => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  }, []);

  const completeQuiz = useCallback(async (): Promise<QuizResults> => {
    if (!state.currentSession) {
      throw new Error('No active quiz session');
    }

    try {
      // Calculate final results
      const totalQuestions = state.currentSession.questions.length;
      const correctAnswers = state.currentSession.questionsCorrect;
      const incorrectAnswers = state.currentSession.questionsAnswered - correctAnswers;
      const skippedQuestions = state.currentSession.questionsSkipped;
      const percentageScore = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
      
      // Calculate time bonus (faster = better)
      const avgTimePerQuestion = state.currentSession.totalTimeSeconds / totalQuestions;
      const timeBonus = Math.max(0, 10 - (avgTimePerQuestion / 30)); // Bonus for speed
      
      const finalScore = Math.round(percentageScore + timeBonus);
      
      // Determine comprehension level
      let comprehensionLevel: QuizResults['comprehensionLevel'];
      if (percentageScore >= 90) comprehensionLevel = 'excellent';
      else if (percentageScore >= 75) comprehensionLevel = 'good';
      else if (percentageScore >= 60) comprehensionLevel = 'fair';
      else comprehensionLevel = 'needs_improvement';
      
      // Generate results
      const results: QuizResults = {
        sessionId: state.currentSession.sessionId,
        bookId: state.currentSession.bookId,
        userId: state.currentSession.userId,
        completedAt: new Date(),
        
        // Performance metrics
        totalQuestions,
        correctAnswers,
        incorrectAnswers,
        skippedQuestions,
        percentageScore,
        timeBonus,
        finalScore,
        
        // Learning analysis
        comprehensionLevel,
        keyConcepts: state.currentSession.conceptsMastered.map(concept => ({
          concept,
          mastery: 'mastered' as const,
          examples: [`Example for ${concept}`],
        })),
        
        // Recommendations
        nextSteps: [
          comprehensionLevel === 'excellent' 
            ? 'Try a more challenging book!' 
            : 'Review the concepts you missed',
        ],
        recommendedBooks: ['Similar Book 1', 'Similar Book 2'],
        skillsToImprove: state.currentSession.conceptsNeedingWork,
        
        // Achievement triggers
        achievementsEarned: [],
        pointsEarned: Math.round(finalScore * 10),
        badgesUnlocked: [],
        
        // Feedback
        encouragingMessage: comprehensionLevel === 'excellent' 
          ? 'Outstanding work! You really understand this material.' 
          : 'Good effort! Keep practicing to improve your comprehension.',
        improvementTips: [
          'Take your time reading each question',
          'Use the elimination method for multiple choice',
        ],
        parentTeacherSummary: `Completed quiz with ${percentageScore.toFixed(1)}% accuracy`,
      };
      
      dispatch({ type: 'COMPLETE_QUIZ_SESSION', payload: results });
      dispatch({ type: 'ADD_TO_RESULTS_HISTORY', payload: results });
      
      return results;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete quiz';
      dispatch({ type: 'SET_RESULTS_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.currentSession]);

  const pauseQuiz = useCallback(() => {
    dispatch({ type: 'PAUSE_QUIZ_SESSION' });
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const resumeQuiz = useCallback(() => {
    dispatch({ type: 'RESUME_QUIZ_SESSION' });
    // Timer restart logic would go here
  }, []);

  const endQuiz = useCallback(() => {
    dispatch({ type: 'END_QUIZ_SESSION' });
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Timer Functions
  const startTimer = useCallback((seconds: number) => {
    dispatch({ type: 'START_TIMER', payload: seconds });
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      dispatch({ type: 'UPDATE_TIMER', payload: state.timeRemaining - 1 });
      
      if (state.timeRemaining <= 0) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        // Auto-complete quiz when time runs out
        completeQuiz();
      }
    }, 1000);
  }, [state.timeRemaining, completeQuiz]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    dispatch({ type: 'PAUSE_TIMER' });
  }, []);

  const resumeTimer = useCallback(() => {
    startTimer(state.timeRemaining);
    dispatch({ type: 'RESUME_TIMER' });
  }, [state.timeRemaining, startTimer]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    dispatch({ type: 'STOP_TIMER' });
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Results Functions
  const getQuizResults = useCallback(async (sessionId: string): Promise<QuizResults> => {
    try {
      dispatch({ type: 'SET_RESULTS_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find results in history
      const results = state.resultsHistory.find(r => r.sessionId === sessionId);
      if (!results) {
        throw new Error('Results not found');
      }
      
      dispatch({ type: 'SET_QUIZ_RESULTS', payload: results });
      return results;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load results';
      dispatch({ type: 'SET_RESULTS_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.resultsHistory]);

  const clearResults = useCallback(() => {
    dispatch({ type: 'CLEAR_RESULTS' });
  }, []);

  // Analytics Functions
  const getAnalytics = useCallback(async (userId: string): Promise<QuizAnalytics> => {
    try {
      dispatch({ type: 'SET_ANALYTICS_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock analytics data
      const mockAnalytics: QuizAnalytics = {
        userId,
        totalQuizzesTaken: state.resultsHistory.length,
        averageScore: state.resultsHistory.length > 0 
          ? state.resultsHistory.reduce((sum, result) => sum + result.percentageScore, 0) / state.resultsHistory.length
          : 0,
        improvementTrend: 'improving',
        strongConcepts: ['reading comprehension', 'theme analysis'],
        weakConcepts: ['character development'],
        preferredQuestionTypes: ['multiple_choice'],
        averageTimePerQuestion: 60,
        hintsUsagePattern: 'moderate',
        learningVelocity: 2.5,
        retentionRate: 85,
        engagementPattern: 'consistent',
        optimalStudyTime: 'evening',
      };
      
      dispatch({ type: 'SET_QUIZ_ANALYTICS', payload: mockAnalytics });
      return mockAnalytics;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load analytics';
      dispatch({ type: 'SET_ANALYTICS_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.resultsHistory]);

  const updateAnalytics = useCallback((updates: Partial<QuizAnalytics>) => {
    dispatch({ type: 'UPDATE_ANALYTICS', payload: updates });
  }, []);

  // Utility Functions
  const getCurrentQuestion = useCallback(() => {
    if (!state.currentSession) return null;
    return state.currentSession.questions[state.currentSession.currentQuestionIndex] || null;
  }, [state.currentSession]);

  const getProgressPercentage = useCallback(() => {
    if (!state.currentSession) return 0;
    return (state.currentSession.currentQuestionIndex / state.currentSession.questions.length) * 100;
  }, [state.currentSession]);

  const getTimeRemaining = useCallback(() => {
    return state.timeRemaining;
  }, [state.timeRemaining]);

  const getHintsRemaining = useCallback(() => {
    return state.hintsRemaining;
  }, [state.hintsRemaining]);

  const isQuizComplete = useCallback(() => {
    if (!state.currentSession) return false;
    return state.currentSession.currentQuestionIndex >= state.currentSession.questions.length - 1;
  }, [state.currentSession]);

  const calculateScore = useCallback(() => {
    if (!state.currentSession) return 0;
    return state.currentSession.percentageScore;
  }, [state.currentSession]);

  // Context value
  const contextValue: QuizContextProps = {
    state,
    dispatch,
    
    // Quiz Generation Functions
    generateQuiz,
    cancelGeneration,
    
    // Quiz Session Functions
    startQuizSession,
    answerQuestion,
    skipQuestion,
    useHint,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    pauseQuiz,
    resumeQuiz,
    endQuiz,
    
    // Timer Functions
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    
    // Results Functions
    getQuizResults,
    clearResults,
    
    // Analytics Functions
    getAnalytics,
    updateAnalytics,
    
    // Utility Functions
    getCurrentQuestion,
    getProgressPercentage,
    getTimeRemaining,
    getHintsRemaining,
    isQuizComplete,
    calculateScore,
  };

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use Quiz Context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  
  return context;
};

export default QuizContext;
