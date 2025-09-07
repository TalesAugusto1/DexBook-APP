/**
 * Parent/Teacher Dashboard Screen for AR Book Explorer
 * 
 * Supervision and monitoring features using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';

export default function ParentTeacher() {
  const router = useRouter();

  const handleBackToSettings = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👨‍👩‍👧‍👦 Parent/Teacher Dashboard</Text>
        <Text style={styles.subtitle}>
          Monitor and support learning progress
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="📊 Student Progress Overview"
          subtitle="Learning analytics and insights"
          variant="elevated"
          size="large"
          style={styles.progressCard}
        >
          <View style={styles.progressStats}>
            <View style={styles.statRow}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statLabel}>Books Read</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>89%</Text>
                <Text style={styles.statLabel}>Avg. Quiz Score</Text>
              </View>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>32h</Text>
                <Text style={styles.statLabel}>Reading Time</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>7</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card
          title="🎯 Learning Goals"
          subtitle="Track educational objectives"
          variant="outlined"
          size="medium"
          style={styles.goalsCard}
        >
          <View style={styles.goals}>
            <View style={styles.goalItem}>
              <Text style={styles.goalTitle}>📚 Monthly Reading Goal</Text>
              <View style={styles.goalProgress}>
                <View style={styles.goalBar}>
                  <View style={[styles.goalFill, { width: '80%' }]} />
                </View>
                <Text style={styles.goalText}>8/10 books this month</Text>
              </View>
            </View>
            
            <View style={styles.goalItem}>
              <Text style={styles.goalTitle}>🎯 Comprehension Target</Text>
              <View style={styles.goalProgress}>
                <View style={styles.goalBar}>
                  <View style={[styles.goalFill, { width: '89%' }]} />
                </View>
                <Text style={styles.goalText}>89% average (Target: 85%)</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card
          title="🔒 Safety & Privacy Controls"
          subtitle="Content and interaction settings"
          variant="outlined"
          size="medium"
          style={styles.safetyCard}
        >
          <View style={styles.safetySettings}>
            <Text style={styles.safetyItem}>✅ Age-appropriate content only</Text>
            <Text style={styles.safetyItem}>✅ COPPA compliance active</Text>
            <Text style={styles.safetyItem}>✅ No data sharing with third parties</Text>
            <Text style={styles.safetyItem}>✅ Screen time monitoring enabled</Text>
            <Text style={styles.safetyItem}>✅ Educational content verified</Text>
          </View>
        </Card>

        <Card
          title="📧 Communication Preferences"
          subtitle="Reports and notifications"
          variant="outlined"
          size="medium"
          style={styles.communicationCard}
        >
          <View style={styles.communications}>
            <Text style={styles.commItem}>📊 Weekly progress reports: Enabled</Text>
            <Text style={styles.commItem}>🎯 Achievement notifications: Enabled</Text>
            <Text style={styles.commItem}>⚠️ Concern alerts: Enabled</Text>
            <Text style={styles.commItem}>📚 Reading recommendations: Weekly</Text>
          </View>
        </Card>

        <Card
          title="🎓 Educational Resources"
          subtitle="Tools for parents and teachers"
          variant="outlined"
          size="medium"
          style={styles.resourcesCard}
        >
          <View style={styles.resources}>
            <Text style={styles.resourceItem}>📖 Reading guide downloads</Text>
            <Text style={styles.resourceItem}>🎯 Discussion questions</Text>
            <Text style={styles.resourceItem}>📊 Detailed progress reports</Text>
            <Text style={styles.resourceItem}>💡 Learning activity suggestions</Text>
            <Text style={styles.resourceItem}>🔗 Curriculum alignment guides</Text>
          </View>
        </Card>

        <Card
          title="🌟 Support & Accessibility"
          subtitle="Inclusive learning environment"
          variant="elevated"
          size="medium"
          style={styles.supportCard}
        >
          <Text style={styles.supportDescription}>
            AR Book Explorer provides comprehensive accessibility support:
            {'\n\n'}
            • Visual, auditory, and motor accessibility features
            {'\n'}• Multiple learning style accommodations  
            {'\n'}• Customizable difficulty levels
            {'\n'}• Multi-language support options
            {'\n'}• Special needs learning pathways
            {'\n'}• Professional educator resources
          </Text>
        </Card>

        <View style={styles.actions}>
          <Button
            title="📊 Download Full Report"
            onPress={() => {/* TODO: Generate report */}}
            variant="primary"
            size="large"
            style={styles.reportButton}
          />
          <Button
            title="← Back to Settings"
            onPress={handleBackToSettings}
            variant="secondary"
            size="medium"
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
  progressCard: {
    marginBottom: 8,
  },
  progressStats: {
    gap: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  goalsCard: {
    marginBottom: 8,
  },
  goals: {
    gap: 16,
  },
  goalItem: {
    gap: 8,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  goalProgress: {
    gap: 6,
  },
  goalBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  goalFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
  goalText: {
    fontSize: 12,
    color: '#64748b',
  },
  safetyCard: {
    marginBottom: 8,
  },
  safetySettings: {
    gap: 8,
  },
  safetyItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  communicationCard: {
    marginBottom: 8,
  },
  communications: {
    gap: 8,
  },
  commItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  resourcesCard: {
    marginBottom: 8,
  },
  resources: {
    gap: 8,
  },
  resourceItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  supportCard: {
    marginBottom: 8,
  },
  supportDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  actions: {
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  reportButton: {
    width: '100%',
  },
  backButton: {
    width: '70%',
  },
});
