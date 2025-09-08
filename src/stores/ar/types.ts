/**
 * AR Store Types
 * Following BR-AR-001: AR content creation
 * Following BR-SCAN-001: Book recognition flow
 * Following BR-ACCESS-001: Accessibility adaptation
 */

// AR Camera Types
export interface ARCamera {
  isActive: boolean;
  isFocused: boolean;
  isScanning: boolean;
  cameraPermission: 'granted' | 'denied' | 'pending';
  flashlightEnabled: boolean;
  quality: 'low' | 'medium' | 'high';
  facing: 'front' | 'back';
  zoom: number;
  autoFocus: boolean;
}

// 3D Model Types
export interface AR3DModel {
  id: string;
  name: string;
  description: string;
  filePath: string;
  fileSize: number;
  format: 'gltf' | 'obj' | 'fbx';
  animations: string[];
  textures: string[];
  scale: { x: number; y: number; z: number };
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  isLoaded: boolean;
  loadingProgress: number;
}

// AR Content Types
export interface ARContent {
  id: string;
  bookId: string;
  title: string;
  description: string;
  contentType: 'model' | 'animation' | 'interactive' | 'info_overlay' | 'quiz_element';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningObjectives: string[];
  
  // 3D Models
  models: AR3DModel[];
  
  // Interactive elements
  interactiveElements: {
    id: string;
    type: 'button' | 'slider' | 'drag_drop' | 'tap_sequence';
    position: { x: number; y: number; z: number };
    action: string;
    trigger: 'tap' | 'voice' | 'gesture' | 'proximity';
    feedback: 'visual' | 'audio' | 'haptic' | 'combined';
  }[];
  
  // Accessibility features
  accessibilityFeatures: {
    screenReaderSupport: boolean;
    voiceOverText: string;
    hapticFeedback: boolean;
    highContrastMode: boolean;
    alternativeText: string;
    audioDescription: string;
  };
  
  // Metadata
  createdAt: Date;
  lastModified: Date;
  version: string;
  isActive: boolean;
}

// AR Interaction Types
export interface ARInteraction {
  id: string;
  userId: string;
  contentId: string;
  interactionType: 'view' | 'tap' | 'gesture' | 'voice' | 'quiz_complete';
  timestamp: Date;
  duration: number;
  success: boolean;
  
  // Interaction details
  details: {
    elementId?: string;
    gestureType?: 'pinch' | 'swipe' | 'rotate' | 'long_press';
    voiceCommand?: string;
    tapCount?: number;
    accuracy?: number;
  };
  
  // Learning metrics
  learningValue: number; // 1-10 scale
  engagementLevel: 'low' | 'medium' | 'high';
  comprehensionIndicator: number; // 1-10 scale
}

// AR Session Types
export interface ARSession {
  sessionId: string;
  bookId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  
  // Content viewed
  contentViewed: string[];
  interactionsCount: number;
  interactions: ARInteraction[];
  
  // Performance metrics
  averageInteractionTime: number;
  successRate: number;
  engagementScore: number;
  learningScore: number;
  
  // Technical metrics
  frameRate: number;
  devicePerformance: 'low' | 'medium' | 'high';
  networkQuality: 'poor' | 'good' | 'excellent';
  batteryImpact: 'low' | 'medium' | 'high';
}

// QR Code Types
export interface QRCode {
  data: string;
  bookId: string;
  contentId: string;
  isValid: boolean;
  scannedAt: Date;
  position?: { x: number; y: number };
  confidence: number; // 0-1 scale
}

// AR Overlay Types
export interface AROverlay {
  id: string;
  type: 'info' | 'navigation' | 'controls' | 'progress' | 'accessibility';
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'custom';
  customPosition?: { x: number; y: number };
  isVisible: boolean;
  opacity: number;
  autoHide: boolean;
  hideAfter?: number; // seconds
  
  // Accessibility
  accessibilityLabel: string;
  screenReaderText: string;
}

// AR Analytics Types
export interface ARAnalytics {
  userId: string;
  totalARSessions: number;
  totalARTime: number;
  averageSessionDuration: number;
  favoriteContentTypes: string[];
  mostInteractedElements: string[];
  
  // Performance metrics
  averageFrameRate: number;
  crashFrequency: number;
  loadingTimes: number[];
  
  // Learning metrics
  conceptsLearnedThroughAR: string[];
  arLearningEfficiency: number; // compared to traditional learning
  retentionRate: number;
  
