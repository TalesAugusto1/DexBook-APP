# AR Book Explorer - Visão Geral da Arquitetura

## 🏗️ **Arquitetura Geral do Sistema**

O AR Book Explorer segue uma arquitetura **SOLID** com padrões de **Clean Architecture** e **Component-Based Design**, utilizando **Expo** + **React Native** para desenvolvimento mobile multiplataforma.

---

## 📊 **Diagrama de Arquitetura de Alto Nível**

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  📱 React Native App (iOS/Android/Web)                     │
│  ├── 🎯 Expo Router (File-based routing)                   │
│  ├── 🎨 Components (Foundation → Domain → Composite)       │
│  ├── 📱 Screens (24 screens organized by feature)          │
│  └── 🎪 Context API + useReducer (State Management)        │
└─────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                     │
├─────────────────────────────────────────────────────────────┤
│  🔧 Services Layer                                          │
│  ├── 🔐 Authentication Service                              │
│  ├── 📚 Book Management Service                             │
│  ├── 🤖 AI/Quiz Generation Service                          │
│  ├── 📷 AR Camera & Recognition Service                     │
│  ├── 🏆 Gamification Service                                │
│  └── ♿ Accessibility Service                               │
└─────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  ☁️ Firebase Backend (Cloud-native)                        │
│  ├── 🔐 Firebase Auth (Authentication)                      │
│  ├── 🗃️ Firestore Database (NoSQL, offline-first)          │
│  ├── 📦 Firebase Storage (Files, images, AR models)        │
│  ├── ⚡ Cloud Functions (Serverless backend logic)         │
│  ├── 📊 Firebase Analytics (User behavior)                 │
│  └── 🚨 Firebase Crashlytics (Error monitoring)            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 **Princípios Arquiteturais**

### **1. SOLID Principles**
- **Single Responsibility**: Cada componente tem uma responsabilidade específica
- **Open/Closed**: Componentes abertos para extensão, fechados para modificação
- **Liskov Substitution**: Componentes substituíveis sem quebrar funcionalidade
- **Interface Segregation**: Interfaces específicas em vez de genéricas
- **Dependency Inversion**: Dependências abstratas, não concretas

### **2. Component Hierarchy**
```
Components/
├── foundation/          # Level 1: Basic UI building blocks
│   ├── Button/         # Botões reutilizáveis
│   ├── Input/          # Campos de entrada
│   ├── Card/           # Cartões de conteúdo
│   ├── Modal/          # Modais e overlays
│   └── Loading/        # Indicadores de carregamento
│
├── domain/             # Level 2: Business-specific components
│   ├── book/           # Componentes específicos de livros
│   ├── quiz/           # Componentes de quiz e aprendizado
│   ├── achievement/    # Componentes de conquistas
│   ├── ar/             # Componentes de realidade aumentada
│   └── navigation/     # Componentes de navegação
│
├── composite/          # Level 3: Complex feature components
│   ├── BookScanner/    # Scanner completo de livros
│   ├── QuizInterface/  # Interface completa de quiz
│   ├── ARExperience/   # Experiência AR completa
│   └── LearningPath/   # Caminho de aprendizado
│
└── layout/             # Layout and structure components
    ├── Header/         # Cabeçalhos
    ├── Sidebar/        # Barras laterais
    ├── Footer/         # Rodapés
    └── MainLayout/     # Layout principal
```

### **3. File-based Routing (Expo Router)**
```
app/
├── _layout.tsx              # Root layout
├── index.tsx                # Splash screen
├── welcome.tsx              # Welcome screen
├── (tabs)/                  # Tab navigation group
│   ├── _layout.tsx          # Tab layout
│   ├── index.tsx            # Home tab
│   ├── scan.tsx             # Scan tab
│   ├── profile.tsx          # Profile tab
│   └── settings.tsx         # Settings tab
├── auth/                    # Authentication group
│   ├── login.tsx            # Login/Register
│   └── profile-setup.tsx    # Profile setup
├── books/                   # Book management group
├── ar/                      # AR experience group
├── learning/                # Learning group
├── gamification/            # Gamification group
└── settings/                # Settings group
```

---

## 🔧 **Camadas da Aplicação**

### **Presentation Layer**

#### **Responsabilidades:**
- Interface do usuário e experiência
- Navegação entre telas
- Gerenciamento de estado local
- Interação com usuário

#### **Tecnologias:**
- **React Native**: Framework principal
- **Expo Router**: Navegação file-based
- **TypeScript**: Tipagem estática
- **CSS Modules**: Estilos escoped

#### **Estrutura:**
```typescript
// Exemplo de componente da presentation layer
interface BookCardProps {
  book: Book;
  onPress: (book: Book) => void;
  accessibilityLabel?: string;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onPress,
  accessibilityLabel
}) => {
  return (
    <Card onPress={() => onPress(book)}>
      <Card.Image source={{ uri: book.coverUrl }} />
      <Card.Content>
        <Typography variant="h3">{book.title}</Typography>
        <Typography variant="body1">{book.author}</Typography>
      </Card.Content>
    </Card>
  );
};
```

