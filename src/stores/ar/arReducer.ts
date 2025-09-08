/**
 * AR Reducer
 * Following BR-AR-001: AR content creation
 * Following BR-SCAN-001: Book recognition flow
 * Following BR-ACCESS-001: Accessibility adaptation
 */

import { ARState, ARAction } from './types';

// Initial AR state
export const initialARState: ARState = {
  // Camera state
  camera: {
    isActive: false,
    isFocused: false,
    isScanning: false,
    cameraPermission: 'pending',
    flashlightEnabled: false,
    quality: 'medium',
    facing: 'back',
    zoom: 1.0,
    autoFocus: true,
  },
  
  // Current AR session
  currentSession: null,
  
  // Available AR content
  availableContent: [],
  currentContent: null,
  
  // QR Code scanning
  qrScanning: {
    isScanning: false,
    lastScannedCode: null,
    scanHistory: [],
    scanError: null,
  },
  
  // 3D Models
  models: {
    loaded: [],
    loading: [],
    failed: [],
  },
  
  // User interactions
  interactions: [],
  
  // AR overlays
  overlays: [],
  
  // Analytics
  analytics: null,
  
  // Settings
  settings: {
    enableAR: true,
    arQuality: 'medium',
    enableAnimations: true,
    enableHapticFeedback: true,
    enableSoundEffects: true,
    enableVoiceCommands: false,
    accessibilityMode: false,
    batteryOptimization: false,
  },
  
  // Loading states
  isLoading: false,
  isLoadingContent: false,
  isLoadingModels: false,
  
  // Error states
  error: null,
  contentError: null,
  modelError: null,
  
  // Performance monitoring
  performance: {
    frameRate: 60,
    memoryUsage: 0,
    batteryUsage: 0,
    networkLatency: 0,
  },
  
  // Cache management
  lastUpdated: new Date(),
  cacheExpiryMinutes: 30,
};

