/**
 * LearningAssessment Screen Component for AR Book Explorer
 * 
 * This screen handles learning style assessment and personalization.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const LearningAssessment: React.FC = () => {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      question: "How do you prefer to learn new information?",
      options: [
        "Reading text and books",
        "Watching videos and animations",
        "Listening to audio explanations",
        "Hands-on activities and experiments"
      ]
    },
    {
      question: "What type of content helps you understand better?",
      options: [
        "Visual diagrams and charts",
        "Interactive 3D models",
        "Step-by-step instructions",
        "Real-world examples"
      ]
    },
    {
      question: "How do you like to practice what you learn?",
      options: [
        "Taking quizzes and tests",
        "Building projects",
        "Teaching others",
        "Playing educational games"
      ]
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete
      navigation.navigate('PermissionSetup' as never);
    }
  };

  const handleSkip = () => {
    navigation.navigate('PermissionSetup' as never);
  };

  const currentQ = questions[currentQuestion];

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
  actions: {
    gap: 16,
  },
  skipButton: {
    marginBottom: 8,
  },
});

export default LearningAssessment;