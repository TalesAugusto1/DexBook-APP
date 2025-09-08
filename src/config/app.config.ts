/**
 * App Configuration for AR Book Explorer
 * 
 * This file contains application-wide configuration settings.
 * Following AlLibrary coding rules for universal access and accessibility-first design.
 */

// import { Platform } from 'react-native';

// App Information
export const appInfo = {
  name: 'AR Book Explorer',
  version: '1.0.0',
  description: 'Interactive AR-powered reading experience for educational content',
  author: 'AR Book Explorer Team',
  website: 'https://arbookexplorer.com',
  support: 'support@arbookexplorer.com'
};

// API Configuration
export const apiConfig = {
  // OpenAI API configuration
  openai: {
    apiKey: process.env['EXPO_PUBLIC_OPENAI_API_KEY'] || '',
    model: 'gpt-4',
    maxTokens: 2000,
    temperature: 0.7
  },
  
  // Google Books API configuration
  googleBooks: {
    apiKey: process.env['EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY'] || '',
    baseUrl: 'https://www.googleapis.com/books/v1'
  },
  
  // OpenLibrary API configuration
  openLibrary: {
    baseUrl: 'https://openlibrary.org/api'
  }
};

// AR Configuration
export const arConfig = {
  // AR quality settings
  quality: {
    low: { resolution: 0.5, frameRate: 30 },
    medium: { resolution: 0.75, frameRate: 45 },
    high: { resolution: 1.0, frameRate: 60 }
  },
  
  // 3D model settings
  models: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    supportedFormats: ['.glb', '.gltf', '.obj'],
    defaultScale: 1.0
  },
  
  // QR code settings
  qrCode: {
    scanTimeout: 10000, // 10 seconds
    retryAttempts: 3,
    flashEnabled: true
  }
};

// Performance Configuration
export const performanceConfig = {
  // Load time targets
  loadTime: {
    maxInitialLoad: 2000, // 2 seconds
    maxNavigation: 500, // 500ms
    maxSearch: 500 // 500ms
  },
  
  // Memory usage targets
  memory: {
    maxUsage: 100 * 1024 * 1024, // 100MB
    warningThreshold: 80 * 1024 * 1024 // 80MB
  },
  
  // Battery usage optimization
  battery: {
    lowPowerMode: true,
    backgroundRefresh: false,
    locationServices: false
  }
};

// Accessibility Configuration
export const accessibilityConfig = {
  // Visual accessibility
  visual: {
    textSizes: ['small', 'medium', 'large', 'extra-large'],
    colorContrast: ['standard', 'high'],
    fontOptions: ['default', 'dyslexia-friendly', 'high-contrast']
  },
  
  // Motor accessibility
  motor: {
    touchTargetSize: 'large', // minimum 44pt
    gestureAlternatives: true,
    voiceControl: true,
    switchControl: true
  },
  
  // Cognitive accessibility
  cognitive: {
    focusMode: true,
    simplifiedInterface: true,
    readingSpeed: ['slow', 'normal', 'fast'],
    distractionReduction: true
  },
  
  // Audio accessibility
  audio: {
    narration: true,
    soundEffects: true,
    volumeControl: true,
    audioDescription: true
  }
};

// Security Configuration
export const securityConfig = {
  // Input validation
  inputValidation: {
    maxLength: 1000,
    sanitization: true,
    xssProtection: true
  },
  
  // File upload security
  fileUpload: {
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    malwareScanning: true
  },
  
  // Data encryption
  encryption: {
    enabled: true,
    algorithm: 'AES-256-GCM',
    keyRotation: true
  }
};

// Localization Configuration
export const localizationConfig = {
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es', 'fr', 'zh'],
  fallbackLanguage: 'en',
  rtlSupport: true
};

// Feature Flags
export const featureFlags = {
  // AR features
  arEnabled: true,
  qrScanning: true,
  threeDRendering: true,
  
  // AI features
  aiQuizGeneration: true,
  personalization: true,
  adaptiveLearning: true,
  
  // Gamification features
  achievements: true,
  rewards: true,
  progressTracking: true,
  
  // Accessibility features
  screenReader: true,
  voiceOver: true,
  focusMode: true,
  
  // Social features
  sharing: true,
  collaboration: true,
  community: false // Disabled for MVP
};

// Environment Configuration
export const environmentConfig = {
  development: {
    debugMode: true,
    logging: true,
    analytics: false,
    crashReporting: false
  },
  
  staging: {
    debugMode: false,
    logging: true,
    analytics: true,
    crashReporting: true
  },
  
  production: {
    debugMode: false,
    logging: false,
    analytics: true,
    crashReporting: true
  }
};

// Get current environment
export const getCurrentEnvironment = () => {
  if (__DEV__) return 'development';
  if (process.env['EXPO_PUBLIC_ENVIRONMENT'] === 'staging') return 'staging';
  return 'production';
};

// Get environment-specific configuration
export const getEnvironmentConfig = () => {
  const env = getCurrentEnvironment();
  return environmentConfig[env as keyof typeof environmentConfig];
};

// Platform-specific configuration
export const platformConfig = {
  ios: {
    minimumVersion: '13.0',
    supportedDevices: ['iPhone', 'iPad'],
    appStoreId: '1234567890' // TODO: Replace with actual App Store ID
  },
  
  android: {
    minimumVersion: '21', // Android 5.0
    supportedDevices: ['phone', 'tablet'],
    playStoreId: 'com.arbookexplorer.app' // TODO: Replace with actual package name
  },
  
  web: {
    minimumBrowserVersion: 'Chrome 80, Firefox 75, Safari 13',
    supportedFeatures: ['camera', 'geolocation', 'notifications']
  }
};

// Export all configuration
export const appConfig = {
  appInfo,
  apiConfig,
  arConfig,
  performanceConfig,
  accessibilityConfig,
  securityConfig,
  localizationConfig,
  featureFlags,
  environmentConfig,
  platformConfig
};
