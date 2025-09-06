/**
 * Environment Configuration for AR Book Explorer
 * 
 * This file manages environment variables and configuration for different deployment environments.
 * Following AlLibrary coding rules for security and configuration management.
 */

import { Platform } from 'react-native';

// Environment types
export type Environment = 'development' | 'staging' | 'production';

// Environment detection
export const getEnvironment = (): Environment => {
  if (__DEV__) return 'development';
  if (process.env.NODE_ENV === 'staging') return 'staging';
  return 'production';
};

// Environment variables with fallbacks
export const envConfig = {
  // Firebase Configuration
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || ''
  },
  
  // OpenAI Configuration
  openai: {
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || '',
    organization: process.env.EXPO_PUBLIC_OPENAI_ORGANIZATION || '',
    baseUrl: process.env.EXPO_PUBLIC_OPENAI_BASE_URL || 'https://api.openai.com/v1'
  },
  
  // Google Books API
  googleBooks: {
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY || ''
  },
  
  // App Configuration
  app: {
    name: process.env.EXPO_PUBLIC_APP_NAME || 'AR Book Explorer',
    version: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
    environment: getEnvironment(),
    debugMode: __DEV__,
    logLevel: process.env.EXPO_PUBLIC_LOG_LEVEL || 'info'
  },
  
  // API Endpoints
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.arbookexplorer.com',
    timeout: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '10000'),
    retryAttempts: parseInt(process.env.EXPO_PUBLIC_API_RETRY_ATTEMPTS || '3')
  },
  
  // Analytics Configuration
  analytics: {
    enabled: process.env.EXPO_PUBLIC_ANALYTICS_ENABLED === 'true',
    trackingId: process.env.EXPO_PUBLIC_ANALYTICS_TRACKING_ID || '',
    debugMode: __DEV__
  },
  
  // Performance Monitoring
  performance: {
    enabled: process.env.EXPO_PUBLIC_PERFORMANCE_ENABLED === 'true',
    sampleRate: parseFloat(process.env.EXPO_PUBLIC_PERFORMANCE_SAMPLE_RATE || '1.0')
  },
  
  // Crash Reporting
  crashlytics: {
    enabled: process.env.EXPO_PUBLIC_CRASHLYTICS_ENABLED === 'true',
    debugMode: __DEV__
  },
  
  // Security Configuration
  security: {
    encryptionKey: process.env.EXPO_PUBLIC_ENCRYPTION_KEY || '',
    jwtSecret: process.env.EXPO_PUBLIC_JWT_SECRET || '',
    apiKeyHeader: process.env.EXPO_PUBLIC_API_KEY_HEADER || 'X-API-Key'
  },
  
  // Feature Flags
  features: {
    arEnabled: process.env.EXPO_PUBLIC_AR_ENABLED !== 'false',
    aiEnabled: process.env.EXPO_PUBLIC_AI_ENABLED !== 'false',
    gamificationEnabled: process.env.EXPO_PUBLIC_GAMIFICATION_ENABLED !== 'false',
    accessibilityEnabled: process.env.EXPO_PUBLIC_ACCESSIBILITY_ENABLED !== 'false',
    offlineMode: process.env.EXPO_PUBLIC_OFFLINE_MODE !== 'false'
  },
  
  // Development Tools
  development: {
    enableReduxDevTools: __DEV__ && process.env.EXPO_PUBLIC_REDUX_DEVTOOLS === 'true',
    enableFlipper: __DEV__ && process.env.EXPO_PUBLIC_FLIPPER === 'true',
    enableReactotron: __DEV__ && process.env.EXPO_PUBLIC_REACTOTRON === 'true',
    enableStorybook: __DEV__ && process.env.EXPO_PUBLIC_STORYBOOK === 'true'
  }
};

// Environment-specific overrides
export const getEnvironmentOverrides = (): Partial<typeof envConfig> => {
  const environment = getEnvironment();
  
  switch (environment) {
    case 'development':
      return {
        app: {
          ...envConfig.app,
          debugMode: true,
          logLevel: 'debug'
        },
        analytics: {
          ...envConfig.analytics,
          enabled: false,
          debugMode: true
        },
        performance: {
          ...envConfig.performance,
          enabled: false
        },
        crashlytics: {
          ...envConfig.crashlytics,
          enabled: false,
          debugMode: true
        }
      };
      
    case 'staging':
      return {
        app: {
          ...envConfig.app,
          debugMode: false,
          logLevel: 'info'
        },
        analytics: {
          ...envConfig.analytics,
          enabled: true,
          debugMode: false
        },
        performance: {
          ...envConfig.performance,
          enabled: true,
          sampleRate: 0.5
        },
        crashlytics: {
          ...envConfig.crashlytics,
          enabled: true,
          debugMode: false
        }
      };
      
    case 'production':
      return {
        app: {
          ...envConfig.app,
          debugMode: false,
          logLevel: 'error'
        },
        analytics: {
          ...envConfig.analytics,
          enabled: true,
          debugMode: false
        },
        performance: {
          ...envConfig.performance,
          enabled: true,
          sampleRate: 1.0
        },
        crashlytics: {
          ...envConfig.crashlytics,
          enabled: true,
          debugMode: false
        }
      };
      
    default:
      return {};
  }
};

// Get final configuration with environment overrides
export const getFinalConfig = () => {
  const overrides = getEnvironmentOverrides();
  return {
    ...envConfig,
    ...overrides
  };
};

// Validation function
export const validateEnvironmentConfig = (): { isValid: boolean; errors: string[] } => {
  const config = getFinalConfig();
  const errors: string[] = [];
  
  // Required Firebase configuration
  if (!config.firebase.apiKey) {
    errors.push('Firebase API key is required');
  }
  if (!config.firebase.projectId) {
    errors.push('Firebase project ID is required');
  }
  
  // Required OpenAI configuration
  if (!config.openai.apiKey) {
    errors.push('OpenAI API key is required');
  }
  
  // Required Google Books API configuration
  if (!config.googleBooks.apiKey) {
    errors.push('Google Books API key is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Environment-specific logging
export const logEnvironmentInfo = () => {
  const config = getFinalConfig();
  const environment = getEnvironment();
  
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('🚀 AR Book Explorer Environment Info:');
    // eslint-disable-next-line no-console
    console.log(`Environment: ${environment}`);
    // eslint-disable-next-line no-console
    console.log(`Platform: ${Platform.OS}`);
    // eslint-disable-next-line no-console
    console.log(`Debug Mode: ${config.app.debugMode}`);
    // eslint-disable-next-line no-console
    console.log(`Log Level: ${config.app.logLevel}`);
    // eslint-disable-next-line no-console
    console.log(`Analytics Enabled: ${config.analytics.enabled}`);
    // eslint-disable-next-line no-console
    console.log(`Performance Monitoring: ${config.performance.enabled}`);
    // eslint-disable-next-line no-console
    console.log(`Crash Reporting: ${config.crashlytics.enabled}`);
    
    // Log feature flags
    // eslint-disable-next-line no-console
    console.log('Feature Flags:');
    Object.entries(config.features).forEach(([key, value]) => {
      // eslint-disable-next-line no-console
      console.log(`  ${key}: ${value}`);
    });
  }
};

// Export default configuration
export default getFinalConfig();
