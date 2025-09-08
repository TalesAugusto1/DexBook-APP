/**
 * AI Learning Analysis Service for AR Book Explorer
 * 
 * Analyzes learning assessment results and generates personalized recommendations.
 * Following Milestone 2.2 requirements for AI personalization engine.
 * Following AlLibrary coding rules for AI integration and data processing.
 */

import { 
  LearningProfile, 
  UserProfile,
  LearningStyles,
  ReadingLevel,
  LearningGoal 
} from '../../../stores/user/types';

// Assessment Results Interface (from LearningAssessment component)
export interface AssessmentResults {
  visual: number;
  auditory: number;
  kinesthetic: number;
  reading: number;
  primaryLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  readingLevel: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
}

// Content Recommendation Interface
export interface ContentRecommendation {
  id: string;
  title: string;
  type: 'book' | 'activity' | 'quiz' | 'ar-content';
  difficulty: 'easy' | 'medium' | 'hard';
  learningStyle: string[];
  estimatedDuration: number; // minutes
  description: string;
  thumbnailUrl?: string;
  matchScore: number; // 0-100
  reasons: string[];
}

// Learning Path Interface
export interface LearningPath {
  id: string;
  userId: string;
  name: string;
  description: string;
  estimatedDuration: number; // days
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  goals: LearningGoal[];
  milestones: LearningMilestone[];
  recommendations: ContentRecommendation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completed: boolean;
  progress: number; // 0-100
  requirements: string[];
  rewards: string[];
}

// Adaptive Difficulty Settings
export interface AdaptiveDifficultySettings {
  currentLevel: number; // 1-10
  adaptationRate: number; // 0-1
  performanceThreshold: number; // 0-1
  difficultyIncrease: number; // 0-1
  difficultyDecrease: number; // 0-1
  stabilityPeriod: number; // days
}

/**
 * Learning Analysis Service Error
 */
export class LearningAnalysisError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'LearningAnalysisError';
  }
}

/**
 * AI Learning Analysis Service
 * Processes assessment results and generates personalized learning experiences
 */
export class LearningAnalysisService {
  private readonly STYLE_WEIGHTS = {
    visual: {
      'ar-content': 0.9,
      'interactive-visuals': 0.8,
      'infographics': 0.7,
      'picture-books': 0.8,
      'charts-diagrams': 0.9,
    },
    auditory: {
      'audio-narration': 0.9,
      'music-integration': 0.8,
      'discussion-questions': 0.7,
      'sound-effects': 0.8,
      'voice-guidance': 0.9,
    },
    kinesthetic: {
      'interactive-activities': 0.9,
      'hands-on-experiments': 0.8,
      'movement-based': 0.9,
      'touch-interactions': 0.8,
      'ar-manipulation': 0.9,
    },
    reading: {
      'text-heavy': 0.9,
      'detailed-descriptions': 0.8,
      'vocabulary-building': 0.9,
      'comprehension-activities': 0.8,
      'written-analysis': 0.7,
    },
  };

  private readonly INTEREST_CONTENT_MAP = {
    'Adventure': ['action-stories', 'exploration-books', 'quest-narratives'],
    'Science Fiction': ['sci-fi-novels', 'future-tech', 'space-exploration'],
    'Fantasy': ['magical-stories', 'mythical-creatures', 'fantasy-worlds'],
    'Mystery': ['detective-stories', 'puzzle-books', 'crime-solving'],
    'Science': ['scientific-concepts', 'experiments', 'discovery-books'],
    'Technology': ['tech-innovation', 'coding-basics', 'digital-literacy'],
    'Nature': ['environmental-science', 'wildlife-books', 'nature-exploration'],
    'Art': ['art-history', 'creative-techniques', 'artistic-expression'],
    'Music': ['music-theory', 'instrument-learning', 'musical-stories'],
    'Sports': ['sports-stories', 'physical-activity', 'team-dynamics'],
    'History': ['historical-fiction', 'biographical-stories', 'time-periods'],
    'Travel': ['world-cultures', 'geography', 'exploration-stories'],
  };

