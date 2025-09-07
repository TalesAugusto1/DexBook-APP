/**
 * ParentTeacher Screen Component for AR Book Explorer
 * 
 * This screen provides parent and teacher monitoring and control features.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const ParentTeacher: React.FC = () => {
  const navigation = useNavigation();

  const handleBackToSettings = () => {
    navigation.navigate('Settings' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Parent/Teacher Dashboard</Text>
        <Text style={styles.subtitle}>
          Monitor and support learning progress
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Student Progress"
          subtitle="Learning analytics and insights"
          variant="elevated"
          size="medium"
          style={styles.dashboardCard}
        >
          <View style={styles.dashboardList}>
            <Text style={styles.dashboardItem}>📊 Reading Progress: 85%</Text>
            <Text style={styles.dashboardItem}>🎯 Quiz Performance: 92%</Text>
            <Text style={styles.dashboardItem}>⏱️ Study Time: 24 hours</Text>
            <Text style={styles.dashboardItem}>🏆 Achievements: 8 earned</Text>
          </View>
        </Card>

        <Card
          title="Content Controls"
          subtitle="Manage learning content"
          variant="outlined"
          size="medium"
          style={styles.dashboardCard}
        >
          <View style={styles.dashboardList}>
            <Text style={styles.dashboardItem}>📚 Book Recommendations</Text>
            <Text style={styles.dashboardItem}>🎯 Quiz Difficulty Settings</Text>
            <Text style={styles.dashboardItem}>⏰ Study Time Limits</Text>
            <Text style={styles.dashboardItem}>🔒 Content Filtering</Text>
          </View>
        </Card>

        <Card
          title="Communication"
          subtitle="Stay connected with learners"
          variant="outlined"
          size="medium"
          style={styles.dashboardCard}
        >
          <View style={styles.dashboardList}>
            <Text style={styles.dashboardItem}>💬 Progress Reports</Text>
            <Text style={styles.dashboardItem}>📧 Email Notifications</Text>
            <Text style={styles.dashboardItem}>📱 App Notifications</Text>
            <Text style={styles.dashboardItem}>🎉 Celebration Sharing</Text>
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
  dashboardCard: {
    marginBottom: 20,
  },
  dashboardList: {
    paddingVertical: 8,
  },
  dashboardItem: {
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

export default ParentTeacher;
