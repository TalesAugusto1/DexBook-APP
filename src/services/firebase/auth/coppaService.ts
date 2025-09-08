/**
 * COPPA Compliance Service for AR Book Explorer
 * 
 * Handles Children's Online Privacy Protection Act (COPPA) compliance for users under 13.
 * Following AlLibrary coding rules for privacy-first design and legal compliance.
 */

import { doc, setDoc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import { firestore } from '../../../config/firebase.config';
import { COPPARegistrationCredentials, COPPAStatus, AuthServiceError } from './authTypes';
import { User } from '../../../types/user';

/**
 * COPPA compliance data interface
 */
export interface COPPAComplianceData {
  userId: string;
  isMinor: boolean;
  parentEmail: string;
  parentName: string;
  parentPhoneNumber?: string;
  consentGiven: boolean;
  consentDate?: Date;
  consentIP?: string;
  parentVerified: boolean;
  verificationMethod: 'email' | 'phone' | 'manual';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Parent consent request interface
 */
export interface ParentConsentRequest {
  userId: string;
  childName: string;
  childEmail: string;
  childAge: number;
  parentEmail: string;
  parentName: string;
  parentPhoneNumber?: string;
  requestDate: Date;
  consentToken: string;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  ipAddress?: string;
}

/**
 * COPPA Compliance Service
 * Manages COPPA compliance requirements and parent consent workflows
 */
export class COPPAService {
  private readonly CONSENT_TOKEN_EXPIRY_DAYS = 30;

  /**
   * Check if user requires COPPA compliance
   */
  checkCOPPARequirement(age: number): COPPAStatus {
    const isMinor = age < 13;
    
    return {
      isMinor,
      parentConsentRequired: isMinor,
      parentConsentGiven: false, // Will be checked separately
    };
  }

  /**
   * Register user with COPPA compliance
   */
  async registerWithCOPPA(
    credentials: COPPARegistrationCredentials,
    userId: string
  ): Promise<User> {
    try {
      // Validate COPPA credentials
      this.validateCOPPACredentials(credentials);

      // Create parent consent request
      const consentRequest = await this.createParentConsentRequest(credentials, userId);

      // Send consent email to parent
      await this.sendParentConsentEmail(consentRequest);

      // Create user profile with COPPA flags
      const userProfile: User = {
        id: userId,
        email: credentials.email,
        name: credentials.name,
        age: credentials.age,
        grade: credentials.grade,
        avatar: null,
        preferences: {
          learningStyle: 'visual',
          accessibilityLevel: 1,
          notifications: false, // Disabled by default for COPPA users
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Store COPPA compliance data
      const coppaData: COPPAComplianceData = {
        userId,
        isMinor: true,
        parentEmail: credentials.parentEmail,
        parentName: credentials.parentName,
        ...(credentials.parentPhoneNumber && { parentPhoneNumber: credentials.parentPhoneNumber }),
        consentGiven: false, // Pending parent approval
        parentVerified: false,
        verificationMethod: 'email',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await this.storeCOPPAData(coppaData);

      return userProfile;
    } catch (error) {
      throw new AuthServiceError(
        `COPPA registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'COPPA_COMPLIANCE_REQUIRED'
      );
    }
  }

  /**
   * Process parent consent response
   */
  async processParentConsent(
    consentToken: string,
    approved: boolean,
    ipAddress?: string
  ): Promise<boolean> {
    try {
      // Get consent request by token
      const consentRequest = await this.getConsentRequestByToken(consentToken);
      
      if (!consentRequest) {
        throw new AuthServiceError('Invalid consent token', 'UNKNOWN_ERROR');
      }

      // Check if token is expired
      if (this.isConsentTokenExpired(consentRequest.requestDate)) {
        throw new AuthServiceError('Consent token has expired', 'UNKNOWN_ERROR');
      }

      // Update consent request status
      await this.updateConsentRequest(consentRequest.userId, {
        status: approved ? 'approved' : 'denied',
        ...(ipAddress && { ipAddress }),
      });

      if (approved) {
        // Update COPPA compliance data
        await this.updateCOPPAData(consentRequest.userId, {
          consentGiven: true,
          consentDate: new Date(),
          ...(ipAddress && { consentIP: ipAddress }),
          parentVerified: true,
          updatedAt: new Date(),
        });

        // Enable the user account
        await this.enableUserAccount(consentRequest.userId);
      } else {
        // Handle consent denial
        await this.handleConsentDenial(consentRequest.userId);
      }

      return approved;
    } catch (error) {
      console.error('Error processing parent consent:', error);
      throw new AuthServiceError('Failed to process parent consent', 'UNKNOWN_ERROR');
    }
  }

  /**
   * Get COPPA status for user
   */
  async getCOPPAStatus(userId: string): Promise<COPPAStatus | null> {
    try {
      const coppaDoc = await getDoc(doc(firestore, 'coppa_compliance', userId));
      
      if (!coppaDoc.exists()) {
        return null;
      }

      const data = coppaDoc.data() as COPPAComplianceData;
      
      return {
        isMinor: data.isMinor,
        parentConsentRequired: data.isMinor,
        parentConsentGiven: data.consentGiven,
        parentEmail: data.parentEmail,
        ...(data.consentDate && { consentDate: data.consentDate }),
      };
    } catch (error) {
      console.error('Error fetching COPPA status:', error);
      return null;
    }
  }

  /**
   * Request parent consent for existing user
   */
  async requestParentConsent(userId: string, parentEmail: string): Promise<void> {
    try {
      // Get user profile
      const userDoc = await getDoc(doc(firestore, 'users', userId));
      
      if (!userDoc.exists()) {
        throw new AuthServiceError('User not found', 'USER_NOT_FOUND');
      }

      const user = userDoc.data() as User;

      // Create consent request
      const credentials: COPPARegistrationCredentials = {
        email: user.email,
        password: '', // Not needed for consent request
        confirmPassword: '',
        name: user.name,
        age: user.age,
        grade: user.grade,
        parentEmail,
        parentName: '', // To be filled by parent
        consentGiven: false,
      };

      const consentRequest = await this.createParentConsentRequest(credentials, userId);
      await this.sendParentConsentEmail(consentRequest);
    } catch (error) {
      throw new AuthServiceError(
        `Failed to request parent consent: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'UNKNOWN_ERROR'
      );
    }
  }

  /**
   * Validate COPPA credentials
   */
  private validateCOPPACredentials(credentials: COPPARegistrationCredentials): void {
    if (!credentials.parentEmail || credentials.parentEmail.trim() === '') {
      throw new Error('Parent email is required');
    }

    if (credentials.age >= 13) {
      throw new Error('COPPA compliance is only required for users under 13');
    }

    if (!credentials.consentGiven) {
      throw new Error('Initial consent acknowledgment is required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.parentEmail)) {
      throw new Error('Invalid parent email format');
    }
  }

  /**
   * Create parent consent request
   */
  private async createParentConsentRequest(
    credentials: COPPARegistrationCredentials,
    userId: string
  ): Promise<ParentConsentRequest> {
    const consentToken = this.generateConsentToken();
    
    const consentRequest: ParentConsentRequest = {
      userId,
      childName: credentials.name,
      childEmail: credentials.email,
      childAge: credentials.age,
      parentEmail: credentials.parentEmail,
      parentName: credentials.parentName,
      ...(credentials.parentPhoneNumber && { parentPhoneNumber: credentials.parentPhoneNumber }),
      requestDate: new Date(),
      consentToken,
      status: 'pending',
    };

    // Store consent request
    await setDoc(doc(firestore, 'parent_consent_requests', userId), consentRequest);

    return consentRequest;
  }

  /**
   * Send parent consent email
   */
  private async sendParentConsentEmail(consentRequest: ParentConsentRequest): Promise<void> {
    // TODO: Implement email sending via Firebase Functions or third-party service
    // For now, we'll store the email content that should be sent
    
    const emailContent = {
      to: consentRequest.parentEmail,
      subject: 'Parental Consent Required - AR Book Explorer',
      body: `
        Dear Parent/Guardian,
        
        Your child ${consentRequest.childName} (${consentRequest.childEmail}) has requested to create an account 
        on AR Book Explorer. As your child is under 13 years old, we require your consent in accordance 
        with the Children's Online Privacy Protection Act (COPPA).
        
        Please click the link below to review and provide consent:
        [Consent Link with token: ${consentRequest.consentToken}]
        
        This link will expire in ${this.CONSENT_TOKEN_EXPIRY_DAYS} days.
        
        Thank you,
        AR Book Explorer Team
      `,
      sentAt: new Date(),
    };

    // Store email for sending via background job
    await addDoc(collection(firestore, 'email_queue'), emailContent);
  }

  /**
   * Generate secure consent token
   */
  private generateConsentToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  /**
   * Store COPPA compliance data
   */
  private async storeCOPPAData(data: COPPAComplianceData): Promise<void> {
    await setDoc(doc(firestore, 'coppa_compliance', data.userId), data);
  }

  /**
   * Update COPPA compliance data
   */
  private async updateCOPPAData(
    userId: string,
    updates: Partial<COPPAComplianceData>
  ): Promise<void> {
    await updateDoc(doc(firestore, 'coppa_compliance', userId), updates);
  }

  /**
   * Get consent request by token
   */
  private async getConsentRequestByToken(token: string): Promise<ParentConsentRequest | null> {
    // TODO: Implement efficient token lookup (consider using a separate index)
    // For now, we'll need to query all consent requests and find by token
    // In production, consider storing tokens in a separate collection for fast lookup
    return null; // Placeholder
  }

  /**
   * Check if consent token is expired
   */
  private isConsentTokenExpired(requestDate: Date): boolean {
    const expiryDate = new Date(requestDate);
    expiryDate.setDate(expiryDate.getDate() + this.CONSENT_TOKEN_EXPIRY_DAYS);
    return new Date() > expiryDate;
  }

  /**
   * Update consent request
   */
  private async updateConsentRequest(
    userId: string,
    updates: Partial<ParentConsentRequest>
  ): Promise<void> {
    await updateDoc(doc(firestore, 'parent_consent_requests', userId), updates);
  }

  /**
   * Enable user account after parent consent
   */
  private async enableUserAccount(userId: string): Promise<void> {
    // Update user profile to enable notifications and full features
    await updateDoc(doc(firestore, 'users', userId), {
      'preferences.notifications': true,
      updatedAt: new Date(),
    });
  }

  /**
   * Handle consent denial
   */
  private async handleConsentDenial(userId: string): Promise<void> {
    // Mark user as inactive or delete account based on policy
    await updateDoc(doc(firestore, 'users', userId), {
      accountStatus: 'consent_denied',
      updatedAt: new Date(),
    });
  }
}

// Export singleton instance
export const coppaService = new COPPAService();

