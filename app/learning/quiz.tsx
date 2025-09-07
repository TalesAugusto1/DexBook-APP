/**
 * Adaptive Quiz Screen for AR Book Explorer
 * 
 * AI-powered adaptive quiz using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Loading } from '../../src/components/foundation';

const sampleQuestions = [
  {
    question: "What is the main character's motivation in the story?",
    options: ["Adventure", "Love", "Revenge", "Discovery"],
    correct: 0
  },
  {
    question: "Where does the story take place?",
    options: ["City", "Forest", "Ocean", "Mountains"],
    correct: 1
  },
  {
    question: "What lesson does the character learn?",
    options: ["Patience", "Courage", "Friendship", "Honesty"],
    correct: 2
  }
];

export default function AdaptiveQuiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentQ = sampleQuestions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizComplete(newAnswers);
    }
  };

  const handleQuizComplete = (finalAnswers: number[]) => {
    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      router.push('/learning/results');
    }, 2000);
  };

  const handleSkipQuiz = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Loading size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Processing your answers...</Text>
          <Text style={styles.loadingSubtext}>Generating personalized results</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📝 Adaptive Quiz</Text>
        <Text style={styles.subtitle}>
          Test your understanding with AI-generated questions
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title={`Question ${currentQuestion + 1} of ${sampleQuestions.length}`}
          subtitle="Select the best answer"
          variant="elevated"
          size="large"
          style={styles.questionCard}
        >
          <Text style={styles.questionText}>{currentQ.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                title={option}
                onPress={() => handleAnswerSelect(index)}
                variant={selectedAnswer === index ? "primary" : "outline"}
                size="medium"
                style={styles.optionButton}
              />
            ))}
          </View>

          <View style={styles.questionActions}>
            <Button
              title={currentQuestion === sampleQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              onPress={handleNextQuestion}
              variant="primary"
              size="large"
              style={styles.nextButton}
              disabled={selectedAnswer === null}
            />
          </View>
        </Card>

        <View style={styles.progress}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} of {sampleQuestions.length} questions
          </Text>
        </View>

        <Card
          title="💡 Quiz Features"
          subtitle="Enhanced learning experience"
          variant="outlined"
          size="medium"
          style={styles.featuresCard}
        >
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>🤖 AI-generated questions</Text>
            <Text style={styles.featureItem}>📊 Adaptive difficulty</Text>
            <Text style={styles.featureItem}>🎯 Personalized feedback</Text>
            <Text style={styles.featureItem}>📈 Progress tracking</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Skip Quiz"
            onPress={handleSkipQuiz}
            variant="secondary"
            size="medium"
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
  },
  content: {
    padding: 24,
    gap: 20,
  },
  questionCard: {
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
  },
  questionActions: {
    alignItems: 'center',
  },
  nextButton: {
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
  featuresCard: {
    marginBottom: 8,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 4,
  },
  actions: {
    alignItems: 'center',
    marginTop: 8,
  },
  skipButton: {
    width: '60%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});
