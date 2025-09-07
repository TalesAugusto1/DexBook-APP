/**
 * Learning Assessment Screen for AR Book Explorer
 * 
 * Learning style assessment using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../src/components/foundation';

const questions = [
  {
    question: "How do you prefer to learn new things?",
    options: ["Reading books", "Watching videos", "Hands-on activities", "Listening to explanations"]
  },
  {
    question: "What type of stories interest you most?",
    options: ["Adventure stories", "Science fiction", "Historical tales", "Mystery novels"]
  },
  {
    question: "How do you like to interact with technology?",
    options: ["Simple and easy", "Advanced features", "Visual interfaces", "Voice commands"]
  }
];

export default function LearningAssessment() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete
      handleComplete();
    }
  };

  const handleComplete = () => {
    // TODO: Process assessment results
    router.push('/permission-setup');
  };

  const handleSkip = () => {
    router.push('/permission-setup');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Assessment</Text>
        <Text style={styles.subtitle}>
          Help us personalize your learning experience
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title={`Question ${currentQuestion + 1} of ${questions.length}`}
          subtitle={currentQ?.question || ''}
          variant="elevated"
          size="large"
          style={styles.questionCard}
        >
          <View style={styles.optionsContainer}>
            {currentQ?.options.map((option, index) => (
              <Button
                key={index}
                title={option}
                onPress={() => handleAnswerSelect(index)}
                variant="outline"
                size="medium"
                style={styles.optionButton}
              />
            ))}
          </View>
        </Card>

        <View style={styles.progress}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} of {questions.length} questions
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Skip Assessment"
            onPress={handleSkip}
            variant="secondary"
            size="large"
            style={styles.skipButton}
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
    textAlign: 'center',
  },
  content: {
    padding: 24,
    gap: 20,
  },
  questionCard: {
    marginBottom: 8,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    width: '100%',
  },
  progress: {
    alignItems: 'center',
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
  },
  actions: {
    alignItems: 'center',
    marginTop: 16,
  },
  skipButton: {
    width: '80%',
  },
});
