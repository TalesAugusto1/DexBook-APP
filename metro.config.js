const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add path resolution for @ alias
config.resolver.alias = {
  '@': path.resolve(__dirname, '.'),
  '@/components': path.resolve(__dirname, 'components'),
  '@/screens': path.resolve(__dirname, 'src/screens'),
  '@/services': path.resolve(__dirname, 'src/services'),
  '@/stores': path.resolve(__dirname, 'src/stores'),
  '@/types': path.resolve(__dirname, 'src/types'),
  '@/hooks': path.resolve(__dirname, 'hooks'),
  '@/utils': path.resolve(__dirname, 'src/utils'),
  '@/styles': path.resolve(__dirname, 'src/styles'),
  '@/i18n': path.resolve(__dirname, 'src/i18n'),
  '@/navigation': path.resolve(__dirname, 'src/navigation'),
  '@/assets': path.resolve(__dirname, 'src/assets'),
  '@/constants': path.resolve(__dirname, 'constants'),
  '@/config': path.resolve(__dirname, 'src/config'),
};

module.exports = config;
