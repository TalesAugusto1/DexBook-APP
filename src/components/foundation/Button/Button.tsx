/**
 * Button Component for AR Book Explorer
 * 
 * A reusable button component following AlLibrary coding rules for accessibility-first design.
 * Supports multiple variants, sizes, and accessibility features.
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  AccessibilityInfo,
} from 'react-native';

// Button variant types
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

// Button props interface
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
  style,
  textStyle,
}) => {
  // Determine if button is interactive
  const isInteractive = !disabled && !loading;

  // Handle press with accessibility feedback
  const handlePress = () => {
    if (isInteractive) {
      // Provide haptic feedback for accessibility
      AccessibilityInfo.announceForAccessibility('Button pressed');
      onPress();
    }
  };

  // Get button styles based on variant and size
  const buttonStyles = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    disabled && styles.buttonDisabled,
    loading && styles.buttonLoading,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text--${variant}`],
    styles[`text--${size}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={!isInteractive}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled: !isInteractive,
        busy: loading,
      }}
      testID={testID}
      activeOpacity={isInteractive ? 0.7 : 1}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? '#2563eb' : '#ffffff'}
          style={styles.loader}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base button styles
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'transparent',
  },

  // Size variants
  'button--small': {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  'button--medium': {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  'button--large': {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 52,
  },

  // Color variants
  'button--primary': {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  'button--secondary': {
    backgroundColor: '#64748b',
    borderColor: '#64748b',
  },
  'button--danger': {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  'button--success': {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  'button--outline': {
    backgroundColor: 'transparent',
    borderColor: '#2563eb',
  },

  // Disabled state
  buttonDisabled: {
    backgroundColor: '#e2e8f0',
    borderColor: '#e2e8f0',
    opacity: 0.6,
  },

  // Loading state
  buttonLoading: {
    opacity: 0.8,
  },

  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },

  // Text size variants
  'text--small': {
    fontSize: 14,
  },
  'text--medium': {
    fontSize: 16,
  },
  'text--large': {
    fontSize: 18,
  },

  // Text color variants
  'text--primary': {
    color: '#ffffff',
  },
  'text--secondary': {
    color: '#ffffff',
  },
  'text--danger': {
    color: '#ffffff',
  },
  'text--success': {
    color: '#ffffff',
  },
  'text--outline': {
    color: '#2563eb',
  },

  // Disabled text
  textDisabled: {
    color: '#94a3b8',
  },

  // Loader styles
  loader: {
    marginRight: 8,
  },
});

export default Button;
