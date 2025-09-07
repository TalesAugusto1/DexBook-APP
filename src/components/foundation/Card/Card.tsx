/**
 * Card Component for AR Book Explorer
 * 
 * A reusable card component following AlLibrary coding rules for accessibility-first design.
 * Supports multiple variants, sizes, and interactive states.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Pressable,
} from 'react-native';

// Card variant types
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardSize = 'small' | 'medium' | 'large';

// Card props interface
export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: CardVariant;
  size?: CardSize;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  contentStyle?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  size = 'medium',
  onPress,
  disabled = false,
  style,
  titleStyle,
  subtitleStyle,
  contentStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
}) => {
  // Determine if card is interactive
  const isInteractive = !!onPress && !disabled;

  // Get card styles based on variant and size
  const cardStyles = [
    styles.card,
    styles[`card--${variant}`],
    styles[`card--${size}`],
    disabled && styles.cardDisabled,
    style,
  ];

  const titleStyles = [
    styles.title,
    styles[`title--${size}`],
    disabled && styles.titleDisabled,
    titleStyle,
  ];

  const subtitleStyles = [
    styles.subtitle,
    styles[`subtitle--${size}`],
    disabled && styles.subtitleDisabled,
    subtitleStyle,
  ];

  const contentStyles = [
    styles.content,
    styles[`content--${size}`],
    contentStyle,
  ];

  // Render interactive card
  if (isInteractive) {
    return (
      <Pressable
        style={({ pressed }) => [
          ...cardStyles,
          pressed && styles.cardPressed,
        ]}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityHint={accessibilityHint}
        accessibilityState={{
          disabled,
        }}
        testID={testID}
      >
        {/* Header */}
        {(title || subtitle) && (
          <View style={styles.header}>
            {title && <Text style={titleStyles}>{title}</Text>}
            {subtitle && <Text style={subtitleStyles}>{subtitle}</Text>}
          </View>
        )}

        {/* Content */}
        <View style={contentStyles}>
          {children}
        </View>
      </Pressable>
    );
  }

  // Render static card
  return (
    <View
      style={cardStyles}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      {/* Header */}
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={titleStyles}>{title}</Text>}
          {subtitle && <Text style={subtitleStyles}>{subtitle}</Text>}
        </View>
      )}

      {/* Content */}
      <View style={contentStyles}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Base card styles
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },

  // Card variants
  'card--default': {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  'card--elevated': {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  'card--outlined': {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  'card--filled': {
    backgroundColor: '#f8fafc',
    borderWidth: 0,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  // Card sizes
  'card--small': {
    padding: 12,
  },
  'card--medium': {
    padding: 16,
  },
  'card--large': {
    padding: 20,
  },

  // Card states
  cardDisabled: {
    opacity: 0.6,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  // Header styles
  header: {
    marginBottom: 12,
  },

  // Title styles
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },

  // Title sizes
  'title--small': {
    fontSize: 16,
  },
  'title--medium': {
    fontSize: 18,
  },
  'title--large': {
    fontSize: 20,
  },

  // Title states
  titleDisabled: {
    color: '#94a3b8',
  },

  // Subtitle styles
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '400',
  },

  // Subtitle sizes
  'subtitle--small': {
    fontSize: 12,
  },
  'subtitle--medium': {
    fontSize: 14,
  },
  'subtitle--large': {
    fontSize: 16,
  },

  // Subtitle states
  subtitleDisabled: {
    color: '#94a3b8',
  },

  // Content styles
  content: {
    flex: 1,
  },

  // Content sizes
  'content--small': {
    // Small content padding handled by card padding
  },
  'content--medium': {
    // Medium content padding handled by card padding
  },
  'content--large': {
    // Large content padding handled by card padding
  },
});

export default Card;
