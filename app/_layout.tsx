/**
 * Root Layout for AR Book Explorer
 * 
 * Main layout using expo-router for navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider } from '../src/stores/auth/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Splash Screen */}
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        
        {/* Welcome Flow */}
        <Stack.Screen name="welcome" />
        <Stack.Screen name="learning-assessment" />
        <Stack.Screen name="permission-setup" />
        
        {/* Authentication */}
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/profile-setup" />
        
        {/* Main App - Tabs */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        
        {/* Books */}
        <Stack.Screen name="books/scanner" />
        <Stack.Screen name="books/recognition" />
        <Stack.Screen name="books/details" />
        
        {/* AR */}
        <Stack.Screen name="ar/camera" />
        <Stack.Screen name="ar/validation" />
        <Stack.Screen name="ar/progress" />
        
        {/* Learning */}
        <Stack.Screen name="learning/quiz" />
        <Stack.Screen name="learning/results" />
        <Stack.Screen name="learning/path" />
        
        {/* Gamification */}
        <Stack.Screen name="gamification/achievement" />
        <Stack.Screen name="gamification/rewards" />
        <Stack.Screen name="gamification/progress" />
        
        {/* Settings */}
        <Stack.Screen name="settings/accessibility" />
        <Stack.Screen name="settings/parent-teacher" />
        
        {/* Error/Loading */}
        <Stack.Screen name="error" />
        <Stack.Screen name="loading" />
      </Stack>
      
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
