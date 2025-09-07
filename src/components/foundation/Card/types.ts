/**
 * Card Component Types
 * 
 * TypeScript type definitions for the Card component.
 */

import { ViewStyle, TextStyle } from 'react-native';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardSize = 'small' | 'medium' | 'large';

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

export interface CardStyleProps {
  variant: CardVariant;
  size: CardSize;
  disabled: boolean;
  pressed: boolean;
}