  /**
   * Process assessment results and generate learning profile
   */
  async processAssessmentResults(
    results: AssessmentResults,
    userProfile: UserProfile
  ): Promise<LearningProfile> {
    try {
      // Validate assessment results
      this.validateAssessmentResults(results);

      // Generate learning profile
      const learningProfile: LearningProfile = {
        userId: userProfile.id,
        learningStyles: {
          visual: results.visual,
          auditory: results.auditory,
          kinesthetic: results.kinesthetic,
          reading: results.reading,
        },
        primaryLearningStyle: results.primaryLearningStyle,
        readingLevel: this.determineDetailedReadingLevel(results),
        readingSpeed: this.estimateReadingSpeed(results),
        comprehensionLevel: this.estimateComprehensionLevel(results),
        favoriteGenres: this.mapInterestsToGenres(results.interests),
        favoriteSubjects: this.mapInterestsToSubjects(results.interests),
        interests: results.interests,
        dislikedTopics: [], // To be populated through user feedback
        dailyReadingGoal: this.suggestDailyReadingGoal(results),
        weeklyBookGoal: this.suggestWeeklyBookGoal(results),
        currentGoals: this.generateInitialGoals(results),
        preferredDifficulty: this.determinePreferredDifficulty(results),
        timerPreference: this.determineTimerPreference(results),
        hintsPreference: this.determineHintsPreference(results),
        audioNarrationPreference: results.primaryLearningStyle === 'auditory',
        assessmentDate: new Date(),
        assessmentHistory: [],
      };

      return learningProfile;
    } catch (error) {
      throw new LearningAnalysisError(
        `Failed to process assessment results: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'PROCESSING_ERROR'
      );
    }
  }

  /**
   * Generate personalized content recommendations
   */
  async generateContentRecommendations(
    learningProfile: LearningProfile,
    limit: number = 10
  ): Promise<ContentRecommendation[]> {
    try {
      const recommendations: ContentRecommendation[] = [];

      // Generate book recommendations
      const bookRecommendations = await this.generateBookRecommendations(learningProfile, 5);
      recommendations.push(...bookRecommendations);

      // Generate activity recommendations
      const activityRecommendations = await this.generateActivityRecommendations(learningProfile, 3);
      recommendations.push(...activityRecommendations);

      // Generate AR content recommendations
      const arRecommendations = await this.generateARContentRecommendations(learningProfile, 2);
      recommendations.push(...arRecommendations);

      // Sort by match score and return top recommendations
      return recommendations
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, limit);
    } catch (error) {
      throw new LearningAnalysisError(
        `Failed to generate content recommendations: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'RECOMMENDATION_ERROR'
      );
    }
  }

