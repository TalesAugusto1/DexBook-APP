/**
 * Learning Path Screen for AR Book Explorer
 * 
 * Personalized learning journey using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function LearningPath() {
  const router = useRouter();

  const handleStartPath = (pathId: string) => {
    // TODO: Start specific learning path
    router.push('/learning/quiz');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Learning Path</Text>
        <Text style={styles.subtitle}>
          Personalized journey based on your progress and interests
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="🎯 Current Focus"
          subtitle="Reading comprehension improvement"
          variant="elevated"
          size="large"
          style={styles.currentCard}
        >
          <View style={styles.currentPath}>
            <Text style={styles.pathDescription}>
              Based on your recent quiz results, we recommend focusing on reading comprehension 
              and vocabulary building to enhance your understanding.
            </Text>
            
            <View style={styles.progressInfo}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '75%' }]} />
              </View>
              <Text style={styles.progressText}>75% Complete</Text>
            </View>
            
            <Button
              title="Continue Current Path"
              onPress={() => handleStartPath('current')}
              variant="primary"
              size="large"
              style={styles.continueButton}
            />
          </View>
        </Card>

        <Card
          title="📚 Recommended Paths"
          subtitle="Explore new learning opportunities"
          variant="outlined"
          size="medium"
          style={styles.pathsCard}
        >
          <View style={styles.pathsList}>
            <View style={styles.pathItem}>
              <Text style={styles.pathTitle}>🎭 Character Analysis Mastery</Text>
              <Text style={styles.pathDesc}>Learn to analyze characters and their motivations</Text>
              <Text style={styles.pathDuration}>Duration: 2 weeks • 8 lessons</Text>
              <Button
                title="Start Path"
                onPress={() => handleStartPath('character')}
                variant="secondary"
                size="small"
                style={styles.pathButton}
              />
            </View>

            <View style={styles.pathItem}>
              <Text style={styles.pathTitle}>📖 Vocabulary Builder Pro</Text>
              <Text style={styles.pathDesc}>Expand your vocabulary with interactive exercises</Text>
              <Text style={styles.pathDuration}>Duration: 3 weeks • 12 lessons</Text>
              <Button
                title="Start Path"
                onPress={() => handleStartPath('vocabulary')}
                variant="secondary"
                size="small"
                style={styles.pathButton}
              />
            </View>

            <View style={styles.pathItem}>
              <Text style={styles.pathTitle}>🏛️ Historical Context Explorer</Text>
              <Text style={styles.pathDesc}>Understand the historical background of stories</Text>
              <Text style={styles.pathDuration}>Duration: 4 weeks • 15 lessons</Text>
              <Button
                title="Start Path"
                onPress={() => handleStartPath('history')}
                variant="secondary"
                size="small"
                style={styles.pathButton}
              />
            </View>
          </View>
        </Card>

        <Card
          title="🏆 Completed Paths"
          subtitle="Your learning achievements"
          variant="outlined"
          size="medium"
          style={styles.completedCard}
        >
          <View style={styles.completedPaths}>
            <View style={styles.completedItem}>
              <Text style={styles.completedTitle}>✅ Basic Reading Skills</Text>
              <Text style={styles.completedDate}>Completed: 2 weeks ago</Text>
              <Text style={styles.completedScore}>Final Score: 95%</Text>
            </View>

            <View style={styles.completedItem}>
              <Text style={styles.completedTitle}>✅ Story Structure Basics</Text>
              <Text style={styles.completedDate}>Completed: 1 month ago</Text>
              <Text style={styles.completedScore}>Final Score: 88%</Text>
            </View>
          </View>
        </Card>

        <Card
          title="📊 Learning Analytics"
          subtitle="Your progress insights"
          variant="outlined"
          size="medium"
          style={styles.analyticsCard}
        >
          <View style={styles.analytics}>
            <Text style={styles.analyticsItem}>📈 Overall Progress: 65%</Text>
            <Text style={styles.analyticsItem}>⏱️ Study Time: 15 hours total</Text>
            <Text style={styles.analyticsItem}>🎯 Accuracy Rate: 89%</Text>
            <Text style={styles.analyticsItem}>🔥 Current Streak: 12 days</Text>
            <Text style={styles.analyticsItem}>📚 Books Completed: 3</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="← Back to Results"
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
  currentCard: {
    marginBottom: 8,
  },
  currentPath: {
    gap: 16,
  },
  pathDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  progressInfo: {
    gap: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  continueButton: {
    width: '100%',
  },
  pathsCard: {
    marginBottom: 8,
  },
  pathsList: {
    gap: 20,
  },
  pathItem: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  pathTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  pathDesc: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  pathDuration: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  pathButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  completedCard: {
    marginBottom: 8,
  },
  completedPaths: {
    gap: 16,
  },
  completedItem: {
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  completedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#15803d',
    marginBottom: 4,
  },
  completedDate: {
    fontSize: 12,
    color: '#16a34a',
    marginBottom: 2,
  },
  completedScore: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '500',
  },
  analyticsCard: {
    marginBottom: 8,
  },
  analytics: {
    gap: 8,
  },
  analyticsItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  actions: {
    alignItems: 'center',
    marginTop: 8,
  },
  backButton: {
    width: '60%',
  },
});
