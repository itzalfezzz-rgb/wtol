import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeaderboardEntry {
    username: string;
    userId: UserId;
    rank: bigint;
    totalTerritoryArea: number;
    locationLabel: string;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type PostId = bigint;
export interface PostView {
    id: PostId;
    createdAt: Timestamp;
    likedBy: Array<UserId>;
    author: UserId;
    message: string;
    territoryClaimed: Array<ZoneId>;
    commentsCount: bigint;
    comments: Array<Comment>;
    likesCount: bigint;
    workoutSummary?: WorkoutSummary;
}
export type CompetitionId = bigint;
export type ZoneId = bigint;
export interface TakeoverEvent {
    newOwner: UserId;
    workoutId: WorkoutId;
    previousOwner?: UserId;
    takenAt: Timestamp;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface GpsEvent {
    message: string;
    timestamp: Timestamp;
    eventType: string;
    accuracy?: number;
}
export interface CompetitionView {
    id: CompetitionId;
    startsAt: Timestamp;
    standings: Array<Standing>;
    isActive: boolean;
    challengeType: ChallengeType;
    prizes: Array<string>;
    monthYear: string;
    endsAt: Timestamp;
}
export interface Comment {
    id: bigint;
    content: string;
    createdAt: Timestamp;
    author: UserId;
}
export interface Standing {
    userId: UserId;
    rank: bigint;
    score: number;
}
export interface Coordinate {
    lat: number;
    lng: number;
}
export type WorkoutId = bigint;
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface WorkoutSummary {
    id: WorkoutId;
    status: WorkoutStatus;
    completedAt?: Timestamp;
    startedAt: Timestamp;
    userId: UserId;
    territoryZonesClaimed: bigint;
    durationSeconds: bigint;
    caloriesBurned?: number;
    averagePaceSecondsPerKm?: number;
    distanceMetres: number;
    workoutType: WorkoutType;
}
export interface ZoneInfo {
    id: ZoneId;
    polygon: Array<Coordinate>;
    owner?: UserId;
    name: string;
    workoutId?: WorkoutId;
    claimedAt?: Timestamp;
    areaKm2: number;
    takeoverHistory: Array<TakeoverEvent>;
}
export interface CoachMessage {
    id: CoachMessageId;
    content: string;
    createdAt: Timestamp;
    role: MessageRole;
}
export interface UserProfile {
    id: UserId;
    bio?: string;
    fitnessLevel: FitnessLevel;
    weeklyAvailabilityHours: bigint;
    username: string;
    displayName: string;
    followersCount: bigint;
    joinedAt: Timestamp;
    avatarUrl?: string;
    totalTerritoryArea: number;
    locationLabel: string;
    followingCount: bigint;
}
export type CoachMessageId = bigint;
export enum ChallengeType {
    mostDistance = "mostDistance",
    mostTakedowns = "mostTakedowns",
    mostWorkouts = "mostWorkouts",
    mostTerritory = "mostTerritory"
}
export enum FitnessLevel {
    intermediate = "intermediate",
    beginner = "beginner",
    advanced = "advanced",
    elite = "elite"
}
export enum MessageRole {
    user = "user",
    assistant = "assistant"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum WorkoutStatus {
    completed = "completed",
    abandoned = "abandoned",
    inProgress = "inProgress"
}
export enum WorkoutType {
    run = "run",
    other = "other",
    hiit = "hiit",
    yoga = "yoga",
    strength = "strength",
    walking = "walking",
    cycling = "cycling"
}
export interface backendInterface {
    abandonWorkout(workoutId: WorkoutId): Promise<boolean>;
    addComment(postId: PostId, content: string): Promise<boolean>;
    appendGpsPoint(workoutId: WorkoutId, coord: Coordinate): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimZone(zoneId: ZoneId, workoutId: WorkoutId): Promise<boolean>;
    clearConversation(): Promise<boolean>;
    coachTransform(input: TransformationInput): Promise<TransformationOutput>;
    completeWorkout(workoutId: WorkoutId, distanceMetres: number, durationSeconds: bigint, caloriesBurned: number | null, averagePaceSecondsPerKm: number | null, elevationGainMetres: number | null): Promise<boolean>;
    createCompetition(monthYear: string, challengeType: ChallengeType, prizes: Array<string>, startsAt: Timestamp, endsAt: Timestamp): Promise<CompetitionId>;
    createPost(workoutSummary: WorkoutSummary | null, territoryClaimed: Array<ZoneId>, message: string): Promise<PostId>;
    createProfile(username: string, displayName: string, fitnessLevel: FitnessLevel, locationLabel: string, weeklyAvailabilityHours: bigint): Promise<boolean>;
    createZone(name: string, polygon: Array<Coordinate>, areaKm2: number): Promise<ZoneId>;
    deletePost(postId: PostId): Promise<boolean>;
    follow(target: UserId): Promise<boolean>;
    getActiveCompetition(): Promise<CompetitionView | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCoachConversation(): Promise<Array<CoachMessage>>;
    getCoachHistory(): Promise<Array<CoachMessage>>;
    getCompetition(competitionId: CompetitionId): Promise<CompetitionView | null>;
    getCompetitionLeaderboard(competitionId: CompetitionId): Promise<Array<Standing>>;
    getFollowers(userId: UserId): Promise<Array<UserId>>;
    getFollowing(userId: UserId): Promise<Array<UserId>>;
    getGlobalFeed(limit: bigint, offset: bigint): Promise<Array<PostView>>;
    getLeaderboard(locationFilter: string | null, limit: bigint): Promise<Array<LeaderboardEntry>>;
    getMyFeed(limit: bigint, offset: bigint): Promise<Array<PostView>>;
    getMyProfile(): Promise<UserProfile | null>;
    getMyWorkouts(limit: bigint, offset: bigint): Promise<Array<WorkoutSummary>>;
    getPost(postId: PostId): Promise<PostView | null>;
    getProfile(userId: UserId): Promise<UserProfile | null>;
    getUserWorkouts(userId: UserId, limit: bigint, offset: bigint): Promise<Array<WorkoutSummary>>;
    getWorkout(workoutId: WorkoutId): Promise<WorkoutSummary | null>;
    getWorkoutRoute(workoutId: WorkoutId): Promise<Array<Coordinate> | null>;
    getZone(zoneId: ZoneId): Promise<ZoneInfo | null>;
    getZoneHistory(zoneId: ZoneId): Promise<Array<TakeoverEvent>>;
    getZoneLeaderboard(): Promise<Array<[UserId, number]>>;
    getZonesInBounds(swLat: number, swLng: number, neLat: number, neLng: number): Promise<Array<ZoneInfo>>;
    isCallerAdmin(): Promise<boolean>;
    joinCompetition(competitionId: CompetitionId): Promise<boolean>;
    likePost(postId: PostId): Promise<boolean>;
    listCompetitions(): Promise<Array<CompetitionView>>;
    listZones(ownerFilter: UserId | null): Promise<Array<ZoneInfo>>;
    logGpsEvent(workoutId: WorkoutId, gpsEvent: GpsEvent): Promise<boolean>;
    sendCoachMessage(content: string): Promise<string>;
    startCoachSession(): Promise<Array<CoachMessage>>;
    startWorkout(workoutType: WorkoutType): Promise<WorkoutId>;
    unfollow(target: UserId): Promise<boolean>;
    unlikePost(postId: PostId): Promise<boolean>;
    updateProfile(displayName: string | null, fitnessLevel: FitnessLevel | null, locationLabel: string | null, weeklyAvailabilityHours: bigint | null, bio: string | null, avatarUrl: string | null): Promise<boolean>;
}
