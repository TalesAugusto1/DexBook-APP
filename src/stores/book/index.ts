/**
 * Book Store Index
 * Following BR-DATAFLOW-001: Screen data sharing
 * Clean exports for book management functionality
 */

// Core book context and provider
export { BookProvider, useBook } from './BookContext';
export { bookReducer, initialBookState } from './bookReducer';

// Types and interfaces
export type {
  Book,
  BookRecognition,
  BookProgress,
  ReadingSession,
  BookLibrary,
  BookSearch,
  BookState,
  BookAction,
  BookContextProps,
  BookValidationRules,
} from './types';

// Default export
export { default as BookContext } from './BookContext';

