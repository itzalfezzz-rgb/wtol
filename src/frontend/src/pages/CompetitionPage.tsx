import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Medal, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import {
  SAMPLE_COMPETITION,
  SAMPLE_LEADERBOARD,
  SAMPLE_PROFILE,
} from "../lib/sample-data";
import { ChallengeType, type LeaderboardEntry } from "../lib/types";

// Extended leaderboard with more entries
const EXTENDED_LEADERBOARD: LeaderboardEntry[] = [
  ...SAMPLE_LEADERBOARD,
  {
    userId: {} as never,
    username: "ShadowSprinter",
    rank: 9n,
    totalTerritoryArea: 6.4,
    locationLabel: "Oakland, CA",
  },
  {
    userId: {} as never,
    username: "DawnPatrol",
    rank: 10n,
    totalTerritoryArea: 5.8,
    locationLabel: "San Jose, CA",
  },
  {
    userId: {} as never,
    username: "AlleyRunner",
    rank: 11n,
    totalTerritoryArea: 5.2,
    locationLabel: "Berkeley, CA",
  },
  {
    userId: {} as never,
    username: "CityMapper",
    rank: 12n,
    totalTerritoryArea: 4.7,
    locationLabel: "San Francisco, CA",
  },
  {
    userId: {} as never,
    username: "TrailBlazer_V",
    rank: 13n,
    totalTerritoryArea: 4.1,
    locationLabel: "Fremont, CA",
  },
  {
    userId: {} as never,
    username: "NightOwlRun",
    rank: 14n,
    totalTerritoryArea: 3.8,
    locationLabel: "Daly City, CA",
  },
  {
    userId: {} as never,
    username: "StreetSeeker",
    rank: 15n,
    totalTerritoryArea: 3.3,
    locationLabel: "Oakland, CA",
  },
  {
    userId: {} as never,
    username: "LoopKing",
    rank: 16n,
    totalTerritoryArea: 2.9,
    locationLabel: "San Francisco, CA",
  },
  {
    userId: {} as never,
    username: "GridRunner",
    rank: 17n,
    totalTerritoryArea: 2.5,
    locationLabel: "Berkeley, CA",
  },
  {
    userId: {} as never,
    username: "ZoneCollector",
    rank: 18n,
    totalTerritoryArea: 2.1,
    locationLabel: "San Jose, CA",
  },
  {
    userId: {} as never,
    username: "PacePusher",
    rank: 19n,
    totalTerritoryArea: 1.8,
    locationLabel: "Fremont, CA",
  },
  {
    userId: {} as never,
    username: "TerritoryBoss",
    rank: 20n,
    totalTerritoryArea: 1.5,
    locationLabel: "Oakland, CA",
  },
];

const COMPETITION_USERNAMES: Record<number, string> = {
  1: "BlazeTerraform",
  2: "NightStrider99",
  3: "PacificRunner",
};

const COMPETITION_LOCATIONS: Record<number, string> = {
  1: "San Francisco, CA",
  2: "Oakland, CA",
  3: "San Jose, CA",
};

function formatChallengeType(type: ChallengeType): string {
  switch (type) {
    case ChallengeType.mostTerritory:
      return "Most Territory Claimed";
    case ChallengeType.mostDistance:
      return "Most Distance Run";
    case ChallengeType.mostTakedowns:
      return "Most Takedowns";
    case ChallengeType.mostWorkouts:
      return "Most Workouts";
  }
}

function useCountdown(endsAt: bigint) {
  const endMs = Number(endsAt / 1_000_000n);
  const [remaining, setRemaining] = useState(Math.max(0, endMs - Date.now()));
  useEffect(() => {
    const tick = setInterval(
      () => setRemaining(Math.max(0, endMs - Date.now())),
      1000,
    );
    return () => clearInterval(tick);
  }, [endMs]);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center"
        style={{
          background: "oklch(0.13 0.006 50)",
          border: "1px solid oklch(0.72 0.2 72 / 0.25)",
          boxShadow: "0 0 12px oklch(0.68 0.18 70 / 0.1)",
        }}
      >
        <span
          className="text-2xl font-display font-bold tabular-nums"
          style={{ color: "oklch(0.82 0.16 72)" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

function CompetitionBadge() {
  return (
    <motion.div
      animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.06, 1] }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="relative w-20 h-20 flex items-center justify-center shrink-0"
    >
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-40"
        style={{ background: "oklch(0.68 0.18 70 / 0.2)" }}
      />
      <div
        className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
          boxShadow: "0 0 24px oklch(0.68 0.18 70 / 0.4)",
        }}
      >
        <Trophy className="w-9 h-9" style={{ color: "oklch(0.10 0 0)" }} />
      </div>
    </motion.div>
  );
}

