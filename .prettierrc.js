/**
 * Prettier Configuration for AR Book Explorer
 * 
 * This file contains Prettier formatting rules for consistent code style.
 * Following AlLibrary coding rules for code quality and consistency.
 */

module.exports = {
  // Basic formatting
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  
  // JSX formatting
  jsxSingleQuote: true,
  jsxBracketSameLine: false,
  
  // Arrow functions
  arrowParens: 'avoid',
  
  // End of line
  endOfLine: 'lf',
  
  // Bracket spacing
  bracketSpacing: true,
  bracketSameLine: false,
  
  // Quote props
  quoteProps: 'as-needed',
  
  // Prose wrap
  proseWrap: 'preserve',
  
  // HTML whitespace sensitivity
  htmlWhitespaceSensitivity: 'css',
  
  // Embedded language formatting
  embeddedLanguageFormatting: 'auto',
  
  // Override for specific file types
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.yml',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
