/**
 * Root Layout for AR Book Explorer
 * 
 * Main layout using expo-router for navigation following the 9-screen architecture.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 * 
 * Screen Architecture (from screens.md):
 * 1. Welcome & Onboarding Screens (1.1-1.4)
 * 2. Authentication & Profile Screens (2.1-2.3)
 * 3. Book Discovery & Recognition Screens (3.1-3.4)
 * 4. AR Reading Experience Screens (4.1-4.3)
 * 5. AI-Powered Learning Screens (5.1-5.3)
 * 6. Gamification & Rewards Screens (6.1-6.3)
 * 7. Settings & Accessibility Screens (7.1-7.3)
 * 8. Error & Loading Screens (8.1-8.2)
 */

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthStateManager, AuthStatusIndicator } from '../src/components/foundation';
import { StoreProvider } from '../src/stores';

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
    <StoreProvider>
      <AuthStateManager>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
        {/* 1. Welcome & Onboarding Screens (1.1-1.4) */}
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="learning-assessment" />
        <Stack.Screen name="permission-setup" />
        
        {/* 2. Authentication & Profile Screens (2.1-2.3) */}
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/profile-setup" />
        <Stack.Screen name="auth/profile-dashboard" />
        
        {/* Main App - Tabs (Home Screen - 3.1) */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        
        {/* 3. Book Discovery & Recognition Screens (3.1-3.4) */}
        <Stack.Screen name="books/scanner" />
        <Stack.Screen name="books/recognition" />
        <Stack.Screen name="books/details" />
        
        {/* 4. AR Reading Experience Screens (4.1-4.3) */}
        <Stack.Screen name="ar/camera" />
        <Stack.Screen name="ar/validation" />
        <Stack.Screen name="ar/progress" />
        
        {/* 5. AI-Powered Learning Screens (5.1-5.3) */}
        <Stack.Screen name="learning/quiz" />
        <Stack.Screen name="learning/results" />
        <Stack.Screen name="learning/path" />
        
        {/* 6. Gamification & Rewards Screens (6.1-6.3) */}
        <Stack.Screen name="gamification/achievement" />
        <Stack.Screen name="gamification/rewards" />
        <Stack.Screen name="gamification/progress" />
        
        {/* 7. Settings & Accessibility Screens (7.1-7.3) */}
        <Stack.Screen name="settings/settings" />
        <Stack.Screen name="settings/accessibility" />
        <Stack.Screen name="settings/parent-teacher" />
        
        {/* 8. Error & Loading Screens (8.1-8.2) */}
        <Stack.Screen name="error" />
        <Stack.Screen name="loading" />
        </Stack>
        
        <StatusBar style="auto" />
        <AuthStatusIndicator />
      </AuthStateManager>
    </StoreProvider>
  );
}
