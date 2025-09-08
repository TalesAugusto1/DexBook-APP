/**
 * Book Store Types
 * Following BR-DATAFLOW-001: Screen data sharing
 * Following BR-SCAN-001: Book recognition flow
 * Following BR-PROGRESS-001: Learning progress calculation
 */

// Book Information Types
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  coverUrl?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  readingLevel: 'beginner' | 'intermediate' | 'advanced';
  categories: string[];
  language: string;
  arContentAvailable: boolean;
  metadata?: {
    [key: string]: any;
  };
}

// Book Recognition Types
export interface BookRecognition {
  isScanning: boolean;
  scanningType: 'qr' | 'isbn' | 'manual';
  recognitionProgress: number;
  recognitionStatus: 'idle' | 'scanning' | 'processing' | 'success' | 'error';
  errorMessage?: string;
  scannedData?: string;
  recognizedBook?: Book;
}

// Book Progress Types
export interface BookProgress {
  bookId: string;
  userId: string;
  startedAt: Date;
  lastReadAt: Date;
  completedAt?: Date;
  currentChapter: number;
  totalChapters: number;
  progressPercentage: number;
  readingTimeMinutes: number;
  comprehensionScores: number[];
  averageComprehensionScore: number;
  keyConceptsLearned: string[];
  notes?: string[];
  bookmarkedPages?: number[];
}

// Reading Session Types
export interface ReadingSession {
  sessionId: string;
  bookId: string;
  startTime: Date;
  endTime?: Date;
  durationMinutes: number;
  chaptersRead: number[];
  comprehensionActivities: number;
  arInteractions: number;
  focusScore: number; // 1-10 scale
  engagementMetrics: {
    pagesPerMinute: number;
    interactionCount: number;
    comprehensionAccuracy: number;
  };
}

// Book Library Types
export interface BookLibrary {
  userId: string;
  books: Book[];
  recentBooks: Book[];
  favoriteBooks: Book[];
  readingList: Book[];
  completedBooks: Book[];
  recommendations: Book[];
  totalBooksRead: number;
  currentReadingStreak: number;
  longestReadingStreak: number;
}

// Book Search Types
export interface BookSearch {
  query: string;
  filters: {
    readingLevel?: 'beginner' | 'intermediate' | 'advanced';
    categories?: string[];
    arContentOnly?: boolean;
    language?: string;
    publisher?: string;
  };
  results: Book[];
  isSearching: boolean;
  searchHistory: string[];
}

// Book State
export interface BookState {
  // Current book being read/viewed
  currentBook: Book | null;
  
  // Book recognition state
  recognition: BookRecognition;
  
  // User's book library
  library: BookLibrary;
  
  // Book progress tracking
  progress: { [bookId: string]: BookProgress };
  
  // Current reading session
  currentSession: ReadingSession | null;
  
  // Book search functionality
  search: BookSearch;
  
  // Loading states
  isLoading: boolean;
  isLoadingLibrary: boolean;
  isLoadingProgress: boolean;
  
  // Error states
  error: string | null;
  libraryError: string | null;
  progressError: string | null;
  
  // Cache management
  lastUpdated: Date;
  cacheExpiryMinutes: number;
}

