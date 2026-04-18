import { n as useRouterState, c as createLucideIcon, j as jsxRuntimeExports, L as Link, T as Trophy } from "./index-DZE4_1XK.js";
function useLocation(opts) {
  return useRouterState({
    select: (state) => state.location
  });
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
      key: "9m4mmf"
    }
  ],
  ["path", { d: "m2.5 21.5 1.4-1.4", key: "17g3f0" }],
  ["path", { d: "m20.1 3.9 1.4-1.4", key: "1qn309" }],
  [
    "path",
    {
      d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
      key: "1t2c92"
    }
  ],
  ["path", { d: "m9.6 14.4 4.8-4.8", key: "6umqxw" }]
];
const Dumbbell = createLucideIcon("dumbbell", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 18h-5", key: "95g1m2" }],
  ["path", { d: "M18 14h-8", key: "sponae" }],
  [
    "path",
    {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
      key: "39pd36"
    }
  ],
  ["rect", { width: "8", height: "4", x: "10", y: "6", rx: "1", key: "aywv1n" }]
];
const Newspaper = createLucideIcon("newspaper", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function GpsStatusBadge({
  status,
  accuracy,
  className = ""
}) {
  const configs = {
    active: {
      label: "GPS Active",
      dot: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2 h-2 rounded-full animate-gold-pulse",
          style: {
            background: "oklch(0.72 0.2 72)",
            boxShadow: "0 0 6px oklch(0.68 0.18 70 / 0.9)"
          },
          "aria-hidden": "true"
        }
      ),
      badge: "border-primary/30 text-primary"
    },
    acquiring: {
      label: "Acquiring...",
      dot: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2 h-2 rounded-full animate-pulse",
          style: { background: "oklch(0.75 0.22 60)" },
          "aria-hidden": "true"
        }
      ),
      badge: "border-accent/30 text-accent"
    },
    error: {
      label: "GPS Error",
      dot: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2 h-2 rounded-full",
          style: { background: "oklch(0.62 0.28 15)" },
          "aria-hidden": "true"
        }
      ),
      badge: "border-destructive/30 text-destructive"
    },
    denied: {
      label: "GPS Denied",
      dot: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2 h-2 rounded-full",
          style: { background: "oklch(0.62 0.28 15)" },
          "aria-hidden": "true"
        }
      ),
      badge: "border-destructive/30 text-destructive"
    },
    idle: {
      label: "GPS Off",
      dot: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2 h-2 rounded-full bg-muted-foreground/50",
          "aria-hidden": "true"
        }
      ),
      badge: "border-border text-muted-foreground"
    }
  };
  const config = configs[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "output",
    {
      "data-ocid": "gps.status_badge",
      className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium font-mono backdrop-blur-sm ${config.badge} ${className}`,
      style: { background: "oklch(0.14 0.006 50 / 0.8)" },
      "aria-label": `GPS status: ${config.label}${accuracy ? `, accuracy ${accuracy.toFixed(0)}m` : ""}`,
      children: [
        config.dot,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: config.label }),
        status === "active" && accuracy != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-70", children: [
          "±",
          accuracy.toFixed(0),
          "m"
        ] })
      ]
    }
  );
}
const NAV_ITEMS = [
  { path: "/", label: "Map", icon: Map, ocid: "nav.map_link" },
  {
    path: "/workouts",
    label: "Workouts",
    icon: Dumbbell,
    ocid: "nav.workouts_link"
  },
  {
    path: "/coach",
    label: "Coach",
    icon: MessageSquare,
    ocid: "nav.coach_link"
  },
  { path: "/feed", label: "Feed", icon: Newspaper, ocid: "nav.feed_link" },
  {
    path: "/competition",
    label: "Compete",
    icon: Trophy,
    ocid: "nav.competition_link"
  },
  { path: "/profile", label: "Profile", icon: User, ocid: "nav.profile_link" }
];
function Layout({
  children,
  showGpsStatus = false,
  gpsStatus = "idle",
  gpsAccuracy,
  headerTitle,
  headerAction
}) {
  const location = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: "sticky top-0 z-40 border-b border-primary/10",
        style: {
          background: "oklch(0.14 0.006 50 / 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 1px 0 oklch(0.68 0.18 70 / 0.12), 0 8px 32px oklch(0 0 0 / 0.4)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-14 px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/",
                className: "flex items-center gap-2",
                "aria-label": "WTOL home",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-8 h-8 rounded-lg flex items-center justify-center",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                        boxShadow: "0 0 12px oklch(0.68 0.18 70 / 0.5)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xs text-primary-foreground tracking-tight", children: "W" })
                    }
                  ),
                  !headerTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold text-lg tracking-tight",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.88 0.14 72), oklch(0.72 0.2 62))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      },
                      children: "WTOL"
                    }
                  )
                ]
              }
            ),
            headerTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-base", children: headerTitle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            showGpsStatus && /* @__PURE__ */ jsxRuntimeExports.jsx(GpsStatusBadge, { status: gpsStatus, accuracy: gpsAccuracy }),
            headerAction
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 bg-background overflow-auto", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: "sticky bottom-0 z-40 border-t border-primary/10",
        "aria-label": "Main navigation",
        style: {
          background: "oklch(0.13 0.006 50 / 0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 -1px 0 oklch(0.68 0.18 70 / 0.15), 0 -8px 32px oklch(0 0 0 / 0.5)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-around h-16 px-1", children: NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.path,
              "data-ocid": item.ocid,
              className: "flex flex-col items-center justify-center gap-0.5 flex-1 h-full min-w-0 relative transition-all duration-200",
              "aria-label": item.label,
              "aria-current": isActive ? "page" : void 0,
              children: [
                isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b-full",
                    style: {
                      background: "linear-gradient(90deg, transparent, oklch(0.68 0.18 70), transparent)",
                      boxShadow: "0 0 8px oklch(0.68 0.18 70 / 0.8)"
                    },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    size: 22,
                    strokeWidth: isActive ? 2.5 : 1.8,
                    style: isActive ? {
                      color: "oklch(0.72 0.2 72)",
                      filter: "drop-shadow(0 0 6px oklch(0.68 0.18 70 / 0.7))"
                    } : { color: "oklch(0.50 0.005 50)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-medium leading-none",
                    style: isActive ? { color: "oklch(0.72 0.2 72)", fontWeight: 600 } : { color: "oklch(0.50 0.005 50)" },
                    children: item.label
                  }
                )
              ]
            },
            item.path
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "footer",
      {
        className: "text-center py-2 border-t border-primary/10",
        style: { background: "oklch(0.12 0.004 50)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ". Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : ""
              )}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "underline hover:text-primary transition-colors",
              children: "caffeine.ai"
            }
          )
        ] })
      }
    )
  ] });
}
var FitnessLevel = /* @__PURE__ */ ((FitnessLevel2) => {
  FitnessLevel2["beginner"] = "beginner";
  FitnessLevel2["intermediate"] = "intermediate";
  FitnessLevel2["advanced"] = "advanced";
  FitnessLevel2["elite"] = "elite";
  return FitnessLevel2;
})(FitnessLevel || {});
var WorkoutType = /* @__PURE__ */ ((WorkoutType2) => {
  WorkoutType2["run"] = "run";
  WorkoutType2["walking"] = "walking";
  WorkoutType2["cycling"] = "cycling";
  WorkoutType2["hiit"] = "hiit";
  WorkoutType2["strength"] = "strength";
  WorkoutType2["yoga"] = "yoga";
  WorkoutType2["other"] = "other";
  return WorkoutType2;
})(WorkoutType || {});
var WorkoutStatus = /* @__PURE__ */ ((WorkoutStatus2) => {
  WorkoutStatus2["inProgress"] = "inProgress";
  WorkoutStatus2["completed"] = "completed";
  WorkoutStatus2["abandoned"] = "abandoned";
  return WorkoutStatus2;
})(WorkoutStatus || {});
var MessageRole = /* @__PURE__ */ ((MessageRole2) => {
  MessageRole2["user"] = "user";
  MessageRole2["assistant"] = "assistant";
  return MessageRole2;
})(MessageRole || {});
var ChallengeType = /* @__PURE__ */ ((ChallengeType2) => {
  ChallengeType2["mostDistance"] = "mostDistance";
  ChallengeType2["mostTakedowns"] = "mostTakedowns";
  ChallengeType2["mostWorkouts"] = "mostWorkouts";
  ChallengeType2["mostTerritory"] = "mostTerritory";
  return ChallengeType2;
})(ChallengeType || {});
const WORKOUT_TYPE_META = {
  [
    "run"
    /* run */
  ]: { label: "Run", emoji: "🏃", color: "text-chart-2" },
  [
    "walking"
    /* walking */
  ]: { label: "Walk", emoji: "🚶", color: "text-chart-3" },
  [
    "cycling"
    /* cycling */
  ]: { label: "Cycle", emoji: "🚴", color: "text-chart-1" },
  [
    "hiit"
    /* hiit */
  ]: { label: "HIIT", emoji: "⚡", color: "text-chart-4" },
  [
    "strength"
    /* strength */
  ]: {
    label: "Strength",
    emoji: "💪",
    color: "text-chart-5"
  },
  [
    "yoga"
    /* yoga */
  ]: { label: "Yoga", emoji: "🧘", color: "text-accent" },
  [
    "other"
    /* other */
  ]: {
    label: "Other",
    emoji: "🏋️",
    color: "text-muted-foreground"
  }
};
const NOW = BigInt(Date.now()) * 1000000n;
const DAY = 86400000000000n;
const SAMPLE_ZONES = [
  {
    id: 1n,
    name: "Downtown Core",
    polygon: [
      { lat: 37.7749, lng: -122.4194 },
      { lat: 37.7759, lng: -122.4134 },
      { lat: 37.7719, lng: -122.4124 },
      { lat: 37.7709, lng: -122.4184 }
    ],
    areaKm2: 0.48,
    claimedAt: NOW - DAY * 2n,
    takeoverHistory: []
  },
  {
    id: 2n,
    name: "Mission District",
    polygon: [
      { lat: 37.7609, lng: -122.4194 },
      { lat: 37.7619, lng: -122.4084 },
      { lat: 37.7559, lng: -122.4074 },
      { lat: 37.7549, lng: -122.4184 }
    ],
    areaKm2: 0.72,
    claimedAt: NOW - DAY * 5n,
    takeoverHistory: []
  },
  {
    id: 3n,
    name: "Castro Heights",
    polygon: [
      { lat: 37.7619, lng: -122.4354 },
      { lat: 37.7629, lng: -122.4244 },
      { lat: 37.7569, lng: -122.4234 },
      { lat: 37.7559, lng: -122.4344 }
    ],
    areaKm2: 0.55,
    claimedAt: NOW - DAY,
    takeoverHistory: []
  },
  {
    id: 4n,
    name: "Pacific Heights",
    polygon: [
      { lat: 37.7919, lng: -122.4354 },
      { lat: 37.7929, lng: -122.4244 },
      { lat: 37.7869, lng: -122.4234 },
      { lat: 37.7859, lng: -122.4344 }
    ],
    areaKm2: 0.63,
    takeoverHistory: []
  },
  {
    id: 5n,
    name: "Haight-Ashbury",
    polygon: [
      { lat: 37.7709, lng: -122.4494 },
      { lat: 37.7719, lng: -122.4384 },
      { lat: 37.7659, lng: -122.4374 },
      { lat: 37.7649, lng: -122.4484 }
    ],
    areaKm2: 0.41,
    claimedAt: NOW - DAY * 3n,
    takeoverHistory: []
  }
];
const SAMPLE_WORKOUTS = [
  {
    id: 1n,
    userId: {},
    workoutType: WorkoutType.run,
    status: WorkoutStatus.completed,
    startedAt: NOW - DAY,
    completedAt: NOW - DAY + 3600000000000n,
    distanceMetres: 8420,
    durationSeconds: 3187n,
    caloriesBurned: 612,
    averagePaceSecondsPerKm: 378,
    territoryZonesClaimed: 3n
  },
  {
    id: 2n,
    userId: {},
    workoutType: WorkoutType.run,
    status: WorkoutStatus.completed,
    startedAt: NOW - DAY * 3n,
    completedAt: NOW - DAY * 3n + 2700000000000n,
    distanceMetres: 5050,
    durationSeconds: 1755n,
    caloriesBurned: 389,
    averagePaceSecondsPerKm: 348,
    territoryZonesClaimed: 1n
  },
  {
    id: 3n,
    userId: {},
    workoutType: WorkoutType.hiit,
    status: WorkoutStatus.completed,
    startedAt: NOW - DAY * 5n,
    completedAt: NOW - DAY * 5n + 2400000000000n,
    distanceMetres: 0,
    durationSeconds: 2400n,
    caloriesBurned: 445,
    territoryZonesClaimed: 0n
  },
  {
    id: 4n,
    userId: {},
    workoutType: WorkoutType.cycling,
    status: WorkoutStatus.completed,
    startedAt: NOW - DAY * 7n,
    completedAt: NOW - DAY * 7n + 5400000000000n,
    distanceMetres: 24800,
    durationSeconds: 5400n,
    caloriesBurned: 720,
    averagePaceSecondsPerKm: 218,
    territoryZonesClaimed: 5n
  }
];
const SAMPLE_POSTS = [
  {
    id: 1n,
    author: {},
    message: "🏃 Morning run through the Mission — claimed 3 new zones! The downtown core is mine now. Who wants to challenge me? #WTOL #TerritoryKing",
    workoutSummary: SAMPLE_WORKOUTS[0],
    territoryClaimed: [1n, 2n, 3n],
    likedBy: [],
    likesCount: 47n,
    commentsCount: 12n,
    comments: [],
    createdAt: NOW - 3600000000000n
  },
  {
    id: 2n,
    author: {},
    message: "Just completed a 5K tempo run. My pace is getting better every week thanks to the AI coach suggestions! 💪",
    workoutSummary: SAMPLE_WORKOUTS[1],
    territoryClaimed: [],
    likedBy: [],
    likesCount: 23n,
    commentsCount: 5n,
    comments: [],
    createdAt: NOW - DAY
  },
  {
    id: 3n,
    author: {},
    message: "Crushed a 40-min HIIT session this morning. No territory today but the gains are real! Recovery run tomorrow then it's game time 🔥",
    territoryClaimed: [],
    likedBy: [],
    likesCount: 31n,
    commentsCount: 8n,
    comments: [],
    createdAt: NOW - DAY * 2n
  },
  {
    id: 4n,
    author: {},
    message: "Long bike ride through the hills. 5 zones locked in! The weekend warriors are coming for your territory. 🚴‍♂️ #Cycling",
    workoutSummary: SAMPLE_WORKOUTS[3],
    territoryClaimed: [1n, 2n, 3n, 4n, 5n],
    likedBy: [],
    likesCount: 56n,
    commentsCount: 19n,
    comments: [],
    createdAt: NOW - DAY * 3n
  }
];
const SAMPLE_COMPETITION = {
  monthYear: "April 2026",
  challengeType: ChallengeType.mostTerritory,
  prizes: [
    "$500 Nike Gift Card",
    "$200 Garmin Store Credit",
    "$100 Strava Premium"
  ],
  endsAt: NOW + DAY * 15n,
  standings: [
    { userId: {}, rank: 1n, score: 24.7 },
    { userId: {}, rank: 2n, score: 18.3 },
    { userId: {}, rank: 3n, score: 15.9 }
  ]
};
const SAMPLE_LEADERBOARD = [
  {
    userId: {},
    username: "BlazeTerraform",
    rank: 1n,
    totalTerritoryArea: 24.7,
    locationLabel: "San Francisco, CA"
  },
  {
    userId: {},
    username: "NightStrider99",
    rank: 2n,
    totalTerritoryArea: 18.3,
    locationLabel: "Oakland, CA"
  },
  {
    userId: {},
    username: "PacificRunner",
    rank: 3n,
    totalTerritoryArea: 15.9,
    locationLabel: "San Jose, CA"
  },
  {
    userId: {},
    username: "UrbanHawk",
    rank: 4n,
    totalTerritoryArea: 12.4,
    locationLabel: "Berkeley, CA"
  },
  {
    userId: {},
    username: "SprintKing_SF",
    rank: 5n,
    totalTerritoryArea: 10.8,
    locationLabel: "San Francisco, CA"
  },
  {
    userId: {},
    username: "MorningPace",
    rank: 6n,
    totalTerritoryArea: 9.2,
    locationLabel: "Daly City, CA"
  },
  {
    userId: {},
    username: "TerraHunter",
    rank: 7n,
    totalTerritoryArea: 8.5,
    locationLabel: "Fremont, CA"
  },
  {
    userId: {},
    username: "RunnerX",
    rank: 8n,
    totalTerritoryArea: 7.1,
    locationLabel: "San Francisco, CA"
  }
];
const SAMPLE_PROFILE = {
  username: "ClaimMaster42",
  displayName: "Alex Chen",
  bio: "Competitive runner from SF. I run to claim territory and dominate the map 🗺️",
  fitnessLevel: FitnessLevel.intermediate,
  locationLabel: "San Francisco, CA",
  weeklyAvailabilityHours: 8n,
  totalTerritoryArea: 12.4,
  followersCount: 234n,
  followingCount: 178n,
  joinedAt: NOW - DAY * 90n
};
const SAMPLE_COACH_MESSAGES = [
  {
    id: 1n,
    role: MessageRole.assistant,
    content: "Welcome to WTOL! I'm your AI fitness coach and territory strategist. To get started, tell me: what's your current fitness level, how many hours per week can you train, and do you prefer solo exploration or competitive takeovers?",
    createdAt: NOW - DAY
  },
  {
    id: 2n,
    role: MessageRole.user,
    content: "I'm intermediate level, can train about 6 hours a week, and I love competing for territory!",
    createdAt: NOW - DAY + 600000000000n
  },
  {
    id: 3n,
    role: MessageRole.assistant,
    content: "Perfect! With 6 hours/week and a competitive streak, here's your territory domination plan:\n\n**Mon:** Recovery walk (30min) — scout new zones\n**Wed:** Tempo run (45min) — claim 2-3 zones in dense areas\n**Fri:** Interval training (40min) — maximize zone coverage\n**Sat:** Long run (90min) — explore new districts and claim unclaimed territory\n\nFocus your routes on the Mission and Castro districts — high zone density means more territory per km. Want me to build a specific weekly schedule?",
    createdAt: NOW - DAY + 1200000000000n
  }
];
const SAMPLE_GPS_EVENTS = [
  {
    type: "active",
    message: "GPS lock acquired — accuracy 4.2m",
    timestamp: Date.now() - 6e4,
    accuracy: 4.2
  },
  {
    type: "active",
    message: "Position updated",
    timestamp: Date.now() - 3e4,
    accuracy: 5.1
  },
  {
    type: "active",
    message: "Position updated",
    timestamp: Date.now() - 1e4,
    accuracy: 3.8
  }
];
function formatDistance(metres) {
  if (metres < 1e3) return `${metres}m`;
  return `${(metres / 1e3).toFixed(2)}km`;
}
function formatDuration(seconds) {
  const s = Number(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
function formatPace(secPerKm) {
  if (!secPerKm) return "—";
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return `${m}:${s.toString().padStart(2, "0")}/km`;
}
function timeAgo(timestamp) {
  const ms = Number(timestamp / 1000000n);
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 6e4);
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(diff / 864e5);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
export {
  ChallengeType as C,
  Dumbbell as D,
  FitnessLevel as F,
  GpsStatusBadge as G,
  Layout as L,
  MessageRole as M,
  SAMPLE_ZONES as S,
  WorkoutType as W,
  formatDuration as a,
  SAMPLE_WORKOUTS as b,
  WORKOUT_TYPE_META as c,
  WorkoutStatus as d,
  formatPace as e,
  formatDistance as f,
  SAMPLE_GPS_EVENTS as g,
  SAMPLE_COACH_MESSAGES as h,
  SAMPLE_PROFILE as i,
  SAMPLE_POSTS as j,
  SAMPLE_LEADERBOARD as k,
  SAMPLE_COMPETITION as l,
  timeAgo as t
};
