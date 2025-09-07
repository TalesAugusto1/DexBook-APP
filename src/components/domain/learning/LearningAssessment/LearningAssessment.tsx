/**
 * Learning Assessment Component for AR Book Explorer
 * 
 * Interactive learning style assessment quiz following Milestone 2.2 requirements.
 * Determines visual, auditory, kinesthetic, and reading preferences.
 * Following AlLibrary coding rules for accessibility-first design.
 */

import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { Card } from '../../../foundation/Card/Card';
import { Button } from '../../../foundation/Button/Button';
import { Loading } from '../../../foundation/Loading/Loading';
import styles from './LearningAssessment.module.css';

// Assessment Question Types
export interface AssessmentQuestion {
  id: string;
  question: string;
  description: string;
  options: AssessmentOption[];
  category: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  required: boolean;
}

export interface AssessmentOption {
  id: string;
  text: string;
  value: number; // 1-5 scale
  description?: string;
}

export interface AssessmentResponse {
  questionId: string;
  optionId: string;
  value: number;
  category: string;
}

export interface AssessmentResults {
  visual: number;
  auditory: number;
  kinesthetic: number;
  reading: number;
  primaryLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  readingLevel: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
}

export interface LearningAssessmentProps {
  onComplete: (results: AssessmentResults) => void;
  onProgress: (progress: number) => void;
  isLoading?: boolean;
}

// Assessment Questions Data
const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'visual-1',
    question: 'How do you prefer to learn new information?',
    description: 'Choose the option that best describes your learning preference',
    category: 'visual',
    required: true,
    options: [
      { id: 'v1-1', text: 'Looking at pictures, diagrams, and charts', value: 5 },
      { id: 'v1-2', text: 'Listening to explanations and discussions', value: 2 },
      { id: 'v1-3', text: 'Hands-on activities and experiments', value: 2 },
      { id: 'v1-4', text: 'Reading detailed text and taking notes', value: 3 },
    ],
  },
  {
    id: 'auditory-1',
    question: 'When someone gives you directions, you prefer:',
    description: 'Select your preferred way to receive directions',
    category: 'auditory',
    required: true,
    options: [
      { id: 'a1-1', text: 'Written step-by-step instructions', value: 2 },
      { id: 'a1-2', text: 'Spoken verbal directions', value: 5 },
      { id: 'a1-3', text: 'A map or visual guide', value: 2 },
      { id: 'a1-4', text: 'Walking through it together', value: 3 },
    ],
  },
  {
    id: 'kinesthetic-1',
    question: 'What helps you remember information best?',
    description: 'Think about what works best for your memory',
    category: 'kinesthetic',
    required: true,
    options: [
      { id: 'k1-1', text: 'Writing it down or taking notes', value: 3 },
      { id: 'k1-2', text: 'Repeating it out loud', value: 2 },
      { id: 'k1-3', text: 'Practicing or doing it myself', value: 5 },
      { id: 'k1-4', text: 'Creating visual reminders', value: 2 },
    ],
  },
  {
    id: 'reading-1',
    question: 'When reading a story, you prefer:',
    description: 'Choose your preferred reading experience',
    category: 'reading',
    required: true,
    options: [
      { id: 'r1-1', text: 'Reading silently to yourself', value: 5 },
      { id: 'r1-2', text: 'Having someone read aloud to you', value: 2 },
      { id: 'r1-3', text: 'Acting out the story', value: 2 },
      { id: 'r1-4', text: 'Looking at pictures while reading', value: 3 },
    ],
  },
  {
    id: 'visual-2',
    question: 'In a classroom, you learn best when:',
    description: 'Consider your ideal classroom learning environment',
    category: 'visual',
    required: true,
    options: [
      { id: 'v2-1', text: 'The teacher uses slides and visual aids', value: 5 },
      { id: 'v2-2', text: 'There are group discussions', value: 2 },
      { id: 'v2-3', text: 'You can move around and participate', value: 2 },
      { id: 'v2-4', text: 'You have textbooks to reference', value: 3 },
    ],
  },
  {
    id: 'auditory-2',
    question: 'When learning something new, you prefer:',
    description: 'Think about your ideal learning method',
    category: 'auditory',
    required: true,
    options: [
      { id: 'a2-1', text: 'Reading about it first', value: 2 },
      { id: 'a2-2', text: 'Having someone explain it to you', value: 5 },
      { id: 'a2-3', text: 'Watching a demonstration', value: 3 },
      { id: 'a2-4', text: 'Trying it yourself immediately', value: 2 },
    ],
  },
  {
    id: 'kinesthetic-2',
    question: 'You understand concepts better when you:',
    description: 'Consider how you process new concepts',
    category: 'kinesthetic',
    required: true,
    options: [
      { id: 'k2-1', text: 'See examples and models', value: 2 },
      { id: 'k2-2', text: 'Hear detailed explanations', value: 2 },
      { id: 'k2-3', text: 'Work through problems yourself', value: 5 },
      { id: 'k2-4', text: 'Read step-by-step instructions', value: 3 },
    ],
  },
  {
    id: 'reading-2',
    question: 'Your favorite type of books are:',
    description: 'Select your preferred reading genre and style',
    category: 'reading',
    required: true,
    options: [
      { id: 'r2-1', text: 'Adventure stories with lots of action', value: 3 },
      { id: 'r2-2', text: 'Books with detailed descriptions', value: 5 },
      { id: 'r2-3', text: 'Interactive books with activities', value: 2 },
      { id: 'r2-4', text: 'Books with lots of pictures', value: 2 },
    ],
  },
];

