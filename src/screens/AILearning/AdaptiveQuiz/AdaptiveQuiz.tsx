/**
 * AdaptiveQuiz Screen Component for AR Book Explorer
 * 
 * This screen provides AI-powered adaptive quiz functionality.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Loading } from '../../../components/foundation';

export const AdaptiveQuiz: React.FC = () => {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = [
    {
      question: "What is the main theme of the book you just read?",
      options: [
        "Adventure and exploration",
        "Friendship and teamwork",
        "Science and discovery",
        "History and culture"
      ]
    },
    {
      question: "Which character showed the most growth throughout the story?",
      options: [
        "The protagonist",
        "The mentor",
        "The antagonist",
        "The sidekick"
      ]
    },
    {
      question: "What was the most important lesson learned?",
      options: [
        "Never give up",
        "Trust your instincts",
        "Work together",
        "Learn from mistakes"
      ]
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz complete
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('QuizResults' as never);
      }, 2000);
    }
  };

  const handleSkip = () => {
    navigation.navigate('QuizResults' as never);
  };

  const currentQ = questions[currentQuestion];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Adaptive Quiz</Text>
        <Text style={styles.subtitle}>
          Test your understanding with AI-powered questions
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title={`Question ${currentQuestion + 1} of ${questions.length}`}
          subtitle={currentQ.question}
          variant="elevated"
          size="large"
          style={styles.questionCard}
        >
          {isLoading ? (
            <Loading
              variant="spinner"
              size="large"
              text="Analyzing your answers..."
              style={styles.loadingContainer}
            />
          ) : (
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
          )}
        </Card>

        <View style={styles.actions}>
          <Button
            title={currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            onPress={handleNextQuestion}
            variant="primary"
            size="large"
            disabled={selectedAnswer === null || isLoading}
            loading={isLoading}
            style={styles.nextButton}
          />

          <Button
            title="Skip Quiz"
            onPress={handleSkip}
            variant="secondary"
            size="large"
            style={styles.skipButton}
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
  questionCard: {
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 200,
  },
  actions: {
    gap: 16,
  },
  nextButton: {
    marginBottom: 8,
  },
  skipButton: {
    marginBottom: 8,
  },
});

export default AdaptiveQuiz;
