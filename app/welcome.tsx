/**
 * Welcome Screen for AR Book Explorer
 * 
 * Welcome screen using expo-router navigation with authentication guard.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthGuard, Button, Card, Modal } from '../src/components/foundation';

export default function WelcomeScreen() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    router.push('/learning-assessment');
  };

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  const handleLearnMore = () => {
    setShowModal(true);
  };

  return (
    <AuthGuard requireAuth={false}>
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to AR Book Explorer!</Text>
        <Text style={styles.subtitle}>
          Discover the magic of learning through augmented reality and interactive storytelling.
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="🚀 Get Started"
          subtitle="Begin your learning journey"
          variant="elevated"
          size="large"
          style={styles.featureCard}
        >
          <Text style={styles.featureDescription}>
            Take a quick assessment to personalize your experience
          </Text>
          <Button
            title="Start Assessment"
            onPress={handleGetStarted}
            variant="primary"
            size="large"
            style={styles.primaryButton}
          />
        </Card>

        <Card
          title="📚 Features"
          subtitle="What you can do"
          variant="outlined"
          size="medium"
          style={styles.featureCard}
        >
          <Text style={styles.featureDescription}>
            • Scan books with AR technology{'\n'}
            • Interactive learning experiences{'\n'}
            • Personalized quizzes and assessments{'\n'}
            • Achievement system and rewards
          </Text>
        </Card>

        <Card
          title="🔐 Already have an account?"
          subtitle="Sign in to continue"
          variant="outlined"
          size="medium"
          style={styles.featureCard}
        >
          <Button
            title="Sign In"
            onPress={handleSignIn}
            variant="secondary"
            size="medium"
            style={styles.secondaryButton}
          />
        </Card>
      </View>

      <View style={styles.footer}>
        <Button
          title="Learn More"
          onPress={handleLearnMore}
          variant="outline"
          size="medium"
          style={styles.learnMoreButton}
        />
      </View>

      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="About AR Book Explorer"
        variant="default"
        size="medium"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            AR Book Explorer uses cutting-edge augmented reality technology to bring books to life. 
            Our platform provides:
            {'\n\n'}
            • Interactive 3D models and animations
            {'\n'}
            • AI-powered personalized learning paths
            {'\n'}
            • Gamified reading experiences
            {'\n'}
            • COPPA-compliant safety for all ages
            {'\n'}
            • Accessibility features for diverse learners
          </Text>
          <Button
            title="Got it!"
            onPress={() => setShowModal(false)}
            variant="primary"
            size="medium"
            style={styles.modalButton}
          />
        </View>
      </Modal>
    </ScrollView>
    </AuthGuard>
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
    paddingBottom: 32,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
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
  content: {
    padding: 24,
    gap: 20,
  },
  featureCard: {
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
  learnMoreButton: {
    width: '80%',
  },
  modalContent: {
    padding: 16,
  },
  modalText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
  },
});
