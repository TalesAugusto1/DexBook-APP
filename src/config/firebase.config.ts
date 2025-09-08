/**
 * Firebase Configuration for AR Book Explorer
 * 
 * This file contains the Firebase project configuration and service initialization.
 * Following AlLibrary coding rules for security-first architecture and COPPA compliance.
 */

import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getPerformance } from 'firebase/performance';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
// import { getCrashlytics } from 'firebase/crashlytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Firebase configuration object
// Using actual Firebase project configuration from google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyBLqIR2i2MRo0kPGtuIRdirRR2TcryxLdw",
  authDomain: "dexbook-3899d.firebaseapp.com",
  projectId: "dexbook-3899d",
  storageBucket: "dexbook-3899d.firebasestorage.app",
  messagingSenderId: "721919310516",
  appId: "1:721919310516:android:68ecac78fe74de42f5b5e1",
  measurementId: "" // Add this if you have Google Analytics enabled
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence (React Native)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore with RN-friendly networking (auto long polling)
const firestore = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

// Initialize Storage
const storage = getStorage(app);

// Initialize Cloud Functions
const functions = getFunctions(app);

// Initialize Analytics (web only)
let analytics: any = null;
if (Platform.OS === 'web') {
  analytics = getAnalytics(app);
}

// Initialize Performance Monitoring
let performance: any = null;
if (Platform.OS === 'web') {
  performance = getPerformance(app);
}

// Initialize Crashlytics
let crashlytics: any = null;
// if (Platform.OS !== 'web') {
//   crashlytics = getCrashlytics(app);
// }

// Development environment setup
if (__DEV__ && process.env['EXPO_PUBLIC_USE_FIREBASE_EMULATORS'] === 'true') {
  // Use platform-aware host for Android emulator; allow override via env
  const EMULATOR_HOST = process.env['EXPO_PUBLIC_EMULATOR_HOST'] || (Platform.OS === 'android' ? '10.0.2.2' : 'localhost');

  try {
    connectFirestoreEmulator(firestore, EMULATOR_HOST, 8080);
    connectStorageEmulator(storage, EMULATOR_HOST, 9199);
    connectFunctionsEmulator(functions, EMULATOR_HOST, 5001);
  } catch (error) {
    // Emulators already connected or not available
    // eslint-disable-next-line no-console
    console.log('Firebase emulators connection:', error);
  }
}

// Export Firebase services
export {
    analytics, app,
    auth, crashlytics, firestore, functions, performance, storage
};

// Export configuration for other modules
    export { firebaseConfig };

// Firebase service types
export interface FirebaseServices {
  app: any;
  auth: any;
  firestore: any;
  storage: any;
  functions: any;
  analytics: any;
  performance: any;
  crashlytics: any;
}

// Service initialization status
export const firebaseServices: FirebaseServices = {
  app,
  auth,
  firestore,
  storage,
  functions,
  analytics,
  performance,
  crashlytics
};

// COPPA Compliance Configuration
export const coppaConfig = {
  // Age verification required for users under 13
  ageVerificationRequired: true,
  // Parent/guardian consent required for minors
  parentConsentRequired: true,
  // Limited data collection for COPPA users
  limitedDataCollection: true,
  // Enhanced privacy controls
  enhancedPrivacyControls: true
};

// GDPR Compliance Configuration
export const gdprConfig = {
  // Data processing consent required
  consentRequired: true,
  // Right to data portability
  dataPortability: true,
  // Right to be forgotten
  rightToBeForgotten: true,
  // Data minimization
  dataMinimization: true
};

// Security Configuration
export const securityConfig = {
  // Input validation enabled
  inputValidation: true,
  // Malware scanning enabled
  malwareScanning: true,
  // Legal compliance checking
  legalCompliance: true,
  // Technical security only
  technicalSecurityOnly: true
};