type PodiumRank = 1 | 2 | 3;

function PodiumCard({
  rank,
  username,
  score,
  location,
  delay,
}: {
  rank: PodiumRank;
  username: string;
  score: number;
  location: string;
  delay: number;
}) {
  const configs: Record<
    PodiumRank,
    { bg: string; badge: string; icon: string; glow: string }
  > = {
    1: {
      bg: "oklch(0.72 0.2 72 / 0.08)",
      badge: "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
      icon: "🥇",
      glow: "0 0 20px oklch(0.68 0.18 70 / 0.3)",
    },
    2: {
      bg: "oklch(0.18 0.01 50)",
      badge: "oklch(0.35 0.005 50)",
      icon: "🥈",
      glow: "none",
    },
    3: {
      bg: "oklch(0.65 0.20 45 / 0.08)",
      badge: "oklch(0.65 0.20 45 / 0.3)",
      icon: "🥉",
      glow: "0 0 16px oklch(0.65 0.20 45 / 0.2)",
    },
  };
  const c = configs[rank];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex-1 rounded-xl p-3 flex flex-col items-center gap-2"
      style={{
        background: c.bg,
        border: `1px solid oklch(0.72 0.2 72 / ${rank === 1 ? "0.3" : "0.12"})`,
        boxShadow: c.glow,
      }}
      data-ocid={`competition.podium.item.${rank}`}
    >
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full"
        style={{
          background: c.badge,
          color: rank === 1 ? "oklch(0.10 0 0)" : "oklch(0.80 0.005 0)",
        }}
      >
        {c.icon} {rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"}
      </span>
      <Avatar
        className="w-11 h-11"
        style={{
          border: rank === 1 ? "2px solid oklch(0.72 0.2 72 / 0.6)" : undefined,
        }}
      >
        <AvatarFallback
          className="font-semibold text-xs"
          style={{
            background: "oklch(0.20 0.01 50)",
            color: rank === 1 ? "oklch(0.72 0.2 72)" : "oklch(0.70 0.005 0)",
          }}
        >
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="text-center min-w-0 w-full">
        <p className="font-semibold text-xs truncate text-foreground">
          {username}
        </p>
        <p className="text-[10px] text-muted-foreground truncate">{location}</p>
        <p
          className="text-sm font-bold mt-0.5"
          style={{
            color: rank === 1 ? "oklch(0.72 0.2 72)" : "oklch(0.75 0.005 0)",
          }}
        >
          {score.toFixed(1)} km²
        </p>
      </div>
    </motion.div>
  );
}

function StandingsRow({
  rank,
  username,
  score,
  location,
  isCurrentUser,
  index,
}: {
  rank: number;
  username: string;
  score: number;
  location: string;
  isCurrentUser: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth"
      style={{
        background: isCurrentUser
          ? "oklch(0.72 0.2 72 / 0.1)"
          : "oklch(0.15 0.006 50)",
        border: `1px solid ${isCurrentUser ? "oklch(0.72 0.2 72 / 0.3)" : "oklch(0.22 0.01 50)"}`,
      }}
      data-ocid={`competition.standings.item.${index + 1}`}
    >
      <span
        className="w-7 text-center text-sm font-bold tabular-nums shrink-0"
        style={{
          color: rank <= 3 ? "oklch(0.72 0.2 72)" : "oklch(0.50 0.005 0)",
        }}
      >
        {rank}
      </span>
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarFallback
          className="text-xs font-semibold"
          style={{
            background: "oklch(0.20 0.01 50)",
            color: "oklch(0.75 0.005 0)",
          }}
        >
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate text-foreground">
          {username}
          {isCurrentUser && (
            <span
              className="ml-1.5 text-xs"
              style={{ color: "oklch(0.72 0.2 72)" }}
            >
              (You)
            </span>
          )}
        </p>
        <p className="text-xs text-muted-foreground truncate">{location}</p>
      </div>
      <span className="text-sm font-semibold tabular-nums shrink-0 text-foreground">
        {score.toFixed(1)} km²
      </span>
    </motion.div>
  );
}

