/**
 * Main Store Configuration for AR Book Explorer
 * 
 * Combines all stores using Redux Toolkit.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // TODO: Add other stores as they are implemented
    // book: bookReducer,
    // quiz: quizReducer,
    // ar: arReducer,
    // gamification: gamificationReducer,
    // user: userReducer,
    // accessibility: accessibilityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
