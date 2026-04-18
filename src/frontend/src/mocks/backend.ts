import type { backendInterface } from "../backend";
import {
  ChallengeType,
  FitnessLevel,
  MessageRole,
  UserRole,
  WorkoutStatus,
  WorkoutType,
} from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const mockUserId = Principal.fromText("aaaaa-aa");
const mockUserId2 = Principal.fromText("2vxsx-fae");
const now = BigInt(Date.now()) * BigInt(1_000_000);

const mockProfile = {
  id: mockUserId,
  username: "runner_supreme",
  displayName: "Alex Runner",
  fitnessLevel: FitnessLevel.intermediate,
  weeklyAvailabilityHours: BigInt(8),
  locationLabel: "New York, NY",
  followersCount: BigInt(142),
  followingCount: BigInt(89),
  joinedAt: now - BigInt(30) * BigInt(24) * BigInt(3600) * BigInt(1_000_000_000),
  totalTerritoryArea: 12.5,
  bio: "Territory runner. Claiming zones one km at a time.",
  avatarUrl: undefined,
};

const mockWorkout = {
  id: BigInt(1),
  userId: mockUserId,
  status: WorkoutStatus.completed,
  workoutType: WorkoutType.run,
  startedAt: now - BigInt(3600) * BigInt(1_000_000_000),
  completedAt: now,
  distanceMetres: 5200,
  durationSeconds: BigInt(1800),
  territoryZonesClaimed: BigInt(3),
  caloriesBurned: 420,
  averagePaceSecondsPerKm: 346,
};

const mockWorkout2 = {
  id: BigInt(2),
  userId: mockUserId,
  status: WorkoutStatus.completed,
  workoutType: WorkoutType.hiit,
  startedAt: now - BigInt(2) * BigInt(86400) * BigInt(1_000_000_000),
  completedAt: now - BigInt(2) * BigInt(86400) * BigInt(1_000_000_000) + BigInt(3600) * BigInt(1_000_000_000),
  distanceMetres: 0,
  durationSeconds: BigInt(2700),
  territoryZonesClaimed: BigInt(0),
  caloriesBurned: 310,
  averagePaceSecondsPerKm: undefined,
};

const mockZone = {
  id: BigInt(1),
  name: "Central Park North",
  polygon: [
    { lat: 40.7986, lng: -73.9506 },
    { lat: 40.7986, lng: -73.9492 },
    { lat: 40.7979, lng: -73.9492 },
    { lat: 40.7979, lng: -73.9506 },
  ],
  owner: mockUserId,
  workoutId: BigInt(1),
  claimedAt: now - BigInt(3600) * BigInt(1_000_000_000),
  areaKm2: 0.25,
  takeoverHistory: [],
};

const mockPost = {
  id: BigInt(1),
  author: mockUserId,
  message: "Just claimed 3 new zones in Central Park! The morning run was 🔥",
  createdAt: now - BigInt(7200) * BigInt(1_000_000_000),
  likesCount: BigInt(24),
  commentsCount: BigInt(5),
  likedBy: [],
  territoryClaimed: [BigInt(1), BigInt(2), BigInt(3)],
  workoutSummary: mockWorkout,
  comments: [
    {
      id: BigInt(1),
      author: mockUserId2,
      content: "Great run! Watch out, I'm coming for that zone 😤",
      createdAt: now - BigInt(3600) * BigInt(1_000_000_000),
    },
  ],
};

const mockPost2 = {
  id: BigInt(2),
  author: mockUserId2,
  message: "HIIT session done. No territory but still keeping up the training 💪",
  createdAt: now - BigInt(86400) * BigInt(1_000_000_000),
  likesCount: BigInt(11),
  commentsCount: BigInt(2),
  likedBy: [mockUserId],
  territoryClaimed: [],
  workoutSummary: mockWorkout2,
  comments: [],
};

const mockCompetition = {
  id: BigInt(1),
  monthYear: "April 2026",
  challengeType: ChallengeType.mostTerritory,
  isActive: true,
  startsAt: now - BigInt(10) * BigInt(86400) * BigInt(1_000_000_000),
  endsAt: now + BigInt(20) * BigInt(86400) * BigInt(1_000_000_000),
  prizes: ["$500 gift card", "$200 gear voucher", "$100 store credit"],
  standings: [
    { userId: mockUserId2, rank: BigInt(1), score: 45.2 },
    { userId: mockUserId, rank: BigInt(2), score: 12.5 },
  ],
};

