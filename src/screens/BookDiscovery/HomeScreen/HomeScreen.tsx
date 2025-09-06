/**
 * HomeScreen Component for AR Book Explorer
 * 
 * This is the main dashboard screen showing user's reading progress and available features.
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../../config/firebase.config';

interface HomeScreenProps {
  // No props needed for home screen
}

interface ReadingStats {
  booksCompleted: number;
  currentStreak: number;
  totalReadingTime: number;
  achievementsUnlocked: number;
}

interface RecentBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  progress: number;
  lastRead: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<ReadingStats>({
    booksCompleted: 0,
    currentStreak: 0,
    totalReadingTime: 0,
    achievementsUnlocked: 0,
  });
  const [recentBooks, setRecentBooks] = useState<RecentBook[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        loadUserData();
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserData = async () => {
    // This would load user data from Firestore
    // For now, we'll use mock data
    setStats({
      booksCompleted: 12,
      currentStreak: 7,
      totalReadingTime: 24,
      achievementsUnlocked: 8,
    });

    setRecentBooks([
      {
        id: '1',
        title: 'The Magic School Bus',
        author: 'Joanna Cole',
        coverImage: 'https://via.placeholder.com/150x200/2563eb/ffffff?text=Book+1',
        progress: 75,
        lastRead: '2 hours ago',
      },
      {
        id: '2',
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        coverImage: 'https://via.placeholder.com/150x200/10b981/ffffff?text=Book+2',
        progress: 100,
        lastRead: '1 day ago',
      },
    ]);
  };

  const handleScanBook = () => {
    router.push('/book-scanner');
  };

  const handleViewProfile = () => {
    router.push('/profile-dashboard');
  };

  const handleViewAchievements = () => {
    router.push('/achievements');
  };

  const handleContinueReading = (bookId: string) => {
    router.push(`/book-details/${bookId}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>
            Hello, {user?.displayName || 'Reader'}! 👋
          </Text>
          <Text style={styles.subtitle}>Ready for your next adventure?</Text>
        </View>
        
        <TouchableOpacity style={styles.profileButton} onPress={handleViewProfile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user?.displayName || 'R').charAt(0).toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Your Reading Journey</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.booksCompleted}</Text>
            <Text style={styles.statLabel}>Books Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalReadingTime}h</Text>
            <Text style={styles.statLabel}>Total Reading</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.achievementsUnlocked}</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.primaryAction} onPress={handleScanBook}>
          <Text style={styles.primaryActionIcon}>📚</Text>
          <View style={styles.primaryActionContent}>
            <Text style={styles.primaryActionTitle}>Scan New Book</Text>
            <Text style={styles.primaryActionSubtitle}>Start reading with AR</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.secondaryAction} onPress={handleViewAchievements}>
            <Text style={styles.secondaryActionIcon}>🏆</Text>
            <Text style={styles.secondaryActionText}>Achievements</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryAction} onPress={() => router.push('/quiz')}>
            <Text style={styles.secondaryActionIcon}>🧠</Text>
            <Text style={styles.secondaryActionText}>Take Quiz</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryAction} onPress={() => router.push('/settings')}>
            <Text style={styles.secondaryActionIcon}>⚙️</Text>
            <Text style={styles.secondaryActionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recentBooksContainer}>
        <Text style={styles.sectionTitle}>Continue Reading</Text>
        {recentBooks.length > 0 ? (
          recentBooks.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookCard}
              onPress={() => handleContinueReading(book.id)}
            >
              <Image source={{ uri: book.coverImage }} style={styles.bookCover} />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${book.progress}%` }]} />
                  </View>
                  <Text style={styles.progressText}>{book.progress}% complete</Text>
                </View>
                <Text style={styles.lastRead}>Last read: {book.lastRead}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📖</Text>
            <Text style={styles.emptyStateTitle}>No books yet</Text>
            <Text style={styles.emptyStateSubtitle}>
              Scan your first book to start your reading journey!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  profileButton: {
    marginLeft: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 32,
  },
  primaryAction: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  primaryActionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  primaryActionContent: {
    flex: 1,
  },
  primaryActionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  primaryActionSubtitle: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  secondaryActionText: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
    textAlign: 'center',
  },
  recentBooksContainer: {
    marginBottom: 32,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bookCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
  },
  lastRead: {
    fontSize: 12,
    color: '#94a3b8',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HomeScreen;
