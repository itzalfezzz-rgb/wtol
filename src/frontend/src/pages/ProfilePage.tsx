import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  BellOff,
  Bot,
  ChevronRight,
  Dumbbell,
  Flag,
  LogOut,
  MapPin,
  Settings,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import {
  SAMPLE_COMPETITION,
  SAMPLE_PROFILE,
  SAMPLE_WORKOUTS,
  SAMPLE_ZONES,
  formatDistance,
  formatDuration,
} from "../lib/sample-data";
import { FitnessLevel, WORKOUT_TYPE_META } from "../lib/types";

// ─── Constants ───────────────────────────────────────────────────────────────

const FITNESS_LABELS: Record<FitnessLevel, string> = {
  [FitnessLevel.beginner]: "Beginner",
  [FitnessLevel.intermediate]: "Intermediate",
  [FitnessLevel.advanced]: "Advanced",
  [FitnessLevel.elite]: "Elite",
};

const FITNESS_COLORS: Record<
  FitnessLevel,
  { color: string; bg: string; border: string }
> = {
  [FitnessLevel.beginner]: {
    color: "oklch(0.72 0.2 72)",
    bg: "oklch(0.72 0.2 72 / 0.1)",
    border: "oklch(0.72 0.2 72 / 0.3)",
  },
  [FitnessLevel.intermediate]: {
    color: "oklch(0.75 0.22 60)",
    bg: "oklch(0.75 0.22 60 / 0.1)",
    border: "oklch(0.75 0.22 60 / 0.3)",
  },
  [FitnessLevel.advanced]: {
    color: "oklch(0.68 0.18 80)",
    bg: "oklch(0.68 0.18 80 / 0.1)",
    border: "oklch(0.68 0.18 80 / 0.3)",
  },
  [FitnessLevel.elite]: {
    color: "oklch(0.65 0.20 45)",
    bg: "oklch(0.65 0.20 45 / 0.1)",
    border: "oklch(0.65 0.20 45 / 0.3)",
  },
};

type FitnessGoal =
  | "5K"
  | "10K"
  | "Half Marathon"
  | "Marathon"
  | "General Fitness";
const FITNESS_GOALS: FitnessGoal[] = [
  "5K",
  "10K",
  "Half Marathon",
  "Marathon",
  "General Fitness",
];

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  action,
}: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider">
        {title}
      </h2>
      {action}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
}: { label: string; value: string; icon?: React.ElementType }) {
  return (
    <div
      className="glass-card p-3 flex flex-col items-center text-center gap-0.5"
      style={{ borderColor: "oklch(0.28 0.01 50)" }}
    >
      {Icon && <Icon size={14} className="text-muted-foreground mb-0.5" />}
      <div
        className="font-display font-bold text-lg leading-tight"
        style={{ color: "oklch(0.72 0.2 72)" }}
      >
        {value}
      </div>
      <div className="text-muted-foreground text-[10px] leading-snug">
        {label}
      </div>
    </div>
  );
}

// ─── Edit Profile Dialog ──────────────────────────────────────────────────────