function LeaderboardRow({
  entry,
  isCurrentUser,
  index,
}: {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
  index: number;
}) {
  const rank = Number(entry.rank);
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth"
      style={{
        background: isCurrentUser
          ? "oklch(0.72 0.2 72 / 0.1)"
          : "oklch(0.15 0.006 50)",
        border: `1px solid ${isCurrentUser ? "oklch(0.72 0.2 72 / 0.3)" : "oklch(0.22 0.01 50)"}`,
      }}
      data-ocid={`leaderboard.item.${index + 1}`}
    >
      <span
        className="w-7 text-center text-sm font-bold tabular-nums shrink-0"
        style={{
          color: rank <= 3 ? "oklch(0.72 0.2 72)" : "oklch(0.50 0.005 0)",
        }}
      >
        {rank}
      </span>
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarFallback
          className="text-xs font-semibold"
          style={{
            background: "oklch(0.20 0.01 50)",
            color: "oklch(0.75 0.005 0)",
          }}
        >
          {entry.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate text-foreground">
          {entry.username}
          {isCurrentUser && (
            <span
              className="ml-1.5 text-xs"
              style={{ color: "oklch(0.72 0.2 72)" }}
            >
              (You)
            </span>
          )}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {entry.locationLabel}
        </p>
      </div>
      <span className="text-sm font-semibold tabular-nums shrink-0 text-foreground">
        {entry.totalTerritoryArea.toFixed(1)} km²
      </span>
    </motion.div>
  );
}

