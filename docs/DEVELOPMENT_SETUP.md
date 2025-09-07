# AR Book Explorer - Documentação do Ambiente de Desenvolvimento

## 📋 **Visão Geral**

O AR Book Explorer é uma aplicação educacional em React Native + Expo que utiliza Realidade Aumentada para aprimorar a experiência de leitura. Esta documentação detalha como configurar e manter o ambiente de desenvolvimento.

---

## 🛠️ **Pré-requisitos do Sistema**

### **Sistema Operacional**
- ✅ **Windows 10/11** (Ambiente principal testado)
- ✅ **macOS 10.15+** (Para desenvolvimento iOS)
- ✅ **Linux Ubuntu 18.04+** (Suporte limitado)

### **Softwares Necessários**

#### **Node.js & npm**
```bash
# Versão recomendada
Node.js: 18.17.0 ou superior
npm: 9.0.0 ou superior

# Verificar versão instalada
node --version
npm --version
```

#### **Expo CLI**
```bash
# Instalação global
npm install -g @expo/cli

# Verificar instalação
expo --version
```

#### **Git**
```bash
# Verificar instalação
git --version
```

#### **Editores Recomendados**
- **VSCode** (Principal) - com extensões:
  - React Native Tools
  - TypeScript and JavaScript Language Features
  - Prettier - Code formatter
  - ESLint
  - Expo Tools
- **Android Studio** (Para emulador Android)
- **Xcode** (Para simulador iOS - somente macOS)

---

## 📦 **Configuração Inicial do Projeto**

### **1. Clone do Repositório**
```bash
# Clone o projeto
git clone <repository-url>
cd ARBookExplorer
```

### **2. Instalação de Dependências**
```bash
# Instalar todas as dependências
npm install

# Verificar se não há vulnerabilidades
npm audit
```

### **3. Configuração de Variáveis de Ambiente**
```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar variáveis necessárias
# - Firebase configuration
# - API keys
# - Environment settings
```

### **4. Configuração do Firebase**
```bash
# Verificar se google-services.json está presente
ls google-services.json

# Se não estiver, baixar do Firebase Console:
# 1. Acesse https://console.firebase.google.com
# 2. Selecione o projeto AR Book Explorer
# 3. Baixe google-services.json
# 4. Coloque na raiz do projeto
```

---

## 🏗️ **Arquitetura do Projeto**

### **Estrutura de Diretórios**
```
ARBookExplorer/
├── app/                          # Expo Router - File-based routing
│   ├── _layout.tsx              # Root layout
│   ├── (tabs)/                  # Tab navigation group
│   ├── auth/                    # Authentication screens
│   ├── books/                   # Book management screens
│   ├── ar/                      # AR experience screens
│   ├── learning/                # Learning and quiz screens
│   ├── gamification/            # Achievements and rewards
│   └── settings/                # App settings screens
│
├── src/                         # Source code
│   ├── components/              # React components
│   │   ├── foundation/          # Basic UI components
│   │   ├── domain/              # Business-specific components
│   │   ├── composite/           # Complex feature components
│   │   └── layout/              # Layout components
│   ├── screens/                 # Legacy screen components (being migrated)
│   ├── services/                # Business logic and API services
│   ├── stores/                  # State management (Context API + useReducer)
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   ├── styles/                  # Global styles and themes
│   ├── i18n/                    # Internationalization
│   ├── navigation/              # Navigation configuration
│   ├── assets/                  # Static assets
│   ├── constants/               # Application constants
│   └── config/                  # Configuration files
│
├── assets/                      # Expo assets
├── progress/                    # Project progress documentation
├── docs/                        # Additional documentation
└── scripts/                     # Utility scripts
```

### **Tecnologias Principais**

#### **Frontend Framework**
- **React Native**: 0.79.5
- **Expo**: ~53.0.22
- **Expo Router**: ~5.1.5 (File-based routing)
- **TypeScript**: ~5.8.3 (Strict mode enabled)

