import {
  ChallengeType,
  type CompetitionView,
  FitnessLevel,
  type GpsEventLog,
  type LeaderboardEntry,
  MessageRole,
  type PostView,
  type UserProfile,
  WorkoutStatus,
  type WorkoutSummary,
  WorkoutType,
  type ZoneInfo,
} from "./types";

const NOW = BigInt(Date.now()) * 1_000_000n;
const DAY = 86_400_000_000_000n;

// Sample zone polygons (approximate city districts)
export const SAMPLE_ZONES: ZoneInfo[] = [
  {
    id: 1n,
    name: "Downtown Core",
    polygon: [
      { lat: 37.7749, lng: -122.4194 },
      { lat: 37.7759, lng: -122.4134 },
      { lat: 37.7719, lng: -122.4124 },
      { lat: 37.7709, lng: -122.4184 },
    ],
    areaKm2: 0.48,
    claimedAt: NOW - DAY * 2n,
    takeoverHistory: [],
  },
  {
    id: 2n,
    name: "Mission District",
    polygon: [
      { lat: 37.7609, lng: -122.4194 },
      { lat: 37.7619, lng: -122.4084 },
      { lat: 37.7559, lng: -122.4074 },
      { lat: 37.7549, lng: -122.4184 },
    ],
    areaKm2: 0.72,
    claimedAt: NOW - DAY * 5n,
    takeoverHistory: [],
  },
  {
    id: 3n,
    name: "Castro Heights",
    polygon: [
      { lat: 37.7619, lng: -122.4354 },
      { lat: 37.7629, lng: -122.4244 },
      { lat: 37.7569, lng: -122.4234 },
      { lat: 37.7559, lng: -122.4344 },
    ],
    areaKm2: 0.55,
    claimedAt: NOW - DAY,
    takeoverHistory: [],
  },
  {
    id: 4n,
    name: "Pacific Heights",
    polygon: [
      { lat: 37.7919, lng: -122.4354 },
      { lat: 37.7929, lng: -122.4244 },
      { lat: 37.7869, lng: -122.4234 },
      { lat: 37.7859, lng: -122.4344 },
    ],
    areaKm2: 0.63,
    takeoverHistory: [],
  },
  {
    id: 5n,
    name: "Haight-Ashbury",
    polygon: [
      { lat: 37.7709, lng: -122.4494 },
      { lat: 37.7719, lng: -122.4384 },
      { lat: 37.7659, lng: -122.4374 },
      { lat: 37.7649, lng: -122.4484 },
    ],
    areaKm2: 0.41,
    claimedAt: NOW - DAY * 3n,
    takeoverHistory: [],
  },
];

export const SAMPLE_WORKOUTS: WorkoutSummary[] = [
  {
    id: 1n,
    userId: {} as never,
    workoutType: WorkoutType.run,
    status: WorkoutStatus.completed,
    startedAt: NOW - DAY,
    completedAt: NOW - DAY + 3_600_000_000_000n,
    distanceMetres: 8420,
    durationSeconds: 3187n,
    caloriesBurned: 612,
    averagePaceSecondsPerKm: 378,
    territoryZonesClaimed: 3n,
  },
  {
    id: 2n,
    userId: {} as never,
    workoutType: WorkoutType.run,
    status: WorkoutStatus.completed,
    startedAt: NOW - DAY * 3n,
    completedAt: NOW - DAY * 3n + 2_700_000_000_000n,
    distanceMetres: 5050,
    durationSeconds: 1755n,
    caloriesBurned: 389,
    averagePaceSecondsPerKm: 348,
    territoryZonesClaimed: 1n,
  },
  {
    id: 3n,
    userId: {} as never,
    workoutType: WorkoutType.hiit,
    status: WorkoutStatus.completed,
    startedAt: NOW - DAY * 5n,
    completedAt: NOW - DAY * 5n + 2_400_000_000_000n,
    distanceMetres: 0,
    durationSeconds: 2400n,
    caloriesBurned: 445,
    territoryZonesClaimed: 0n,
  },
  {
    id: 4n,
    userId: {} as never,
    workoutType: WorkoutType.cycling,
    status: WorkoutStatus.completed,
    startedAt: NOW - DAY * 7n,
    completedAt: NOW - DAY * 7n + 5_400_000_000_000n,
    distanceMetres: 24800,
    durationSeconds: 5400n,
    caloriesBurned: 720,
    averagePaceSecondsPerKm: 218,
    territoryZonesClaimed: 5n,
  },
];

export const SAMPLE_POSTS: PostView[] = [
  {
    id: 1n,
    author: {} as never,
    message:
      "🏃 Morning run through the Mission — claimed 3 new zones! The downtown core is mine now. Who wants to challenge me? #WTOL #TerritoryKing",
    workoutSummary: SAMPLE_WORKOUTS[0],
    territoryClaimed: [1n, 2n, 3n],
    likedBy: [],
    likesCount: 47n,
    commentsCount: 12n,
    comments: [],
    createdAt: NOW - 3_600_000_000_000n,
  },
  {
    id: 2n,
    author: {} as never,
    message:
      "Just completed a 5K tempo run. My pace is getting better every week thanks to the AI coach suggestions! 💪",
    workoutSummary: SAMPLE_WORKOUTS[1],
    territoryClaimed: [],
    likedBy: [],
    likesCount: 23n,
    commentsCount: 5n,
    comments: [],
    createdAt: NOW - DAY,
  },
  {
    id: 3n,
    author: {} as never,
    message:
      "Crushed a 40-min HIIT session this morning. No territory today but the gains are real! Recovery run tomorrow then it's game time 🔥",
    territoryClaimed: [],
    likedBy: [],
    likesCount: 31n,
    commentsCount: 8n,
    comments: [],
    createdAt: NOW - DAY * 2n,
  },
  {
    id: 4n,
    author: {} as never,
    message:
      "Long bike ride through the hills. 5 zones locked in! The weekend warriors are coming for your territory. 🚴‍♂️ #Cycling",
    workoutSummary: SAMPLE_WORKOUTS[3],
    territoryClaimed: [1n, 2n, 3n, 4n, 5n],
    likedBy: [],
    likesCount: 56n,
    commentsCount: 19n,
    comments: [],
    createdAt: NOW - DAY * 3n,
  },
];

