/**
 * Firebase Configuration for AR Book Explorer
 * 
 * This file contains the Firebase project configuration and service initialization.
 * Following AlLibrary coding rules for security-first architecture and COPPA compliance.
 */

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
// import { getCrashlytics } from 'firebase/crashlytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Firebase configuration object
// Using actual Firebase project configuration from google-services.json
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyBLqIR2i2MRo0kPGtuIRdirRR2TcryxLdw",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "dexbook-3899d.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "dexbook-3899d",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "dexbook-3899d.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "721919310516",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:721919310516:android:68ecac78fe74de42f5b5e1",
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || ""
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
let auth: any;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

// Initialize Firestore
const firestore = getFirestore(app);

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
if (__DEV__) {
  // Connect to Firebase emulators in development
  try {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFunctionsEmulator(functions, 'localhost', 5001);
  } catch (error) {
    // Emulators already connected or not available
    // eslint-disable-next-line no-console
    console.log('Firebase emulators connection:', error);
  }
}

// Export Firebase services
export {
  app,
  auth,
  firestore,
  storage,
  functions,
  analytics,
  performance,
  crashlytics
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
