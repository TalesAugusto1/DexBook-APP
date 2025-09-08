/**
 * Custom hook for session persistence management
 * 
 * Handles better session persistence and user experience.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuth } from '../stores/auth/AuthContext';

interface UseSessionPersistenceOptions {
  onSessionRestored?: () => void;
  onSessionExpired?: () => void;
  checkInterval?: number;
}

export const useSessionPersistence = (options: UseSessionPersistenceOptions = {}) => {
  const {
    onSessionRestored,
    onSessionExpired,
    checkInterval = 30000 // 30 seconds
  } = options;

  const { state: authState } = useAuth();
  const [appState, setAppState] = useState(AppState.currentState);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());

  // Track app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to the foreground
        setLastActiveTime(Date.now());
        if (authState.isAuthenticated) {
          onSessionRestored?.();
        }
      } else if (nextAppState.match(/inactive|background/)) {
        // App has gone to the background
        setLastActiveTime(Date.now());
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [appState, authState.isAuthenticated, onSessionRestored]);

  // Periodic session check
  useEffect(() => {
    if (!authState.isAuthenticated) {
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActive = now - lastActiveTime;
      
      // Check if user has been inactive for too long (e.g., 30 minutes)
      const maxInactiveTime = 30 * 60 * 1000; // 30 minutes
      
      if (timeSinceLastActive > maxInactiveTime) {
        onSessionExpired?.();
      }
    }, checkInterval);

    return () => clearInterval(interval);
  }, [authState.isAuthenticated, lastActiveTime, checkInterval, onSessionExpired]);

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    lastActiveTime,
    appState
  };
};

export default useSessionPersistence;
