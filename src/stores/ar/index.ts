/**
 * AR Store Index
 * Following BR-AR-001: AR content creation
 * Following BR-SCAN-001: Book recognition flow
 * Clean exports for AR functionality
 */

// Core AR context and provider
export { ARProvider, useAR } from './ARContext';
export { arReducer, initialARState } from './arReducer';

// Types and interfaces
export type {
  ARCamera,
  AR3DModel,
  ARContent,
  ARInteraction,
  ARSession,
  QRCode,
  AROverlay,
  ARAnalytics,
  ARState,
  ARAction,
  ARContextProps,
  ARValidationRules,
} from './types';

// Default export
export { default as ARContext } from './ARContext';
