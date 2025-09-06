/**
 * Configuration Index for AR Book Explorer
 * 
 * This file exports all configuration modules for easy importing.
 * Following AlLibrary coding rules for clean exports and module organization.
 */

// Firebase configuration
export {
  app,
  auth,
  firestore,
  storage,
  functions,
  analytics,
  performance,
  crashlytics,
  firebaseConfig,
  firebaseServices,
  coppaConfig,
  gdprConfig,
  securityConfig
} from './firebase.config';

// App configuration
export {
  appInfo,
  apiConfig,
  arConfig,
  performanceConfig,
  accessibilityConfig,
  securityConfig as appSecurityConfig,
  localizationConfig,
  featureFlags,
  environmentConfig,
  platformConfig,
  appConfig
} from './app.config';

// Environment configuration
export {
  envConfig,
  getEnvironment,
  validateEnvironmentConfig,
  logEnvironmentInfo
} from './env.config';
