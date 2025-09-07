/**
 * Loading Component for AR Book Explorer
 * 
 * A reusable loading component following AlLibrary coding rules for accessibility-first design.
 * Supports multiple variants, sizes, and accessibility features.
 */

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

// Loading variant types
export type LoadingVariant = 'spinner' | 'dots' | 'pulse' | 'skeleton';
export type LoadingSize = 'small' | 'medium' | 'large';

// Loading props interface
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

export const Loading: React.FC<LoadingProps> = ({
  variant = 'spinner',
  size = 'medium',
  color = '#2563eb',
  text,
  overlay = false,
  style,
  textStyle,
  testID,
  accessibilityLabel,
}) => {
  // Get loading styles based on variant and size
  const containerStyles = [
    styles.container,
    overlay && styles.overlay,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text--${size}`],
    textStyle,
  ];

  // Render different loading variants
  const renderLoadingContent = () => {
    switch (variant) {
      case 'spinner':
        return (
          <ActivityIndicator
            size={size === 'small' ? 'small' : size === 'large' ? 'large' : 'small'}
            color={color}
            style={styles.spinner}
          />
        );

      case 'dots':
        return (
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  styles[`dot--${size}`],
                  { backgroundColor: color },
                ]}
              />
            ))}
          </View>
        );

      case 'pulse':
        return (
          <View
            style={[
              styles.pulse,
              styles[`pulse--${size}`],
              { backgroundColor: color },
            ]}
          />
        );

      case 'skeleton':
        return (
          <View style={styles.skeletonContainer}>
            <View style={[styles.skeletonLine, styles[`skeletonLine--${size}`]]} />
            <View style={[styles.skeletonLine, styles[`skeletonLine--${size}`], { width: '75%' }]} />
            <View style={[styles.skeletonLine, styles[`skeletonLine--${size}`], { width: '50%' }]} />
          </View>
        );

      default:
        return (
          <ActivityIndicator
            size="small"
            color={color}
            style={styles.spinner}
          />
        );
    }
  };

  return (
    <View
      style={containerStyles}
      accessibilityLabel={accessibilityLabel || text || 'Loading'}
      accessibilityRole="progressbar"
      testID={testID}
    >
      {renderLoadingContent()}
      
      {text && (
        <Text style={textStyles}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Container styles
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  // Overlay styles
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1000,
  },

  // Spinner styles
  spinner: {
    marginBottom: 8,
  },

  // Dots animation styles
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  dot: {
    borderRadius: 50,
    marginHorizontal: 4,
  },

  'dot--small': {
    width: 6,
    height: 6,
  },
  'dot--medium': {
    width: 8,
    height: 8,
  },
  'dot--large': {
    width: 10,
    height: 10,
  },

  // Pulse animation styles
  pulse: {
    borderRadius: 50,
    marginBottom: 8,
  },

  'pulse--small': {
    width: 20,
    height: 20,
  },
  'pulse--medium': {
    width: 30,
    height: 30,
  },
  'pulse--large': {
    width: 40,
    height: 40,
  },

  // Skeleton styles
  skeletonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  skeletonLine: {
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 8,
  },

  'skeletonLine--small': {
    height: 12,
    width: '100%',
  },
  'skeletonLine--medium': {
    height: 16,
    width: '100%',
  },
  'skeletonLine--large': {
    height: 20,
    width: '100%',
  },

  // Text styles
  text: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },

  // Text sizes
  'text--small': {
    fontSize: 12,
  },
  'text--medium': {
    fontSize: 14,
  },
  'text--large': {
    fontSize: 16,
  },
});

export default Loading;
