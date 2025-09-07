/**
 * Button Component Types
 * 
 * TypeScript type definitions for the Button component.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

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
  style?: import('react-native').ViewStyle;
  textStyle?: import('react-native').TextStyle;
}

export interface ButtonStyleProps {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  loading: boolean;
}