function EditProfileDialog({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [displayName, setDisplayName] = useState(SAMPLE_PROFILE.displayName);
  const [bio, setBio] = useState(SAMPLE_PROFILE.bio ?? "");
  const [location, setLocation] = useState(SAMPLE_PROFILE.locationLabel);
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>(
    SAMPLE_PROFILE.fitnessLevel,
  );
  const [weeklyHours, setWeeklyHours] = useState(
    Number(SAMPLE_PROFILE.weeklyAvailabilityHours),
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="profile.edit_dialog"
        className="max-w-sm w-[92vw] rounded-2xl"
        style={{
          background: "oklch(0.16 0.008 50 / 0.97)",
          backdropFilter: "blur(20px)",
          border: "1px solid oklch(0.72 0.2 72 / 0.2)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-foreground">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-1">
          <div className="space-y-1.5">
            <Label
              htmlFor="displayName"
              className="text-xs text-muted-foreground uppercase tracking-wide"
            >
              Display Name
            </Label>
            <Input
              id="displayName"
              data-ocid="profile.edit_name_input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="text-foreground"
              style={{
                background: "oklch(0.12 0.004 50)",
                borderColor: "oklch(0.28 0.01 50)",
              }}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="bio"
              className="text-xs text-muted-foreground uppercase tracking-wide"
            >
              Bio
            </Label>
            <Textarea
              id="bio"
              data-ocid="profile.edit_bio_input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="text-foreground resize-none"
              style={{
                background: "oklch(0.12 0.004 50)",
                borderColor: "oklch(0.28 0.01 50)",
              }}
              placeholder="Tell your story..."
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="location"
              className="text-xs text-muted-foreground uppercase tracking-wide"
            >
              Location
            </Label>
            <Input
              id="location"
              data-ocid="profile.edit_location_input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-foreground"
              style={{
                background: "oklch(0.12 0.004 50)",
                borderColor: "oklch(0.28 0.01 50)",
              }}
              placeholder="City, State"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">
              Fitness Level
            </Label>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.values(FitnessLevel) as FitnessLevel[]).map((level) => {
                const fc = FITNESS_COLORS[level];
                const isActive = fitnessLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    data-ocid={`profile.fitness_level.${level}`}
                    onClick={() => setFitnessLevel(level)}
                    className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                    style={
                      isActive
                        ? {
                            background: fc.bg,
                            border: `1px solid ${fc.border}`,
                            color: fc.color,
                          }
                        : {
                            background: "oklch(0.12 0.004 50)",
                            border: "1px solid oklch(0.24 0.01 50)",
                            color: "oklch(0.55 0.005 0)",
                          }
                    }
                  >
                    {FITNESS_LABELS[level]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="weeklyHours"
              className="text-xs text-muted-foreground uppercase tracking-wide"
            >
              Weekly Hours Available:{" "}
              <span className="text-foreground font-semibold">
                {weeklyHours}h
              </span>
            </Label>
            <input
              id="weeklyHours"
              data-ocid="profile.edit_weekly_hours_input"
              type="range"
              min={1}
              max={20}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>1h</span>
              <span>20h</span>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              data-ocid="profile.edit_cancel_button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="profile.edit_save_button"
              className="flex-1 font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                color: "oklch(0.10 0 0)",
              }}
              onClick={onClose}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Logout Dialog ────────────────────────────────────────────────────────────

function LogoutDialog({
  open,
  onClose,
  onConfirm,
}: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="profile.logout_dialog"
        className="max-w-sm w-[90vw] rounded-2xl"
        style={{
          background: "oklch(0.16 0.008 50 / 0.97)",
          backdropFilter: "blur(20px)",
          border: "1px solid oklch(0.72 0.2 72 / 0.2)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-foreground">
            Sign Out
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mt-1">
          Are you sure you want to sign out? Your territory will still be held
          while you're away.
        </p>
        <div className="flex gap-2 mt-4">
          <Button
            type="button"
            data-ocid="profile.logout_cancel_button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            data-ocid="profile.logout_confirm_button"
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
          >
            Sign Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Glass section card ───────────────────────────────────────────────────────

function GlassSection({
  children,
  style,
}: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="glass-card p-4"
      style={{ borderColor: "oklch(0.28 0.01 50)", ...style }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfilePage() {
  const profile = SAMPLE_PROFILE;
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [activeGoal, setActiveGoal] = useState<FitnessGoal>("General Fitness");
  const [notifyWorkouts, setNotifyWorkouts] = useState(true);
  const [notifyTakeovers, setNotifyTakeovers] = useState(true);
  const [notifyCompetitions, setNotifyCompetitions] = useState(false);

  const ownedZones = SAMPLE_ZONES.filter((z) => z.claimedAt !== undefined);
  const myRank = 4n;
  const fitnessColors = FITNESS_COLORS[profile.fitnessLevel];

  const handleLogout = () => {
    setShowLogout(false);
    void navigate({ to: "/login" });
  };

  return (
    <Layout
      headerTitle="Profile"
      headerAction={
        <button
          type="button"
          data-ocid="profile.settings_toggle"
          className="h-8 w-8 flex items-center justify-center rounded-lg transition-smooth text-muted-foreground hover:text-foreground"
          style={{ background: "oklch(0.18 0.008 50)" }}
          aria-label="Jump to settings"
          onClick={() => {
            const el = document.querySelector(
              '[data-ocid="profile.settings_section"]',
            );
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <Settings size={18} />
        </button>
      }
    >
      <div data-ocid="profile.page" className="flex flex-col gap-4 p-4 pb-8">
        {/* ── Profile Header ─────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 text-center relative overflow-hidden"
          style={{
            background: "oklch(0.16 0.008 50 / 0.85)",
            backdropFilter: "blur(16px)",
            border: "1px solid oklch(0.72 0.2 72 / 0.2)",
            boxShadow:
              "0 8px 32px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(0.72 0.2 72 / 0.08)",
          }}
        >
          {/* Gold radial glow top */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 40% at 50% 0%, oklch(0.68 0.18 70 / 0.15), transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative">
            {/* Avatar with gold ring */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
              style={{
                background: "oklch(0.72 0.2 72 / 0.15)",
                border: "2px solid oklch(0.72 0.2 72 / 0.5)",
                boxShadow: "0 0 24px oklch(0.68 0.18 70 / 0.3)",
              }}
            >
              <span
                className="font-display font-bold text-2xl"
                style={{ color: "oklch(0.72 0.2 72)" }}
              >
                {profile.displayName.charAt(0)}
                {profile.displayName.split(" ")[1]?.charAt(0)}
              </span>
            </div>

            <h1 className="font-display font-bold text-foreground text-xl leading-tight">
              {profile.displayName}
            </h1>
            <p className="text-muted-foreground text-xs mt-0.5">
              @{profile.username}
            </p>

            {profile.bio && (
              <p className="text-foreground/80 text-sm mt-2.5 max-w-xs mx-auto leading-relaxed">
                {profile.bio}
              </p>
            )}

            <div className="flex items-center justify-center gap-1.5 mt-2">
              <MapPin size={11} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {profile.locationLabel}
              </span>
            </div>

            {/* Badges row */}
            <div className="flex items-center justify-center flex-wrap gap-2 mt-3">
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  background: fitnessColors.bg,
                  borderColor: fitnessColors.border,
                  color: fitnessColors.color,
                }}
              >
                <Star size={10} className="mr-1" />
                {FITNESS_LABELS[profile.fitnessLevel]}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-border/60 text-muted-foreground"
              >
                <Dumbbell size={10} className="mr-1" />
                {String(profile.weeklyAvailabilityHours)}h/week
              </Badge>
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: "oklch(0.72 0.2 72 / 0.4)",
                  color: "oklch(0.72 0.2 72)",
                }}
              >
                <Trophy size={10} className="mr-1" />
                Rank #{String(myRank)}
              </Badge>
            </div>

            {/* Follower stats */}
            <div className="flex items-center justify-center gap-6 mt-4">
              {[
                { label: "Followers", value: String(profile.followersCount) },
                { label: "Following", value: String(profile.followingCount) },
                { label: "Zones", value: String(ownedZones.length) },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-6">
                  {i > 0 && (
                    <div
                      className="w-px h-8"
                      style={{ background: "oklch(0.28 0.01 50)" }}
                    />
                  )}
                  <div className="text-center">
                    <div className="font-display font-bold text-foreground text-base">
                      {s.value}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Edit Button ─────────────────────────────────────── */}
        <Button
          type="button"
          data-ocid="profile.edit_button"
          variant="outline"
          className="w-full font-medium"
          style={{
            borderColor: "oklch(0.72 0.2 72 / 0.3)",
            color: "oklch(0.72 0.2 72)",
          }}
          onClick={() => setShowEdit(true)}
        >
          Edit Profile
        </Button>

        {/* ── Stats Grid ──────────────────────────────────────── */}
        <div data-ocid="profile.stats_section">
          <SectionHeader title="Stats" />
          <div className="grid grid-cols-3 gap-2">
            <StatCard
              icon={Flag}
              label="km² territory"
              value={String(profile.totalTerritoryArea)}
            />
            <StatCard
              icon={TrendingUp}
              label="workouts"
              value={String(SAMPLE_WORKOUTS.length)}
            />
            <StatCard
              icon={MapPin}
              label="total distance"
              value={formatDistance(
                SAMPLE_WORKOUTS.reduce((s, w) => s + w.distanceMetres, 0),
              )}
            />
          </div>
        </div>

        <Separator style={{ background: "oklch(0.22 0.01 50)" }} />

        {/* ── Recent Workouts ─────────────────────────────────── */}
        <div data-ocid="profile.workouts_section">
          <SectionHeader
            title="Recent Workouts"
            action={
              <button
                type="button"
                data-ocid="profile.view_all_workouts_link"
                className="text-xs font-medium hover:underline transition-colors"
                style={{ color: "oklch(0.72 0.2 72)" }}
                onClick={() => void navigate({ to: "/workouts" })}
              >
                View all
              </button>
            }
          />
          <div className="space-y-2">
            {SAMPLE_WORKOUTS.slice(0, 5).map((workout, i) => {
              const meta = WORKOUT_TYPE_META[workout.workoutType];
              const dateStr = new Date(
                Number(workout.startedAt / 1_000_000n),
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
              return (
                <div
                  key={String(workout.id)}
                  data-ocid={`profile.workout.item.${i + 1}`}
                  className="rounded-xl px-3.5 py-3 flex items-center gap-3 transition-all duration-200"
                  style={{
                    background: "oklch(0.15 0.006 50)",
                    border: "1px solid oklch(0.22 0.01 50)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "oklch(0.20 0.01 50)" }}
                  >
                    {meta.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {meta.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {dateStr}
                      </span>
                    </div>
                    <div className="flex gap-2 text-xs text-muted-foreground font-mono mt-0.5">
                      {workout.distanceMetres > 0 && (
                        <span>{formatDistance(workout.distanceMetres)}</span>
                      )}
                      <span>{formatDuration(workout.durationSeconds)}</span>
                      {workout.caloriesBurned && (
                        <span>{workout.caloriesBurned} kcal</span>
                      )}
                    </div>
                  </div>
                  {workout.territoryZonesClaimed > 0n && (
                    <Badge
                      variant="outline"
                      className="text-[10px] h-5 px-1.5 flex-shrink-0"
                      style={{
                        borderColor: "oklch(0.72 0.2 72 / 0.4)",
                        color: "oklch(0.72 0.2 72)",
                      }}
                    >
                      +{String(workout.territoryZonesClaimed)} zones
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Separator style={{ background: "oklch(0.22 0.01 50)" }} />

        {/* ── Territory Owned ─────────────────────────────────── */}
        <div data-ocid="profile.territory_section">
          <SectionHeader
            title="Territory Owned"
            action={
              <button
                type="button"
                data-ocid="profile.view_map_link"
                className="text-xs font-medium hover:underline"
                style={{ color: "oklch(0.72 0.2 72)" }}
                onClick={() => void navigate({ to: "/" })}
              >
                View map
              </button>
            }
          />
          {ownedZones.length === 0 ? (
            <div
              data-ocid="profile.territory_empty_state"
              className="glass-card p-6 text-center"
              style={{ borderColor: "oklch(0.28 0.01 50)" }}
            >
              <Flag
                size={28}
                className="mx-auto text-muted-foreground mb-2 opacity-40"
              />
              <p className="text-sm text-muted-foreground">
                No territory claimed yet
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Go for a run to claim your first zone!
              </p>
            </div>
          ) : (
            <ScrollArea className="max-h-56">
              <div className="space-y-2 pr-1">
                {ownedZones.map((zone, i) => {
                  const dateStr = zone.claimedAt
                    ? new Date(
                        Number(zone.claimedAt / 1_000_000n),
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "—";
                  return (
                    <div
                      key={String(zone.id)}
                      data-ocid={`profile.territory.item.${i + 1}`}
                      className="rounded-xl px-3.5 py-3 flex items-center gap-3"
                      style={{
                        background: "oklch(0.15 0.006 50)",
                        border: "1px solid oklch(0.22 0.01 50)",
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          background: "oklch(0.72 0.2 72)",
                          boxShadow: "0 0 6px oklch(0.68 0.18 70 / 0.5)",
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-foreground truncate block">
                          {zone.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {zone.areaKm2} km²
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {dateStr}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>

        <Separator style={{ background: "oklch(0.22 0.01 50)" }} />

        {/* ── Training Plan ───────────────────────────────────── */}
        <div data-ocid="profile.training_plan_section">
          <SectionHeader title="Training Plan" />
          <div
            className="glass-card p-4"
            style={{ borderColor: "oklch(0.72 0.2 72 / 0.2)" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "oklch(0.72 0.2 72 / 0.12)",
                  border: "1px solid oklch(0.72 0.2 72 / 0.25)",
                }}
              >
                <Bot size={18} style={{ color: "oklch(0.72 0.2 72)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  AI Coach Plan — Week 2
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Interval training focus this week. 3 sessions targeting
                  Mission District density zones. Est. +4 zones claimed.
                </p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {["Mon: Tempo 5K", "Wed: Intervals", "Sat: Long Run"].map(
                    (day) => (
                      <span
                        key={day}
                        className="text-[10px] rounded px-2 py-0.5 font-mono"
                        style={{
                          background: "oklch(0.72 0.2 72 / 0.1)",
                          color: "oklch(0.72 0.2 72)",
                          border: "1px solid oklch(0.72 0.2 72 / 0.2)",
                        }}
                      >
                        {day}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
            <Button
              type="button"
              data-ocid="profile.view_coach_button"
              variant="outline"
              size="sm"
              className="w-full mt-3 transition-all duration-200"
              style={{
                borderColor: "oklch(0.72 0.2 72 / 0.3)",
                color: "oklch(0.72 0.2 72)",
              }}
              onClick={() => void navigate({ to: "/coach" })}
            >
              Open AI Coach
              <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>

        <Separator style={{ background: "oklch(0.22 0.01 50)" }} />

        {/* ── Competition History ─────────────────────────────── */}
        <div data-ocid="profile.competition_section">
          <SectionHeader
            title="Competition History"
            action={
              <button
                type="button"
                data-ocid="profile.view_competition_link"
                className="text-xs font-medium hover:underline"
                style={{ color: "oklch(0.72 0.2 72)" }}
                onClick={() => void navigate({ to: "/competition" })}
              >
                Active
              </button>
            }
          />
          <div className="space-y-2">
            {[
              { month: "April 2026", rank: 4, score: 12.4, active: true },
              { month: "March 2026", rank: 7, score: 8.9, active: false },
              { month: "February 2026", rank: 12, score: 5.2, active: false },
            ].map((comp, i) => (
              <div
                key={comp.month}
                data-ocid={`profile.competition.item.${i + 1}`}
                className="rounded-xl px-3.5 py-3 flex items-center gap-3"
                style={{
                  background: "oklch(0.15 0.006 50)",
                  border: "1px solid oklch(0.22 0.01 50)",
                }}
              >
                <Trophy
                  size={16}
                  style={{
                    color:
                      comp.rank === 1
                        ? "oklch(0.72 0.2 72)"
                        : comp.rank <= 3
                          ? "oklch(0.75 0.22 60)"
                          : "oklch(0.45 0.005 0)",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">
                    {comp.month}
                  </span>
                  <div className="text-xs text-muted-foreground mt-0.5 font-mono">
                    {comp.score} km² territory
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {comp.active && (
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-gold-pulse"
                      style={{
                        background: "oklch(0.72 0.2 72)",
                        boxShadow: "0 0 4px oklch(0.68 0.18 70)",
                      }}
                    />
                  )}
                  <span className="text-sm font-display font-bold text-foreground">
                    #{comp.rank}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator style={{ background: "oklch(0.22 0.01 50)" }} />

        {/* ── Settings ────────────────────────────────────────── */}
        <div data-ocid="profile.settings_section">
          <SectionHeader title="Settings" />

          {/* Fitness Goal */}
          <GlassSection style={{ marginBottom: "0.75rem" }}>
            <div className="flex items-center gap-2 mb-3">
              <Target size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Fitness Goal
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {FITNESS_GOALS.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  data-ocid={`profile.goal.${goal.toLowerCase().replace(/\s+/g, "_")}`}
                  onClick={() => setActiveGoal(goal)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-left transition-all duration-200"
                  style={
                    activeGoal === goal
                      ? {
                          background: "oklch(0.72 0.2 72 / 0.12)",
                          border: "1px solid oklch(0.72 0.2 72 / 0.4)",
                          color: "oklch(0.72 0.2 72)",
                        }
                      : {
                          background: "oklch(0.12 0.004 50)",
                          border: "1px solid oklch(0.24 0.01 50)",
                          color: "oklch(0.55 0.005 0)",
                        }
                  }
                >
                  {goal}
                </button>
              ))}
            </div>
          </GlassSection>

          {/* Notifications */}
          <GlassSection style={{ marginBottom: "0.75rem" }}>
            <div className="flex items-center gap-2 mb-3">
              <Bell size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Notifications
              </span>
            </div>
            <div className="space-y-3">
              {[
                {
                  label: "Workout reminders",
                  value: notifyWorkouts,
                  setter: setNotifyWorkouts,
                  ocid: "profile.notify_workouts_switch",
                },
                {
                  label: "Zone takeovers",
                  value: notifyTakeovers,
                  setter: setNotifyTakeovers,
                  ocid: "profile.notify_takeovers_switch",
                },
                {
                  label: "Competition updates",
                  value: notifyCompetitions,
                  setter: setNotifyCompetitions,
                  ocid: "profile.notify_competitions_switch",
                },
              ].map(({ label, value, setter, ocid }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {value ? (
                      <Bell size={12} style={{ color: "oklch(0.72 0.2 72)" }} />
                    ) : (
                      <BellOff size={12} className="text-muted-foreground" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <Switch
                    data-ocid={ocid}
                    checked={value}
                    onCheckedChange={setter}
                  />
                </div>
              ))}
            </div>
          </GlassSection>

          {/* Account */}
          <GlassSection>
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Account
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Username</span>
                <span className="text-xs text-foreground font-mono">
                  @{profile.username}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Member since
                </span>
                <span className="text-xs text-foreground font-mono">
                  {new Date(
                    Number(profile.joinedAt / 1_000_000n),
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Active competition
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.72 0.2 72)" }}
                >
                  {SAMPLE_COMPETITION.monthYear}
                </span>
              </div>
            </div>
          </GlassSection>
        </div>

        {/* ── Logout ──────────────────────────────────────────── */}
        <div className="pt-1">
          <Button
            type="button"
            data-ocid="profile.logout_button"
            variant="outline"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-smooth"
            onClick={() => setShowLogout(true)}
          >
            <LogOut size={15} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <EditProfileDialog open={showEdit} onClose={() => setShowEdit(false)} />
      <LogoutDialog
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </Layout>
  );
}
