/**
 * QuizResults Screen Component for AR Book Explorer
 * 
 * This screen displays quiz results and learning insights.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const QuizResults: React.FC = () => {
  const navigation = useNavigation();

  const handleViewLearningPath = () => {
    navigation.navigate('LearningPath' as never);
  };

  const handleContinueReading = () => {
    navigation.navigate('BookProgress' as never);
  };

  const handleViewAchievements = () => {
    navigation.navigate('Achievement' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quiz Results</Text>
        <Text style={styles.subtitle}>
          Great job! Here's how you performed
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Your Score"
          subtitle="Overall performance"
          variant="elevated"
          size="medium"
          style={styles.scoreCard}
        >
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreIcon}>🎯</Text>
            <Text style={styles.scoreText}>85%</Text>
            <Text style={styles.scoreDescription}>Excellent work!</Text>
          </View>
        </Card>

        <Card
          title="Detailed Results"
          subtitle="Question-by-question breakdown"
          variant="outlined"
          size="medium"
          style={styles.resultsCard}
        >
          <View style={styles.resultsList}>
            <Text style={styles.resultItem}>✅ Question 1: Correct</Text>
            <Text style={styles.resultItem}>✅ Question 2: Correct</Text>
            <Text style={styles.resultItem}>❌ Question 3: Incorrect</Text>
            <Text style={styles.resultItem}>✅ Question 4: Correct</Text>
            <Text style={styles.resultItem}>✅ Question 5: Correct</Text>
          </View>
        </Card>

        <Card
          title="Learning Insights"
          subtitle="AI-powered recommendations"
          variant="outlined"
          size="medium"
          style={styles.insightsCard}
        >
          <View style={styles.insightsList}>
            <Text style={styles.insightItem}>🧠 Strong understanding of main concepts</Text>
            <Text style={styles.insightItem}>📚 Consider reviewing character development</Text>
            <Text style={styles.insightItem}>🎯 Great analytical thinking skills</Text>
            <Text style={styles.insightItem}>⭐ Ready for advanced topics</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="View Learning Path"
            onPress={handleViewLearningPath}
            variant="primary"
            size="large"
            style={styles.learningPathButton}
          />

          <Button
            title="Continue Reading"
            onPress={handleContinueReading}
            variant="outline"
            size="large"
            style={styles.continueButton}
          />

          <Button
            title="View Achievements"
            onPress={handleViewAchievements}
            variant="outline"
            size="large"
            style={styles.achievementsButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  scoreCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreInfo: {
    alignItems: 'center',
  },
  scoreIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 8,
  },
  scoreDescription: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: '500',
  },
  resultsCard: {
    marginBottom: 20,
  },
  resultsList: {
    paddingVertical: 8,
  },
  resultItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  insightsCard: {
    marginBottom: 30,
  },
  insightsList: {
    paddingVertical: 8,
  },
  insightItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  actions: {
    gap: 16,
  },
  learningPathButton: {
    marginBottom: 8,
  },
  continueButton: {
    marginBottom: 8,
  },
  achievementsButton: {
    marginBottom: 8,
  },
});

export default QuizResults;
