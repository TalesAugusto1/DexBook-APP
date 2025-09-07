/**
 * PermissionSetup Screen Component for AR Book Explorer
 * 
 * This screen handles app permissions and privacy settings.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '../../../components/foundation';

export const PermissionSetup: React.FC = () => {
  const navigation = useNavigation();
  // TODO: Implement permission handling
  // const [permissions, setPermissions] = useState({
  //   camera: false,
  //   microphone: false,
  //   storage: false,
  //   notifications: false,
  // });

  // const handlePermissionToggle = (permission: keyof typeof permissions) => {
  //   setPermissions(prev => ({
  //     ...prev,
  //     [permission]: !prev[permission]
  //   }));
  // };

  const handleContinue = () => {
    navigation.navigate('LoginRegister' as never);
  };

  const handleSkip = () => {
    navigation.navigate('LoginRegister' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Permission Setup</Text>
        <Text style={styles.subtitle}>
          Grant permissions to enable AR features
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Required Permissions"
          subtitle="Essential for AR functionality"
          variant="elevated"
          size="medium"
          style={styles.permissionsCard}
        >
          <View style={styles.permissionsList}>
            <View style={styles.permissionItem}>
              <Text style={styles.permissionIcon}>📷</Text>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionName}>Camera Access</Text>
                <Text style={styles.permissionDescription}>
                  Required for AR book scanning and 3D content overlay
                </Text>
              </View>
            </View>

            <View style={styles.permissionItem}>
              <Text style={styles.permissionIcon}>🎤</Text>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionName}>Microphone Access</Text>
                <Text style={styles.permissionDescription}>
                  Used for voice commands and audio narration
                </Text>
              </View>
            </View>

            <View style={styles.permissionItem}>
              <Text style={styles.permissionIcon}>💾</Text>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionName}>Storage Access</Text>
                <Text style={styles.permissionDescription}>
                  Save books and learning progress offline
                </Text>
              </View>
            </View>

            <View style={styles.permissionItem}>
              <Text style={styles.permissionIcon}>🔔</Text>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionName}>Notifications</Text>
                <Text style={styles.permissionDescription}>
                  Learning reminders and achievement alerts
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card
          title="Privacy & Security"
          subtitle="Your data is protected"
          variant="outlined"
          size="medium"
          style={styles.privacyCard}
        >
          <View style={styles.privacyInfo}>
            <Text style={styles.privacyIcon}>🔒</Text>
            <Text style={styles.privacyText}>
              We follow COPPA and GDPR compliance standards. Your personal data is encrypted and never shared without your consent.
            </Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Grant Permissions"
            onPress={handleContinue}
            variant="primary"
            size="large"
            style={styles.continueButton}
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
  permissionsCard: {
    marginBottom: 20,
  },
  permissionsList: {
    paddingVertical: 8,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  permissionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  permissionInfo: {
    flex: 1,
  },
  permissionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  privacyCard: {
    marginBottom: 30,
    alignItems: 'center',
  },
  privacyInfo: {
    alignItems: 'center',
  },
  privacyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  privacyText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  actions: {
    gap: 16,
  },
  continueButton: {
    marginBottom: 8,
  },
  skipButton: {
    marginBottom: 8,
  },
});

export default PermissionSetup;