/**
 * WelcomeScreen Component for AR Book Explorer
 * 
 * This screen welcomes users and introduces the app features.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { appInfo } from '../../../config/app.config';
import { Button, Card, Modal } from '../../../components/foundation';

interface WelcomeScreenProps {
  // No props needed for welcome screen
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    router.push('/learning-assessment');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleLearnMore = () => {
    setShowModal(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to AR Book Explorer</Text>
        <Text style={styles.subtitle}>
          Transform your reading experience with interactive AR content and AI-powered learning
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <Card
          title="AR-Enhanced Reading"
          subtitle="Bring books to life with interactive 3D models and animations"
          variant="elevated"
          size="medium"
          style={styles.featureCard}
        >
          <Text style={styles.featureIcon}>📚</Text>
        </Card>

        <Card
          title="AI-Powered Learning"
          subtitle="Personalized quizzes and adaptive learning paths"
          variant="elevated"
          size="medium"
          style={styles.featureCard}
        >
          <Text style={styles.featureIcon}>🤖</Text>
        </Card>

        <Card
          title="Gamification"
          subtitle="Earn achievements and rewards as you learn"
          variant="elevated"
          size="medium"
          style={styles.featureCard}
        >
          <Text style={styles.featureIcon}>🎮</Text>
        </Card>

        <Card
          title="Accessibility First"
          subtitle="Universal design for all learners"
          variant="elevated"
          size="medium"
          style={styles.featureCard}
        >
          <Text style={styles.featureIcon}>♿</Text>
        </Card>
      </View>

      <View style={styles.actionsContainer}>
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          variant="primary"
          size="large"
          style={styles.primaryButton}
          accessibilityLabel="Start your AR Book Explorer journey"
        />

        <Button
          title="I Already Have an Account"
          onPress={handleSignIn}
          variant="outline"
          size="large"
          style={styles.secondaryButton}
          accessibilityLabel="Sign in to your existing account"
        />

        <Button
          title="Learn More"
          onPress={handleLearnMore}
          variant="secondary"
          size="medium"
          style={styles.learnMoreButton}
          accessibilityLabel="Learn more about AR Book Explorer features"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>

      {/* Learn More Modal */}
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="About AR Book Explorer"
        subtitle="Discover the future of interactive learning"
        variant="center"
        size="large"
        accessibilityLabel="Learn more about AR Book Explorer"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            AR Book Explorer revolutionizes the way students learn by combining traditional reading 
            with cutting-edge augmented reality technology. Our AI-powered system creates personalized 
            learning experiences that adapt to each student's unique learning style.
          </Text>
          
          <Text style={styles.modalText}>
            Key Features:
            {'\n'}• Interactive 3D models and animations
            {'\n'}• AI-generated personalized quizzes
            {'\n'}• Gamification with achievements and rewards
            {'\n'}• Universal accessibility design
            {'\n'}• Offline-first architecture
          </Text>

          <Button
            title="Start Learning"
            onPress={() => {
              setShowModal(false);
              handleGetStarted();
            }}
            variant="primary"
            size="large"
            style={styles.modalButton}
          />
        </View>
      </Modal>
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
    alignItems: 'center',
    marginBottom: 40,
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
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureCard: {
    marginBottom: 16,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 48,
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 32,
  },
  primaryButton: {
    marginBottom: 12,
  },
  secondaryButton: {
    marginBottom: 12,
  },
  learnMoreButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 18,
  },
  // Modal styles
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 16,
  },
});

export default WelcomeScreen;