// Book Actions
export type BookAction =
  | { type: 'SET_CURRENT_BOOK'; payload: Book | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  
  // Book Recognition Actions
  | { type: 'START_SCANNING'; payload: { scanningType: 'qr' | 'isbn' | 'manual' } }
  | { type: 'UPDATE_RECOGNITION_PROGRESS'; payload: number }
  | { type: 'SET_RECOGNITION_STATUS'; payload: BookRecognition['recognitionStatus'] }
  | { type: 'SET_SCANNED_DATA'; payload: string }
  | { type: 'SET_RECOGNIZED_BOOK'; payload: Book }
  | { type: 'RESET_RECOGNITION' }
  | { type: 'SET_RECOGNITION_ERROR'; payload: string }
  
  // Library Management Actions
  | { type: 'SET_LIBRARY'; payload: BookLibrary }
  | { type: 'ADD_BOOK_TO_LIBRARY'; payload: Book }
  | { type: 'REMOVE_BOOK_FROM_LIBRARY'; payload: string }
  | { type: 'ADD_TO_FAVORITES'; payload: string }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'ADD_TO_READING_LIST'; payload: string }
  | { type: 'REMOVE_FROM_READING_LIST'; payload: string }
  | { type: 'SET_LIBRARY_LOADING'; payload: boolean }
  | { type: 'SET_LIBRARY_ERROR'; payload: string | null }
  
  // Progress Tracking Actions
  | { type: 'SET_BOOK_PROGRESS'; payload: { bookId: string; progress: BookProgress } }
  | { type: 'UPDATE_READING_PROGRESS'; payload: { bookId: string; chapter: number; percentage: number } }
  | { type: 'ADD_READING_TIME'; payload: { bookId: string; minutes: number } }
  | { type: 'ADD_COMPREHENSION_SCORE'; payload: { bookId: string; score: number } }
  | { type: 'COMPLETE_BOOK'; payload: { bookId: string; completedAt: Date } }
  | { type: 'ADD_KEY_CONCEPT'; payload: { bookId: string; concept: string } }
  | { type: 'SET_PROGRESS_LOADING'; payload: boolean }
  | { type: 'SET_PROGRESS_ERROR'; payload: string | null }
  
  // Reading Session Actions
  | { type: 'START_READING_SESSION'; payload: { bookId: string; sessionId: string } }
  | { type: 'UPDATE_READING_SESSION'; payload: Partial<ReadingSession> }
  | { type: 'END_READING_SESSION'; payload: { endTime: Date; durationMinutes: number } }
  
  // Search Actions
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_FILTERS'; payload: BookSearch['filters'] }
  | { type: 'SET_SEARCH_RESULTS'; payload: Book[] }
  | { type: 'SET_SEARCHING'; payload: boolean }
  | { type: 'ADD_TO_SEARCH_HISTORY'; payload: string }
  | { type: 'CLEAR_SEARCH_RESULTS' }
  
  // Cache Management Actions
  | { type: 'UPDATE_CACHE_TIMESTAMP' }
  | { type: 'CLEAR_CACHE' };

// Book Context Props
export interface BookContextProps {
  state: BookState;
  dispatch: React.Dispatch<BookAction>;
  
  // Book Recognition Functions
  startScanning: (type: 'qr' | 'isbn' | 'manual') => void;
  processScannedData: (data: string) => Promise<void>;
  resetRecognition: () => void;
  
  // Library Management Functions
  addBookToLibrary: (book: Book) => Promise<void>;
  removeBookFromLibrary: (bookId: string) => Promise<void>;
  toggleFavorite: (bookId: string) => Promise<void>;
  addToReadingList: (bookId: string) => Promise<void>;
  removeFromReadingList: (bookId: string) => Promise<void>;
  
  // Progress Tracking Functions
  updateReadingProgress: (bookId: string, chapter: number, percentage: number) => Promise<void>;
  addReadingTime: (bookId: string, minutes: number) => Promise<void>;
  addComprehensionScore: (bookId: string, score: number) => Promise<void>;
  completeBook: (bookId: string) => Promise<void>;
  addKeyConcept: (bookId: string, concept: string) => Promise<void>;
  
  // Reading Session Functions
  startReadingSession: (bookId: string) => void;
  updateReadingSession: (updates: Partial<ReadingSession>) => void;
  endReadingSession: () => Promise<void>;
  
  // Search Functions
  searchBooks: (query: string, filters?: BookSearch['filters']) => Promise<void>;
  clearSearchResults: () => void;
  
  // Utility Functions
  getCurrentBook: () => Book | null;
  getBookProgress: (bookId: string) => BookProgress | null;
  getReadingStreak: () => number;
  getTotalReadingTime: () => number;
  getAverageComprehensionScore: () => number;
}

// Business Rule Validation Types
export interface BookValidationRules {
  // BR-SCAN-001: Book recognition flow
  validateQRCode: (qrData: string) => boolean;
  validateISBN: (isbn: string) => boolean;
  
  // BR-SCAN-002: Book validation rules
  validateBookMetadata: (book: Partial<Book>) => boolean;
  
  // BR-PROGRESS-001: Learning progress calculation
  calculateProgressPercentage: (current: number, total: number) => number;
  calculateComprehensionScore: (scores: number[]) => number;
  validateReadingTime: (minutes: number) => boolean;
}

export default BookState;

