/**
 * AI Learning Services Index
 * Following AlLibrary coding rules for clean exports and module organization.
 */

// Learning Analysis Service
export { 
  LearningAnalysisService, 
  learningAnalysisService, 
  LearningAnalysisError 
} from './learningAnalysisService';

// Export types
export type {
  AssessmentResults,
  ContentRecommendation,
  LearningPath,
  LearningMilestone,
  AdaptiveDifficultySettings,
} from './learningAnalysisService';
