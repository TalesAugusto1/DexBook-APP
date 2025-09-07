/**
 * Modal Component Types
 * 
 * TypeScript type definitions for the Modal component.
 */

import { ViewStyle, TextStyle } from 'react-native';

export type ModalVariant = 'default' | 'fullscreen' | 'bottomSheet' | 'center';
export type ModalSize = 'small' | 'medium' | 'large' | 'full';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  variant?: ModalVariant;
  size?: ModalSize;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  closeOnBackButton?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  contentStyle?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export interface ModalStyleProps {
  variant: ModalVariant;
  size: ModalSize;
  visible: boolean;
}
