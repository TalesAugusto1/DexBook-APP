/**
 * Settings Screen Component for AR Book Explorer
 * 
 * This screen provides app settings and configuration options.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const Settings: React.FC = () => {
  const navigation = useNavigation();

  const handleAccessibilitySettings = () => {
    navigation.navigate('Accessibility' as never);
  };

  const handleParentTeacherSettings = () => {
    navigation.navigate('ParentTeacher' as never);
  };

  const handleNotifications = () => {
    // TODO: Implement notifications settings
  };

  const handlePrivacy = () => {
    // TODO: Implement privacy settings
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
          title="Accessibility"
          subtitle="Universal design settings"
          variant="elevated"
          size="medium"
          onPress={handleAccessibilitySettings}
          style={styles.settingsCard}
        >
          <Text style={styles.settingsIcon}>♿</Text>
        </Card>

        <Card
          title="Parent/Teacher Dashboard"
          subtitle="Monitoring and controls"
          variant="elevated"
          size="medium"
          onPress={handleParentTeacherSettings}
          style={styles.settingsCard}
        >
          <Text style={styles.settingsIcon}>👨‍👩‍👧‍👦</Text>
        </Card>

        <Card
          title="Notifications"
          subtitle="Learning reminders and updates"
          variant="outlined"
          size="medium"
          onPress={handleNotifications}
          style={styles.settingsCard}
        >
          <Text style={styles.settingsIcon}>🔔</Text>
        </Card>

        <Card
          title="Privacy & Security"
          subtitle="Data protection and COPPA compliance"
          variant="outlined"
          size="medium"
          onPress={handlePrivacy}
          style={styles.settingsCard}
        >
          <Text style={styles.settingsIcon}>🔒</Text>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Back to Home"
            onPress={() => navigation.navigate('MainTabs' as never)}
            variant="primary"
            size="large"
            style={styles.backButton}
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
  settingsCard: {
    marginBottom: 16,
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 48,
    textAlign: 'center',
  },
  actions: {
    marginTop: 20,
  },
  backButton: {
    marginBottom: 8,
  },
});

export default Settings;