  /**
   * Create personalized learning path
   */
  async createLearningPath(
    learningProfile: LearningProfile,
    userProfile: UserProfile,
    duration: number = 30 // days
  ): Promise<LearningPath> {
    try {
      const goals = this.generatePersonalizedGoals(learningProfile, duration);
      const milestones = this.generateLearningMilestones(goals, duration);
      const recommendations = await this.generateContentRecommendations(learningProfile, 20);

      const learningPath: LearningPath = {
        id: `path-${userProfile.id}-${Date.now()}`,
        userId: userProfile.id,
        name: this.generatePathName(learningProfile),
        description: this.generatePathDescription(learningProfile),
        estimatedDuration: duration,
        difficulty: learningProfile.readingLevel,
        goals,
        milestones,
        recommendations,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return learningPath;
    } catch (error) {
      throw new LearningAnalysisError(
        `Failed to create learning path: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'PATH_CREATION_ERROR'
      );
    }
  }

  /**
   * Calculate adaptive difficulty settings
   */
  calculateAdaptiveDifficulty(
    learningProfile: LearningProfile,
    performanceHistory: number[]
  ): AdaptiveDifficultySettings {
    const averagePerformance = performanceHistory.length > 0 
      ? performanceHistory.reduce((sum, score) => sum + score, 0) / performanceHistory.length
      : 0.5;

    const readingLevelMultiplier = {
      'beginner': 0.7,
      'intermediate': 1.0,
      'advanced': 1.3,
    }[learningProfile.readingLevel];

    const baseLevel = Math.round(averagePerformance * 10 * readingLevelMultiplier);

    return {
      currentLevel: Math.max(1, Math.min(10, baseLevel)),
      adaptationRate: 0.1,
      performanceThreshold: 0.75,
      difficultyIncrease: 0.2,
      difficultyDecrease: 0.15,
      stabilityPeriod: 7,
    };
  }

  /**
   * Validate assessment results
   */
  private validateAssessmentResults(results: AssessmentResults): void {
    if (!results.primaryLearningStyle) {
      throw new Error('Primary learning style is required');
    }

    if (!results.readingLevel) {
      throw new Error('Reading level is required');
    }

    if (!Array.isArray(results.interests) || results.interests.length === 0) {
      throw new Error('At least one interest is required');
    }

    // Validate score ranges
    ['visual', 'auditory', 'kinesthetic', 'reading'].forEach(style => {
      const score = results[style as keyof AssessmentResults] as number;
      if (typeof score !== 'number' || score < 0 || score > 100) {
        throw new Error(`Invalid ${style} score: ${score}`);
      }
    });
  }

  /**
   * Determine detailed reading level
   */
  private determineDetailedReadingLevel(results: AssessmentResults): ReadingLevel {
    const readingScore = results.reading;
    const comprehensionScore = (results.visual + results.reading) / 2;

    if (readingScore < 40 || comprehensionScore < 40) {
      return 'beginner';
    } else if (readingScore > 70 && comprehensionScore > 70) {
      return 'advanced';
    } else {
      return 'intermediate';
    }
  }

  /**
   * Estimate reading speed (words per minute)
   */
  private estimateReadingSpeed(results: AssessmentResults): number {
    const baseSpeed = {
      'beginner': 120,
      'intermediate': 200,
      'advanced': 280,
    };

    const readingLevel = this.determineDetailedReadingLevel(results);
    const base = baseSpeed[readingLevel];
    
    // Adjust based on reading style preference
    const readingStyleBonus = results.reading > 70 ? 30 : 0;
    
    return base + readingStyleBonus + Math.random() * 40 - 20; // Add some variation
  }

  /**
   * Estimate comprehension level
   */
  private estimateComprehensionLevel(results: AssessmentResults): number {
    const readingContribution = results.reading * 0.4;
    const visualContribution = results.visual * 0.3;
    const auditoryContribution = results.auditory * 0.2;
    const kinestheticContribution = results.kinesthetic * 0.1;

    return Math.round(readingContribution + visualContribution + auditoryContribution + kinestheticContribution);
  }

  /**
   * Map interests to book genres
   */
  private mapInterestsToGenres(interests: string[]): string[] {
    const genreMap: { [key: string]: string } = {
      'Adventure': 'Adventure',
      'Science Fiction': 'Science Fiction',
      'Fantasy': 'Fantasy',
      'Mystery': 'Mystery',
      'Science': 'Non-fiction',
      'Technology': 'Educational',
      'Nature': 'Nature',
      'Art': 'Arts & Crafts',
      'Music': 'Music',
      'Sports': 'Sports',
      'History': 'Historical Fiction',
      'Travel': 'Travel & Geography',
    };

    return interests
      .map(interest => genreMap[interest])
      .filter(Boolean)
      .slice(0, 5); // Limit to top 5 genres
  }

  /**
   * Map interests to academic subjects
   */
  private mapInterestsToSubjects(interests: string[]): string[] {
    const subjectMap: { [key: string]: string } = {
      'Science': 'Science',
      'Technology': 'Computer Science',
      'Nature': 'Biology',
      'Art': 'Art',
      'Music': 'Music',
      'Sports': 'Physical Education',
      'History': 'History',
      'Travel': 'Geography',
      'Adventure': 'Literature',
      'Fantasy': 'Literature',
      'Mystery': 'Literature',
    };

    return interests
      .map(interest => subjectMap[interest])
      .filter(Boolean)
      .slice(0, 3); // Limit to top 3 subjects
  }

  /**
   * Suggest daily reading goal
   */
  private suggestDailyReadingGoal(results: AssessmentResults): number {
    const readingLevel = this.determineDetailedReadingLevel(results);
    const goals = {
      'beginner': 15,
      'intermediate': 25,
      'advanced': 35,
    };

    return goals[readingLevel];
  }

  /**
   * Suggest weekly book goal
   */
  private suggestWeeklyBookGoal(results: AssessmentResults): number {
    const readingLevel = this.determineDetailedReadingLevel(results);
    const goals = {
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3,
    };

    return goals[readingLevel];
  }

  /**
   * Generate initial learning goals
   */
  private generateInitialGoals(results: AssessmentResults): LearningGoal[] {
    const goals: LearningGoal[] = [];

    // Reading goal
    goals.push({
      id: `goal-reading-${Date.now()}`,
      type: 'reading',
      title: 'Daily Reading Habit',
      description: `Read for ${this.suggestDailyReadingGoal(results)} minutes every day`,
      targetValue: this.suggestDailyReadingGoal(results),
      currentValue: 0,
      unit: 'minutes',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      isActive: true,
      createdAt: new Date(),
    });

    // Comprehension goal
    goals.push({
      id: `goal-comprehension-${Date.now() + 1}`,
      type: 'comprehension',
      title: 'Reading Comprehension',
      description: 'Improve reading comprehension through quizzes and activities',
      targetValue: 80,
      currentValue: 0,
      unit: 'percentage',
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
      isActive: true,
      createdAt: new Date(),
    });

    return goals;
  }

  /**
   * Determine preferred difficulty
   */
  private determinePreferredDifficulty(results: AssessmentResults): 'adaptive' | 'easy' | 'medium' | 'hard' {
    // Most users benefit from adaptive difficulty
    return 'adaptive';
  }

  /**
   * Determine timer preference
   */
  private determineTimerPreference(results: AssessmentResults): boolean {
    // Users with high kinesthetic scores often prefer timers for focus
    return results.kinesthetic > 70;
  }

  /**
   * Determine hints preference
   */
  private determineHintsPreference(results: AssessmentResults): boolean {
    // Beginners and visual learners often prefer hints
    const readingLevel = this.determineDetailedReadingLevel(results);
    return readingLevel === 'beginner' || results.visual > 70;
  }

  /**
   * Generate book recommendations
   */
  private async generateBookRecommendations(
    learningProfile: LearningProfile,
    count: number
  ): Promise<ContentRecommendation[]> {
    // This would integrate with actual book database
    // For now, return mock recommendations
    const mockBooks: ContentRecommendation[] = [
      {
        id: 'book-1',
        title: 'The Magic Adventure',
        type: 'book',
        difficulty: learningProfile.readingLevel === 'beginner' ? 'easy' : 'medium',
        learningStyle: [learningProfile.primaryLearningStyle],
        estimatedDuration: 120,
        description: 'An exciting fantasy adventure perfect for your reading level',
        matchScore: 95,
        reasons: ['Matches your fantasy interest', 'Appropriate reading level', 'Visual storytelling style'],
      },
      {
        id: 'book-2',
        title: 'Science Discoveries',
        type: 'book',
        difficulty: 'medium',
        learningStyle: ['visual', 'reading'],
        estimatedDuration: 90,
        description: 'Explore amazing scientific concepts with beautiful illustrations',
        matchScore: 88,
        reasons: ['Science interest match', 'Visual learning style', 'Educational content'],
      },
    ];

    return mockBooks.slice(0, count);
  }

  /**
   * Generate activity recommendations
   */
  private async generateActivityRecommendations(
    learningProfile: LearningProfile,
    count: number
  ): Promise<ContentRecommendation[]> {
    const mockActivities: ContentRecommendation[] = [
      {
        id: 'activity-1',
        title: 'Interactive Story Quiz',
        type: 'quiz',
        difficulty: learningProfile.readingLevel === 'advanced' ? 'hard' : 'medium',
        learningStyle: [learningProfile.primaryLearningStyle, 'kinesthetic'],
        estimatedDuration: 15,
        description: 'Test your understanding with interactive questions',
        matchScore: 92,
        reasons: ['Kinesthetic learning', 'Comprehension building', 'Interactive engagement'],
      },
    ];

    return mockActivities.slice(0, count);
  }

  /**
   * Generate AR content recommendations
   */
  private async generateARContentRecommendations(
    learningProfile: LearningProfile,
    count: number
  ): Promise<ContentRecommendation[]> {
    const mockARContent: ContentRecommendation[] = [
      {
        id: 'ar-1',
        title: '3D Story World Explorer',
        type: 'ar-content',
        difficulty: 'medium',
        learningStyle: ['visual', 'kinesthetic'],
        estimatedDuration: 30,
        description: 'Explore story worlds in 3D with augmented reality',
        matchScore: 97,
        reasons: ['Visual learning preference', 'AR technology', 'Interactive exploration'],
      },
    ];

    return mockARContent.slice(0, count);
  }

  /**
   * Generate personalized goals
   */
  private generatePersonalizedGoals(learningProfile: LearningProfile, duration: number): LearningGoal[] {
    return learningProfile.currentGoals || [];
  }

  /**
   * Generate learning milestones
   */
  private generateLearningMilestones(goals: LearningGoal[], duration: number): LearningMilestone[] {
    const milestones: LearningMilestone[] = [];

    goals.forEach((goal, index) => {
      milestones.push({
        id: `milestone-${goal.id}`,
        title: `${goal.title} Milestone`,
        description: `Complete ${goal.description}`,
        targetDate: new Date(Date.now() + (duration / goals.length) * (index + 1) * 24 * 60 * 60 * 1000),
        completed: false,
        progress: 0,
        requirements: [`Achieve ${goal.targetValue} ${goal.unit} in ${goal.title}`],
        rewards: ['Achievement badge', 'Progress celebration'],
      });
    });

    return milestones;
  }

  /**
   * Generate learning path name
   */
  private generatePathName(learningProfile: LearningProfile): string {
    const style = learningProfile.primaryLearningStyle;
    const level = learningProfile.readingLevel;
    
    return `${style.charAt(0).toUpperCase() + style.slice(1)} Learner's ${level.charAt(0).toUpperCase() + level.slice(1)} Journey`;
  }

  /**
   * Generate learning path description
   */
  private generatePathDescription(learningProfile: LearningProfile): string {
    return `A personalized learning journey designed for ${learningProfile.primaryLearningStyle} learners at the ${learningProfile.readingLevel} level, focusing on your interests in ${learningProfile.interests.slice(0, 3).join(', ')}.`;
  }
}

// Export singleton instance
export const learningAnalysisService = new LearningAnalysisService();

