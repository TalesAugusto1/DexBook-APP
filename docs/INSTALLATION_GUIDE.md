# AR Book Explorer - Guia de Instalação

## 🚀 **Instalação Rápida (5 minutos)**

### **Pré-requisitos Mínimos**
- Node.js 18.17.0+
- npm 9.0.0+
- Git
- 8GB RAM disponível
- 10GB espaço em disco

### **Instalação Express**
```bash
# 1. Clone o repositório
git clone <repository-url>
cd ARBookExplorer

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp env.example .env
# Edite .env com suas configurações Firebase

# 4. Inicie o projeto
npm start
```

---

## 📋 **Instalação Detalhada**

### **Passo 1: Preparação do Sistema**

#### **Windows 10/11**
```powershell
# Instalar Node.js via chocolatey (recomendado)
choco install nodejs

# Ou baixar direto do site
# https://nodejs.org/en/download/

# Verificar instalação
node --version
npm --version
```

#### **macOS**
```bash
# Instalar Node.js via Homebrew (recomendado)
brew install node

# Ou usar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18.17.0
nvm use 18.17.0

# Verificar instalação
node --version
npm --version
```

#### **Linux (Ubuntu/Debian)**
```bash
# Adicionar repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Instalar Node.js
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

### **Passo 2: Instalar Ferramentas Globais**
```bash
# Expo CLI
npm install -g @expo/cli

# Verificar instalação
expo --version

# Opcional: React Native CLI (para projetos bare)
npm install -g @react-native-community/cli
```

### **Passo 3: Configurar Editores**

#### **VSCode (Recomendado)**
```bash
# Instalar VSCode
# Windows: https://code.visualstudio.com/
# macOS: brew install --cask visual-studio-code
# Linux: snap install code --classic

# Extensões essenciais (instalar via VSCode)
# - React Native Tools
# - TypeScript and JavaScript Language Features
# - Prettier - Code formatter
# - ESLint
# - Expo Tools
```

### **Passo 4: Configurar Emuladores (Opcional)**

#### **Android Studio**
```bash
# 1. Baixar Android Studio
# https://developer.android.com/studio

# 2. Instalar Android SDK
# 3. Criar AVD (Android Virtual Device)
# Device: Pixel 7 Pro
# API Level: 34 (Android 14)
# RAM: 4GB

# 4. Iniciar emulador
# Android Studio > AVD Manager > Start
```

#### **Xcode (somente macOS)**
```bash
# 1. Instalar Xcode via App Store
# 2. Instalar Command Line Tools
sudo xcode-select --install

# 3. Aceitar licença
sudo xcodebuild -license accept
```

---

## 🔧 **Configuração do Projeto**

### **Passo 1: Clone e Dependências**
```bash
# Clone do repositório
git clone <repository-url>
cd ARBookExplorer

# Verificar estrutura
ls -la

# Instalar dependências
npm install

# Verificar se não há vulnerabilidades críticas
npm audit --audit-level high
```

### **Passo 2: Configuração Firebase**
```bash
# 1. Criar projeto no Firebase Console
# https://console.firebase.google.com

# 2. Baixar google-services.json
# Project Settings > General > Your apps > Download

# 3. Colocar na raiz do projeto
cp ~/Downloads/google-services.json ./

# 4. Verificar se arquivo existe
ls google-services.json
```

### **Passo 3: Variáveis de Ambiente**
```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar variáveis (usar seu editor preferido)
code .env
# ou
nano .env
```

**Conteúdo do .env:**
```env
# Firebase Configuration
FIREBASE_API_KEY=AIzaSyA...
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef

# Development Settings
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_API_URL=https://api-dev.arbookexplorer.com
EXPO_PUBLIC_DEBUG=true
```

### **Passo 4: Primeira Execução**
```bash
# Iniciar servidor de desenvolvimento
npm start

# Deve abrir automaticamente no navegador
# Se não abrir: http://localhost:8081
```

---

## ✅ **Verificação da Instalação**

### **Checklist de Funcionamento**
```bash
# 1. Verificar compilação TypeScript
npx tsc --noEmit
# ✅ Deve executar sem erros

# 2. Verificar linting
npm run lint
# ✅ Deve passar sem erros críticos

# 3. Verificar início do projeto
npm start
# ✅ Deve iniciar servidor Expo

# 4. Verificar web
# Abrir http://localhost:8081 no navegador
# ✅ Deve carregar a splash screen

# 5. Verificar Android (se emulador disponível)
npm run android
# ✅ Deve abrir no emulador

