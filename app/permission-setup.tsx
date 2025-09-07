/**
 * Permission Setup Screen for AR Book Explorer
 * 
 * App permissions and privacy settings using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../src/components/foundation';

export default function PermissionSetup() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/auth/login');
  };

  const handleSkip = () => {
    router.push('/(tabs)');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>App Permissions</Text>
        <Text style={styles.subtitle}>
          We need some permissions to provide the best experience
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="📱 Camera Access"
          subtitle="Required for book scanning"
          variant="elevated"
          size="medium"
          style={styles.permissionCard}
        >
          <Text style={styles.permissionDescription}>
            We use your camera to scan book covers and enable AR features. 
            Your camera data is processed locally and never stored.
          </Text>
        </Card>

        <Card
          title="🔊 Microphone Access"
          subtitle="Optional for voice features"
          variant="outlined"
          size="medium"
          style={styles.permissionCard}
        >
          <Text style={styles.permissionDescription}>
            Voice features help with accessibility and interactive reading. 
            You can enable this later in settings.
          </Text>
        </Card>

        <Card
          title="📦 Storage Access"
          subtitle="For saving your progress"
          variant="outlined"
          size="medium"
          style={styles.permissionCard}
        >
          <Text style={styles.permissionDescription}>
            We store your reading progress and achievements locally on your device. 
            This data stays private and secure.
          </Text>
        </Card>

        <Card
          title="🔔 Notifications"
          subtitle="Optional reading reminders"
          variant="outlined"
          size="medium"
          style={styles.permissionCard}
        >
          <Text style={styles.permissionDescription}>
            We can send you helpful reminders about reading goals and new content. 
            You can disable these anytime.
          </Text>
        </Card>

        <Card
          title="🔒 Privacy Promise"
          subtitle="Your data is safe with us"
          variant="elevated"
          size="medium"
          style={styles.privacyCard}
        >
          <Text style={styles.privacyDescription}>
            • We never share your personal data{'\n'}
            • All data is encrypted and secure{'\n'}
            • COPPA and GDPR compliant{'\n'}
            • You control your privacy settings
          </Text>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Continue with Setup"
            onPress={handleContinue}
            variant="primary"
            size="large"
            style={styles.continueButton}
          />
          <Button
            title="Skip for Now"
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
    gap: 16,
  },
  permissionCard: {
    marginBottom: 8,
  },
  privacyCard: {
    marginBottom: 8,
    marginTop: 8,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  privacyDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  actions: {
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
  },
  continueButton: {
    width: '100%',
  },
  skipButton: {
    width: '100%',
  },
});