const mockCoachMessages = [
  {
    id: BigInt(1),
    role: MessageRole.assistant,
    content:
      "Hi Alex! I'm your WTOL AI Coach 🏃 I'm here to help you maximize your territory and crush your fitness goals. What are you working towards this week — claiming new zones, improving pace, or just staying consistent?",
    createdAt: now - BigInt(3600) * BigInt(1_000_000_000),
  },
  {
    id: BigInt(2),
    role: MessageRole.user,
    content: "I want to claim more territory in my neighborhood and improve my 5K time.",
    createdAt: now - BigInt(1800) * BigInt(1_000_000_000),
  },
  {
    id: BigInt(3),
    role: MessageRole.assistant,
    content:
      "Perfect combo! To claim more territory, I suggest running varied routes rather than loops — this maximizes new zone coverage. For your 5K, add one interval session per week: 6×400m at goal pace with 90s rest. Based on your current pace, aim for 5:30/km. Want me to build a full weekly plan?",
    createdAt: now - BigInt(1700) * BigInt(1_000_000_000),
  },
];

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined as unknown as never,
  abandonWorkout: async () => true,
  addComment: async () => true,
  appendGpsPoint: async () => true,
  assignCallerUserRole: async () => undefined,
  claimZone: async () => true,
  clearConversation: async () => true,
  coachTransform: async (input) => ({ status: BigInt(200), body: new Uint8Array(), headers: [] }),
  completeWorkout: async () => true,
  createCompetition: async () => BigInt(1),
  createPost: async () => BigInt(3),
  createProfile: async () => true,
  createZone: async () => BigInt(1),
  deletePost: async () => true,
  follow: async () => true,
  getActiveCompetition: async () => mockCompetition,
  getCallerUserRole: async () => UserRole.user,
  getCoachConversation: async () => mockCoachMessages,
  getCoachHistory: async () => mockCoachMessages,
  getCompetition: async () => mockCompetition,
  getCompetitionLeaderboard: async () => mockCompetition.standings,
  getFollowers: async () => [mockUserId2],
  getFollowing: async () => [mockUserId2],
  getGlobalFeed: async () => [mockPost, mockPost2],
  getLeaderboard: async () => [
    { userId: mockUserId2, username: "zone_dominator", rank: BigInt(1), totalTerritoryArea: 45.2, locationLabel: "New York, NY" },
    { userId: mockUserId, username: "runner_supreme", rank: BigInt(2), totalTerritoryArea: 12.5, locationLabel: "New York, NY" },
    { userId: Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"), username: "speed_demon", rank: BigInt(3), totalTerritoryArea: 9.8, locationLabel: "Brooklyn, NY" },
  ],
  getMyFeed: async () => [mockPost, mockPost2],
  getMyProfile: async () => mockProfile,
  getMyWorkouts: async () => [mockWorkout, mockWorkout2],
  getPost: async () => mockPost,
  getProfile: async () => mockProfile,
  getUserWorkouts: async () => [mockWorkout, mockWorkout2],
  getWorkout: async () => mockWorkout,
  getWorkoutRoute: async () => [
    { lat: 40.7829, lng: -73.9654 },
    { lat: 40.7849, lng: -73.9644 },
    { lat: 40.7869, lng: -73.9624 },
    { lat: 40.7889, lng: -73.9614 },
  ],
  getZone: async () => mockZone,
  getZoneHistory: async () => [],
  getZoneLeaderboard: async () => [[mockUserId, 12.5], [mockUserId2, 45.2]],
  getZonesInBounds: async () => [mockZone],
  isCallerAdmin: async () => false,
  joinCompetition: async () => true,
  likePost: async () => true,
  listCompetitions: async () => [mockCompetition],
  listZones: async () => [mockZone],
  logGpsEvent: async () => true,
  sendCoachMessage: async () => "Great question! Here's my advice for your territory strategy...",
  startCoachSession: async () => mockCoachMessages,
  startWorkout: async () => BigInt(3),
  unfollow: async () => true,
  unlikePost: async () => true,
  updateProfile: async () => true,
};
