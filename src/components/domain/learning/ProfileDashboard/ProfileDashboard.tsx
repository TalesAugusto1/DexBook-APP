/**
 * Profile Dashboard Component for AR Book Explorer
 * 
 * Displays learning profile visualization, progress tracking, and achievements.
 * Following Milestone 2.2 requirements for profile dashboard.
 * Following AlLibrary coding rules for accessibility-first design.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions, StyleSheet } from 'react-native';
import { Card } from '../../../foundation/Card/Card';
import { Button } from '../../../foundation/Button/Button';
import { Loading } from '../../../foundation/Loading/Loading';
import { LearningProfile, UserStatistics } from '../../../../stores/user/types';
import { ContentRecommendation } from '../../../../services/ai/learning/learningAnalysisService';

export interface ProfileDashboardProps {
  learningProfile: LearningProfile;
  userStatistics: UserStatistics;
  recommendations: ContentRecommendation[];
  onTakeAssessment: () => void;
  onViewRecommendation: (recommendation: ContentRecommendation) => void;
  onUpdateGoal: (goalId: string, progress: number) => void;
  isLoading?: boolean;
}

interface LearningStyleData {
  style: string;
  score: number;
  color: string;
  description: string;
}

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  learningProfile,
  userStatistics,
  recommendations,
  onTakeAssessment,
  onViewRecommendation,
  onUpdateGoal,
  isLoading = false,
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'progress' | 'recommendations'>('overview');
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  // Update screen width on orientation change
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  // Prepare learning styles data for visualization
  const learningStylesData: LearningStyleData[] = [
    {
      style: 'Visual',
      score: learningProfile.learningStyles.visual,
      color: '#3B82F6',
      description: 'Learn best through images, diagrams, and visual aids',
    },
    {
      style: 'Auditory',
      score: learningProfile.learningStyles.auditory,
      color: '#10B981',
      description: 'Learn best through listening and verbal instruction',
    },
    {
      style: 'Kinesthetic',
      score: learningProfile.learningStyles.kinesthetic,
      color: '#F59E0B',
      description: 'Learn best through hands-on activities and movement',
    },
    {
      style: 'Reading',
      score: learningProfile.learningStyles.reading,
      color: '#8B5CF6',
      description: 'Learn best through reading and written text',
    },
  ];

  const maxScore = Math.max(...learningStylesData.map(item => item.score));
  const primaryStyle = learningStylesData.find(
    item => item.style.toLowerCase() === learningProfile.primaryLearningStyle
  );

  const formatReadingLevel = (level: string): string => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  const calculateStreakProgress = useCallback((): number => {
    const currentStreak = userStatistics.currentReadingStreak;
    const targetStreak = 7; // Weekly goal
    return Math.min((currentStreak / targetStreak) * 100, 100);
  }, [userStatistics.currentReadingStreak]);

  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return '#10B981'; // Green
    if (progress >= 60) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  const renderLearningStylesChart = () => (
    <Card style={styles.chartCard}>
      <Text style={styles.cardTitle}>Your Learning Styles</Text>
      <Text style={styles.cardSubtitle}>
        Primary Style: <Text style={[styles.primaryStyle, { color: primaryStyle?.color }]}>
          {formatReadingLevel(learningProfile.primaryLearningStyle)}
        </Text>
      </Text>
      
      <View style={styles.chartContainer}>
        {learningStylesData.map((item) => (
          <View key={item.style} style={styles.chartItem}>
            <View style={styles.chartLabelContainer}>
              <Text style={styles.chartLabel}>{item.style}</Text>
              <Text style={styles.chartScore}>{item.score}%</Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View
                style={[
                  styles.chartBar,
                  {
                    width: `${(item.score / maxScore) * 100}%`,
                    backgroundColor: item.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.chartDescription}>{item.description}</Text>
          </View>
        ))}
      </View>
    </Card>
  );

  const renderOverviewTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Learning Profile Summary */}
      <Card style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.cardTitle}>Learning Profile</Text>
          <Button
            title="Retake Assessment"
            variant="secondary"
            size="small"
            onPress={onTakeAssessment}
          />
        </View>
        
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Reading Level</Text>
            <Text style={styles.summaryValue}>{formatReadingLevel(learningProfile.readingLevel)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Reading Speed</Text>
            <Text style={styles.summaryValue}>{learningProfile.readingSpeed} WPM</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Comprehension</Text>
            <Text style={styles.summaryValue}>{learningProfile.comprehensionLevel}%</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Books Read</Text>
            <Text style={styles.summaryValue}>{userStatistics.totalBooksRead}</Text>
          </View>
        </View>
      </Card>

      {/* Learning Styles Chart */}
      {renderLearningStylesChart()}

      {/* Interests */}
      <Card style={styles.interestsCard}>
        <Text style={styles.cardTitle}>Your Interests</Text>
        <View style={styles.interestsContainer}>
          {learningProfile.interests.map((interest) => (
            <View key={interest} style={styles.interestChip}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Recent Activity */}
      <Card style={styles.activityCard}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>
            📚 Read for {userStatistics.totalReadingTime} minutes this week
          </Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>
            🎯 Completed {userStatistics.totalQuizzesTaken} quizzes
          </Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>
            🏆 Earned {userStatistics.totalAchievements} achievements
          </Text>
        </View>
      </Card>
    </ScrollView>
  );

  const renderProgressTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Reading Streak */}
      <Card style={styles.progressCard}>
        <Text style={styles.cardTitle}>Reading Streak</Text>
        <View style={styles.streakContainer}>
          <Text style={styles.streakNumber}>{userStatistics.currentReadingStreak}</Text>
          <Text style={styles.streakLabel}>days</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${calculateStreakProgress()}%`,
                backgroundColor: getProgressColor(calculateStreakProgress()),
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Weekly goal: 7 days ({Math.round(calculateStreakProgress())}% complete)
        </Text>
      </Card>

      {/* Current Goals */}
      <Card style={styles.goalsCard}>
        <Text style={styles.cardTitle}>Current Goals</Text>
        {learningProfile.currentGoals && learningProfile.currentGoals.length > 0 ? (
          learningProfile.currentGoals.map((goal, index) => {
            const goalTitle = goal.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            const goalDescription = `Target: ${goal.target} by ${goal.deadline.toLocaleDateString()}`;
            const progressPercentage = (goal.progress / goal.target) * 100;
            
            return (
              <View key={`${goal.type}-${index}`} style={styles.goalItem}>
                <Text style={styles.goalTitle}>{goalTitle}</Text>
                <Text style={styles.goalDescription}>{goalDescription}</Text>
                <View style={styles.goalProgressContainer}>
                  <View style={styles.goalProgressBar}>
                    <View
                      style={[
                        styles.goalProgress,
                        {
                          width: `${Math.min(progressPercentage, 100)}%`,
                          backgroundColor: getProgressColor(progressPercentage),
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.goalProgressText}>
                    {goal.progress} / {goal.target}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyText}>No active goals. Take the assessment to get personalized goals!</Text>
        )}
      </Card>

      {/* Learning Efficiency */}
      <Card style={styles.efficiencyCard}>
        <Text style={styles.cardTitle}>Learning Efficiency</Text>
        <View style={styles.efficiencyContainer}>
          <Text style={styles.efficiencyScore}>{userStatistics.learningEfficiency}%</Text>
          <Text style={styles.efficiencyLabel}>Overall Efficiency</Text>
        </View>
        <Text style={styles.efficiencyDescription}>
          Based on your reading speed, comprehension, and quiz performance
        </Text>
      </Card>
    </ScrollView>
  );

  const renderRecommendationsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.recommendationsHeader}>Personalized for You</Text>
      {recommendations.length > 0 ? (
        recommendations.map((recommendation) => (
          <Card key={recommendation.id} style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
              <Text style={styles.recommendationType}>{recommendation.type.toUpperCase()}</Text>
            </View>
            <Text style={styles.recommendationDescription}>{recommendation.description}</Text>
            <View style={styles.recommendationMeta}>
              <Text style={styles.recommendationDuration}>
                📅 {recommendation.estimatedDuration} min
              </Text>
              <Text style={styles.recommendationDifficulty}>
                📊 {recommendation.difficulty}
              </Text>
              <Text style={styles.recommendationMatch}>
                🎯 {recommendation.matchScore}% match
              </Text>
            </View>
            <View style={styles.recommendationReasons}>
              {recommendation.reasons.map((reason, index) => (
                <Text key={index} style={styles.reasonText}>• {reason}</Text>
              ))}
            </View>
            <Button
              title="Start"
              onPress={() => onViewRecommendation(recommendation)}
              style={styles.recommendationButton}
            />
          </Card>
        ))
      ) : (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            Complete your learning assessment to get personalized recommendations!
          </Text>
          <Button
            title="Take Assessment"
            onPress={onTakeAssessment}
            style={styles.assessmentButton}
          />
        </Card>
      )}
    </ScrollView>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading size="large" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <Pressable
          style={[styles.tab, selectedTab === 'overview' && styles.tabActive]}
          onPress={() => setSelectedTab('overview')}
          accessibilityRole="tab"
          accessibilityState={{ selected: selectedTab === 'overview' }}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.tabTextActive]}>
            Overview
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === 'progress' && styles.tabActive]}
          onPress={() => setSelectedTab('progress')}
          accessibilityRole="tab"
          accessibilityState={{ selected: selectedTab === 'progress' }}
        >
          <Text style={[styles.tabText, selectedTab === 'progress' && styles.tabTextActive]}>
            Progress
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === 'recommendations' && styles.tabActive]}
          onPress={() => setSelectedTab('recommendations')}
          accessibilityRole="tab"
          accessibilityState={{ selected: selectedTab === 'recommendations' }}
        >
          <Text style={[styles.tabText, selectedTab === 'recommendations' && styles.tabTextActive]}>
            For You
          </Text>
        </Pressable>
      </View>

      {/* Tab Content */}
      {selectedTab === 'overview' && renderOverviewTab()}
      {selectedTab === 'progress' && renderProgressTab()}
      {selectedTab === 'recommendations' && renderRecommendationsTab()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  tabTextActive: {
    color: '#3b82f6',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  primaryStyle: {
    fontWeight: '600',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  chartCard: {
    marginBottom: 16,
  },
  chartContainer: {
    marginTop: 16,
  },
  chartItem: {
    marginBottom: 16,
  },
  chartLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  chartScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  chartBarContainer: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  chartBar: {
    height: '100%',
    borderRadius: 4,
  },
  chartDescription: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  interestsCard: {
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#dbeafe',
    borderRadius: 16,
  },
  interestText: {
    fontSize: 12,
    color: '#1e40af',
    fontWeight: '500',
  },
  activityCard: {
    marginBottom: 16,
  },
  activityItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityText: {
    fontSize: 14,
    color: '#64748b',
  },
  progressCard: {
    marginBottom: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3b82f6',
  },
  streakLabel: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 4,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
  },
  goalsCard: {
    marginBottom: 16,
  },
  goalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  goalProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  goalProgress: {
    height: '100%',
    borderRadius: 3,
  },
  goalProgressText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  efficiencyCard: {
    marginBottom: 16,
  },
  efficiencyContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  efficiencyScore: {
    fontSize: 32,
    fontWeight: '700',
    color: '#10b981',
  },
  efficiencyLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  efficiencyDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  recommendationsHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  recommendationCard: {
    marginBottom: 16,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  recommendationType: {
    fontSize: 10,
    color: '#3b82f6',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '600',
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  recommendationMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  recommendationDuration: {
    fontSize: 12,
    color: '#64748b',
  },
  recommendationDifficulty: {
    fontSize: 12,
    color: '#64748b',
  },
  recommendationMatch: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  recommendationReasons: {
    marginBottom: 16,
  },
  reasonText: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  recommendationButton: {
    alignSelf: 'flex-start',
  },
  emptyCard: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  assessmentButton: {
    alignSelf: 'center',
  },
});