#### **Backend & Cloud**
- **Firebase Auth**: ^23.3.0
- **Firebase Firestore**: ^23.3.0
- **Firebase Storage**: ^23.3.0
- **Firebase Functions**: ^23.3.0
- **Firebase Analytics**: ^23.3.0

#### **AR & Camera**
- **expo-camera**: ^16.1.11
- **expo-barcode-scanner**: ^13.0.1
- **expo-three**: ^8.0.0
- **expo-gl**: ^15.1.7

#### **State Management**
- **React Context API** + **useReducer**
- **@reduxjs/toolkit**: ^2.9.0 (Legacy, being migrated)
- **redux-persist**: ^6.0.0

#### **UI Libraries**
- **react-native-paper**: ^5.14.5
- **react-native-elements**: ^3.4.3
- **react-native-vector-icons**: ^10.3.0
- **@expo/vector-icons**: ^14.1.0

#### **Development Tools**
- **ESLint**: ^9.25.0
- **Prettier**: (via expo config)
- **TypeScript**: Strict mode com 98% coverage

---

## 🚀 **Scripts de Desenvolvimento**

### **Scripts Principais**
```bash
# Iniciar servidor de desenvolvimento
npm start
# ou
expo start

# Iniciar no Android emulator
npm run android
# ou
expo start --android

# Iniciar no iOS simulator (somente macOS)
npm run ios
# ou
expo start --ios

# Iniciar versão web
npm run web
# ou
expo start --web

# Linting do código
npm run lint
# ou
expo lint

# Reset do projeto (limpa cache e reinstala)
npm run reset-project
```

### **Scripts de Úteis**
```bash
# Limpar cache do Expo
expo start --clear

# Verificar dependências
npm outdated

# Atualizar dependências (cuidado!)
npm update

# Verificar problemas de segurança
npm audit

# Corrigir problemas automáticos de segurança
npm audit fix
```

---

## 📱 **Configuração de Emuladores/Simuladores**

### **Android Emulator**
```bash
# 1. Instalar Android Studio
# 2. Configurar AVD (Android Virtual Device)
# 3. Iniciar emulador
# 4. Executar: npm run android
```

**Configuração Recomendada do AVD:**
- **Device**: Pixel 7 Pro
- **API Level**: 34 (Android 14)
- **RAM**: 4GB
- **Storage**: 8GB

### **iOS Simulator (somente macOS)**
```bash
# 1. Instalar Xcode
# 2. Instalar Command Line Tools
# 3. Executar: npm run ios
```

**Dispositivos Recomendados:**
- **iPhone 15 Pro** (Desenvolvimento principal)
- **iPad Pro 12.9"** (Teste de tablet)

---

## 🔧 **Configuração do Editor (VSCode)**

### **Extensões Recomendadas**
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-react-native.vscode-react-native",
    "expo.vscode-expo-tools",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-json"
  ]
}
```

### **Configurações do VSCode**
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "typescript": "typescriptreact",
    "javascript": "javascriptreact"
  },
  "files.associations": {
    "*.tsx": "typescriptreact"
  }
}
```

---

## 🔒 **Configuração de Segurança**

### **Variáveis de Ambiente**
```bash
# .env (não versionado)
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Configurações de desenvolvimento
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_API_URL=https://api-dev.arbookexplorer.com
```

### **Firebase Security Rules**
- Configure regras de segurança apropriadas
- Use autenticação para operações sensíveis
- Implemente validação no backend

---

## 📊 **Qualidade de Código**

### **TypeScript Configuration**
- **Strict Mode**: Habilitado
- **Coverage Target**: >95%
- **Current Coverage**: 98%

### **ESLint Rules**
```json
{
  "extends": [
    "expo",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### **Prettier Configuration**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## 🧪 **Debugging e Desenvolvimento**

### **React Native Debugger**
```bash
# Instalar React Native Debugger
# Download: https://github.com/jhen0409/react-native-debugger/releases

