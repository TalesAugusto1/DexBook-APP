/**
 * Input Component Types
 * 
 * TypeScript type definitions for the Input component.
 */

import { TextInputProps, ViewStyle, TextStyle } from 'react-native';

export type InputVariant = 'default' | 'outline' | 'filled' | 'underline';
export type InputSize = 'small' | 'medium' | 'large';

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

export interface InputStyleProps {
  variant: InputVariant;
  size: InputSize;
  error: boolean;
  disabled: boolean;
  focused: boolean;
}
