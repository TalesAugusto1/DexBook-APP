/**
 * LearningPath Screen Component for AR Book Explorer
 * 
 * This screen displays personalized learning paths and recommendations.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const LearningPath: React.FC = () => {
  const navigation = useNavigation();

  const handleStartPath = (pathId: string) => {
    // TODO: Implement learning path start
    console.log(`Starting learning path: ${pathId}`);
  };

  const handleBackToQuiz = () => {
    navigation.navigate('QuizResults' as never);
  };

  const handleViewProgress = () => {
    navigation.navigate('ProgressDashboard' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Path</Text>
        <Text style={styles.subtitle}>
          Personalized journey based on your quiz results
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Recommended Path"
          subtitle="Based on your performance"
          variant="elevated"
          size="medium"
          style={styles.recommendedCard}
        >
          <View style={styles.pathInfo}>
            <Text style={styles.pathIcon}>🎯</Text>
            <Text style={styles.pathName}>Advanced Reading Comprehension</Text>
            <Text style={styles.pathDescription}>
              Build on your strong analytical skills with advanced reading strategies
            </Text>
            <Text style={styles.pathDuration}>Estimated time: 2-3 weeks</Text>
          </View>
        </Card>

        <Card
          title="Available Learning Paths"
          subtitle="Choose your next adventure"
          variant="outlined"
          size="medium"
          style={styles.pathsCard}
        >
          <View style={styles.pathsList}>
            <View style={styles.pathItem}>
              <Text style={styles.pathItemIcon}>📚</Text>
              <View style={styles.pathItemInfo}>
                <Text style={styles.pathItemName}>Reading Fundamentals</Text>
                <Text style={styles.pathItemDescription}>Master basic reading skills</Text>
              </View>
            </View>

            <View style={styles.pathItem}>
              <Text style={styles.pathItemIcon}>🧠</Text>
              <View style={styles.pathItemInfo}>
                <Text style={styles.pathItemName}>Critical Thinking</Text>
                <Text style={styles.pathItemDescription}>Develop analytical reasoning</Text>
              </View>
            </View>

            <View style={styles.pathItem}>
              <Text style={styles.pathItemIcon}>🎨</Text>
              <View style={styles.pathItemInfo}>
                <Text style={styles.pathItemName}>Creative Writing</Text>
                <Text style={styles.pathItemDescription}>Express your ideas through writing</Text>
              </View>
            </View>

            <View style={styles.pathItem}>
              <Text style={styles.pathItemIcon}>🔬</Text>
              <View style={styles.pathItemInfo}>
                <Text style={styles.pathItemName}>Scientific Reading</Text>
                <Text style={styles.pathItemDescription}>Understand scientific concepts</Text>
              </View>
            </View>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Start Recommended Path"
            onPress={() => handleStartPath('recommended')}
            variant="primary"
            size="large"
            style={styles.startButton}
          />

          <Button
            title="Back to Quiz Results"
            onPress={handleBackToQuiz}
            variant="outline"
            size="large"
            style={styles.backButton}
          />

          <Button
            title="View Progress"
            onPress={handleViewProgress}
            variant="outline"
            size="large"
            style={styles.progressButton}
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
  recommendedCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  pathInfo: {
    alignItems: 'center',
  },
  pathIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  pathName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  pathDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  pathDuration: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  pathsCard: {
    marginBottom: 30,
  },
  pathsList: {
    paddingVertical: 8,
  },
  pathItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  pathItemIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  pathItemInfo: {
    flex: 1,
  },
  pathItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  pathItemDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  actions: {
    gap: 16,
  },
  startButton: {
    marginBottom: 8,
  },
  backButton: {
    marginBottom: 8,
  },
  progressButton: {
    marginBottom: 8,
  },
});

export default LearningPath;