  // Usage patterns
  preferredARFeatures: string[];
  accessibilityFeaturesUsed: string[];
  deviceCapabilities: {
    supportsAR: boolean;
    performance: 'low' | 'medium' | 'high';
    batteryLife: 'poor' | 'good' | 'excellent';
  };
}

// AR State
export interface ARState {
  // Camera state
  camera: ARCamera;
  
  // Current AR session
  currentSession: ARSession | null;
  
  // Available AR content
  availableContent: ARContent[];
  currentContent: ARContent | null;
  
  // QR Code scanning
  qrScanning: {
    isScanning: boolean;
    lastScannedCode: QRCode | null;
    scanHistory: QRCode[];
    scanError: string | null;
  };
  
  // 3D Models
  models: {
    loaded: AR3DModel[];
    loading: AR3DModel[];
    failed: AR3DModel[];
  };
  
  // User interactions
  interactions: ARInteraction[];
  
  // AR overlays
  overlays: AROverlay[];
  
  // Analytics
  analytics: ARAnalytics | null;
  
  // Settings
  settings: {
    enableAR: boolean;
    arQuality: 'low' | 'medium' | 'high';
    enableAnimations: boolean;
    enableHapticFeedback: boolean;
    enableSoundEffects: boolean;
    enableVoiceCommands: boolean;
    accessibilityMode: boolean;
    batteryOptimization: boolean;
  };
  
  // Loading states
  isLoading: boolean;
  isLoadingContent: boolean;
  isLoadingModels: boolean;
  
  // Error states
  error: string | null;
  contentError: string | null;
  modelError: string | null;
  
  // Performance monitoring
  performance: {
    frameRate: number;
    memoryUsage: number;
    batteryUsage: number;
    networkLatency: number;
  };
  
  // Cache management
  lastUpdated: Date;
  cacheExpiryMinutes: number;
}

// AR Actions
export type ARAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  
  // Camera Actions
  | { type: 'SET_CAMERA_ACTIVE'; payload: boolean }
  | { type: 'SET_CAMERA_PERMISSION'; payload: ARCamera['cameraPermission'] }
  | { type: 'TOGGLE_FLASHLIGHT' }
  | { type: 'SET_CAMERA_QUALITY'; payload: ARCamera['quality'] }
  | { type: 'SET_CAMERA_FACING'; payload: ARCamera['facing'] }
  | { type: 'SET_CAMERA_ZOOM'; payload: number }
  | { type: 'TOGGLE_AUTO_FOCUS' }
  
  // AR Session Actions
  | { type: 'START_AR_SESSION'; payload: { bookId: string; sessionId: string } }
  | { type: 'END_AR_SESSION'; payload: { endTime: Date; duration: number } }
  | { type: 'UPDATE_SESSION_METRICS'; payload: Partial<ARSession> }
  
  // Content Actions
  | { type: 'SET_AVAILABLE_CONTENT'; payload: ARContent[] }
  | { type: 'SET_CURRENT_CONTENT'; payload: ARContent | null }
  | { type: 'ADD_AR_CONTENT'; payload: ARContent }
  | { type: 'REMOVE_AR_CONTENT'; payload: string }
  | { type: 'UPDATE_CONTENT_STATUS'; payload: { contentId: string; isActive: boolean } }
  | { type: 'SET_CONTENT_LOADING'; payload: boolean }
  | { type: 'SET_CONTENT_ERROR'; payload: string | null }
  
  // QR Code Actions
  | { type: 'START_QR_SCANNING' }
  | { type: 'STOP_QR_SCANNING' }
  | { type: 'SET_SCANNED_QR_CODE'; payload: QRCode }
  | { type: 'SET_QR_SCAN_ERROR'; payload: string | null }
  | { type: 'CLEAR_QR_HISTORY' }
  
  // 3D Model Actions
  | { type: 'START_MODEL_LOADING'; payload: AR3DModel }
  | { type: 'UPDATE_MODEL_PROGRESS'; payload: { modelId: string; progress: number } }
  | { type: 'COMPLETE_MODEL_LOADING'; payload: AR3DModel }
  | { type: 'FAIL_MODEL_LOADING'; payload: { modelId: string; error: string } }
  | { type: 'UNLOAD_MODEL'; payload: string }
  | { type: 'SET_MODEL_ERROR'; payload: string | null }
  
  // Interaction Actions
  | { type: 'ADD_AR_INTERACTION'; payload: ARInteraction }
  | { type: 'UPDATE_INTERACTION_METRICS'; payload: { interactionId: string; metrics: Partial<ARInteraction> } }
  | { type: 'CLEAR_INTERACTIONS' }
  
  // Overlay Actions
  | { type: 'ADD_AR_OVERLAY'; payload: AROverlay }
  | { type: 'REMOVE_AR_OVERLAY'; payload: string }
  | { type: 'UPDATE_OVERLAY'; payload: { overlayId: string; updates: Partial<AROverlay> } }
  | { type: 'TOGGLE_OVERLAY_VISIBILITY'; payload: string }
  | { type: 'CLEAR_ALL_OVERLAYS' }
  
  // Analytics Actions
  | { type: 'SET_AR_ANALYTICS'; payload: ARAnalytics }
  | { type: 'UPDATE_ANALYTICS'; payload: Partial<ARAnalytics> }
  
  // Settings Actions
  | { type: 'UPDATE_AR_SETTINGS'; payload: Partial<ARState['settings']> }
  | { type: 'TOGGLE_AR_ENABLED' }
  | { type: 'SET_AR_QUALITY'; payload: ARState['settings']['arQuality'] }
  | { type: 'TOGGLE_ANIMATIONS' }
  | { type: 'TOGGLE_HAPTIC_FEEDBACK' }
  | { type: 'TOGGLE_VOICE_COMMANDS' }
  | { type: 'TOGGLE_ACCESSIBILITY_MODE' }
  
  // Performance Actions
  | { type: 'UPDATE_PERFORMANCE_METRICS'; payload: Partial<ARState['performance']> }
  | { type: 'MONITOR_FRAME_RATE'; payload: number }
  | { type: 'MONITOR_MEMORY_USAGE'; payload: number }
  | { type: 'MONITOR_BATTERY_USAGE'; payload: number }
  
  // Cache Actions
  | { type: 'UPDATE_CACHE_TIMESTAMP' }
  | { type: 'CLEAR_AR_CACHE' };

