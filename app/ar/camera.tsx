/**
 * AR Camera View Screen for AR Book Explorer
 * 
 * AR camera experience using expo-router navigation.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Loading } from '../../src/components/foundation';

export default function ARCameraView() {
  const router = useRouter();
  const [isARActive, setIsARActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartAR = () => {
    setIsLoading(true);
    // Simulate AR initialization
    setTimeout(() => {
      setIsLoading(false);
      setIsARActive(true);
    }, 2000);
  };

  const handleStopAR = () => {
    setIsARActive(false);
  };

  const handleValidateBook = () => {
    router.push('/ar/validation');
  };

  const handleARInteraction = (interaction: string) => {
    Alert.alert('AR Interaction', `You interacted with: ${interaction}`);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Loading size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Initializing AR...</Text>
          <Text style={styles.loadingSubtext}>Setting up camera and AR features</Text>
        </View>
      </View>
    );
  }

  if (isARActive) {
    return (
      <View style={styles.container}>
        <View style={styles.arContainer}>
          <View style={styles.arViewport}>
            <Text style={styles.arPlaceholder}>📱 AR Camera View</Text>
            <Text style={styles.arSubtext}>Point camera at book pages for AR content</Text>
            
            <View style={styles.arOverlay}>
              <View style={styles.arElement}>
                <Text style={styles.arElementText}>🐉 Interactive Dragon</Text>
                <Button
                  title="Interact"
                  onPress={() => handleARInteraction('Dragon')}
                  variant="primary"
                  size="small"
                />
              </View>
              
              <View style={styles.arElement}>
                <Text style={styles.arElementText}>🏰 3D Castle</Text>
                <Button
                  title="Explore"
                  onPress={() => handleARInteraction('Castle')}
                  variant="secondary"
                  size="small"
                />
              </View>
            </View>
          </View>

          <View style={styles.arControls}>
            <Button
              title="📖 Validate Book"
              onPress={handleValidateBook}
              variant="primary"
              size="medium"
              style={styles.controlButton}
            />
            <Button
              title="❌ Stop AR"
              onPress={handleStopAR}
              variant="secondary"
              size="medium"
              style={styles.controlButton}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AR Camera</Text>
        <Text style={styles.subtitle}>
          Experience books like never before with augmented reality
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="🎯 AR Reading Experience"
          subtitle="Immersive storytelling"
          variant="elevated"
          size="large"
          style={styles.arCard}
        >
          <Text style={styles.description}>
            Point your camera at book pages to unlock:
            {'\n'}• Interactive 3D characters
            {'\n'}• Animated story elements
            {'\n'}• Sound effects and narration
            {'\n'}• Touch-based interactions
            {'\n'}• Educational overlays
          </Text>
          <Button
            title="🚀 Start AR Experience"
            onPress={handleStartAR}
            variant="primary"
            size="large"
            style={styles.startButton}
          />
        </Card>

        <Card
          title="📋 Instructions"
          subtitle="How to use AR features"
          variant="outlined"
          size="medium"
          style={styles.instructionsCard}
        >
          <View style={styles.instructions}>
            <Text style={styles.instructionItem}>1. 📱 Hold device steady</Text>
            <Text style={styles.instructionItem}>2. 📖 Point camera at book page</Text>
            <Text style={styles.instructionItem}>3. 🎯 Wait for AR content to appear</Text>
            <Text style={styles.instructionItem}>4. 👆 Tap to interact with elements</Text>
            <Text style={styles.instructionItem}>5. 🔄 Move camera to explore</Text>
          </View>
        </Card>

        <Card
          title="⚠️ Tips for Best Experience"
          subtitle="Optimize your AR session"
          variant="outlined"
          size="medium"
          style={styles.tipsCard}
        >
          <View style={styles.tips}>
            <Text style={styles.tipItem}>💡 Ensure good lighting</Text>
            <Text style={styles.tipItem}>📏 Keep 20-30cm distance</Text>
            <Text style={styles.tipItem}>🔇 Use headphones for audio</Text>
            <Text style={styles.tipItem}>📵 Avoid interruptions</Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="← Back"
            onPress={() => router.back()}
            variant="outline"
            size="medium"
            style={styles.backButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#1e293b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 20,
    backgroundColor: '#ffffff',
  },
  arCard: {
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  startButton: {
    width: '100%',
  },
  instructionsCard: {
    marginBottom: 8,
  },
  instructions: {
    gap: 8,
  },
  instructionItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  tipsCard: {
    marginBottom: 8,
  },
  tips: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 2,
  },
  actions: {
    alignItems: 'center',
  },
  backButton: {
    width: '60%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 24,
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  arContainer: {
    flex: 1,
  },
  arViewport: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    position: 'relative',
  },
  arPlaceholder: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 8,
  },
  arSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  arOverlay: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    gap: 20,
  },
  arElement: {
    backgroundColor: 'rgba(37, 99, 235, 0.8)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  arElementText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  arControls: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    gap: 12,
  },
  controlButton: {
    flex: 1,
  },
});
