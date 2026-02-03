export type UserRole = 'STUDENT' | 'ADMIN';

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  school?: string;
  course?: string;
  level?: string;
  avatar?: string;
  bio?: string;
  badges?: string[];
  streak?: number;
  points: number; // New: Gamification points
  isPublic?: boolean;
  role: UserRole;
  warnings: number;
  isMuted: boolean;
  isBanned: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: Date;
  replies?: Comment[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  course: string;
  image?: string;
  isDm?: boolean;
  dmUserId?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  points?: number; // New: Group competition points
}

export interface StudyRoom {
  id: string;
  name: string;
  topic: string;
  activeUsers: number;
  image: string;
}

export interface MarketItem {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  price: string;
  image: string;
  category: string;
}

export interface Confession {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  comments: number;
  school: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
  type: 'text' | 'image' | 'file' | 'gift';
  attachmentUrl?: string;
  isToxic?: boolean; // New: For blurring content
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  imageUrl?: string;
  likes: number;
  isLiked?: boolean;
  comments: number;
  commentsList?: Comment[]; 
  timestamp: string;
  type: 'regular' | 'teammate_request';
  tags?: string[];
}

export interface TimetableEntry {
  id: string;
  courseName: string;
  location: string;
  day: string; // "Monday", "Tuesday", etc.
  startTime: string; // "08:00"
  endTime: string; // "10:00"
  color: string;
  reminderEnabled?: boolean;
}

export interface Todo {
  id: string;
  courseName: string;
  task: string;
  isCompleted: boolean;
  dueDate?: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  offenderName: string; // For mock purposes, usually ID
  content: string; // The reported message or reason
  reason: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  timestamp: Date;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export enum AppView {
  SPLASH = 'SPLASH',
  TERMS = 'TERMS',
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  MAIN = 'MAIN',
  ADMIN_PORTAL = 'ADMIN_PORTAL', // New View
}

export enum MainTab {
  HOME = 'HOME',
  STUDY = 'STUDY', 
  SOCIAL = 'SOCIAL', 
  CAMPUS = 'CAMPUS', 
  PROFILE = 'PROFILE',
}
