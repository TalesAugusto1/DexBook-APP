/**
 * LoadingScreen Component for AR Book Explorer
 * 
 * This screen displays loading states and progress indicators.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Loading, Card } from '../../../components/foundation';

export const LoadingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navigate to main screen after loading
          setTimeout(() => {
            navigation.navigate('MainTabs' as never);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Loading</Text>
        <Text style={styles.subtitle}>
          Preparing your learning experience
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Loading Progress"
          subtitle="Setting up your environment"
          variant="elevated"
          size="large"
          style={styles.loadingCard}
        >
          <Loading
            variant="spinner"
            size="large"
            text={`Loading... ${progress}%`}
            style={styles.loadingContainer}
          />
        </Card>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {progress < 30 && "Initializing app..."}
            {progress >= 30 && progress < 60 && "Loading user data..."}
            {progress >= 60 && progress < 90 && "Preparing AR content..."}
            {progress >= 90 && "Almost ready!"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  loadingCard: {
    marginBottom: 30,
    alignItems: 'center',
    minHeight: 300,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default LoadingScreen;