### **Business Logic Layer**

#### **Responsabilidades:**
- Regras de negócio
- Validação de dados
- Comunicação com APIs
- Processamento de dados

#### **Estrutura dos Services:**
```typescript
// Exemplo de service
export class BookService {
  constructor(
    private firestore: FirestoreService,
    private storage: StorageService,
    private aiService: AIService
  ) {}

  async recognizeBook(imageUri: string): Promise<Book> {
    // 1. Upload da imagem
    const imageUrl = await this.storage.uploadImage(imageUri);
    
    // 2. Reconhecimento via AI
    const bookData = await this.aiService.recognizeBook(imageUrl);
    
    // 3. Buscar metadata adicional
    const metadata = await this.fetchBookMetadata(bookData.isbn);
    
    // 4. Salvar no Firestore
    const book = { ...bookData, ...metadata };
    await this.firestore.saveBook(book);
    
    return book;
  }
}
```

### **Data Layer**

#### **Firebase Integration:**
```typescript
// Configuração Firebase
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Inicialização
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
```

---

## 📊 **Estado da Aplicação (State Management)**

### **Arquitetura de Estado**
```
Global State (React Context + useReducer)
├── AuthContext                 # Estado de autenticação
│   ├── user: User | null      # Usuário atual
│   ├── isAuthenticated: bool   # Status de autenticação
│   ├── isLoading: boolean     # Carregamento
│   └── error: string | null   # Erros
│
├── BookContext                # Estado dos livros
│   ├── books: Book[]          # Lista de livros
│   ├── currentBook: Book      # Livro atual
│   ├── scanHistory: Scan[]    # Histórico de scans
│   └── isScanning: boolean    # Status de escaneamento
│
├── ARContext                  # Estado AR
│   ├── isARActive: boolean    # AR ativo
│   ├── arContent: ARContent   # Conteúdo AR atual
│   ├── camera: CameraState    # Estado da câmera
│   └── tracking: boolean      # Tracking ativo
│
└── QuizContext               # Estado de quiz
    ├── currentQuiz: Quiz      # Quiz atual
    ├── answers: Answer[]      # Respostas
    ├── score: number          # Pontuação
    └── isCompleted: boolean   # Quiz completo
```

### **Exemplo de Context Implementation:**
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        isLoading: false 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        error: action.payload, 
        isLoading: false 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false 
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const user = await authService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };
  
  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🔐 **Segurança e Autenticação**

### **Firebase Authentication Flow**
```
1. User Registration/Login
   ↓
2. Firebase Auth validates credentials
   ↓
3. Firebase returns user token
   ↓
4. Token stored securely (AsyncStorage)
   ↓
5. Token used for API requests
   ↓
6. Firebase Security Rules validate requests
```

