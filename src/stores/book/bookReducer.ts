/**
 * Book Reducer
 * Following BR-DATAFLOW-001: Screen data sharing
 * Following BR-SCAN-001: Book recognition flow
 * Following BR-PROGRESS-001: Learning progress calculation
 */

import { BookState, BookAction } from './types';

// Initial book state
export const initialBookState: BookState = {
  // Current book
  currentBook: null,
  
  // Book recognition state
  recognition: {
    isScanning: false,
    scanningType: 'qr',
    recognitionProgress: 0,
    recognitionStatus: 'idle',
    errorMessage: undefined,
    scannedData: undefined,
    recognizedBook: undefined,
  },
  
  // User's book library
  library: {
    userId: '',
    books: [],
    recentBooks: [],
    favoriteBooks: [],
    readingList: [],
    completedBooks: [],
    recommendations: [],
    totalBooksRead: 0,
    currentReadingStreak: 0,
    longestReadingStreak: 0,
  },
  
  // Book progress tracking
  progress: {},
  
  // Current reading session
  currentSession: null,
  
  // Book search
  search: {
    query: '',
    filters: {},
    results: [],
    isSearching: false,
    searchHistory: [],
  },
  
  // Loading states
  isLoading: false,
  isLoadingLibrary: false,
  isLoadingProgress: false,
  
  // Error states
  error: null,
  libraryError: null,
  progressError: null,
  
  // Cache management
  lastUpdated: new Date(),
  cacheExpiryMinutes: 30,
};