export const SAMPLE_COMPETITION: CompetitionView = {
  id: 1n,
  monthYear: "April 2026",
  challengeType: ChallengeType.mostTerritory,
  prizes: [
    "$500 Nike Gift Card",
    "$200 Garmin Store Credit",
    "$100 Strava Premium",
  ],
  startsAt: NOW - DAY * 15n,
  endsAt: NOW + DAY * 15n,
  isActive: true,
  standings: [
    { userId: {} as never, rank: 1n, score: 24.7 },
    { userId: {} as never, rank: 2n, score: 18.3 },
    { userId: {} as never, rank: 3n, score: 15.9 },
  ],
};

export const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  {
    userId: {} as never,
    username: "BlazeTerraform",
    rank: 1n,
    totalTerritoryArea: 24.7,
    locationLabel: "San Francisco, CA",
  },
  {
    userId: {} as never,
    username: "NightStrider99",
    rank: 2n,
    totalTerritoryArea: 18.3,
    locationLabel: "Oakland, CA",
  },
  {
    userId: {} as never,
    username: "PacificRunner",
    rank: 3n,
    totalTerritoryArea: 15.9,
    locationLabel: "San Jose, CA",
  },
  {
    userId: {} as never,
    username: "UrbanHawk",
    rank: 4n,
    totalTerritoryArea: 12.4,
    locationLabel: "Berkeley, CA",
  },
  {
    userId: {} as never,
    username: "SprintKing_SF",
    rank: 5n,
    totalTerritoryArea: 10.8,
    locationLabel: "San Francisco, CA",
  },
  {
    userId: {} as never,
    username: "MorningPace",
    rank: 6n,
    totalTerritoryArea: 9.2,
    locationLabel: "Daly City, CA",
  },
  {
    userId: {} as never,
    username: "TerraHunter",
    rank: 7n,
    totalTerritoryArea: 8.5,
    locationLabel: "Fremont, CA",
  },
  {
    userId: {} as never,
    username: "RunnerX",
    rank: 8n,
    totalTerritoryArea: 7.1,
    locationLabel: "San Francisco, CA",
  },
];

export const SAMPLE_PROFILE: UserProfile = {
  id: {} as never,
  username: "ClaimMaster42",
  displayName: "Alex Chen",
  bio: "Competitive runner from SF. I run to claim territory and dominate the map 🗺️",
  fitnessLevel: FitnessLevel.intermediate,
  locationLabel: "San Francisco, CA",
  weeklyAvailabilityHours: 8n,
  totalTerritoryArea: 12.4,
  followersCount: 234n,
  followingCount: 178n,
  joinedAt: NOW - DAY * 90n,
};

export const SAMPLE_COACH_MESSAGES = [
  {
    id: 1n,
    role: MessageRole.assistant,
    content:
      "Welcome to WTOL! I'm your AI fitness coach and territory strategist. To get started, tell me: what's your current fitness level, how many hours per week can you train, and do you prefer solo exploration or competitive takeovers?",
    createdAt: NOW - DAY,
  },
  {
    id: 2n,
    role: MessageRole.user,
    content:
      "I'm intermediate level, can train about 6 hours a week, and I love competing for territory!",
    createdAt: NOW - DAY + 600_000_000_000n,
  },
  {
    id: 3n,
    role: MessageRole.assistant,
    content:
      "Perfect! With 6 hours/week and a competitive streak, here's your territory domination plan:\n\n**Mon:** Recovery walk (30min) — scout new zones\n**Wed:** Tempo run (45min) — claim 2-3 zones in dense areas\n**Fri:** Interval training (40min) — maximize zone coverage\n**Sat:** Long run (90min) — explore new districts and claim unclaimed territory\n\nFocus your routes on the Mission and Castro districts — high zone density means more territory per km. Want me to build a specific weekly schedule?",
    createdAt: NOW - DAY + 1_200_000_000_000n,
  },
];

export const SAMPLE_GPS_EVENTS: GpsEventLog[] = [
  {
    type: "active",
    message: "GPS lock acquired — accuracy 4.2m",
    timestamp: Date.now() - 60000,
    accuracy: 4.2,
  },
  {
    type: "active",
    message: "Position updated",
    timestamp: Date.now() - 30000,
    accuracy: 5.1,
  },
  {
    type: "active",
    message: "Position updated",
    timestamp: Date.now() - 10000,
    accuracy: 3.8,
  },
];

// Utility formatters
export function formatDistance(metres: number): string {
  if (metres < 1000) return `${metres}m`;
  return `${(metres / 1000).toFixed(2)}km`;
}

export function formatDuration(seconds: bigint): string {
  const s = Number(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function formatPace(secPerKm?: number): string {
  if (!secPerKm) return "—";
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return `${m}:${s.toString().padStart(2, "0")}/km`;
}

export function timeAgo(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