### **Security Rules (Firestore)**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Books are readable by authenticated users
    match /books/{bookId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Quiz results are private to user
    match /quizResults/{resultId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 📱 **AR (Realidade Aumentada) Architecture**

### **AR Pipeline**
```
Camera Input
    ↓
QR Code Detection (expo-barcode-scanner)
    ↓
Book Recognition & Validation
    ↓
AR Content Generation (expo-three + expo-gl)
    ↓
3D Model Rendering
    ↓
Interactive AR Experience
```

### **AR Components Stack**
```typescript
// AR Service Architecture
interface ARService {
  // Camera management
  camera: CameraService;
  
  // QR detection
  qrScanner: QRScannerService;
  
  // 3D rendering
  threeRenderer: ThreeRendererService;
  
  // Content management
  contentManager: ARContentService;
  
  // Interaction handling
  interactionManager: ARInteractionService;
}

// Example AR workflow
export const useARExperience = (bookId: string) => {
  const [isARActive, setIsARActive] = useState(false);
  const [arContent, setARContent] = useState<ARContent | null>(null);
  
  const startAR = async () => {
    // 1. Initialize camera
    await cameraService.initialize();
    
    // 2. Start QR scanning
    qrScanner.startScanning(bookId);
    
    // 3. Load AR content
    const content = await arContentService.getContent(bookId);
    setARContent(content);
    
    // 4. Start rendering
    threeRenderer.startRendering(content);
    setIsARActive(true);
  };
  
  return { isARActive, arContent, startAR };
};
```

---

## 🎨 **Design System & Theming**

### **Design Tokens**
```css
:root {
  /* Colors */
  --color-primary-50: #f0f9ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
  
  /* Typography */
  --font-family-primary: "Inter", system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  
  /* AR specific */
  --color-ar-overlay: #059669;
  --color-ar-interaction: #7c3aed;
  
  /* Accessibility */
  --color-accessibility-focus: #ff6b35;
  --color-accessibility-highlight: #ffd23f;
}
```

### **Theme Implementation**
```typescript
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  accessibility: {
    focusColor: string;
    highlightColor: string;
    contrastRatio: number;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  // ... rest of theme
};
```

---

## 🔄 **Data Flow & Communication**

### **Unidirectional Data Flow**
```
User Interaction
    ↓
Action Dispatch (useReducer)
    ↓
State Update
    ↓
Component Re-render
    ↓
Service Call (if needed)
    ↓
Firebase API
    ↓
Response Processing
    ↓
State Update
    ↓
UI Update
```

### **Inter-Component Communication**
```typescript
// Event-driven communication via Context
interface AppEvents {
  bookScanned: (book: Book) => void;
  quizCompleted: (result: QuizResult) => void;
  achievementUnlocked: (achievement: Achievement) => void;
  arContentLoaded: (content: ARContent) => void;
}

export const useAppEvents = () => {
  const { dispatch } = useContext(AppContext);
  
  const emitEvent = (event: keyof AppEvents, payload: any) => {
    dispatch({ type: `EVENT_${event.toUpperCase()}`, payload });
  };
  
  return { emitEvent };
};
```

---

## 📊 **Performance Architecture**

### **Optimization Strategies**

#### **Code Splitting**
```typescript
// Lazy loading screens
const BookScanner = lazy(() => import('@/screens/BookDiscovery/BookScanner'));
const ARExperience = lazy(() => import('@/screens/ARReading/ARCameraView'));
const QuizInterface = lazy(() => import('@/screens/AILearning/AdaptiveQuiz'));

// Component-level splitting
const ARViewer = lazy(() => import('@/components/foundation/ARViewer'));
```

#### **Memory Management**
```typescript
// Cleanup in useEffect
useEffect(() => {
  const subscription = cameraService.subscribe(handleCameraData);
  
  return () => {
    subscription.unsubscribe();
    cameraService.cleanup();
  };
}, []);

// Memoization for expensive calculations
const processedData = useMemo(() => {
  return expensiveDataProcessing(rawData);
}, [rawData]);
```

#### **Offline-First Architecture**
```typescript
// Service Worker for offline support
interface OfflineService {
  cacheStrategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  
  async getData(key: string): Promise<any> {
    try {
      // Try network first
      const networkData = await networkService.getData(key);
      await cacheService.set(key, networkData);
      return networkData;
    } catch {
      // Fallback to cache
      return await cacheService.get(key);
    }
  }
}
```

---

## 🧪 **Testing Architecture**

### **Testing Strategy**
```
Unit Tests (Jest + React Native Testing Library)
├── Components testing
├── Services testing
├── Hooks testing
└── Utils testing

Integration Tests
├── Screen flow testing
├── Navigation testing
├── Firebase integration testing
└── AR functionality testing

E2E Tests (Detox)
├── Complete user journeys
├── Cross-platform testing
└── Performance testing
```

### **Test Structure Example**
```typescript
// Component test
describe('BookCard', () => {
  it('renders book information correctly', () => {
    const mockBook = { title: 'Test Book', author: 'Test Author' };
    const { getByText } = render(<BookCard book={mockBook} />);
    
    expect(getByText('Test Book')).toBeTruthy();
    expect(getByText('Test Author')).toBeTruthy();
  });
  
  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <BookCard book={mockBook} onPress={mockOnPress} />
    );
    
    fireEvent.press(getByTestId('book-card'));
    expect(mockOnPress).toHaveBeenCalledWith(mockBook);
  });
});
```

---

## 📈 **Monitoring & Analytics**

### **Performance Monitoring**
- **Firebase Performance**: Monitor app performance
- **Firebase Crashlytics**: Crash reporting
- **Custom Metrics**: User engagement, feature usage
- **Error Boundaries**: React error handling

### **Analytics Implementation**
```typescript
// Analytics service
interface AnalyticsService {
  trackEvent(event: string, parameters?: Record<string, any>): void;
  trackScreen(screenName: string): void;
  trackUserProperty(property: string, value: string): void;
  trackTiming(category: string, variable: string, time: number): void;
}

// Usage example
export const useAnalytics = () => {
  const trackBookScan = (bookId: string, success: boolean) => {
    analytics.trackEvent('book_scan', {
      book_id: bookId,
      success,
      timestamp: Date.now(),
    });
  };
  
  return { trackBookScan };
};
```

---

## 🚀 **Deployment Architecture**

### **Build Pipeline**
```
Development → Staging → Production

Development:
- Local development with Expo Go
- Hot reloading enabled
- Debug mode active

Staging:
- Development builds for testing
- QA environment
- Feature flags enabled

Production:
- Optimized builds
- Production Firebase project
- Analytics enabled
- Error monitoring active
```

### **Release Process**
1. **Development Build**: `expo build:android --type apk`
2. **Testing**: Internal testing with Expo
3. **Staging Build**: Production-like environment testing
4. **Production Build**: `expo build:android --type app-bundle`
5. **Store Submission**: Google Play Store / Apple App Store

---

**Esta arquitetura é projetada para ser escalável, maintível e seguir as melhores práticas de desenvolvimento mobile. A documentação é atualizada conforme a evolução do projeto.**

**Última atualização: Dezembro 2024**

