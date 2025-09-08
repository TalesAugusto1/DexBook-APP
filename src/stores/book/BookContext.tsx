/**
 * Book Context
 * Following BR-DATAFLOW-001: Screen data sharing
 * Following BR-SCAN-001: Book recognition flow
 * Following BR-PROGRESS-001: Learning progress calculation
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Book, BookState, BookAction, BookContextProps, BookProgress, ReadingSession } from './types';
import { bookReducer, initialBookState } from './bookReducer';

// Create Book Context
const BookContext = createContext<BookContextProps | undefined>(undefined);

// Book Provider Component
export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialBookState);

  // Book Recognition Functions
  const startScanning = useCallback((type: 'qr' | 'isbn' | 'manual') => {
    dispatch({ type: 'START_SCANNING', payload: { scanningType: type } });
  }, []);

  const processScannedData = useCallback(async (data: string) => {
    try {
      dispatch({ type: 'SET_SCANNED_DATA', payload: data });
      dispatch({ type: 'UPDATE_RECOGNITION_PROGRESS', payload: 25 });
      
      // Simulate book recognition process
      // TODO: Replace with actual Firebase/API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'UPDATE_RECOGNITION_PROGRESS', payload: 50 });
      
      // Validate scanned data
      if (data.length < 3) {
        throw new Error('Invalid scan data');
      }
      
      dispatch({ type: 'UPDATE_RECOGNITION_PROGRESS', payload: 75 });
      
      // Mock book recognition result
      const recognizedBook: Book = {
        id: `book_${Date.now()}`,
        title: 'Recognized Book Title',
        author: 'Book Author',
        isbn: data,
        description: 'Book description from recognition',
        readingLevel: 'intermediate',
        categories: ['Fiction'],
        language: 'en',
        arContentAvailable: true,
      };
      
      dispatch({ type: 'UPDATE_RECOGNITION_PROGRESS', payload: 100 });
      dispatch({ type: 'SET_RECOGNIZED_BOOK', payload: recognizedBook });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Recognition failed';
      dispatch({ type: 'SET_RECOGNITION_ERROR', payload: errorMessage });
    }
  }, []);

  const resetRecognition = useCallback(() => {
    dispatch({ type: 'RESET_RECOGNITION' });
  }, []);

  // Library Management Functions
  const addBookToLibrary = useCallback(async (book: Book) => {
    try {
      dispatch({ type: 'SET_LIBRARY_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'ADD_BOOK_TO_LIBRARY', payload: book });
      dispatch({ type: 'SET_LIBRARY_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add book';
      dispatch({ type: 'SET_LIBRARY_ERROR', payload: errorMessage });
    }
  }, []);

  const removeBookFromLibrary = useCallback(async (bookId: string) => {
    try {
      dispatch({ type: 'SET_LIBRARY_LOADING', payload: true });
      
      // TODO: Replace with actual Firebase call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'REMOVE_BOOK_FROM_LIBRARY', payload: bookId });
      dispatch({ type: 'SET_LIBRARY_LOADING', payload: false });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove book';
      dispatch({ type: 'SET_LIBRARY_ERROR', payload: errorMessage });
    }
  }, []);

  const toggleFavorite = useCallback(async (bookId: string) => {
    try {
      const isFavorite = state.library.favoriteBooks.some(book => book.id === bookId);
      
      if (isFavorite) {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: bookId });
      } else {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: bookId });
      }
      
      // TODO: Sync with Firebase
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle favorite';
      dispatch({ type: 'SET_LIBRARY_ERROR', payload: errorMessage });
    }
  }, [state.library.favoriteBooks]);

  const addToReadingList = useCallback(async (bookId: string) => {
    try {
      dispatch({ type: 'ADD_TO_READING_LIST', payload: bookId });
      // TODO: Sync with Firebase
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add to reading list';
      dispatch({ type: 'SET_LIBRARY_ERROR', payload: errorMessage });
    }
  }, []);

  const removeFromReadingList = useCallback(async (bookId: string) => {
    try {
      dispatch({ type: 'REMOVE_FROM_READING_LIST', payload: bookId });
      // TODO: Sync with Firebase
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove from reading list';
      dispatch({ type: 'SET_LIBRARY_ERROR', payload: errorMessage });
    }
  }, []);

  // Progress Tracking Functions
  const updateReadingProgress = useCallback(async (bookId: string, chapter: number, percentage: number) => {
    try {
      dispatch({ type: 'UPDATE_READING_PROGRESS', payload: { bookId, chapter, percentage } });
      
      // TODO: Sync with Firebase
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update progress';
      dispatch({ type: 'SET_PROGRESS_ERROR', payload: errorMessage });
    }
  }, []);

  const addReadingTime = useCallback(async (bookId: string, minutes: number) => {
    try {
      dispatch({ type: 'ADD_READING_TIME', payload: { bookId, minutes } });
      
      // TODO: Sync with Firebase
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add reading time';
      dispatch({ type: 'SET_PROGRESS_ERROR', payload: errorMessage });
    }
  }, []);

  const addComprehensionScore = useCallback(async (bookId: string, score: number) => {
    try {
      dispatch({ type: 'ADD_COMPREHENSION_SCORE', payload: { bookId, score } });
      
      // TODO: Sync with Firebase
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add comprehension score';
      dispatch({ type: 'SET_PROGRESS_ERROR', payload: errorMessage });
    }
  }, []);

  const completeBook = useCallback(async (bookId: string) => {
    try {
      const completedAt = new Date();
      dispatch({ type: 'COMPLETE_BOOK', payload: { bookId, completedAt } });
      
      // TODO: Sync with Firebase and trigger achievements
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete book';
      dispatch({ type: 'SET_PROGRESS_ERROR', payload: errorMessage });
    }
  }, []);

  const addKeyConcept = useCallback(async (bookId: string, concept: string) => {
    try {
      dispatch({ type: 'ADD_KEY_CONCEPT', payload: { bookId, concept } });
      
      // TODO: Sync with Firebase
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add key concept';
      dispatch({ type: 'SET_PROGRESS_ERROR', payload: errorMessage });
    }
  }, []);

  // Reading Session Functions
  const startReadingSession = useCallback((bookId: string) => {
    const sessionId = `session_${Date.now()}`;
    dispatch({ type: 'START_READING_SESSION', payload: { bookId, sessionId } });
  }, []);

  const updateReadingSession = useCallback((updates: Partial<ReadingSession>) => {
    dispatch({ type: 'UPDATE_READING_SESSION', payload: updates });
  }, []);

  const endReadingSession = useCallback(async () => {
    if (state.currentSession) {
      const endTime = new Date();
      const durationMinutes = Math.round((endTime.getTime() - state.currentSession.startTime.getTime()) / 60000);
      
      dispatch({ type: 'END_READING_SESSION', payload: { endTime, durationMinutes } });
      
      // Add reading time to book progress
      await addReadingTime(state.currentSession.bookId, durationMinutes);
      
      // TODO: Save session to Firebase
    }
  }, [state.currentSession, addReadingTime]);

  // Search Functions
  const searchBooks = useCallback(async (query: string, filters?: BookState['search']['filters']) => {
    try {
      dispatch({ type: 'SET_SEARCHING', payload: true });
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
      
      if (filters) {
        dispatch({ type: 'SET_SEARCH_FILTERS', payload: filters });
      }
      
      // TODO: Replace with actual search API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock search results
      const mockResults: Book[] = [
        {
          id: 'search_1',
          title: `Search Result for "${query}"`,
          author: 'Search Author',
          readingLevel: 'intermediate',
          categories: ['Fiction'],
          language: 'en',
          arContentAvailable: true,
        },
      ];
      
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: mockResults });
      dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: query });
      
    } catch (error) {
      dispatch({ type: 'SET_SEARCHING', payload: false });
      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, []);

  const clearSearchResults = useCallback(() => {
    dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
  }, []);

  // Utility Functions
  const getCurrentBook = useCallback(() => {
    return state.currentBook;
  }, [state.currentBook]);

  const getBookProgress = useCallback((bookId: string) => {
    return state.progress[bookId] || null;
  }, [state.progress]);

  const getReadingStreak = useCallback(() => {
    return state.library.currentReadingStreak;
  }, [state.library.currentReadingStreak]);

  const getTotalReadingTime = useCallback(() => {
    return Object.values(state.progress).reduce((total, progress) => total + progress.readingTimeMinutes, 0);
  }, [state.progress]);

  const getAverageComprehensionScore = useCallback(() => {
    const allScores = Object.values(state.progress).flatMap(progress => progress.comprehensionScores);
    if (allScores.length === 0) return 0;
    return allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
  }, [state.progress]);

  // Context value
  const contextValue: BookContextProps = {
    state,
    dispatch,
    
    // Book Recognition Functions
    startScanning,
    processScannedData,
    resetRecognition,
    
    // Library Management Functions
    addBookToLibrary,
    removeBookFromLibrary,
    toggleFavorite,
    addToReadingList,
    removeFromReadingList,
    
    // Progress Tracking Functions
    updateReadingProgress,
    addReadingTime,
    addComprehensionScore,
    completeBook,
    addKeyConcept,
    
    // Reading Session Functions
    startReadingSession,
    updateReadingSession,
    endReadingSession,
    
    // Search Functions
    searchBooks,
    clearSearchResults,
    
    // Utility Functions
    getCurrentBook,
    getBookProgress,
    getReadingStreak,
    getTotalReadingTime,
    getAverageComprehensionScore,
  };

  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};

// Custom hook to use Book Context
export const useBook = () => {
  const context = useContext(BookContext);
  
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }
  
  return context;
};

export default BookContext;

