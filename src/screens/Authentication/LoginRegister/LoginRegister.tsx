/**
 * LoginRegister Screen Component for AR Book Explorer
 * 
 * Screen 2.1: Login/Register Screen - User account creation and access
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 * 
 * Elements from screens.md:
 * - Email/username input field
 * - Password input field
 * - "Sign In" / "Create Account" toggle
 * - Social login options (Google, Apple)
 * - "Forgot Password" link
 * - COPPA compliance notice for under-13 users
 * 
 * Business Rules Implemented:
 * - BR-AUTH-001: User registration validation
 * - BR-AUTH-002: Permission management
 * - BR-PRIVACY-001: Data protection
 * - BR-SECURITY-001: Data protection flow
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Input } from '../../../components/foundation';
import { useAuth } from '../../../stores/auth/AuthContext';

export const LoginRegister: React.FC = () => {
  const { login, register, registerWithCOPPA, signInWithGoogle, signInWithApple, resetPassword, state } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    grade: '',
    parentEmail: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
        router.replace('/auth/profile-dashboard');
      } else {
        const age = parseInt(formData.age);
        
        // COPPA compliance check
        if (age < 13) {
          if (!formData.parentEmail) {
            Alert.alert(
              'Parent/Guardian Email Required',
              'Users under 13 require parent/guardian consent. Please provide a parent/guardian email address.',
              [{ text: 'OK' }]
            );
            return;
          }
          
          // Use COPPA registration flow
          await registerWithCOPPA({
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            name: formData.name,
            age,
            grade: formData.grade,
            parentEmail: formData.parentEmail,
            parentName: '', // Will be filled by parent consent process
            consentGiven: false, // Will be set to true after parent consent
          });
        } else {
          // Standard registration
          await register({
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            name: formData.name,
            age,
            grade: formData.grade,
          });
        }
        
        router.replace('/auth/profile-setup');
      }
    } catch {
      // Error handling is managed by the auth context
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithApple();
      }
      router.replace('/auth/profile-dashboard');
    } catch {
      // Error handling is managed by the auth context
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      Alert.alert(
        'Email Required',
        'Please enter your email address first.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    try {
      await resetPassword(formData.email);
      Alert.alert(
        'Password Reset Email Sent',
        'Please check your email for instructions to reset your password.',
        [{ text: 'OK' }]
      );
    } catch {
      Alert.alert(
        'Error',
        'Failed to send password reset email. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ 
      email: '', 
      password: '', 
      confirmPassword: '', 
      name: '', 
      age: '', 
      grade: '', 
      parentEmail: '' 
    });
  };

  const isUnder13 = parseInt(formData.age) < 13;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Text>
        <Text style={styles.subtitle}>
          {isLogin 
            ? 'Sign in to continue your learning journey' 
            : 'Join us to start your AR learning adventure'
          }
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title={isLogin ? 'Sign In' : 'Create Account'}
          subtitle={isLogin ? 'Enter your credentials' : 'Fill in your details'}
          variant="elevated"
          size="medium"
          style={styles.authCard}
        >
          <View style={styles.formContainer}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value: string) => handleInputChange('email', value)}
              variant="outline"
              size="medium"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(value: string) => handleInputChange('password', value)}
              variant="outline"
              size="medium"
              secureTextEntry
            />

            {!isLogin && (
              <>
                <Input
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChangeText={(value: string) => handleInputChange('confirmPassword', value)}
                  variant="outline"
                  size="medium"
                  secureTextEntry
                />

                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChangeText={(value: string) => handleInputChange('name', value)}
                  variant="outline"
                  size="medium"
                />

                <Input
                  label="Age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChangeText={(value: string) => handleInputChange('age', value)}
                  variant="outline"
                  size="medium"
                  keyboardType="numeric"
                />

                <Input
                  label="Grade Level"
                  placeholder="Enter your grade"
                  value={formData.grade}
                  onChangeText={(value: string) => handleInputChange('grade', value)}
                  variant="outline"
                  size="medium"
                />

                {/* COPPA Compliance for users under 13 */}
                {isUnder13 && (
                  <>
                    <View style={styles.coppaNotice}>
                      <Text style={styles.coppaTitle}>Parent/Guardian Consent Required</Text>
                      <Text style={styles.coppaText}>
                        Users under 13 require parent/guardian consent. Please provide a parent/guardian email address.
                      </Text>
                    </View>
                    
                    <Input
                      label="Parent/Guardian Email"
                      placeholder="Enter parent/guardian email"
                      value={formData.parentEmail}
                      onChangeText={(value: string) => handleInputChange('parentEmail', value)}
                      variant="outline"
                      size="medium"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </>
                )}
              </>
            )}
          </View>
        </Card>

        {/* Social Login Options */}
        <View style={styles.socialLogin}>
          <Text style={styles.socialTitle}>Or continue with</Text>
          
          <View style={styles.socialButtons}>
            <Button
              title="Google"
              onPress={() => handleSocialLogin('google')}
              variant="outline"
              size="medium"
              style={styles.socialButton}
            />
            
            <Button
              title="Apple"
              onPress={() => handleSocialLogin('apple')}
              variant="outline"
              size="medium"
              style={styles.socialButton}
            />
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title={isLogin ? 'Sign In' : 'Create Account'}
            onPress={handleAuth}
            variant="primary"
            size="large"
            loading={state.isLoading}
            disabled={state.isLoading}
            style={styles.authButton}
          />

          {isLogin && (
            <Button
              title="Forgot Password?"
              onPress={handleForgotPassword}
              variant="outline"
              size="medium"
              style={styles.forgotButton}
            />
          )}

          <Button
            title={isLogin ? 'Create New Account' : 'Already Have an Account?'}
            onPress={toggleMode}
            variant="outline"
            size="large"
            style={styles.toggleButton}
          />
        </View>

        {/* Error Display */}
        {state.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{state.error}</Text>
          </View>
        )}
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
  authCard: {
    marginBottom: 20,
  },
  formContainer: {
    gap: 16,
  },
  coppaNotice: {
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  coppaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 4,
  },
  coppaText: {
    fontSize: 12,
    color: '#92400e',
    lineHeight: 16,
  },
  socialLogin: {
    alignItems: 'center',
    marginBottom: 20,
  },
  socialTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
  },
  actions: {
    gap: 16,
  },
  authButton: {
    marginBottom: 8,
  },
  forgotButton: {
    marginBottom: 8,
  },
  toggleButton: {
    marginBottom: 8,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
  },
});

export default LoginRegister;