// AR reducer function
export function arReducer(state: ARState, action: ARAction): ARState {
  switch (action.type) {
    // Basic AR actions
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
      
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
      
    // Camera Actions
    case 'SET_CAMERA_ACTIVE':
      return {
        ...state,
        camera: {
          ...state.camera,
          isActive: action.payload,
        },
      };
      
    case 'SET_CAMERA_PERMISSION':
      return {
        ...state,
        camera: {
          ...state.camera,
          cameraPermission: action.payload,
        },
      };
      
    case 'TOGGLE_FLASHLIGHT':
      return {
        ...state,
        camera: {
          ...state.camera,
          flashlightEnabled: !state.camera.flashlightEnabled,
        },
      };
      
    case 'SET_CAMERA_QUALITY':
      return {
        ...state,
        camera: {
          ...state.camera,
          quality: action.payload,
        },
      };
      
    case 'SET_CAMERA_FACING':
      return {
        ...state,
        camera: {
          ...state.camera,
          facing: action.payload,
        },
      };
      
    case 'SET_CAMERA_ZOOM':
      return {
        ...state,
        camera: {
          ...state.camera,
          zoom: Math.max(1.0, Math.min(10.0, action.payload)),
        },
      };
      
    case 'TOGGLE_AUTO_FOCUS':
      return {
        ...state,
        camera: {
          ...state.camera,
          autoFocus: !state.camera.autoFocus,
        },
      };
      
    // AR Session Actions
    case 'START_AR_SESSION':
      return {
        ...state,
        currentSession: {
          sessionId: action.payload.sessionId,
          bookId: action.payload.bookId,
          userId: '', // Will be set from AuthContext
          startTime: new Date(),
          duration: 0,
          contentViewed: [],
          interactionsCount: 0,
          interactions: [],
          averageInteractionTime: 0,
          successRate: 100,
          engagementScore: 10,
          learningScore: 10,
          frameRate: 60,
          devicePerformance: 'medium',
          networkQuality: 'good',
          batteryImpact: 'medium',
        },
        error: null,
      };
      
    case 'END_AR_SESSION':
      if (!state.currentSession) return state;
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          endTime: action.payload.endTime,
          duration: action.payload.duration,
        },
      };
      
    case 'UPDATE_SESSION_METRICS':
      if (!state.currentSession) return state;
      
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          ...action.payload,
        },
      };
      
    // Content Actions
    case 'SET_AVAILABLE_CONTENT':
      return {
        ...state,
        availableContent: action.payload,
        contentError: null,
        isLoadingContent: false,
      };
      
    case 'SET_CURRENT_CONTENT':
      return {
        ...state,
        currentContent: action.payload,
      };
      
    case 'ADD_AR_CONTENT':
      return {
        ...state,
        availableContent: [...state.availableContent, action.payload],
      };
      
    case 'REMOVE_AR_CONTENT':
      return {
        ...state,
        availableContent: state.availableContent.filter(content => content.id !== action.payload),
        currentContent: state.currentContent?.id === action.payload ? null : state.currentContent,
      };
      
    case 'UPDATE_CONTENT_STATUS':
      return {
        ...state,
        availableContent: state.availableContent.map(content =>
          content.id === action.payload.contentId
            ? { ...content, isActive: action.payload.isActive }
            : content
        ),
      };
      
    case 'SET_CONTENT_LOADING':
      return {
        ...state,
        isLoadingContent: action.payload,
      };
      
    case 'SET_CONTENT_ERROR':
      return {
        ...state,
        contentError: action.payload,
        isLoadingContent: false,
      };
      
    // QR Code Actions
    case 'START_QR_SCANNING':
      return {
        ...state,
        qrScanning: {
          ...state.qrScanning,
          isScanning: true,
          scanError: null,
        },
        camera: {
          ...state.camera,
          isScanning: true,
        },
      };
      
    case 'STOP_QR_SCANNING':
      return {
        ...state,
        qrScanning: {
          ...state.qrScanning,
          isScanning: false,
        },
        camera: {
          ...state.camera,
          isScanning: false,
        },
      };
      
    case 'SET_SCANNED_QR_CODE':
      return {
        ...state,
        qrScanning: {
          ...state.qrScanning,
          lastScannedCode: action.payload,
          scanHistory: [action.payload, ...state.qrScanning.scanHistory.slice(0, 9)],
          scanError: null,
        },
      };
      
    case 'SET_QR_SCAN_ERROR':
      return {
        ...state,
        qrScanning: {
          ...state.qrScanning,
          scanError: action.payload,
          isScanning: false,
        },
      };
      
    case 'CLEAR_QR_HISTORY':
      return {
        ...state,
        qrScanning: {
          ...state.qrScanning,
          scanHistory: [],
          lastScannedCode: null,
        },
      };
      
    // 3D Model Actions
    case 'START_MODEL_LOADING':
      return {
        ...state,
        models: {
          ...state.models,
          loading: [...state.models.loading, { ...action.payload, loadingProgress: 0 }],
          failed: state.models.failed.filter(model => model.id !== action.payload.id),
        },
        modelError: null,
      };
      
    case 'UPDATE_MODEL_PROGRESS':
      return {
        ...state,
        models: {
          ...state.models,
          loading: state.models.loading.map(model =>
            model.id === action.payload.modelId
              ? { ...model, loadingProgress: action.payload.progress }
              : model
          ),
        },
      };
      
    case 'COMPLETE_MODEL_LOADING':
      const loadedModel = { ...action.payload, isLoaded: true, loadingProgress: 100 };
      
      return {
        ...state,
        models: {
          ...state.models,
          loaded: [...state.models.loaded, loadedModel],
          loading: state.models.loading.filter(model => model.id !== action.payload.id),
          failed: state.models.failed.filter(model => model.id !== action.payload.id),
        },
      };
      
    case 'FAIL_MODEL_LOADING':
      const failedModel = state.models.loading.find(model => model.id === action.payload.modelId);
      
      if (failedModel) {
        return {
          ...state,
          models: {
            ...state.models,
            loading: state.models.loading.filter(model => model.id !== action.payload.modelId),
            failed: [...state.models.failed, failedModel],
          },
          modelError: action.payload.error,
        };
      }
      return state;
      
    case 'UNLOAD_MODEL':
      return {
        ...state,
        models: {
          ...state.models,
          loaded: state.models.loaded.filter(model => model.id !== action.payload),
        },
      };
      
    case 'SET_MODEL_ERROR':
      return {
        ...state,
        modelError: action.payload,
      };
      
    // Interaction Actions
    case 'ADD_AR_INTERACTION':
      return {
        ...state,
        interactions: [action.payload, ...state.interactions.slice(0, 99)],
        currentSession: state.currentSession ? {
          ...state.currentSession,
          interactions: [action.payload, ...state.currentSession.interactions],
          interactionsCount: state.currentSession.interactionsCount + 1,
        } : null,
      };
      
    case 'UPDATE_INTERACTION_METRICS':
      return {
        ...state,
        interactions: state.interactions.map(interaction =>
          interaction.id === action.payload.interactionId
            ? { ...interaction, ...action.payload.metrics }
            : interaction
        ),
      };
      
    case 'CLEAR_INTERACTIONS':
      return {
        ...state,
        interactions: [],
      };
      
    // Overlay Actions
    case 'ADD_AR_OVERLAY':
      return {
        ...state,
        overlays: [...state.overlays, action.payload],
      };
      
    case 'REMOVE_AR_OVERLAY':
      return {
        ...state,
        overlays: state.overlays.filter(overlay => overlay.id !== action.payload),
      };
      
    case 'UPDATE_OVERLAY':
      return {
        ...state,
        overlays: state.overlays.map(overlay =>
          overlay.id === action.payload.overlayId
            ? { ...overlay, ...action.payload.updates }
            : overlay
        ),
      };
      
    case 'TOGGLE_OVERLAY_VISIBILITY':
      return {
        ...state,
        overlays: state.overlays.map(overlay =>
          overlay.id === action.payload
            ? { ...overlay, isVisible: !overlay.isVisible }
            : overlay
        ),
      };
      
    case 'CLEAR_ALL_OVERLAYS':
      return {
        ...state,
        overlays: [],
      };
      
    // Analytics Actions
    case 'SET_AR_ANALYTICS':
      return {
        ...state,
        analytics: action.payload,
      };
      
    case 'UPDATE_ANALYTICS':
      return {
        ...state,
        analytics: state.analytics ? {
          ...state.analytics,
          ...action.payload,
        } : null,
      };
      
    // Settings Actions
    case 'UPDATE_AR_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
      
    case 'TOGGLE_AR_ENABLED':
      return {
        ...state,
        settings: {
          ...state.settings,
          enableAR: !state.settings.enableAR,
        },
      };
      
    case 'SET_AR_QUALITY':
      return {
        ...state,
        settings: {
          ...state.settings,
          arQuality: action.payload,
        },
      };
      
    case 'TOGGLE_ANIMATIONS':
      return {
        ...state,
        settings: {
          ...state.settings,
          enableAnimations: !state.settings.enableAnimations,
        },
      };
      
    case 'TOGGLE_HAPTIC_FEEDBACK':
      return {
        ...state,
        settings: {
          ...state.settings,
          enableHapticFeedback: !state.settings.enableHapticFeedback,
        },
      };
      
    case 'TOGGLE_VOICE_COMMANDS':
      return {
        ...state,
        settings: {
          ...state.settings,
          enableVoiceCommands: !state.settings.enableVoiceCommands,
        },
      };
      
    case 'TOGGLE_ACCESSIBILITY_MODE':
      return {
        ...state,
        settings: {
          ...state.settings,
          accessibilityMode: !state.settings.accessibilityMode,
        },
      };
      
    // Performance Actions
    case 'UPDATE_PERFORMANCE_METRICS':
      return {
        ...state,
        performance: {
          ...state.performance,
          ...action.payload,
        },
      };
      
    case 'MONITOR_FRAME_RATE':
      return {
        ...state,
        performance: {
          ...state.performance,
          frameRate: action.payload,
        },
      };
      
    case 'MONITOR_MEMORY_USAGE':
      return {
        ...state,
        performance: {
          ...state.performance,
          memoryUsage: action.payload,
        },
      };
      
    case 'MONITOR_BATTERY_USAGE':
      return {
        ...state,
        performance: {
          ...state.performance,
          batteryUsage: action.payload,
        },
      };
      
    // Cache Actions
    case 'UPDATE_CACHE_TIMESTAMP':
      return {
        ...state,
        lastUpdated: new Date(),
      };
      
    case 'CLEAR_AR_CACHE':
      return {
        ...initialARState,
        settings: state.settings, // Preserve user settings
      };
      
    default:
      return state;
  }
}

export default arReducer;

