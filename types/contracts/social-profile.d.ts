/**
 * Social Profile Feature Contract
 * 
 * This contract defines the core types, interfaces, and service methods
 * for the social profile management system.
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export interface Profile {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  location?: string;
  website?: string;
  birthDate?: Date;
  isPublic: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileData {
  displayName?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  location?: string;
  website?: string;
  birthDate?: Date;
  isPublic?: boolean;
}

export interface AvatarResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

export interface AvatarUploadData {
  file: File;
  cropData?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// ============================================================================
// CONNECTIONS
// ============================================================================

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
  connectedUser: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
}

export interface AddConnectionData {
  connectedUserId: string;
  message?: string;
}

// ============================================================================
// ACTIVITY FEEDS
// ============================================================================

export interface Activity {
  id: string;
  userId: string;
  type: 'post' | 'connection' | 'achievement' | 'milestone';
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  isPublic: boolean;
  createdAt: Date;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
}

export interface AddActivityData {
  type: 'post' | 'connection' | 'achievement' | 'milestone';
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  isPublic?: boolean;
}

// ============================================================================
// SOCIAL SETTINGS
// ============================================================================

export interface SocialSettings {
  id: string;
  userId: string;
  allowConnections: boolean;
  allowMessages: boolean;
  allowActivityFeed: boolean;
  allowNotifications: boolean;
  showOnlineStatus: boolean;
  showLastSeen: boolean;
  allowTagging: boolean;
  allowMentions: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateSocialSettingsData {
  allowConnections?: boolean;
  allowMessages?: boolean;
  allowActivityFeed?: boolean;
  allowNotifications?: boolean;
  showOnlineStatus?: boolean;
  showLastSeen?: boolean;
  allowTagging?: boolean;
  allowMentions?: boolean;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: 'connection_request' | 'connection_accepted' | 'mention' | 'tag' | 'achievement' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
  fromUser?: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
}

// ============================================================================
// PRIVACY SETTINGS
// ============================================================================

export interface PrivacySettings {
  id: string;
  userId: string;
  profileVisibility: 'public' | 'connections' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  showBirthDate: boolean;
  showWebsite: boolean;
  allowSearch: boolean;
  allowIndexing: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdatePrivacySettingsData {
  profileVisibility?: 'public' | 'connections' | 'private';
  showEmail?: boolean;
  showPhone?: boolean;
  showLocation?: boolean;
  showBirthDate?: boolean;
  showWebsite?: boolean;
  allowSearch?: boolean;
  allowIndexing?: boolean;
}

// ============================================================================
// REPORTING
// ============================================================================

export interface ReportUserData {
  reportedUserId: string;
  reason: 'spam' | 'harassment' | 'inappropriate_content' | 'fake_profile' | 'other';
  description?: string;
  evidence?: string[];
}

// ============================================================================
// SERVICE INTERFACE
// ============================================================================

export interface ISocialProfileService {
  // Profile Management
  getProfile(userId: string): Promise<Profile>;
  updateProfile(userId: string, data: UpdateProfileData): Promise<Profile>;
  uploadAvatar(userId: string, data: AvatarUploadData): Promise<AvatarResult>;
  
  // Connections
  getConnections(userId: string): Promise<Connection[]>;
  addConnection(userId: string, data: AddConnectionData): Promise<Connection>;
  removeConnection(userId: string, connectionId: string): Promise<{ success: boolean }>;
  acceptConnection(userId: string, connectionId: string): Promise<Connection>;
  rejectConnection(userId: string, connectionId: string): Promise<{ success: boolean }>;
  
  // Activity Feeds
  getActivityFeed(userId: string, limit?: number, offset?: number): Promise<Activity[]>;
  addActivity(userId: string, data: AddActivityData): Promise<Activity>;
  
  // Social Settings
  getSocialSettings(userId: string): Promise<SocialSettings>;
  updateSocialSettings(userId: string, data: UpdateSocialSettingsData): Promise<SocialSettings>;
  
  // Notifications
  getNotifications(userId: string, limit?: number, offset?: number): Promise<Notification[]>;
  markNotificationRead(userId: string, notificationId: string): Promise<Notification>;
  markAllNotificationsRead(userId: string): Promise<{ success: boolean }>;
  
  // Privacy Settings
  getPrivacySettings(userId: string): Promise<PrivacySettings>;
  updatePrivacySettings(userId: string, data: UpdatePrivacySettingsData): Promise<PrivacySettings>;
  
  // User Management
  blockUser(userId: string, blockedUserId: string): Promise<{ success: boolean }>;
  unblockUser(userId: string, blockedUserId: string): Promise<{ success: boolean }>;
  reportUser(userId: string, data: ReportUserData): Promise<{ success: boolean }>;
  
  // Search
  searchUsers(query: string, limit?: number, offset?: number): Promise<Profile[]>;
  getBlockedUsers(userId: string): Promise<Profile[]>;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// QUERY PARAMETERS
// ============================================================================

export interface GetConnectionsParams {
  status?: 'pending' | 'accepted' | 'blocked';
  limit?: number;
  offset?: number;
}

export interface GetActivityFeedParams {
  type?: 'post' | 'connection' | 'achievement' | 'milestone';
  isPublic?: boolean;
  limit?: number;
  offset?: number;
}

export interface SearchUsersParams {
  query: string;
  limit?: number;
  offset?: number;
  includeBlocked?: boolean;
}
