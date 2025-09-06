/**
 * PermissionSetup Component for AR Book Explorer
 * 
 * This screen requests necessary permissions for AR functionality.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Camera from 'expo-camera';
import * as Location from 'expo-location';

interface PermissionSetupProps {
  // No props needed for permission setup screen
}

interface Permission {
  id: string;
  title: string;
  description: string;
  icon: string;
  required: boolean;
  granted: boolean;
}

export const PermissionSetup: React.FC<PermissionSetupProps> = () => {
  const router = useRouter();
  const { learningStyle } = useLocalSearchParams();
  
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'camera',
      title: 'Camera Access',
      description: 'Required for AR book scanning and QR code recognition',
      icon: '📷',
      required: true,
      granted: false,
    },
    {
      id: 'location',
      title: 'Location Access',
      description: 'Optional for location-based book recommendations',
      icon: '📍',
      required: false,
      granted: false,
    },
    {
      id: 'storage',
      title: 'Storage Access',
      description: 'Required for downloading AR content and offline reading',
      icon: '💾',
      required: true,
      granted: false,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const requestPermission = async (permission: Permission) => {
    setIsLoading(true);
    
    try {
      let granted = false;
      
      switch (permission.id) {
        case 'camera':
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          granted = cameraStatus.status === 'granted';
          break;
          
        case 'location':
          const locationStatus = await Location.requestForegroundPermissionsAsync();
          granted = locationStatus.status === 'granted';
          break;
          
        case 'storage':
          // Storage permission is typically granted by default on mobile
          granted = true;
          break;
          
        default:
          granted = false;
      }

      setPermissions(prev => 
        prev.map(p => 
          p.id === permission.id ? { ...p, granted } : p
        )
      );

      if (!granted && permission.required) {
        Alert.alert(
          'Permission Required',
          `${permission.title} is required for the app to function properly. Please enable it in your device settings.`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => {/* Open settings */} },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      Alert.alert('Error', 'Failed to request permission. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    const requiredPermissions = permissions.filter(p => p.required);
    const grantedRequired = requiredPermissions.every(p => p.granted);
    
    if (grantedRequired) {
      router.push('/login');
    } else {
      Alert.alert(
        'Permissions Required',
        'Please grant all required permissions to continue.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const allRequiredGranted = permissions.filter(p => p.required).every(p => p.granted);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Permission Setup</Text>
        <Text style={styles.subtitle}>
          We need a few permissions to provide you with the best AR reading experience
        </Text>
      </View>

      <View style={styles.permissionsContainer}>
        {permissions.map((permission) => (
          <View key={permission.id} style={styles.permissionItem}>
            <View style={styles.permissionHeader}>
              <Text style={styles.permissionIcon}>{permission.icon}</Text>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionTitle}>{permission.title}</Text>
                <Text style={styles.permissionDescription}>
                  {permission.description}
                </Text>
                {permission.required && (
                  <Text style={styles.requiredLabel}>Required</Text>
                )}
              </View>
            </View>
            
            <TouchableOpacity
              style={[
                styles.permissionButton,
                permission.granted && styles.permissionButtonGranted,
              ]}
              onPress={() => requestPermission(permission)}
              disabled={isLoading || permission.granted}
            >
              <Text style={[
                styles.permissionButtonText,
                permission.granted && styles.permissionButtonTextGranted,
              ]}>
                {permission.granted ? '✓ Granted' : 'Grant Permission'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !allRequiredGranted && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!allRequiredGranted}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip for Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Your privacy is important to us. We only use these permissions to enhance your reading experience.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  permissionsContainer: {
    marginBottom: 32,
  },
  permissionItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  permissionIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  permissionInfo: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 4,
  },
  requiredLabel: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '500',
  },
  permissionButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  permissionButtonGranted: {
    backgroundColor: '#10b981',
  },
  permissionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  permissionButtonTextGranted: {
    color: '#ffffff',
  },
  actionsContainer: {
    marginBottom: 32,
  },
  continueButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default PermissionSetup;