# 6. Verificar iOS (se simulador disponível - macOS)
npm run ios
# ✅ Deve abrir no simulador
```

### **Testes de Funcionalidade**
1. **Navegação**: Testar transições entre telas
2. **Autenticação**: Testar fluxo de login/registro
3. **Firebase**: Verificar conexão no console
4. **Components**: Testar componentes foundation
5. **Performance**: Verificar tempos de carregamento

---

## 🚨 **Solução de Problemas Comuns**

### **Erro: "command not found: expo"**
```bash
# Reinstalar Expo CLI
npm uninstall -g @expo/cli
npm install -g @expo/cli

# Verificar PATH
echo $PATH
# Deve incluir pasta global do npm
```

### **Erro: "Module not found"**
```bash
# Limpar cache e reinstalar
rm -rf node_modules
rm package-lock.json
npm install

# Limpar cache Expo
expo start --clear
```

### **Erro: "Unable to resolve module"**
```bash
# Reset Metro bundler
npx expo start --clear

# Ou reset completo
npx expo install --check
```

### **Erro: Firebase connection**
```bash
# Verificar google-services.json
ls -la google-services.json

# Verificar .env
cat .env

# Verificar projeto Firebase ativo
# https://console.firebase.google.com
```

### **Erro: Android emulator não conecta**
```bash
# Verificar ADB
adb devices

# Restart ADB
adb kill-server
adb start-server

# Verificar emulador
adb shell getprop ro.build.version.release
```

### **Erro: iOS simulator não abre (macOS)**
```bash
# Verificar Xcode
xcode-select -p

# Reset simulador
xcrun simctl erase all

# Verificar simuladores disponíveis
xcrun simctl list devices
```

---

## 🔄 **Instalação em Diferentes Ambientes**

### **Desenvolvimento Local**
```bash
# Configuração padrão
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_DEBUG=true
```

### **Staging/Teste**
```bash
# Configuração de staging
EXPO_PUBLIC_ENV=staging
EXPO_PUBLIC_API_URL=https://api-staging.arbookexplorer.com
EXPO_PUBLIC_DEBUG=false
```

### **Produção**
```bash
# Configuração de produção
EXPO_PUBLIC_ENV=production
EXPO_PUBLIC_API_URL=https://api.arbookexplorer.com
EXPO_PUBLIC_DEBUG=false
```

---

## 📱 **Instalação em Dispositivos Físicos**

### **Android (Desenvolvimento)**
1. Habilitar "Desenvolvedor" no dispositivo
2. Habilitar "Depuração USB"
3. Conectar via USB
4. Executar `npm run android`

### **iOS (Desenvolvimento)**
1. Conectar dispositivo via USB
2. Confiar no computador
3. Executar `npm run ios`
4. Confirmar instalação no dispositivo

### **Expo Go (Teste Rápido)**
1. Instalar app Expo Go na loja
2. Executar `npm start`
3. Escanear QR code com câmera (iOS) ou Expo Go (Android)

---

## 📊 **Verificação de Performance**

### **Métricas de Instalação**
- **Tempo total**: ~10-15 minutos
- **Download size**: ~500MB (dependências)
- **Disk usage**: ~2GB (com emuladores)
- **Memory usage**: ~1GB (durante desenvolvimento)

### **Benchmarks Esperados**
- **Primeira compilação**: ~30-60 segundos
- **Hot reload**: ~1-3 segundos
- **Build web**: ~15-30 segundos
- **Build mobile**: ~2-5 minutos

---

## 📋 **Próximos Passos**

Após instalação bem-sucedida:

1. **Ler documentação**: `docs/DEVELOPMENT_SETUP.md`
2. **Verificar progresso**: `progress/Project_Progress.md`
3. **Configurar IDE**: Instalar extensões recomendadas
4. **Executar testes**: Verificar todas as funcionalidades
5. **Começar desenvolvimento**: Seguir current task

---

## 🆘 **Suporte**

### **Recursos Úteis**
- **Expo Documentation**: https://docs.expo.dev/
- **React Native Troubleshooting**: https://reactnative.dev/docs/troubleshooting
- **Firebase Setup**: https://firebase.google.com/docs/web/setup
- **Project Issues**: [Link para sistema de issues]

### **Comandos de Debug**
```bash
# Informações do sistema
npx expo doctor

# Verificar configuração
npx expo config

# Logs detalhados
npx expo start --verbose

# Informações de build
npx expo install --check
```

---

**Documentação atualizada: Dezembro 2024**
**Versão do projeto: 1.0.0**
**Status: Sprint 2 - Authentication & User Management**
