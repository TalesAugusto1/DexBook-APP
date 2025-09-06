module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@/components': './components',
            '@/screens': './src/screens',
            '@/services': './src/services',
            '@/stores': './src/stores',
            '@/types': './src/types',
            '@/hooks': './hooks',
            '@/utils': './src/utils',
            '@/styles': './src/styles',
            '@/i18n': './src/i18n',
            '@/navigation': './src/navigation',
            '@/assets': './src/assets',
            '@/constants': './constants',
            '@/config': './src/config',
          },
        },
      ],
    ],
  };
};
