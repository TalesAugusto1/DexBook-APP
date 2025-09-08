/**
 * ProfileSetup Screen Component for AR Book Explorer
 * 
 * This screen handles user profile creation and setup.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Input } from '../../../components/foundation';

export const ProfileSetup: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    grade: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile saving
    navigation.navigate('ProfileDashboard' as never);
  };

  const handleSkip = () => {
    navigation.navigate('ProfileDashboard' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Setup Your Profile</Text>
        <Text style={styles.subtitle}>
          Tell us about yourself to personalize your experience
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Personal Information"
          subtitle="Basic details for your profile"
          variant="elevated"
          size="medium"
          style={styles.profileCard}
        >
          <View style={styles.formContainer}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              variant="outline"
              size="medium"
              containerStyle={styles.input}
            />

            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              variant="outline"
              size="medium"
              containerStyle={styles.input}
            />

            <Input
              label="Age"
              placeholder="Enter your age"
              value={formData.age}
              onChangeText={(value) => handleInputChange('age', value)}
              variant="outline"
              size="medium"
              containerStyle={styles.input}
            />

            <Input
              label="Grade Level"
              placeholder="Enter your grade"
              value={formData.grade}
              onChangeText={(value) => handleInputChange('grade', value)}
              variant="outline"
              size="medium"
              containerStyle={styles.input}
            />
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Save Profile"
            onPress={handleSaveProfile}
            variant="primary"
            size="large"
            style={styles.saveButton}
          />

          <Button
            title="Skip for Now"
            onPress={handleSkip}
            variant="outline"
            size="large"
            style={styles.skipButton}
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
  profileCard: {
    marginBottom: 30,
  },
  formContainer: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
  actions: {
    gap: 16,
  },
  saveButton: {
    marginBottom: 8,
  },
  skipButton: {
    marginBottom: 8,
  },
});

export default ProfileSetup;
