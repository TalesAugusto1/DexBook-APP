/**
 * Profile Setup Screen for AR Book Explorer
 * 
 * User profile configuration using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Input } from '../../src/components/foundation';

export default function ProfileSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    school: '',
    interests: '',
    learningGoals: '',
  });

  const handleSave = () => {
    // TODO: Save profile data
    router.push('/(tabs)');
  };

  const handleSkip = () => {
    router.push('/(tabs)');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>
          Help us personalize your learning experience
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="📝 Personal Information"
          subtitle="Tell us about yourself"
          variant="elevated"
          size="large"
          style={styles.profileCard}
        >
          <View style={styles.form}>
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(value: string) => setFormData({...formData, name: value})}
              variant="default"
              size="medium"
            />
            
            <Input
              placeholder="Age"
              value={formData.age}
              onChangeText={(value: string) => setFormData({...formData, age: value})}
              variant="default"
              size="medium"
              keyboardType="numeric"
            />
            
            <Input
              placeholder="Grade Level"
              value={formData.grade}
              onChangeText={(value: string) => setFormData({...formData, grade: value})}
              variant="default"
              size="medium"
            />
            
            <Input
              placeholder="School (Optional)"
              value={formData.school}
              onChangeText={(value: string) => setFormData({...formData, school: value})}
              variant="default"
              size="medium"
            />
          </View>
        </Card>

        <Card
          title="🎯 Learning Preferences"
          subtitle="What are you interested in?"
          variant="outlined"
          size="medium"
          style={styles.preferencesCard}
        >
          <View style={styles.form}>
            <Input
              placeholder="Interests (e.g., Science, History, Art)"
              value={formData.interests}
              onChangeText={(value: string) => setFormData({...formData, interests: value})}
              variant="default"
              size="medium"
              multiline
            />
            
            <Input
              placeholder="Learning Goals (e.g., Read 20 books this year)"
              value={formData.learningGoals}
              onChangeText={(value: string) => setFormData({...formData, learningGoals: value})}
              variant="default"
              size="medium"
              multiline
            />
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Save Profile"
            onPress={handleSave}
            variant="primary"
            size="large"
            style={styles.saveButton}
          />
          <Button
            title="Skip for Now"
            onPress={handleSkip}
            variant="secondary"
            size="medium"
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 22,
    textAlign: 'center',
  },
  content: {
    padding: 24,
    gap: 20,
  },
  profileCard: {
    marginBottom: 8,
  },
  preferencesCard: {
    marginBottom: 8,
  },
  form: {
    gap: 16,
  },
  actions: {
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
  },
  saveButton: {
    width: '100%',
  },
  skipButton: {
    width: '80%',
  },
});
