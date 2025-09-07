/**
 * Settings Tab Screen for AR Book Explorer
 * 
 * App settings using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function Settings() {
  const router = useRouter();

  const handleAccessibilitySettings = () => {
    router.push('/settings/accessibility');
  };

  const handleParentTeacherDashboard = () => {
    router.push('/settings/parent-teacher');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Customize your learning experience
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="♿ Accessibility"
          subtitle="Features for all learners"
          variant="elevated"
          size="medium"
          style={styles.settingCard}
        >
          <Text style={styles.cardDescription}>
            Adjust settings for screen readers, high contrast, font sizes, and other accessibility features.
          </Text>
          <Button
            title="Accessibility Settings"
            onPress={handleAccessibilitySettings}
            variant="primary"
            size="medium"
            style={styles.settingButton}
          />
        </Card>

        <Card
          title="👨‍👩‍👧‍👦 Parent/Teacher Dashboard"
          subtitle="Monitor learning progress"
          variant="outlined"
          size="medium"
          style={styles.settingCard}
        >
          <Text style={styles.cardDescription}>
            View detailed progress reports, manage content restrictions, and access educational tools.
          </Text>
          <Button
            title="Parent/Teacher Settings"
            onPress={handleParentTeacherDashboard}
            variant="secondary"
            size="medium"
            style={styles.settingButton}
          />
        </Card>

        <Card
          title="🎮 App Preferences"
          subtitle="General app settings"
          variant="outlined"
          size="medium"
          style={styles.settingCard}
        >
          <View style={styles.preferencesList}>
            <Text style={styles.preferenceItem}>🔊 Sound Effects: Enabled</Text>
            <Text style={styles.preferenceItem}>🎵 Background Music: Enabled</Text>
            <Text style={styles.preferenceItem}>📱 Notifications: Enabled</Text>
            <Text style={styles.preferenceItem}>🌙 Dark Mode: Disabled</Text>
            <Text style={styles.preferenceItem}>🌍 Language: English</Text>
          </View>
        </Card>

        <Card
          title="🔒 Privacy & Safety"
          subtitle="Data protection settings"
          variant="outlined"
          size="medium"
          style={styles.settingCard}
        >
          <View style={styles.privacyList}>
            <Text style={styles.privacyItem}>✅ COPPA Compliant</Text>
            <Text style={styles.privacyItem}>✅ GDPR Compliant</Text>
            <Text style={styles.privacyItem}>🔒 Data Encrypted</Text>
            <Text style={styles.privacyItem}>👥 No Data Sharing</Text>
          </View>
        </Card>

        <Card
          title="ℹ️ App Information"
          subtitle="Version and support"
          variant="outlined"
          size="medium"
          style={styles.settingCard}
        >
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>Version: 1.0.0</Text>
            <Text style={styles.infoItem}>Build: 2024.01.001</Text>
            <Text style={styles.infoItem}>Support: help@arbookexplorer.com</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Back to Home"
            onPress={handleBackToHome}
            variant="primary"
            size="large"
            style={styles.backButton}
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
  settingCard: {
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  settingButton: {
    width: '100%',
  },
  preferencesList: {
    gap: 8,
  },
  preferenceItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 4,
  },
  privacyList: {
    gap: 8,
  },
  privacyItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 4,
  },
  infoList: {
    gap: 8,
  },
  infoItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 4,
  },
  actions: {
    alignItems: 'center',
    marginTop: 8,
  },
  backButton: {
    width: '100%',
  },
});