// AR Context Props
export interface ARContextProps {
  state: ARState;
  dispatch: React.Dispatch<ARAction>;
  
  // Camera Functions
  initializeCamera: () => Promise<void>;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  toggleFlashlight: () => void;
  takePicture: () => Promise<string>;
  
  // AR Session Functions
  startARSession: (bookId: string) => void;
  endARSession: () => Promise<void>;
  pauseARSession: () => void;
  resumeARSession: () => void;
  
  // Content Functions
  loadARContent: (bookId: string) => Promise<void>;
  activateContent: (contentId: string) => Promise<void>;
  deactivateContent: (contentId: string) => void;
  
  // QR Code Functions
  startQRScanning: () => void;
  stopQRScanning: () => void;
  processQRCode: (qrData: string) => Promise<void>;
  
  // 3D Model Functions
  loadModel: (model: AR3DModel) => Promise<void>;
  unloadModel: (modelId: string) => void;
  animateModel: (modelId: string, animation: string) => void;
  
  // Interaction Functions
  recordInteraction: (interaction: ARInteraction) => void;
  handleGesture: (gestureType: string, data: any) => void;
  handleVoiceCommand: (command: string) => void;
  
  // Overlay Functions
  showOverlay: (overlay: AROverlay) => void;
  hideOverlay: (overlayId: string) => void;
  updateOverlay: (overlayId: string, updates: Partial<AROverlay>) => void;
  
  // Analytics Functions
  getARAnalytics: () => Promise<ARAnalytics>;
  trackARUsage: (metrics: Partial<ARAnalytics>) => void;
  
  // Utility Functions
  isARSupported: () => boolean;
  getPerformanceLevel: () => 'low' | 'medium' | 'high';
  getCurrentFrameRate: () => number;
  getMemoryUsage: () => number;
  optimizePerformance: () => void;
}

// Business Rule Validation Types
export interface ARValidationRules {
  // BR-AR-001: AR content creation
  validateARContent: (content: ARContent) => boolean;
  validateModelFormat: (format: string) => boolean;
  
  // BR-SCAN-001: Book recognition flow
  validateQRCode: (qrData: string) => boolean;
  
  // BR-ACCESS-001: Accessibility adaptation
  validateAccessibilityFeatures: (features: ARContent['accessibilityFeatures']) => boolean;
  adaptContentForAccessibility: (content: ARContent, userNeeds: string[]) => ARContent;
}

export default ARState;

