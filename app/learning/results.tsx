/**
 * Quiz Results Screen for AR Book Explorer
 * 
 * Quiz results and feedback using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function QuizResults() {
  const router = useRouter();

  const handleViewLearningPath = () => {
    router.push('/learning/path');
  };

  const handleContinueReading = () => {
    router.push('/ar/progress');
  };

  const handleViewAchievements = () => {
    router.push('/gamification/achievement');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quiz Results</Text>
        <Text style={styles.subtitle}>Great job! Here's how you performed</Text>
      </View>

      <View style={styles.content}>
        <Card
          title="🎯 Your Score"
          subtitle="Excellent performance!"
          variant="elevated"
          size="large"
          style={styles.scoreCard}
        >
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreNumber}>92%</Text>
            <Text style={styles.scoreLabel}>Overall Score</Text>
            
            <View style={styles.scoreBreakdown}>
              <Text style={styles.breakdownItem}>✅ Correct Answers: 11/12</Text>
              <Text style={styles.breakdownItem}>⏱️ Time Taken: 8 minutes</Text>
              <Text style={styles.breakdownItem}>🎯 Accuracy Rate: 92%</Text>
              <Text style={styles.breakdownItem}>🚀 Improvement: +15% from last quiz</Text>
            </View>
          </View>
        </Card>

        <Card
          title="📊 Performance Analysis"
          subtitle="Strengths and areas for improvement"
          variant="outlined"
          size="medium"
          style={styles.analysisCard}
        >
          <View style={styles.analysis}>
            <View style={styles.strengthsSection}>
              <Text style={styles.sectionTitle}>💪 Strengths:</Text>
              <Text style={styles.analysisItem}>• Reading comprehension: Excellent</Text>
              <Text style={styles.analysisItem}>• Character analysis: Very good</Text>
              <Text style={styles.analysisItem}>• Plot understanding: Strong</Text>
            </View>
            
            <View style={styles.improvementSection}>
              <Text style={styles.sectionTitle}>🎯 Areas to focus on:</Text>
              <Text style={styles.analysisItem}>• Vocabulary building</Text>
              <Text style={styles.analysisItem}>• Historical context</Text>
            </View>
          </View>
        </Card>

        <Card
          title="🏆 Achievements Earned"
          subtitle="New accomplishments unlocked"
          variant="outlined"
          size="medium"
          style={styles.achievementsCard}
        >
          <View style={styles.achievements}>
            <Text style={styles.achievementItem}>🥇 Quiz Master - Scored 90%+ on quiz</Text>
            <Text style={styles.achievementItem}>⚡ Speed Reader - Completed in under 10 minutes</Text>
            <Text style={styles.achievementItem}>📈 Improver - +15% improvement from last attempt</Text>
          </View>
          
          <Button
            title="View All Achievements"
            onPress={handleViewAchievements}
            variant="outline"
            size="medium"
            style={styles.achievementButton}
          />
        </Card>

        <Card
          title="📚 Recommended Next Steps"
          subtitle="Continue your learning journey"
          variant="outlined"
          size="medium"
          style={styles.recommendationsCard}
        >
          <View style={styles.recommendations}>
            <Text style={styles.recommendationItem}>📖 Continue reading "The Great Adventure"</Text>
            <Text style={styles.recommendationItem}>📝 Practice vocabulary with flashcards</Text>
            <Text style={styles.recommendationItem}>🎯 Take the advanced comprehension quiz</Text>
            <Text style={styles.recommendationItem}>🔍 Explore historical context materials</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="📈 View Learning Path"
            onPress={handleViewLearningPath}
            variant="primary"
            size="large"
            style={styles.pathButton}
          />
          <Button
            title="📖 Continue Reading"
            onPress={handleContinueReading}
            variant="secondary"
            size="medium"
            style={styles.continueButton}
          />
          <Button
            title="← Back to Quiz"
            onPress={() => router.back()}
            variant="outline"
            size="medium"
            style={styles.backButton}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 22,
  },
  content: {
    padding: 24,
    gap: 20,
  },
  scoreCard: {
    marginBottom: 8,
  },
  scoreInfo: {
    alignItems: 'center',
    gap: 16,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#059669',
  },
  scoreLabel: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '600',
  },
  scoreBreakdown: {
    width: '100%',
    gap: 8,
  },
  breakdownItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  analysisCard: {
    marginBottom: 8,
  },
  analysis: {
    gap: 16,
  },
  strengthsSection: {
    gap: 8,
  },
  improvementSection: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  analysisItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  achievementsCard: {
    marginBottom: 8,
  },
  achievements: {
    gap: 8,
    marginBottom: 16,
  },
  achievementItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 4,
  },
  achievementButton: {
    width: '100%',
  },
  recommendationsCard: {
    marginBottom: 8,
  },
  recommendations: {
    gap: 8,
  },
  recommendationItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  actions: {
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  pathButton: {
    width: '100%',
  },
  continueButton: {
    width: '100%',
  },
  backButton: {
    width: '60%',
  },
});
