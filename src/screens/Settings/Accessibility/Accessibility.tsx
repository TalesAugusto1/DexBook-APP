/**
 * Accessibility Screen Component for AR Book Explorer
 * 
 * This screen provides accessibility settings and universal design options.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const Accessibility: React.FC = () => {
  const navigation = useNavigation();

  const handleBackToSettings = () => {
    navigation.navigate('Settings' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Accessibility Settings</Text>
        <Text style={styles.subtitle}>
          Universal design for all learners
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Visual Accessibility"
          subtitle="Screen reader and visual aids"
          variant="elevated"
          size="medium"
          style={styles.settingsCard}
        >
          <View style={styles.settingsList}>
            <Text style={styles.settingItem}>🔍 High Contrast Mode</Text>
            <Text style={styles.settingItem}>🔤 Large Text Size</Text>
            <Text style={styles.settingItem}>🎨 Color Blind Support</Text>
            <Text style={styles.settingItem}>📱 Screen Reader Support</Text>
          </View>
        </Card>

        <Card
          title="Motor Accessibility"
          subtitle="Physical interaction support"
          variant="outlined"
          size="medium"
          style={styles.settingsCard}
        >
          <View style={styles.settingsList}>
            <Text style={styles.settingItem}>👆 Touch Accommodations</Text>
            <Text style={styles.settingItem}>⌨️ Switch Control</Text>
            <Text style={styles.settingItem}>🎯 Voice Control</Text>
            <Text style={styles.settingItem}>🖱️ Assistive Touch</Text>
          </View>
        </Card>

        <Card
          title="Cognitive Accessibility"
          subtitle="Learning support features"
          variant="outlined"
          size="medium"
          style={styles.settingsCard}
        >
          <View style={styles.settingsList}>
            <Text style={styles.settingItem}>🧠 Focus Mode</Text>
            <Text style={styles.settingItem}>⏰ Time Extensions</Text>
            <Text style={styles.settingItem}>📝 Note Taking</Text>
            <Text style={styles.settingItem}>🎯 Goal Setting</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Back to Settings"
            onPress={handleBackToSettings}
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
    marginBottom: 20,
  },
  settingsList: {
    paddingVertical: 8,
  },
  settingItem: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  actions: {
    marginTop: 20,
  },
  backButton: {
    marginBottom: 8,
  },
});

export default Accessibility;
