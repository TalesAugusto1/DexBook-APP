/**
 * LearningAssessment Component for AR Book Explorer
 * 
 * This screen assesses user's learning style and preferences.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface LearningAssessmentProps {
  // No props needed for learning assessment screen
}

interface Question {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    learningStyle: 'visual' | 'auditory' | 'kinesthetic';
  }[];
}

const questions: Question[] = [
  {
    id: '1',
    question: 'How do you prefer to learn new information?',
    options: [
      { id: 'a', text: 'By seeing diagrams and charts', learningStyle: 'visual' },
      { id: 'b', text: 'By listening to explanations', learningStyle: 'auditory' },
      { id: 'c', text: 'By doing hands-on activities', learningStyle: 'kinesthetic' },
    ],
  },
  {
    id: '2',
    question: 'What helps you remember information best?',
    options: [
      { id: 'a', text: 'Visual aids and images', learningStyle: 'visual' },
      { id: 'b', text: 'Repeating information aloud', learningStyle: 'auditory' },
      { id: 'c', text: 'Writing notes and practicing', learningStyle: 'kinesthetic' },
    ],
  },
  {
    id: '3',
    question: 'When studying, you prefer to:',
    options: [
      { id: 'a', text: 'Use highlighters and color coding', learningStyle: 'visual' },
      { id: 'b', text: 'Discuss with others or explain aloud', learningStyle: 'auditory' },
      { id: 'c', text: 'Take breaks and move around', learningStyle: 'kinesthetic' },
    ],
  },
];

export const LearningAssessment: React.FC<LearningAssessmentProps> = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = {
        ...answers,
        [questions[currentQuestion].id]: selectedOption,
      };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Assessment complete, calculate learning style
        const learningStyle = calculateLearningStyle(newAnswers);
        router.push({
          pathname: '/permission-setup',
          params: { learningStyle },
        });
      }
    }
  };

  const calculateLearningStyle = (userAnswers: Record<string, string>) => {
    const scores = { visual: 0, auditory: 0, kinesthetic: 0 };
    
    Object.values(userAnswers).forEach((answerId) => {
      const question = questions.find(q => 
        q.options.some(opt => opt.id === answerId)
      );
      if (question) {
        const option = question.options.find(opt => opt.id === answerId);
        if (option) {
          scores[option.learningStyle]++;
        }
      }
    });

    // Return the learning style with the highest score
    return Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Style Assessment</Text>
        <Text style={styles.subtitle}>
          Help us personalize your learning experience
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {questions[currentQuestion].question}
        </Text>

        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedOption === option.id && styles.optionButtonSelected,
              ]}
              onPress={() => handleOptionSelect(option.id)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option.id && styles.optionTextSelected,
                ]}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedOption && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!selectedOption}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion < questions.length - 1 ? 'Next' : 'Complete Assessment'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 8,
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
  questionContainer: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  optionButtonSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 16,
    color: '#1e293b',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#2563eb',
    fontWeight: '500',
  },
  actionsContainer: {
    marginTop: 'auto',
    paddingTop: 24,
  },
  nextButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LearningAssessment;
