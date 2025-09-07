/**
 * Loading Component Types
 * 
 * TypeScript type definitions for the Loading component.
 */

import { ViewStyle, TextStyle } from 'react-native';

export type LoadingVariant = 'spinner' | 'dots' | 'pulse' | 'skeleton';
export type LoadingSize = 'small' | 'medium' | 'large';

export interface LoadingProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  color?: string;
  text?: string;
  overlay?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export interface LoadingStyleProps {
  variant: LoadingVariant;
  size: LoadingSize;
  overlay: boolean;
}
