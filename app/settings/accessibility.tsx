/**
 * Accessibility Settings Screen for AR Book Explorer
 * 
 * Accessibility configuration using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function Accessibility() {
  const router = useRouter();

  const handleBackToSettings = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>♿ Accessibility Settings</Text>
        <Text style={styles.subtitle}>
          Customize the app for your learning needs
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="👀 Visual Accessibility"
          subtitle="Display and reading settings"
          variant="elevated"
          size="medium"
          style={styles.settingCard}
        >
          <View style={styles.settingsList}>
            <Text style={styles.settingItem}>🔠 Large Text: Enabled</Text>
            <Text style={styles.settingItem}>🌓 High Contrast: Disabled</Text>
            <Text style={styles.settingItem}>🎨 Color Mode: Default</Text>
            <Text style={styles.settingItem}>⚡ Reduce Motion: Disabled</Text>
          </View>
        </Card>

        <Card
          title="🔊 Audio Accessibility"
          subtitle="Sound and voice features"
          variant="outlined"
          size="medium"
          style={styles.settingCard}
        >
          <View style={styles.settingsList}>
            <Text style={styles.settingItem}>📢 Screen Reader: Compatible</Text>
            <Text style={styles.settingItem}>🎵 Background Music: Low</Text>
            <Text style={styles.settingItem}>🔔 Sound Effects: Enabled</Text>
            <Text style={styles.settingItem}>🗣️ Voice Over: Available</Text>
          </View>
        </Card>

        <Card
          title="👆 Interaction Accessibility"
          subtitle="Touch and navigation settings"
          variant="outlined"
          size="medium"
          style={styles.settingCard}
        >
          <View style={styles.settingsList}>
            <Text style={styles.settingItem}>⏱️ Touch Delays: Standard</Text>
            <Text style={styles.settingItem}>🎯 Button Size: Default</Text>
            <Text style={styles.settingItem}>🔄 Gesture Support: Enabled</Text>
            <Text style={styles.settingItem}>⌨️ Keyboard Navigation: Available</Text>
          </View>
        </Card>

        <Card
          title="🧠 Learning Accessibility"
          subtitle="Cognitive and learning support"
          variant="outlined"
          size="medium"
          style={styles.settingCard}
        >
          <View style={styles.settingsList}>
            <Text style={styles.settingItem}>📚 Reading Speed: Adjustable</Text>
            <Text style={styles.settingItem}>💡 Extra Hints: Enabled</Text>
            <Text style={styles.settingItem}>🔄 Repetition Support: Available</Text>
            <Text style={styles.settingItem}>🎯 Focus Mode: Available</Text>
          </View>
        </Card>

        <Card
          title="🌍 Universal Design"
          subtitle="Inclusive features for all"
          variant="elevated"
          size="medium"
          style={styles.universalCard}
        >
          <Text style={styles.universalDescription}>
            AR Book Explorer is designed with universal accessibility principles:
            {'\n\n'}
            • WCAG 2.1 AA compliant interface
            {'\n'}• Multi-sensory learning experiences
            {'\n'}• Flexible interaction methods
            {'\n'}• Personalized learning paths
            {'\n'}• Inclusive content design
            {'\n'}• Cultural sensitivity support
          </Text>
        </Card>

        <View style={styles.actions}>
          <Button
            title="← Back to Settings"
            onPress={handleBackToSettings}
            variant="secondary"
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
  settingsList: {
    gap: 8,
  },
  settingItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 4,
  },
  universalCard: {
    marginBottom: 8,
  },
  universalDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  actions: {
    alignItems: 'center',
    marginTop: 8,
  },
  backButton: {
    width: '70%',
  },
});
