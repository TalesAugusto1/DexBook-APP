/**
 * Input Component for AR Book Explorer
 * 
 * A reusable input component following AlLibrary coding rules for accessibility-first design.
 * Supports multiple types, validation, and accessibility features.
 */

import React, { useState, useRef } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';

// Input variant types
export type InputVariant = 'default' | 'outline' | 'filled' | 'underline';
export type InputSize = 'small' | 'medium' | 'large';

// Input props interface
export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  variant?: InputVariant;
  size?: InputSize;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  helperStyle?: TextStyle;
  testID?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  variant = 'default',
  size = 'medium',
  error,
  helperText,
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  helperStyle,
  testID,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Handle focus events
  const handleFocus = (e: any) => {
    setIsFocused(true);
    textInputProps.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    textInputProps.onBlur?.(e);
  };

  // Get input styles based on variant, size, and state
  const containerStyles = [
    styles.container,
    styles[`container--${variant}`],
    styles[`container--${size}`],
    isFocused && styles.containerFocused,
    error && styles.containerError,
    disabled && styles.containerDisabled,
    containerStyle,
  ];

  const inputStyles = [
    styles.input,
    styles[`input--${variant}`],
    styles[`input--${size}`],
    leftIcon && styles.inputWithLeftIcon,
    rightIcon && styles.inputWithRightIcon,
    disabled && styles.inputDisabled,
    inputStyle,
  ];

  const labelStyles = [
    styles.label,
    styles[`label--${size}`],
    error && styles.labelError,
    disabled && styles.labelDisabled,
    labelStyle,
  ];

  return (
    <View style={containerStyles} testID={testID}>
      {/* Label */}
      {label && (
        <Text style={labelStyles}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {/* Input Container */}
      <View style={styles.inputContainer}>
        {/* Left Icon */}
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}

        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={inputStyles}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={label || placeholder}
          accessibilityHint={helperText}
          accessibilityState={{
            disabled,
            invalid: !!error,
          }}
          {...textInputProps}
        />

        {/* Right Icon */}
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            accessibilityRole="button"
            accessibilityLabel="Input action"
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text style={[styles.errorText, errorStyle]}>
          {error}
        </Text>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <Text style={[styles.helperText, helperStyle]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Container styles
  container: {
    marginBottom: 16,
  },

  // Container variants
  'container--default': {
    backgroundColor: 'transparent',
  },
  'container--outline': {
    backgroundColor: 'transparent',
  },
  'container--filled': {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
  },
  'container--underline': {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },

  // Container sizes
  'container--small': {
    marginBottom: 12,
  },
  'container--medium': {
    marginBottom: 16,
  },
  'container--large': {
    marginBottom: 20,
  },

  // Container states
  containerFocused: {
    // Focus styles handled by input
  },
  containerError: {
    // Error styles handled by input
  },
  containerDisabled: {
    opacity: 0.6,
  },

  // Input container
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },

  // Input styles
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },

  // Input variants
  'input--default': {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },
  'input--outline': {
    backgroundColor: 'transparent',
    borderColor: '#2563eb',
    borderWidth: 2,
  },
  'input--filled': {
    backgroundColor: '#f8fafc',
    borderColor: 'transparent',
  },
  'input--underline': {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderRadius: 0,
    paddingHorizontal: 0,
  },

  // Input sizes
  'input--small': {
    fontSize: 14,
    paddingVertical: 8,
    minHeight: 36,
  },
  'input--medium': {
    fontSize: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  'input--large': {
    fontSize: 18,
    paddingVertical: 16,
    minHeight: 52,
  },

  // Input with icons
  inputWithLeftIcon: {
    paddingLeft: 40,
  },
  inputWithRightIcon: {
    paddingRight: 40,
  },

  // Input states
  inputDisabled: {
    backgroundColor: '#f1f5f9',
    color: '#94a3b8',
  },

  // Label styles
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },

  // Label sizes
  'label--small': {
    fontSize: 12,
  },
  'label--medium': {
    fontSize: 14,
  },
  'label--large': {
    fontSize: 16,
  },

  // Label states
  labelError: {
    color: '#ef4444',
  },
  labelDisabled: {
    color: '#94a3b8',
  },

  // Required asterisk
  required: {
    color: '#ef4444',
  },

  // Icon containers
  leftIconContainer: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
    padding: 4,
  },

  // Error text
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },

  // Helper text
  helperText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
});

export default Input;