# Usar com Expo
# 1. Iniciar React Native Debugger
# 2. No app, pressionar Cmd+D (iOS) ou Cmd+M (Android)
# 3. Selecionar "Debug with Chrome"
```

### **Flipper (Alternativa)**
```bash
# Instalar Flipper
# Download: https://fbflipper.com/

# Configurar plugins para React Native
```

### **Console Logs**
```typescript
// Para debugging no desenvolvimento
console.log('Debug info:', data);

// Para produção, use um logger apropriado
import { logger } from '@/utils/logger';
logger.info('Production log', data);
```

---

## 🚨 **Problemas Comuns e Soluções**

### **1. Erro de Módulo Não Encontrado**
```bash
# Limpar cache
rm -rf node_modules
npm install
expo start --clear
```

### **2. Erro de Build Android**
```bash
# Limpar build Android
cd android
./gradlew clean
cd ..
expo start --clear
```

### **3. Erro de Metro Bundler**
```bash
# Reset do Metro cache
expo start --clear
# ou
npx react-native start --reset-cache
```

### **4. Problemas de TypeScript**
```bash
# Verificar configuração
tsc --noEmit
# ou
npx expo install --check
```

### **5. Problemas de Firebase**
```bash
# Verificar se google-services.json está presente
# Verificar se as variáveis de ambiente estão corretas
# Verificar se o projeto Firebase está ativo
```

---

## 📈 **Performance e Otimização**

### **Targets de Performance**
- **Load Time**: < 2 segundos
- **Memory Usage**: < 100MB
- **Search Response**: < 500ms
- **Component Render**: < 100ms

### **Ferramentas de Monitoring**
- **Firebase Performance Monitoring**
- **Firebase Crashlytics**
- **React Native Performance Monitor**

### **Otimizações Implementadas**
- **Lazy Loading**: Componentes e telas
- **Code Splitting**: Por features
- **Image Optimization**: Expo Image com caching
- **State Optimization**: useCallback, useMemo

---

## 📋 **Checklist de Setup**

### **Configuração Inicial**
- [ ] Node.js 18.17.0+ instalado
- [ ] Expo CLI instalado globalmente
- [ ] Git configurado
- [ ] VSCode com extensões instaladas
- [ ] Projeto clonado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` configurado
- [ ] `google-services.json` presente

### **Teste de Funcionamento**
- [ ] `npm start` executa sem erros
- [ ] App abre no navegador web
- [ ] Android emulator conecta (se disponível)
- [ ] iOS simulator conecta (se disponível)
- [ ] TypeScript compila sem erros (`tsc --noEmit`)
- [ ] ESLint passa (`npm run lint`)
- [ ] Firebase conecta (verificar console)

### **Configuração Avançada**
- [ ] React Native Debugger configurado
- [ ] Performance monitoring ativo
- [ ] Crashlytics configurado
- [ ] Accessibility testing configurado

---

## 🆘 **Suporte e Documentação**

### **Documentação Oficial**
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### **Recursos do Projeto**
- **Project Progress**: `progress/Project_Progress.md`
- **Current Task**: `progress/Current_Task.md`
- **Recent History**: `progress/Recent_History.md`
- **Implementation Guide**: `docs/`

### **Contato**
- **Team Lead**: [Nome do responsável]
- **Technical Support**: [Canal de suporte]
- **Issue Tracking**: [Sistema de issues]

---

## 🔄 **Atualizações e Manutenção**

### **Schedule de Atualizações**
- **Dependencies**: Quinzenal
- **Expo SDK**: A cada major release
- **Firebase**: Conforme necessário
- **TypeScript**: A cada minor release

### **Processo de Update**
1. **Backup**: Criar branch de backup
2. **Update**: Atualizar dependências
3. **Test**: Testar funcionalidades críticas
4. **Deploy**: Aplicar em ambiente de desenvolvimento
5. **Validate**: Validar todas as funcionalidades
6. **Document**: Atualizar documentação

---

**Esta documentação é mantida atualizada pela equipe de desenvolvimento. Última atualização: Dezembro 2024**
