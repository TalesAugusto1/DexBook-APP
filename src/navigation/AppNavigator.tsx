/**
 * AppNavigator Component for AR Book Explorer
 * 
 * Main navigation structure following the 9-screen architecture.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from '../stores/auth/AuthContext';

// Import screens
import { SplashScreen } from '../screens/Welcome/SplashScreen';
import { WelcomeScreen } from '../screens/Welcome/WelcomeScreen';
import { LearningAssessment } from '../screens/Welcome/LearningAssessment';
import { PermissionSetup } from '../screens/Welcome/PermissionSetup';
import { LoginRegister } from '../screens/Authentication/LoginRegister';
import { ProfileSetup } from '../screens/Authentication/ProfileSetup';
import { ProfileDashboard } from '../screens/Authentication/ProfileDashboard';
import { HomeScreen } from '../screens/BookDiscovery/HomeScreen';
import { BookScanner } from '../screens/BookDiscovery/BookScanner';
import { BookRecognition } from '../screens/BookDiscovery/BookRecognition';
import { BookDetails } from '../screens/BookDiscovery/BookDetails';
import { ARCameraView } from '../screens/ARReading/ARCameraView';
import { BookValidation } from '../screens/ARReading/BookValidation';
import { BookProgress } from '../screens/ARReading/BookProgress';
import { AdaptiveQuiz } from '../screens/AILearning/AdaptiveQuiz';
import { QuizResults } from '../screens/AILearning/QuizResults';
import { LearningPath } from '../screens/AILearning/LearningPath';
import { Achievement } from '../screens/Gamification/Achievement';
import { RewardsStore } from '../screens/Gamification/RewardsStore';
import { ProgressDashboard } from '../screens/Gamification/ProgressDashboard';
import { Settings } from '../screens/Settings/Settings';
import { Accessibility } from '../screens/Settings/Accessibility';
import { ParentTeacher } from '../screens/Settings/ParentTeacher';
import { ErrorScreen } from '../screens/ErrorLoading/ErrorScreen';
import { LoadingScreen } from '../screens/ErrorLoading/LoadingScreen';

// Navigation types for Stack Navigator (ALL SCREENS)
export type RootStackParamList = {
  // Welcome & Onboarding Screens
  Splash: undefined;
  Welcome: undefined;
  LearningAssessment: undefined;
  PermissionSetup: undefined;
  
  // Authentication & Profile Screens
  LoginRegister: undefined;
  ProfileSetup: undefined;
  ProfileDashboard: undefined;
  
  // Book Discovery & Recognition Screens
  HomeScreen: undefined;
  BookScanner: undefined;
  BookRecognition: undefined;
  BookDetails: undefined;
  
  // AR Reading Experience Screens
  ARCameraView: undefined;
  BookValidation: undefined;
  BookProgress: undefined;
  
  // AI-Powered Learning Screens
  AdaptiveQuiz: undefined;
  QuizResults: undefined;
  LearningPath: undefined;
  
  // Gamification & Rewards Screens
  Achievement: undefined;
  RewardsStore: undefined;
  ProgressDashboard: undefined;
  
  // Settings & Accessibility Screens
  Settings: undefined;
  Accessibility: undefined;
  ParentTeacher: undefined;
  
  // Error & Loading Screens
  ErrorScreen: undefined;
  LoadingScreen: undefined;
  
  // Main Tab Navigator
  MainTabs: undefined;
};

// Navigation types for Tab Navigator (MAIN TABS ONLY)
export type MainTabParamList = {
  HomeTab: undefined;
  ScanTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
          tabBarAccessibilityLabel: 'Home screen',
        }}
      />
      <Tab.Screen
        name="ScanTab"
        component={BookScanner}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📱</Text>
          ),
          tabBarAccessibilityLabel: 'Scan books',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileDashboard}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
          tabBarAccessibilityLabel: 'User profile',
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>⚙️</Text>
          ),
          tabBarAccessibilityLabel: 'App settings',
        }}
      />
    </Tab.Navigator>
  );
};

// Root Stack Navigator (SINGLE LEVEL - ALL SCREENS ACCESSIBLE)
export const AppNavigator: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          {/* Welcome & Onboarding Screens */}
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="LearningAssessment" component={LearningAssessment} />
          <Stack.Screen name="PermissionSetup" component={PermissionSetup} />
          
          {/* Authentication & Profile Screens */}
          <Stack.Screen name="LoginRegister" component={LoginRegister} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
          <Stack.Screen name="ProfileDashboard" component={ProfileDashboard} />
          
          {/* Book Discovery & Recognition Screens */}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BookScanner" component={BookScanner} />
          <Stack.Screen name="BookRecognition" component={BookRecognition} />
          <Stack.Screen name="BookDetails" component={BookDetails} />
          
          {/* AR Reading Experience Screens */}
          <Stack.Screen name="ARCameraView" component={ARCameraView} />
          <Stack.Screen name="BookValidation" component={BookValidation} />
          <Stack.Screen name="BookProgress" component={BookProgress} />
          
          {/* AI-Powered Learning Screens */}
          <Stack.Screen name="AdaptiveQuiz" component={AdaptiveQuiz} />
          <Stack.Screen name="QuizResults" component={QuizResults} />
          <Stack.Screen name="LearningPath" component={LearningPath} />
          
          {/* Gamification & Rewards Screens */}
          <Stack.Screen name="Achievement" component={Achievement} />
          <Stack.Screen name="RewardsStore" component={RewardsStore} />
          <Stack.Screen name="ProgressDashboard" component={ProgressDashboard} />
          
          {/* Settings & Accessibility Screens */}
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Accessibility" component={Accessibility} />
          <Stack.Screen name="ParentTeacher" component={ParentTeacher} />
          
          {/* Error & Loading Screens */}
          <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          
          {/* Main Tab Navigator */}
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabNavigator}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};