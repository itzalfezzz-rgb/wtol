import type { Principal } from "@icp-sdk/core/principal";

// Re-export backend types with UI-friendly aliases
export type UserId = Principal;
export type WorkoutId = bigint;
export type ZoneId = bigint;
export type PostId = bigint;
export type CompetitionId = bigint;
export type CoachMessageId = bigint;
export type Timestamp = bigint;

export enum FitnessLevel {
  beginner = "beginner",
  intermediate = "intermediate",
  advanced = "advanced",
  elite = "elite",
}

export enum WorkoutType {
  run = "run",
  walking = "walking",
  cycling = "cycling",
  hiit = "hiit",
  strength = "strength",
  yoga = "yoga",
  other = "other",
}

export enum WorkoutStatus {
  inProgress = "inProgress",
  completed = "completed",
  abandoned = "abandoned",
}

export enum MessageRole {
  user = "user",
  assistant = "assistant",
}

export enum ChallengeType {
  mostDistance = "mostDistance",
  mostTakedowns = "mostTakedowns",
  mostWorkouts = "mostWorkouts",
  mostTerritory = "mostTerritory",
}

export enum UserRole {
  admin = "admin",
  user = "user",
  guest = "guest",
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface UserProfile {
  id: UserId;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  fitnessLevel: FitnessLevel;
  locationLabel: string;
  weeklyAvailabilityHours: bigint;
  totalTerritoryArea: number;
  followersCount: bigint;
  followingCount: bigint;
  joinedAt: Timestamp;
}

export interface WorkoutSummary {
  id: WorkoutId;
  userId: UserId;
  workoutType: WorkoutType;
  status: WorkoutStatus;
  startedAt: Timestamp;
  completedAt?: Timestamp;
  distanceMetres: number;
  durationSeconds: bigint;
  caloriesBurned?: number;
  averagePaceSecondsPerKm?: number;
  territoryZonesClaimed: bigint;
}

export interface GpsEvent {
  message: string;
  timestamp: Timestamp;
  eventType: string;
  accuracy?: number;
}

export interface TakeoverEvent {
  newOwner: UserId;
  workoutId: WorkoutId;
  previousOwner?: UserId;
  takenAt: Timestamp;
}

export interface ZoneInfo {
  id: ZoneId;
  name: string;
  polygon: Coordinate[];
  areaKm2: number;
  owner?: UserId;
  workoutId?: WorkoutId;
  claimedAt?: Timestamp;
  takeoverHistory: TakeoverEvent[];
}

export interface Comment {
  id: bigint;
  author: UserId;
  content: string;
  createdAt: Timestamp;
}

export interface PostView {
  id: PostId;
  author: UserId;
  message: string;
  workoutSummary?: WorkoutSummary;
  territoryClaimed: ZoneId[];
  likedBy: UserId[];
  likesCount: bigint;
  commentsCount: bigint;
  comments: Comment[];
  createdAt: Timestamp;
}

export interface Standing {
  userId: UserId;
  rank: bigint;
  score: number;
}

export interface CompetitionView {
  id: CompetitionId;
  monthYear: string;
  challengeType: ChallengeType;
  prizes: string[];
  startsAt: Timestamp;
  endsAt: Timestamp;
  isActive: boolean;
  standings: Standing[];
}

export interface CoachMessage {
  id: CoachMessageId;
  role: MessageRole;
  content: string;
  createdAt: Timestamp;
}

export interface LeaderboardEntry {
  userId: UserId;
  username: string;
  rank: bigint;
  totalTerritoryArea: number;
  locationLabel: string;
}

// GPS hook types
export type GpsStatus = "idle" | "acquiring" | "active" | "error" | "denied";

export interface GpsPosition {
  lat: number;
  lng: number;
  accuracy: number;
  altitude?: number;
  speed?: number;
  heading?: number;
  timestamp: number;
}

export interface GpsState {
  status: GpsStatus;
  position: GpsPosition | null;
  accuracy: number | null;
  errorMessage: string | null;
  gpsEvents: GpsEventLog[];
}

export interface GpsEventLog {
  type: GpsStatus;
  message: string;
  timestamp: number;
  accuracy?: number;
}

// Workout type display metadata
export const WORKOUT_TYPE_META: Record<
  WorkoutType,
  { label: string; emoji: string; color: string }
> = {
  [WorkoutType.run]: { label: "Run", emoji: "🏃", color: "text-chart-2" },
  [WorkoutType.walking]: { label: "Walk", emoji: "🚶", color: "text-chart-3" },
  [WorkoutType.cycling]: { label: "Cycle", emoji: "🚴", color: "text-chart-1" },
  [WorkoutType.hiit]: { label: "HIIT", emoji: "⚡", color: "text-chart-4" },
  [WorkoutType.strength]: {
    label: "Strength",
    emoji: "💪",
    color: "text-chart-5",
  },
  [WorkoutType.yoga]: { label: "Yoga", emoji: "🧘", color: "text-accent" },
  [WorkoutType.other]: {
    label: "Other",
    emoji: "🏋️",
    color: "text-muted-foreground",
  },
};
