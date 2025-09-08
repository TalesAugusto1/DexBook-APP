/**
 * Settings Screen for AR Book Explorer
 * 
 * Screen 7.1: Settings Screen - App configuration and preferences
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 * 
 * Elements from screens.md:
 * - Account information
 * - Notification preferences
 * - Privacy settings
 * - AR quality settings
 * - Language and region
 * - Parental controls (if applicable)
 * - Help and support access
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';
import { useAuth } from '../../src/stores/auth/AuthContext';
import { useEnhancedUser } from '../../src/stores/user/EnhancedUserContext';

export default function Settings() {
  const { state: authState, logout } = useAuth();
  const { state: userState } = useEnhancedUser();
  
  const [settings, setSettings] = useState({
    notifications: true,
    pushNotifications: true,
    emailNotifications: false,
    privacyMode: false,
    arQuality: 'high',
    language: 'en',
    parentalControls: false,
  });

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/auth/login');
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

  const navigateToAccessibility = () => {
    router.push('/settings/accessibility');
  };

  const navigateToParentTeacher = () => {
    router.push('/settings/parent-teacher');
  };

  const navigateToProfile = () => {
    router.push('/auth/profile-dashboard');
  };

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    // TODO: Implement settings update
  };

  const showHelp = () => {
    Alert.alert(
      'Help & Support',
      'For help and support, please contact us at support@arbookexplorer.com or visit our help center.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your learning experience</Text>
      </View>

      <View style={styles.content}>
        {/* Account Information */}
        <Card
          title="Account Information"
          variant="elevated"
          size="medium"
          style={styles.sectionCard}
        >
          <View style={styles.accountInfo}>
            <Text style={styles.accountLabel}>Email:</Text>
            <Text style={styles.accountValue}>{authState.user?.email}</Text>
            
            <Text style={styles.accountLabel}>Name:</Text>
            <Text style={styles.accountValue}>{authState.user?.name}</Text>
            
            <Text style={styles.accountLabel}>Grade:</Text>
            <Text style={styles.accountValue}>{authState.user?.grade || 'Not specified'}</Text>
          </View>
          
          <Button
            title="Edit Profile"
            onPress={navigateToProfile}
            variant="outline"
            size="medium"
            style={styles.editButton}
          />
        </Card>

        {/* Notification Preferences */}
        <Card
          title="Notification Preferences"
          variant="elevated"
          size="medium"
          style={styles.sectionCard}
        >
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>All Notifications</Text>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => handleSettingChange('notifications', value)}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={settings.pushNotifications}
              onValueChange={(value) => handleSettingChange('pushNotifications', value)}
              disabled={!settings.notifications}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Email Notifications</Text>
            <Switch
              value={settings.emailNotifications}
              onValueChange={(value) => handleSettingChange('emailNotifications', value)}
              disabled={!settings.notifications}
            />
          </View>
        </Card>

        {/* Privacy Settings */}
        <Card
          title="Privacy Settings"
          variant="elevated"
          size="medium"
          style={styles.sectionCard}
        >
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Privacy Mode</Text>
            <Switch
              value={settings.privacyMode}
              onValueChange={(value) => handleSettingChange('privacyMode', value)}
            />
          </View>
          
          <Text style={styles.settingDescription}>
            Privacy mode limits data collection and sharing for enhanced privacy.
          </Text>
        </Card>

        {/* AR Quality Settings */}
        <Card
          title="AR Quality Settings"
          variant="elevated"
          size="medium"
          style={styles.sectionCard}
        >
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>AR Quality</Text>
            <View style={styles.qualityOptions}>
              <Button
                title="Low"
                onPress={() => handleSettingChange('arQuality', 'low')}
                variant={settings.arQuality === 'low' ? 'primary' : 'outline'}
                size="small"
              />
              <Button
                title="Medium"
                onPress={() => handleSettingChange('arQuality', 'medium')}
                variant={settings.arQuality === 'medium' ? 'primary' : 'outline'}
                size="small"
              />
              <Button
                title="High"
                onPress={() => handleSettingChange('arQuality', 'high')}
                variant={settings.arQuality === 'high' ? 'primary' : 'outline'}
                size="small"
              />
            </View>
          </View>
        </Card>

        {/* Language and Region */}
        <Card
          title="Language & Region"
          variant="elevated"
          size="medium"
          style={styles.sectionCard}
        >
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Language</Text>
            <View style={styles.languageOptions}>
              <Button
                title="English"
                onPress={() => handleSettingChange('language', 'en')}
                variant={settings.language === 'en' ? 'primary' : 'outline'}
                size="small"
              />
              <Button
                title="Spanish"
                onPress={() => handleSettingChange('language', 'es')}
                variant={settings.language === 'es' ? 'primary' : 'outline'}
                size="small"
              />
              <Button
                title="French"
                onPress={() => handleSettingChange('language', 'fr')}
                variant={settings.language === 'fr' ? 'primary' : 'outline'}
                size="small"
              />
            </View>
          </View>
        </Card>

        {/* Parental Controls */}
        {authState.user && authState.user.age < 13 && (
          <Card
            title="Parental Controls"
            variant="elevated"
            size="medium"
            style={styles.sectionCard}
          >
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Enable Parental Controls</Text>
              <Switch
                value={settings.parentalControls}
                onValueChange={(value) => handleSettingChange('parentalControls', value)}
              />
            </View>
            
            <Button
              title="Parent/Teacher Dashboard"
              onPress={navigateToParentTeacher}
              variant="outline"
              size="medium"
              style={styles.parentButton}
            />
          </Card>
        )}

        {/* Accessibility */}
        <Card
          title="Accessibility"
          variant="elevated"
          size="medium"
          style={styles.sectionCard}
        >
          <Text style={styles.settingDescription}>
            Customize the app for your learning needs and accessibility requirements.
          </Text>
          
          <Button
            title="Accessibility Settings"
            onPress={navigateToAccessibility}
            variant="outline"
            size="medium"
            style={styles.accessibilityButton}
          />
        </Card>

        {/* Help & Support */}
        <Card
          title="Help & Support"
          variant="elevated"
          size="medium"
          style={styles.sectionCard}
        >
          <Button
            title="Get Help"
            onPress={showHelp}
            variant="outline"
            size="medium"
            style={styles.helpButton}
          />
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="secondary"
            size="large"
            style={styles.logoutButton}
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
  sectionCard: {
    marginBottom: 20,
  },
  accountInfo: {
    marginBottom: 16,
    gap: 8,
  },
  accountLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  accountValue: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  editButton: {
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
    lineHeight: 20,
  },
  qualityOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  languageOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  parentButton: {
    marginTop: 16,
  },
  accessibilityButton: {
    marginTop: 16,
  },
  helpButton: {
    marginTop: 8,
  },
  actions: {
    marginTop: 20,
  },
  logoutButton: {
    marginBottom: 8,
  },
});