export default function CompetitionPage() {
  const competition = SAMPLE_COMPETITION;
  const { days, hours, minutes, seconds } = useCountdown(competition.endsAt);
  const [isJoined, setIsJoined] = useState(false);
  const [locationFilter, setLocationFilter] = useState<string>("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loc = params.get("location");
    if (loc) setLocationFilter(loc);
  }, []);

  function handleLocationChange(value: string) {
    setLocationFilter(value);
    const params = new URLSearchParams(window.location.search);
    if (value === "all") params.delete("location");
    else params.set("location", value);
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.replaceState({}, "", newUrl);
  }

  const allLocations = Array.from(
    new Set(EXTENDED_LEADERBOARD.map((e) => e.locationLabel)),
  ).sort();
  const filteredLeaderboard =
    locationFilter === "all"
      ? EXTENDED_LEADERBOARD
      : EXTENDED_LEADERBOARD.filter((e) => e.locationLabel === locationFilter);

  const fullStandings = EXTENDED_LEADERBOARD.slice(0, 20).map((entry, i) => ({
    rank: i + 1,
    username: entry.username,
    score: entry.totalTerritoryArea,
    location: entry.locationLabel,
    isCurrentUser: entry.username === SAMPLE_PROFILE.username,
  }));

  const prizes = [
    { place: "1st Place", prize: competition.prizes[0], icon: "🥇" },
    { place: "2nd Place", prize: competition.prizes[1], icon: "🥈" },
    { place: "3rd Place", prize: competition.prizes[2], icon: "🥉" },
  ];

  return (
    <Layout headerTitle="Competition">
      <div
        className="max-w-lg mx-auto px-4 py-6 space-y-6"
        data-ocid="competition.page"
      >
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Competition
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Monthly territory battles
            </p>
          </div>
          <CompetitionBadge />
        </motion.div>

        {/* Challenge Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          data-ocid="competition.challenge.card"
        >
          <div
            className="glass-card overflow-hidden"
            style={{ borderColor: "oklch(0.72 0.2 72 / 0.2)" }}
          >
            {/* Gold gradient top bar */}
            <div
              className="h-1 w-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.72 0.2 72), oklch(0.75 0.22 60), oklch(0.72 0.2 72))",
              }}
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.72 0.2 72 / 0.15)",
                    border: "1px solid oklch(0.72 0.2 72 / 0.3)",
                    color: "oklch(0.72 0.2 72)",
                  }}
                >
                  🟢 LIVE
                </span>
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">
                {competition.monthYear} Challenge
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {formatChallengeType(competition.challengeType)}
              </p>

              {/* Countdown */}
              <div className="mt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                  Time Remaining
                </p>
                <div className="flex items-start gap-2">
                  <CountdownUnit value={days} label="days" />
                  <span className="text-xl font-bold text-muted-foreground mt-3">
                    :
                  </span>
                  <CountdownUnit value={hours} label="hrs" />
                  <span className="text-xl font-bold text-muted-foreground mt-3">
                    :
                  </span>
                  <CountdownUnit value={minutes} label="min" />
                  <span className="text-xl font-bold text-muted-foreground mt-3">
                    :
                  </span>
                  <CountdownUnit value={seconds} label="sec" />
                </div>
              </div>

              {/* Join CTA */}
              <div className="mt-4">
                {!isJoined ? (
                  <Button
                    type="button"
                    className="w-full font-semibold transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                      color: "oklch(0.10 0 0)",
                      boxShadow: "0 4px 16px oklch(0.68 0.18 70 / 0.35)",
                    }}
                    onClick={() => setIsJoined(true)}
                    data-ocid="competition.join_button"
                  >
                    🏆 Compete This Month
                  </Button>
                ) : (
                  <div
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium"
                    data-ocid="competition.joined_state"
                    style={{
                      background: "oklch(0.72 0.2 72 / 0.1)",
                      border: "1px solid oklch(0.72 0.2 72 / 0.3)",
                      color: "oklch(0.72 0.2 72)",
                    }}
                  >
                    ✓ You're competing this month
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-base font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Crown
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.2 72)" }}
            />
            Top Performers
          </h2>
          <div className="flex gap-2 items-end">
            <PodiumCard
              rank={2}
              username={COMPETITION_USERNAMES[2]}
              score={competition.standings[1].score}
              location={COMPETITION_LOCATIONS[2]}
              delay={0.3}
            />
            <PodiumCard
              rank={1}
              username={COMPETITION_USERNAMES[1]}
              score={competition.standings[0].score}
              location={COMPETITION_LOCATIONS[1]}
              delay={0.2}
            />
            <PodiumCard
              rank={3}
              username={COMPETITION_USERNAMES[3]}
              score={competition.standings[2].score}
              location={COMPETITION_LOCATIONS[3]}
              delay={0.4}
            />
          </div>
        </motion.div>

        {/* Prizes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          data-ocid="competition.prizes.section"
        >
          <h2 className="text-base font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Trophy
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.2 72)" }}
            />
            Prizes
          </h2>
          <div
            className="glass-card overflow-hidden"
            style={{ borderColor: "oklch(0.72 0.2 72 / 0.15)" }}
          >
            {prizes.map((p, i) => (
              <div
                key={p.place}
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  borderBottom:
                    i < prizes.length - 1
                      ? "1px solid oklch(0.22 0.01 50)"
                      : undefined,
                  borderLeft:
                    i === 0
                      ? "3px solid oklch(0.72 0.2 72)"
                      : i === 1
                        ? "3px solid oklch(0.65 0.15 50)"
                        : "3px solid oklch(0.65 0.20 45)",
                }}
                data-ocid={`competition.prize.item.${i + 1}`}
              >
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {p.place}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {p.prize}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Full Standings */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          data-ocid="competition.standings.section"
        >
          <h2 className="text-base font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Medal className="w-4 h-4 text-muted-foreground" />
            Full Standings
          </h2>
          <ScrollArea
            className="h-72 rounded-xl"
            style={{ border: "1px solid oklch(0.22 0.01 50)" }}
          >
            <div className="p-3 space-y-1.5">
              {fullStandings.map((s, i) => (
                <StandingsRow
                  key={s.username}
                  rank={s.rank}
                  username={s.username}
                  score={s.score}
                  location={s.location}
                  isCurrentUser={s.isCurrentUser}
                  index={i}
                />
              ))}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Territory Leaders Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          data-ocid="leaderboard.section"
        >
          <h2 className="text-base font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-4 h-4" style={{ color: "oklch(0.72 0.2 72)" }} />
            Territory Leaders
          </h2>

          <Tabs defaultValue="global">
            <TabsList className="w-full mb-4" data-ocid="leaderboard.tabs">
              <TabsTrigger
                value="global"
                className="flex-1"
                data-ocid="leaderboard.global.tab"
              >
                Global
              </TabsTrigger>
              <TabsTrigger
                value="location"
                className="flex-1"
                data-ocid="leaderboard.location.tab"
              >
                By Location
              </TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="mt-0">
              <ScrollArea
                className="h-80 rounded-xl"
                style={{ border: "1px solid oklch(0.22 0.01 50)" }}
              >
                <div className="p-3 space-y-1.5">
                  {EXTENDED_LEADERBOARD.map((entry, i) => (
                    <LeaderboardRow
                      key={entry.username}
                      entry={entry}
                      isCurrentUser={entry.username === SAMPLE_PROFILE.username}
                      index={i}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="location" className="mt-0 space-y-3">
              <Select
                value={locationFilter}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger
                  className="w-full"
                  data-ocid="leaderboard.location.select"
                >
                  <SelectValue placeholder="Select a location..." />
                </SelectTrigger>
                <SelectContent data-ocid="leaderboard.location.dropdown_menu">
                  <SelectItem value="all">All Locations</SelectItem>
                  {allLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <ScrollArea
                className="h-72 rounded-xl"
                style={{ border: "1px solid oklch(0.22 0.01 50)" }}
              >
                <div className="p-3 space-y-1.5">
                  {filteredLeaderboard.length > 0 ? (
                    filteredLeaderboard.map((entry, i) => (
                      <LeaderboardRow
                        key={entry.username}
                        entry={entry}
                        isCurrentUser={
                          entry.username === SAMPLE_PROFILE.username
                        }
                        index={i}
                      />
                    ))
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center py-10 text-center"
                      data-ocid="leaderboard.location.empty_state"
                    >
                      <span className="text-3xl mb-2">📍</span>
                      <p className="text-sm font-medium text-muted-foreground">
                        No runners found in this location
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </motion.div>

        <div className="h-4" />
      </div>
    </Layout>
  );
}