// Book reducer function
export function bookReducer(state: BookState, action: BookAction): BookState {
  switch (action.type) {
    // Basic book actions
    case 'SET_CURRENT_BOOK':
      return {
        ...state,
        currentBook: action.payload,
        error: null,
      };
      
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
      
    // Book recognition actions
    case 'START_SCANNING':
      return {
        ...state,
        recognition: {
          ...state.recognition,
          isScanning: true,
          scanningType: action.payload.scanningType,
          recognitionStatus: 'scanning',
          recognitionProgress: 0,
          errorMessage: undefined,
        },
      };
      
    case 'UPDATE_RECOGNITION_PROGRESS':
      return {
        ...state,
        recognition: {
          ...state.recognition,
          recognitionProgress: Math.min(100, Math.max(0, action.payload)),
        },
      };
      
    case 'SET_RECOGNITION_STATUS':
      return {
        ...state,
        recognition: {
          ...state.recognition,
          recognitionStatus: action.payload,
          isScanning: action.payload === 'scanning',
        },
      };
      
    case 'SET_SCANNED_DATA':
      return {
        ...state,
        recognition: {
          ...state.recognition,
          scannedData: action.payload,
          recognitionStatus: 'processing',
        },
      };
      
    case 'SET_RECOGNIZED_BOOK':
      return {
        ...state,
        recognition: {
          ...state.recognition,
          recognizedBook: action.payload,
          recognitionStatus: 'success',
          isScanning: false,
          recognitionProgress: 100,
        },
        currentBook: action.payload,
      };
      
    case 'RESET_RECOGNITION':
      return {
        ...state,
        recognition: {
          ...initialBookState.recognition,
        },
      };
      
    case 'SET_RECOGNITION_ERROR':
      return {
        ...state,
        recognition: {
          ...state.recognition,
          errorMessage: action.payload,
          recognitionStatus: 'error',
          isScanning: false,
        },
      };
      
    // Library management actions
    case 'SET_LIBRARY':
      return {
        ...state,
        library: action.payload,
        libraryError: null,
        isLoadingLibrary: false,
      };
      
    case 'ADD_BOOK_TO_LIBRARY':
      return {
        ...state,
        library: {
          ...state.library,
          books: [...state.library.books, action.payload],
          recentBooks: [action.payload, ...state.library.recentBooks.slice(0, 9)],
        },
      };
      
    case 'REMOVE_BOOK_FROM_LIBRARY':
      return {
        ...state,
        library: {
          ...state.library,
          books: state.library.books.filter(book => book.id !== action.payload),
          recentBooks: state.library.recentBooks.filter(book => book.id !== action.payload),
          favoriteBooks: state.library.favoriteBooks.filter(book => book.id !== action.payload),
          readingList: state.library.readingList.filter(book => book.id !== action.payload),
        },
      };
      
    case 'ADD_TO_FAVORITES':
      const bookToFavorite = state.library.books.find(book => book.id === action.payload);
      if (bookToFavorite && !state.library.favoriteBooks.find(book => book.id === action.payload)) {
        return {
          ...state,
          library: {
            ...state.library,
            favoriteBooks: [...state.library.favoriteBooks, bookToFavorite],
          },
        };
      }
      return state;
      
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        library: {
          ...state.library,
          favoriteBooks: state.library.favoriteBooks.filter(book => book.id !== action.payload),
        },
      };
      
    case 'ADD_TO_READING_LIST':
      const bookToAdd = state.library.books.find(book => book.id === action.payload);
      if (bookToAdd && !state.library.readingList.find(book => book.id === action.payload)) {
        return {
          ...state,
          library: {
            ...state.library,
            readingList: [...state.library.readingList, bookToAdd],
          },
        };
      }
      return state;
      
    case 'REMOVE_FROM_READING_LIST':
      return {
        ...state,
        library: {
          ...state.library,
          readingList: state.library.readingList.filter(book => book.id !== action.payload),
        },
      };
      
    case 'SET_LIBRARY_LOADING':
      return {
        ...state,
        isLoadingLibrary: action.payload,
      };
      
    case 'SET_LIBRARY_ERROR':
      return {
        ...state,
        libraryError: action.payload,
        isLoadingLibrary: false,
      };
      
    // Progress tracking actions
    case 'SET_BOOK_PROGRESS':
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.payload.bookId]: action.payload.progress,
        },
        progressError: null,
      };
      
    case 'UPDATE_READING_PROGRESS':
      const currentProgress = state.progress[action.payload.bookId];
      if (currentProgress) {
        return {
          ...state,
          progress: {
            ...state.progress,
            [action.payload.bookId]: {
              ...currentProgress,
              currentChapter: action.payload.chapter,
              progressPercentage: action.payload.percentage,
              lastReadAt: new Date(),
            },
          },
        };
      }
      return state;
      
    case 'ADD_READING_TIME':
      const progressForTime = state.progress[action.payload.bookId];
      if (progressForTime) {
        return {
          ...state,
          progress: {
            ...state.progress,
            [action.payload.bookId]: {
              ...progressForTime,
              readingTimeMinutes: progressForTime.readingTimeMinutes + action.payload.minutes,
              lastReadAt: new Date(),
            },
          },
        };
      }
      return state;
      
    case 'ADD_COMPREHENSION_SCORE':
      const progressForScore = state.progress[action.payload.bookId];
      if (progressForScore) {
        const newScores = [...progressForScore.comprehensionScores, action.payload.score];
        const averageScore = newScores.reduce((sum, score) => sum + score, 0) / newScores.length;
        
        return {
          ...state,
          progress: {
            ...state.progress,
            [action.payload.bookId]: {
              ...progressForScore,
              comprehensionScores: newScores,
              averageComprehensionScore: averageScore,
            },
          },
        };
      }
      return state;
      
    case 'COMPLETE_BOOK':
      const progressForCompletion = state.progress[action.payload.bookId];
      const completedBook = state.library.books.find(book => book.id === action.payload.bookId);
      
      if (progressForCompletion && completedBook) {
        return {
          ...state,
          progress: {
            ...state.progress,
            [action.payload.bookId]: {
              ...progressForCompletion,
              completedAt: action.payload.completedAt,
              progressPercentage: 100,
            },
          },
          library: {
            ...state.library,
            completedBooks: [...state.library.completedBooks, completedBook],
            totalBooksRead: state.library.totalBooksRead + 1,
          },
        };
      }
      return state;
      
    case 'ADD_KEY_CONCEPT':
      const progressForConcept = state.progress[action.payload.bookId];
      if (progressForConcept) {
        return {
          ...state,
          progress: {
            ...state.progress,
            [action.payload.bookId]: {
              ...progressForConcept,
              keyConceptsLearned: [...progressForConcept.keyConceptsLearned, action.payload.concept],
            },
          },
        };
      }
      return state;
      
    case 'SET_PROGRESS_LOADING':
      return {
        ...state,
        isLoadingProgress: action.payload,
      };
      
    case 'SET_PROGRESS_ERROR':
      return {
        ...state,
        progressError: action.payload,
        isLoadingProgress: false,
      };
      
    // Reading session actions
    case 'START_READING_SESSION':
      return {
        ...state,
        currentSession: {
          sessionId: action.payload.sessionId,
          bookId: action.payload.bookId,
          startTime: new Date(),
          durationMinutes: 0,
          chaptersRead: [],
          comprehensionActivities: 0,
          arInteractions: 0,
          focusScore: 10,
          engagementMetrics: {
            pagesPerMinute: 0,
            interactionCount: 0,
            comprehensionAccuracy: 0,
          },
        },
      };
      
    case 'UPDATE_READING_SESSION':
      if (state.currentSession) {
        return {
          ...state,
          currentSession: {
            ...state.currentSession,
            ...action.payload,
          },
        };
      }
      return state;
      
    case 'END_READING_SESSION':
      if (state.currentSession) {
        return {
          ...state,
          currentSession: {
            ...state.currentSession,
            endTime: action.payload.endTime,
            durationMinutes: action.payload.durationMinutes,
          },
        };
      }
      return state;
      
    // Search actions
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        search: {
          ...state.search,
          query: action.payload,
        },
      };
      
    case 'SET_SEARCH_FILTERS':
      return {
        ...state,
        search: {
          ...state.search,
          filters: action.payload,
        },
      };
      
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        search: {
          ...state.search,
          results: action.payload,
          isSearching: false,
        },
      };
      
    case 'SET_SEARCHING':
      return {
        ...state,
        search: {
          ...state.search,
          isSearching: action.payload,
        },
      };
      
    case 'ADD_TO_SEARCH_HISTORY':
      return {
        ...state,
        search: {
          ...state.search,
          searchHistory: [action.payload, ...state.search.searchHistory.slice(0, 9)],
        },
      };
      
    case 'CLEAR_SEARCH_RESULTS':
      return {
        ...state,
        search: {
          ...state.search,
          results: [],
          query: '',
          isSearching: false,
        },
      };
      
    // Cache management actions
    case 'UPDATE_CACHE_TIMESTAMP':
      return {
        ...state,
        lastUpdated: new Date(),
      };
      
    case 'CLEAR_CACHE':
      return {
        ...initialBookState,
        library: {
          ...initialBookState.library,
          userId: state.library.userId,
        },
      };
      
    default:
      return state;
  }
}

export default bookReducer;