const INTEREST_CATEGORIES = [
  'Adventure', 'Science Fiction', 'Fantasy', 'Mystery', 'Biography',
  'Science', 'Technology', 'Nature', 'Art', 'Music', 'Sports',
  'History', 'Travel', 'Cooking', 'Animals', 'Space', 'Ocean'
];

export const LearningAssessment: React.FC<LearningAssessmentProps> = ({
  onComplete,
  onProgress,
  isLoading = false,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInterests, setShowInterests] = useState(false);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === ASSESSMENT_QUESTIONS.length - 1;
  const progress = ((currentQuestionIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  // Update progress
  React.useEffect(() => {
    onProgress(showInterests ? 90 : progress);
  }, [progress, showInterests, onProgress]);

  const handleOptionSelect = useCallback((option: AssessmentOption) => {
    const response: AssessmentResponse = {
      questionId: currentQuestion.id,
      optionId: option.id,
      value: option.value,
      category: currentQuestion.category,
    };

    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== currentQuestion.id);
      return [...filtered, response];
    });
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    const hasResponse = responses.some(r => r.questionId === currentQuestion.id);
    
    if (!hasResponse) {
      Alert.alert('Please select an option', 'Please choose an answer before continuing.');
      return;
    }

    if (isLastQuestion) {
      setShowInterests(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestion.id, responses, isLastQuestion]);

  const handlePrevious = useCallback(() => {
    if (showInterests) {
      setShowInterests(false);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex, showInterests]);

  const handleInterestToggle = useCallback((interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  }, []);

  const calculateResults = useCallback((): AssessmentResults => {
    const categoryScores = {
      visual: 0,
      auditory: 0,
      kinesthetic: 0,
      reading: 0,
    };

    // Calculate average scores for each category
    responses.forEach(response => {
      categoryScores[response.category as keyof typeof categoryScores] += response.value;
    });

    // Calculate averages
    const questionsPerCategory = 2; // We have 2 questions per category
    Object.keys(categoryScores).forEach(category => {
      categoryScores[category as keyof typeof categoryScores] = 
        categoryScores[category as keyof typeof categoryScores] / questionsPerCategory;
    });

    // Determine primary learning style
    let primaryLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' = 'visual';
    let maxScore = categoryScores.visual;

    Object.entries(categoryScores).forEach(([category, score]) => {
      if (score > maxScore) {
        maxScore = score;
        primaryLearningStyle = category as typeof primaryLearningStyle;
      }
    });

    // Determine reading level based on reading and visual scores
    const readingScore = categoryScores.reading;
    let readingLevel: 'beginner' | 'intermediate' | 'advanced' = 'intermediate';
    
    if (readingScore < 3) {
      readingLevel = 'beginner';
    } else if (readingScore > 4) {
      readingLevel = 'advanced';
    }

    return {
      visual: Math.round(categoryScores.visual * 20), // Convert to 0-100 scale
      auditory: Math.round(categoryScores.auditory * 20),
      kinesthetic: Math.round(categoryScores.kinesthetic * 20),
      reading: Math.round(categoryScores.reading * 20),
      primaryLearningStyle,
      readingLevel,
      interests: selectedInterests,
    };
  }, [responses, selectedInterests]);

  const handleComplete = useCallback(async () => {
    if (selectedInterests.length === 0) {
      Alert.alert(
        'Select Interests', 
        'Please select at least one interest to help personalize your experience.'
      );
      return;
    }

    setIsProcessing(true);
    onProgress(100);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const results = calculateResults();
      onComplete(results);
    } catch (error) {
      console.error('Error processing assessment:', error);
      Alert.alert('Error', 'There was an error processing your assessment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedInterests, calculateResults, onComplete, onProgress]);

  const getSelectedResponse = useCallback(() => {
    return responses.find(r => r.questionId === currentQuestion.id);
  }, [responses, currentQuestion]);

  if (isLoading || isProcessing) {
    return (
      <View style={styles.loadingContainer}>
        <Loading size="large" />
        <Text style={styles.loadingText}>
          {isProcessing ? 'Processing your learning profile...' : 'Loading assessment...'}
        </Text>
      </View>
    );
  }

  if (showInterests) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>What are your interests?</Text>
            <Text style={styles.description}>
              Select topics that interest you. This helps us recommend books you'll love!
            </Text>
          </View>

          <View style={styles.interestsGrid}>
            {INTEREST_CATEGORIES.map((interest) => (
              <Pressable
                key={interest}
                style={[
                  styles.interestChip,
                  selectedInterests.includes(interest) && styles.interestChipSelected
                ]}
                onPress={() => handleInterestToggle(interest)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selectedInterests.includes(interest) }}
                accessibilityLabel={`${interest} interest`}
              >
                <Text
                  style={[
                    styles.interestChipText,
                    selectedInterests.includes(interest) && styles.interestChipTextSelected
                  ]}
                >
                  {interest}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.selectionCount}>
            {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected
          </Text>

          <View style={styles.navigation}>
            <Button
              title="Back"
              variant="secondary"
              onPress={handlePrevious}
              style={styles.navButton}
            />
            <Button
              title="Complete Assessment"
              onPress={handleComplete}
              disabled={selectedInterests.length === 0}
              style={styles.navButton}
            />
          </View>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of {ASSESSMENT_QUESTIONS.length}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>

          <Text style={styles.title}>{currentQuestion.question}</Text>
          <Text style={styles.description}>{currentQuestion.description}</Text>
        </View>

        <View style={styles.options}>
          {currentQuestion.options.map((option) => {
            const isSelected = getSelectedResponse()?.optionId === option.id;
            
            return (
              <Pressable
                key={option.id}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => handleOptionSelect(option)}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected }}
                accessibilityLabel={option.text}
              >
                <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                  {isSelected && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option.text}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.navigation}>
          <Button
            title="Previous"
            variant="secondary"
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
            style={styles.navButton}
          />
          <Button
            title={isLastQuestion ? "Next" : "Next"}
            onPress={handleNext}
            disabled={!getSelectedResponse()}
            style={styles.navButton}
          />
        </View>
      </Card>
    </ScrollView>
  );
};
