/**
 * LoginRegister Screen Component for AR Book Explorer
 * 
 * This screen handles user authentication and registration.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Input } from '../../../components/foundation';
import { useAuth } from '../../../stores/auth/AuthContext';

export const LoginRegister: React.FC = () => {
  const navigation = useNavigation();
  const { login, register, state } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    grade: '',
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
        navigation.navigate('ProfileDashboard' as never);
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          name: formData.name,
          age: parseInt(formData.age),
          grade: formData.grade,
        });
        navigation.navigate('ProfileSetup' as never);
      }
    } catch {
      // Error handling is managed by the auth context
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '', name: '', age: '', grade: '' });
  };

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
              </>
            )}
          </View>
        </Card>

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

          <Button
            title={isLogin ? 'Create New Account' : 'Already Have an Account?'}
            onPress={toggleMode}
            variant="outline"
            size="large"
            style={styles.toggleButton}
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
  authCard: {
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
  authButton: {
    marginBottom: 8,
  },
  toggleButton: {
    marginBottom: 8,
  },
});

export default LoginRegister;