/**
 * Home Screen for AR Book Explorer
 * 
 * Screen 3.1: Home Screen - Main navigation and book discovery
 * Following AlLibrary coding rules for accessibility-first design and universal access.
 * 
 * Elements from screens.md:
 * - "Scan Book" prominent button
 * - Recently read books carousel
 * - Recommended books based on AI analysis
 * - Reading challenges and goals
 * - Quick access to AR features
 * - Social activity feed
 * 
 * Business Rules Implemented:
 * - BR-NAV-001: Screen transition logic
 * - BR-DATAFLOW-001: Screen data sharing
 * - BR-ANALYTICS-001: Learning analytics
 * - BR-PROGRESS-001: Learning progress calculation
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../src/components/foundation';
import { useAuth } from '../../src/stores/auth/AuthContext';
import { useEnhancedUser } from '../../src/stores/user/EnhancedUserContext';
import { useBook } from '../../src/stores/book/BookContext';

export default function HomeScreen() {
  const router = useRouter();
  const { state: authState } = useAuth();
  const { state: userState } = useEnhancedUser();
  const { state: bookState } = useBook();

  const handleScanBook = () => {
    router.push('/books/scanner');
  };

  const handleViewRecentBooks = () => {
    router.push('/books/details');
  };

  const handleStartQuiz = () => {
    router.push('/learning/quiz');
  };

  const handleViewAchievements = () => {
    router.push('/gamification/achievement');
  };

  const handleViewProgress = () => {
    router.push('/gamification/progress');
  };

  const handleARExperience = () => {
    router.push('/ar/camera');
  };

  const handleLearningPath = () => {
    router.push('/learning/path');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome back, {authState.user?.name || 'Explorer'}!
        </Text>
        <Text style={styles.subtitle}>
          Ready to discover your next learning adventure?
        </Text>
      </View>

      <View style={styles.content}>
        {/* Primary Action - Scan Book */}
        <Card
          title="Start Learning"
          subtitle="Transform any book into an interactive experience"
          variant="elevated"
          size="large"
          style={styles.primaryActionCard}
        >
          <Button
            title="📱 Scan a Book"
            onPress={handleScanBook}
            variant="primary"
            size="large"
            style={styles.primaryActionButton}
          />
          <Text style={styles.primaryActionDescription}>
            Point your camera at any book's QR code or ISBN to unlock AR content and personalized quizzes.
          </Text>
        </Card>

        {/* Learning Statistics */}
        <Card
          title="Your Learning Journey"
          subtitle="Track your progress and achievements"
          variant="outlined"
          size="medium"
          style={styles.statsCard}
        >
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userState.statistics?.booksRead || 0}</Text>
              <Text style={styles.statLabel}>Books Read</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userState.statistics?.readingStreak || 0}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userState.statistics?.totalReadingTime || 0}</Text>
              <Text style={styles.statLabel}>Hours Read</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userState.statistics?.averageScore || 0}%</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
          </View>
        </Card>

        {/* Recently Read Books */}
        <Card
          title="Recently Read Books"
          subtitle="Continue your reading journey"
          variant="outlined"
          size="medium"
          style={styles.recentBooksCard}
        >
          {bookState.recentBooks?.length > 0 ? (
            <View style={styles.recentBooksList}>
              {bookState.recentBooks.slice(0, 3).map((book, index) => (
                <View key={index} style={styles.recentBookItem}>
                  <Image
                    source={{ uri: book.coverImage || 'https://via.placeholder.com/60' }}
                    style={styles.bookCover}
                  />
                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.bookAuthor}>{book.author}</Text>
                    <Text style={styles.bookProgress}>
                      {book.progress || 0}% complete
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noBooksText}>
              No books read yet. Start by scanning your first book!
            </Text>
          )}
          
          <Button
            title="View All Books"
            onPress={handleViewRecentBooks}
            variant="outline"
            size="medium"
            style={styles.viewBooksButton}
          />
        </Card>

        {/* AI-Powered Recommendations */}
        <Card
          title="Recommended for You"
          subtitle="Based on your learning style and interests"
          variant="outlined"
          size="medium"
          style={styles.recommendationsCard}
        >
          <View style={styles.recommendationsList}>
            {userState.recommendations?.length > 0 ? (
              userState.recommendations.slice(0, 4).map((recommendation, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
                  <Text style={styles.recommendationReason}>{recommendation.reason}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noRecommendationsText}>
                Complete your learning assessment to get personalized recommendations!
              </Text>
            )}
          </View>
        </Card>

        {/* Quick Actions */}
        <Card
          title="Quick Actions"
          subtitle="Access your learning tools"
          variant="outlined"
          size="medium"
          style={styles.quickActionsCard}
        >
          <View style={styles.quickActionsGrid}>
            <Button
              title="🧠 Take Quiz"
              onPress={handleStartQuiz}
              variant="secondary"
              size="medium"
              style={styles.quickActionButton}
            />
            <Button
              title="🎯 AR Experience"
              onPress={handleARExperience}
              variant="secondary"
              size="medium"
              style={styles.quickActionButton}
            />
            <Button
              title="📈 Learning Path"
              onPress={handleLearningPath}
              variant="secondary"
              size="medium"
              style={styles.quickActionButton}
            />
            <Button
              title="🏆 Achievements"
              onPress={handleViewAchievements}
              variant="secondary"
              size="medium"
              style={styles.quickActionButton}
            />
          </View>
        </Card>

        {/* Reading Challenges */}
        <Card
          title="Reading Challenges"
          subtitle="Complete challenges to earn rewards"
          variant="outlined"
          size="medium"
          style={styles.challengesCard}
        >
          <View style={styles.challengesList}>
            <View style={styles.challengeItem}>
              <Text style={styles.challengeTitle}>📚 Read 5 Books This Month</Text>
              <Text style={styles.challengeProgress}>
                {userState.statistics?.booksReadThisMonth || 0}/5 books
              </Text>
            </View>
            <View style={styles.challengeItem}>
              <Text style={styles.challengeTitle}>🔥 30-Day Reading Streak</Text>
              <Text style={styles.challengeProgress}>
                {userState.statistics?.readingStreak || 0}/30 days
              </Text>
            </View>
            <View style={styles.challengeItem}>
              <Text style={styles.challengeTitle}>🎯 Perfect Quiz Score</Text>
              <Text style={styles.challengeProgress}>
                {userState.statistics?.perfectScores || 0}/10 quizzes
              </Text>
            </View>
          </View>
          
          <Button
            title="View All Challenges"
            onPress={handleViewProgress}
            variant="outline"
            size="medium"
            style={styles.viewChallengesButton}
          />
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 22,
  },
  content: {
    padding: 24,
    gap: 20,
  },
  primaryActionCard: {
    marginBottom: 8,
    backgroundColor: '#3b82f6',
  },
  primaryActionButton: {
    marginBottom: 12,
  },
  primaryActionDescription: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsCard: {
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  recentBooksCard: {
    marginBottom: 8,
  },
  recentBooksList: {
    marginBottom: 16,
  },
  recentBookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
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
    marginBottom: 4,
  },
  bookProgress: {
    fontSize: 12,
    color: '#3b82f6',
  },
  noBooksText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  viewBooksButton: {
    marginTop: 8,
  },
  recommendationsCard: {
    marginBottom: 8,
  },
  recommendationsList: {
    marginBottom: 16,
  },
  recommendationItem: {
    marginBottom: 12,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  recommendationReason: {
    fontSize: 14,
    color: '#64748b',
  },
  noRecommendationsText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  quickActionsCard: {
    marginBottom: 8,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionButton: {
    width: '48%',
  },
  challengesCard: {
    marginBottom: 8,
  },
  challengesList: {
    marginBottom: 16,
  },
  challengeItem: {
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  challengeProgress: {
    fontSize: 14,
    color: '#64748b',
  },
  viewChallengesButton: {
    marginTop: 8,
  },
});
