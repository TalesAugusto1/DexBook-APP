/**
 * Login/Register Screen for AR Book Explorer
 * 
 * Authentication screen using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthGuard, Button, Card, Input } from '../../src/components/foundation';
import { useAuth } from '../../src/stores/auth/AuthContext';

export default function LoginRegister() {
  const router = useRouter();
  const { login, register, signInWithGoogle, state } = useAuth();
  
  // Debug: Check if Google client ID is available
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Google Client ID available:', !!process.env['EXPO_PUBLIC_GOOGLE_CLIENT_ID']);
    // eslint-disable-next-line no-console
    console.log('Google Client ID value:', process.env['EXPO_PUBLIC_GOOGLE_CLIENT_ID']);
  }, []);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    grade: '',
  });

  const handleAuth = async () => {
    try {
      if (isRegister) {
        await register({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          name: formData.name,
          age: parseInt(formData.age) || 0,
          grade: formData.grade,
        });
        router.push('/auth/profile-setup');
      } else {
        await login({
          email: formData.email,
          password: formData.password,
        });
        router.push('/(tabs)');
      }
    } catch {
      // Error handling is managed by auth context
    }
  };

  const handleToggleMode = () => {
    setIsRegister(!isRegister);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      age: '',
      grade: '',
    });
  };

  const handleSkip = () => {
    router.push('/(tabs)');
  };

  return (
    <AuthGuard requireAuth={false}>
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isRegister ? 'Create Account' : 'Welcome Back!'}
        </Text>
        <Text style={styles.subtitle}>
          {isRegister 
            ? 'Join the AR Book Explorer community' 
            : 'Sign in to continue your learning journey'
          }
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title={isRegister ? "📝 Sign Up" : "🔐 Sign In"}
          subtitle={isRegister ? "Create your account" : "Access your account"}
          variant="elevated"
          size="large"
          style={styles.authCard}
        >
          <View style={styles.form}>
            {isRegister && (
              <>
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
              </>
            )}
            
            <Input
              placeholder="Email"
              value={formData.email}
              onChangeText={(value: string) => setFormData({...formData, email: value})}
              variant="default"
              size="medium"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              placeholder="Password"
              value={formData.password}
              onChangeText={(value: string) => setFormData({...formData, password: value})}
              variant="default"
              size="medium"
              secureTextEntry
            />
            
            {isRegister && (
              <Input
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(value: string) => setFormData({...formData, confirmPassword: value})}
                variant="default"
                size="medium"
                secureTextEntry
              />
            )}
            
            <Button
              title={isRegister ? 'Create Account' : 'Sign In'}
              onPress={handleAuth}
              variant="primary"
              size="large"
              style={styles.authButton}
              loading={state.isLoading}
              disabled={state.isLoading}
            />
          </View>
        </Card>

        <View style={styles.toggleSection}>
          <Text style={styles.toggleText}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
          </Text>
          <Button
            title={isRegister ? 'Sign In' : 'Sign Up'}
            onPress={handleToggleMode}
            variant="outline"
            size="medium"
            style={styles.toggleButton}
          />
        </View>

        <View style={styles.socialSection}>
          <Button
            title="Sign in with Google"
            onPress={signInWithGoogle}
            variant="outline"
            size="large"
            style={styles.socialButton}
            loading={state.isLoading}
            disabled={state.isLoading}
          />
        </View>

        <View style={styles.skipSection}>
          <Button
            title="Continue as Guest"
            onPress={handleSkip}
            variant="secondary"
            size="large"
            style={styles.skipButton}
          />
        </View>

        {state.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{state.error}</Text>
          </View>
        )}
      </View>
    </ScrollView>
    </AuthGuard>
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
  authCard: {
    marginBottom: 8,
  },
  form: {
    gap: 16,
  },
  authButton: {
    width: '100%',
    marginTop: 8,
  },
  toggleSection: {
    alignItems: 'center',
    gap: 12,
  },
  toggleText: {
    fontSize: 14,
    color: '#64748b',
  },
  toggleButton: {
    width: '60%',
  },
  skipSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  skipButton: {
    width: '80%',
  },
  socialSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  socialButton: {
    width: '80%',
  },
  errorContainer: {
    padding: 12,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
});
