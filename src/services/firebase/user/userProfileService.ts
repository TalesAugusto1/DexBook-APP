/**
 * User Profile Service for AR Book Explorer
 * 
 * Handles user profile CRUD operations with Firebase Firestore.
 * Following AlLibrary coding rules for security-first architecture and data persistence.
 */

import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  DocumentSnapshot,
  QuerySnapshot
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  StorageReference 
} from 'firebase/storage';
import { firestore, storage } from '../../../config/firebase.config';
import { 
  UserProfile, 
  LearningProfile, 
  AccessibilitySettings, 
  PrivacySettings, 
  NotificationPreferences,
  UserStatistics 
} from '../../../stores/user/types';

/**
 * User Profile Service Error
 */
export class UserProfileServiceError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'UserProfileServiceError';
  }
}

/**
 * User Profile Service
 * Manages user profile data in Firebase
 */
export class UserProfileService {
  private readonly COLLECTIONS = {
    USERS: 'users',
    LEARNING_PROFILES: 'learning_profiles',
    ACCESSIBILITY_SETTINGS: 'accessibility_settings',
    PRIVACY_SETTINGS: 'privacy_settings',
    NOTIFICATION_PREFERENCES: 'notification_preferences',
    USER_STATISTICS: 'user_statistics',
    PROFILE_PICTURES: 'profile_pictures',
  };

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(firestore, this.COLLECTIONS.USERS, userId));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
        } as UserProfile;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new UserProfileServiceError('Failed to fetch user profile', 'FETCH_ERROR');
    }
  }

  /**
   * Create user profile
   */
  async createUserProfile(profile: UserProfile): Promise<void> {
    try {
      await setDoc(doc(firestore, this.COLLECTIONS.USERS, profile.id), {
        ...profile,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new UserProfileServiceError('Failed to create user profile', 'CREATE_ERROR');
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      await updateDoc(doc(firestore, this.COLLECTIONS.USERS, userId), {
        ...updates,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new UserProfileServiceError('Failed to update user profile', 'UPDATE_ERROR');
    }
  }

  /**
   * Delete user profile
   */
  async deleteUserProfile(userId: string): Promise<void> {
    try {
      // Delete all related documents
      await Promise.all([
        deleteDoc(doc(firestore, this.COLLECTIONS.USERS, userId)),
        deleteDoc(doc(firestore, this.COLLECTIONS.LEARNING_PROFILES, userId)),
        deleteDoc(doc(firestore, this.COLLECTIONS.ACCESSIBILITY_SETTINGS, userId)),
        deleteDoc(doc(firestore, this.COLLECTIONS.PRIVACY_SETTINGS, userId)),
        deleteDoc(doc(firestore, this.COLLECTIONS.NOTIFICATION_PREFERENCES, userId)),
        deleteDoc(doc(firestore, this.COLLECTIONS.USER_STATISTICS, userId)),
      ]);

      // Delete profile picture if exists
      try {
        const profilePicRef = ref(storage, `${this.COLLECTIONS.PROFILE_PICTURES}/${userId}`);
        await deleteObject(profilePicRef);
      } catch (error) {
        // Profile picture might not exist, continue with deletion
        console.log('No profile picture to delete or error deleting:', error);
      }
    } catch (error) {
      console.error('Error deleting user profile:', error);
      throw new UserProfileServiceError('Failed to delete user profile', 'DELETE_ERROR');
    }
  }

  /**
   * Upload profile picture
   */
  async uploadProfilePicture(userId: string, imageBlob: Blob): Promise<string> {
    try {
      const profilePicRef = ref(storage, `${this.COLLECTIONS.PROFILE_PICTURES}/${userId}`);
      
      // Upload the image
      await uploadBytes(profilePicRef, imageBlob);
      
      // Get download URL
      const downloadURL = await getDownloadURL(profilePicRef);
      
      // Update user profile with new avatar URL
      await this.updateUserProfile(userId, { avatar: downloadURL });
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw new UserProfileServiceError('Failed to upload profile picture', 'UPLOAD_ERROR');
    }
  }

  /**
   * Get learning profile
   */
  async getLearningProfile(userId: string): Promise<LearningProfile | null> {
    try {
      const learningDoc = await getDoc(doc(firestore, this.COLLECTIONS.LEARNING_PROFILES, userId));
      
      if (learningDoc.exists()) {
        const data = learningDoc.data();
        return {
          ...data,
          assessmentDate: data.assessmentDate?.toDate() || new Date(),
          lastReassessment: data.lastReassessment?.toDate(),
          assessmentHistory: data.assessmentHistory?.map((item: any) => ({
            ...item,
            date: item.date?.toDate() || new Date(),
          })) || [],
        } as LearningProfile;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching learning profile:', error);
      throw new UserProfileServiceError('Failed to fetch learning profile', 'FETCH_ERROR');
    }
  }

  /**
   * Save learning profile
   */
  async saveLearningProfile(profile: LearningProfile): Promise<void> {
    try {
      await setDoc(doc(firestore, this.COLLECTIONS.LEARNING_PROFILES, profile.userId), {
        ...profile,
        assessmentDate: serverTimestamp(),
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving learning profile:', error);
      throw new UserProfileServiceError('Failed to save learning profile', 'SAVE_ERROR');
    }
  }

  /**
   * Update learning profile
   */
  async updateLearningProfile(userId: string, updates: Partial<LearningProfile>): Promise<void> {
    try {
      await updateDoc(doc(firestore, this.COLLECTIONS.LEARNING_PROFILES, userId), {
        ...updates,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating learning profile:', error);
      throw new UserProfileServiceError('Failed to update learning profile', 'UPDATE_ERROR');
    }
  }

  /**
   * Get accessibility settings
   */
  async getAccessibilitySettings(userId: string): Promise<AccessibilitySettings | null> {
    try {
      const settingsDoc = await getDoc(doc(firestore, this.COLLECTIONS.ACCESSIBILITY_SETTINGS, userId));
      
      if (settingsDoc.exists()) {
        const data = settingsDoc.data();
        return {
          ...data,
          lastUpdated: data.lastUpdated?.toDate() || new Date(),
        } as AccessibilitySettings;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching accessibility settings:', error);
      throw new UserProfileServiceError('Failed to fetch accessibility settings', 'FETCH_ERROR');
    }
  }

  /**
   * Save accessibility settings
   */
  async saveAccessibilitySettings(settings: AccessibilitySettings): Promise<void> {
    try {
      await setDoc(doc(firestore, this.COLLECTIONS.ACCESSIBILITY_SETTINGS, settings.userId), {
        ...settings,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
      throw new UserProfileServiceError('Failed to save accessibility settings', 'SAVE_ERROR');
    }
  }

  /**
   * Update accessibility settings
   */
  async updateAccessibilitySettings(userId: string, updates: Partial<AccessibilitySettings>): Promise<void> {
    try {
      await updateDoc(doc(firestore, this.COLLECTIONS.ACCESSIBILITY_SETTINGS, userId), {
        ...updates,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating accessibility settings:', error);
      throw new UserProfileServiceError('Failed to update accessibility settings', 'UPDATE_ERROR');
    }
  }

  /**
   * Get privacy settings
   */
  async getPrivacySettings(userId: string): Promise<PrivacySettings | null> {
    try {
      const settingsDoc = await getDoc(doc(firestore, this.COLLECTIONS.PRIVACY_SETTINGS, userId));
      
      if (settingsDoc.exists()) {
        const data = settingsDoc.data();
        return {
          ...data,
          lastUpdated: data.lastUpdated?.toDate() || new Date(),
          accountDeletionDate: data.accountDeletionDate?.toDate(),
        } as PrivacySettings;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching privacy settings:', error);
      throw new UserProfileServiceError('Failed to fetch privacy settings', 'FETCH_ERROR');
    }
  }

  /**
   * Save privacy settings
   */
  async savePrivacySettings(settings: PrivacySettings): Promise<void> {
    try {
      await setDoc(doc(firestore, this.COLLECTIONS.PRIVACY_SETTINGS, settings.userId), {
        ...settings,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving privacy settings:', error);
      throw new UserProfileServiceError('Failed to save privacy settings', 'SAVE_ERROR');
    }
  }

  /**
   * Update privacy settings
   */
  async updatePrivacySettings(userId: string, updates: Partial<PrivacySettings>): Promise<void> {
    try {
      await updateDoc(doc(firestore, this.COLLECTIONS.PRIVACY_SETTINGS, userId), {
        ...updates,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      throw new UserProfileServiceError('Failed to update privacy settings', 'UPDATE_ERROR');
    }
  }

  /**
   * Get notification preferences
   */
  async getNotificationPreferences(userId: string): Promise<NotificationPreferences | null> {
    try {
      const prefsDoc = await getDoc(doc(firestore, this.COLLECTIONS.NOTIFICATION_PREFERENCES, userId));
      
      if (prefsDoc.exists()) {
        const data = prefsDoc.data();
        return {
          ...data,
          lastUpdated: data.lastUpdated?.toDate() || new Date(),
        } as NotificationPreferences;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      throw new UserProfileServiceError('Failed to fetch notification preferences', 'FETCH_ERROR');
    }
  }

  /**
   * Save notification preferences
   */
  async saveNotificationPreferences(preferences: NotificationPreferences): Promise<void> {
    try {
      await setDoc(doc(firestore, this.COLLECTIONS.NOTIFICATION_PREFERENCES, preferences.userId), {
        ...preferences,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      throw new UserProfileServiceError('Failed to save notification preferences', 'SAVE_ERROR');
    }
  }

  /**
   * Update notification preferences
   */
  async updateNotificationPreferences(userId: string, updates: Partial<NotificationPreferences>): Promise<void> {
    try {
      await updateDoc(doc(firestore, this.COLLECTIONS.NOTIFICATION_PREFERENCES, userId), {
        ...updates,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw new UserProfileServiceError('Failed to update notification preferences', 'UPDATE_ERROR');
    }
  }

  /**
   * Get user statistics
   */
  async getUserStatistics(userId: string): Promise<UserStatistics | null> {
    try {
      const statsDoc = await getDoc(doc(firestore, this.COLLECTIONS.USER_STATISTICS, userId));
      
      if (statsDoc.exists()) {
        const data = statsDoc.data();
        return {
          ...data,
          lastActiveDate: data.lastActiveDate?.toDate() || new Date(),
          lastCalculated: data.lastCalculated?.toDate() || new Date(),
        } as UserStatistics;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user statistics:', error);
      throw new UserProfileServiceError('Failed to fetch user statistics', 'FETCH_ERROR');
    }
  }

  /**
   * Save user statistics
   */
  async saveUserStatistics(statistics: UserStatistics): Promise<void> {
    try {
      await setDoc(doc(firestore, this.COLLECTIONS.USER_STATISTICS, statistics.userId), {
        ...statistics,
        lastCalculated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving user statistics:', error);
      throw new UserProfileServiceError('Failed to save user statistics', 'SAVE_ERROR');
    }
  }

  /**
   * Update user statistics
   */
  async updateUserStatistics(userId: string, updates: Partial<UserStatistics>): Promise<void> {
    try {
      await updateDoc(doc(firestore, this.COLLECTIONS.USER_STATISTICS, userId), {
        ...updates,
        lastCalculated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating user statistics:', error);
      throw new UserProfileServiceError('Failed to update user statistics', 'UPDATE_ERROR');
    }
  }

  /**
   * Search users by username
   */
  async searchUsersByUsername(username: string, limit: number = 10): Promise<UserProfile[]> {
    try {
      const q = query(
        collection(firestore, this.COLLECTIONS.USERS),
        where('username', '>=', username),
        where('username', '<=', username + '\uf8ff')
      );
      
      const querySnapshot = await getDocs(q);
      const users: UserProfile[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
        } as UserProfile);
      });
      
      return users.slice(0, limit);
    } catch (error) {
      console.error('Error searching users:', error);
      throw new UserProfileServiceError('Failed to search users', 'SEARCH_ERROR');
    }
  }

  /**
   * Check if username is available
   */
  async isUsernameAvailable(username: string): Promise<boolean> {
    try {
      const q = query(
        collection(firestore, this.COLLECTIONS.USERS),
        where('username', '==', username)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty;
    } catch (error) {
      console.error('Error checking username availability:', error);
      throw new UserProfileServiceError('Failed to check username availability', 'CHECK_ERROR');
    }
  }

  /**
   * Get complete user data for export
   */
  async exportUserData(userId: string): Promise<any> {
    try {
      const [
        profile,
        learningProfile,
        accessibilitySettings,
        privacySettings,
        notificationPreferences,
        statistics
      ] = await Promise.all([
        this.getUserProfile(userId),
        this.getLearningProfile(userId),
        this.getAccessibilitySettings(userId),
        this.getPrivacySettings(userId),
        this.getNotificationPreferences(userId),
        this.getUserStatistics(userId),
      ]);

      return {
        profile,
        learningProfile,
        accessibilitySettings,
        privacySettings,
        notificationPreferences,
        statistics,
        exportDate: new Date(),
      };
    } catch (error) {
      console.error('Error exporting user data:', error);
      throw new UserProfileServiceError('Failed to export user data', 'EXPORT_ERROR');
    }
  }
}

// Export singleton instance
export const userProfileService = new UserProfileService();

