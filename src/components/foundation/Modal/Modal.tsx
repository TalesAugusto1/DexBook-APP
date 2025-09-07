/**
 * Modal Component for AR Book Explorer
 * 
 * A reusable modal component following AlLibrary coding rules for accessibility-first design.
 * Supports multiple variants, animations, and accessibility features.
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Modal as RNModal,
  TouchableOpacity,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

// Modal variant types
export type ModalVariant = 'default' | 'fullscreen' | 'bottomSheet' | 'center';
export type ModalSize = 'small' | 'medium' | 'large' | 'full';

// Modal props interface
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

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  variant = 'default',
  size = 'medium',
  children,
  showCloseButton = true,
  closeOnBackdropPress = true,
  closeOnBackButton = true,
  style,
  titleStyle,
  subtitleStyle,
  contentStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim, slideAnim]);

  // Handle backdrop press
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  // Get modal styles based on variant and size
  const modalStyles = [
    styles.modal,
    styles[`modal--${variant}`],
    styles[`modal--${size}`],
    style,
  ];

  const titleStyles = [
    styles.title,
    styles[`title--${size}`],
    titleStyle,
  ];

  const subtitleStyles = [
    styles.subtitle,
    styles[`subtitle--${size}`],
    subtitleStyle,
  ];

  const contentStyles = [
    styles.content,
    styles[`content--${size}`],
    contentStyle,
  ];

  // Render modal content based on variant
  const renderModalContent = () => {
    const modalContent = (
      <View style={modalStyles}>
        {/* Header */}
        {(title || subtitle || showCloseButton) && (
          <View style={styles.header}>
            <View style={styles.headerContent}>
              {title && <Text style={titleStyles}>{title}</Text>}
              {subtitle && <Text style={subtitleStyles}>{subtitle}</Text>}
            </View>
            {showCloseButton && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close modal"
                accessibilityHint="Double tap to close"
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Content */}
        <View style={contentStyles}>
          {children}
        </View>
      </View>
    );

    // Apply animations based on variant
    switch (variant) {
      case 'bottomSheet':
        return (
          <Animated.View
            style={[
              styles.bottomSheetContainer,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {modalContent}
          </Animated.View>
        );

      case 'fullscreen':
        return modalContent;

      default:
        return (
          <Animated.View
            style={[
              styles.centerContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {modalContent}
          </Animated.View>
        );
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeOnBackButton ? onClose : undefined}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleBackdropPress}
          accessibilityRole="button"
          accessibilityLabel="Close modal"
        />

        {/* Modal Content */}
        {renderModalContent()}
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Backdrop styles
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  // Modal variants
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    maxWidth: '90%',
    maxHeight: '90%',
  },

  'modal--default': {
    borderRadius: 12,
  },
  'modal--fullscreen': {
    width: screenWidth,
    height: screenHeight,
    borderRadius: 0,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  'modal--bottomSheet': {
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    maxWidth: '100%',
    maxHeight: '80%',
  },
  'modal--center': {
    borderRadius: 12,
  },

  // Modal sizes
  'modal--small': {
    width: screenWidth * 0.8,
    minHeight: 200,
  },
  'modal--medium': {
    width: screenWidth * 0.9,
    minHeight: 300,
  },
  'modal--large': {
    width: screenWidth * 0.95,
    minHeight: 400,
  },
  'modal--full': {
    width: screenWidth,
    height: screenHeight,
  },

  // Container variants
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },

  headerContent: {
    flex: 1,
  },

  // Title styles
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },

  // Title sizes
  'title--small': {
    fontSize: 18,
  },
  'title--medium': {
    fontSize: 20,
  },
  'title--large': {
    fontSize: 24,
  },
  'title--full': {
    fontSize: 28,
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
  'subtitle--full': {
    fontSize: 18,
  },

  // Close button styles
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonText: {
    fontSize: 20,
    color: '#64748b',
    fontWeight: '600',
  },

  // Content styles
  content: {
    padding: 20,
  },

  // Content sizes
  'content--small': {
    padding: 16,
  },
  'content--medium': {
    padding: 20,
  },
  'content--large': {
    padding: 24,
  },
  'content--full': {
    padding: 32,
  },
});

export default Modal;
