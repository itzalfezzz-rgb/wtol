import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  MapPin,
  Timer,
  Trash2,
  Trophy,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { GpsStatusBadge } from "../components/GpsStatusBadge";
import { Layout } from "../components/Layout";
import { useGps } from "../hooks/useGps";
import {
  SAMPLE_GPS_EVENTS,
  SAMPLE_WORKOUTS,
  formatDistance,
  formatDuration,
  formatPace,
} from "../lib/sample-data";
import {
  WORKOUT_TYPE_META,
  WorkoutStatus,
  type WorkoutSummary,
  WorkoutType,
} from "../lib/types";

// ─── Gold button style helper ─────────────────────────────────────────────────

const goldButtonStyle = {
  background:
    "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
  color: "oklch(0.10 0 0)",
  boxShadow: "0 4px 16px oklch(0.68 0.18 70 / 0.35)",
  border: "1px solid oklch(0.72 0.2 72 / 0.5)",
};

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterKey = "all" | "runs" | "cardio" | "strength";

const FILTER_TABS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "runs", label: "Runs" },
  { key: "cardio", label: "Cardio" },
  { key: "strength", label: "Strength" },
];

const GPS_TYPES = new Set([
  WorkoutType.run,
  WorkoutType.cycling,
  WorkoutType.walking,
]);

function matchesFilter(w: WorkoutSummary, f: FilterKey): boolean {
  if (f === "all") return true;
  if (f === "runs") return w.workoutType === WorkoutType.run;
  if (f === "cardio")
    return (
      w.workoutType === WorkoutType.cycling ||
      w.workoutType === WorkoutType.walking ||
      w.workoutType === WorkoutType.hiit
    );
  if (f === "strength")
    return (
      w.workoutType === WorkoutType.strength ||
      w.workoutType === WorkoutType.yoga ||
      w.workoutType === WorkoutType.other
    );
  return true;
}

// ─── Workout type selector ────────────────────────────────────────────────────

const WORKOUT_TYPES = Object.values(WorkoutType);

interface TypeSelectorProps {
  selected: WorkoutType;
  onChange: (t: WorkoutType) => void;
}

function WorkoutTypeSelector({ selected, onChange }: TypeSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {WORKOUT_TYPES.map((t) => {
        const meta = WORKOUT_TYPE_META[t];
        const isSelected = selected === t;
        return (
          <button
            key={t}
            type="button"
            data-ocid={`workout_type.${t}`}
            onClick={() => onChange(t)}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200"
            style={
              isSelected
                ? {
                    border: "1px solid oklch(0.72 0.2 72 / 0.5)",
                    background: "oklch(0.72 0.2 72 / 0.12)",
                    boxShadow: "0 0 12px oklch(0.68 0.18 70 / 0.2)",
                  }
                : {
                    border: "1px solid oklch(0.24 0.01 50)",
                    background: "oklch(0.15 0.006 50)",
                  }
            }
          >
            <span className="text-2xl leading-none">{meta.emoji}</span>
            <span
              className="text-[10px] font-medium"
              style={{
                color: isSelected
                  ? "oklch(0.72 0.2 72)"
                  : "oklch(0.50 0.005 0)",
              }}
            >
              {meta.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Active GPS workout ───────────────────────────────────────────────────────

interface ActiveGpsWorkoutProps {
  workoutType: WorkoutType;
  onComplete: (summary: Partial<WorkoutSummary>) => void;
  onCancel: () => void;
}

function ActiveGpsWorkout({
  workoutType,
  onComplete,
  onCancel,
}: ActiveGpsWorkoutProps) {
  const gps = useGps();
  const [elapsed, setElapsed] = useState(0);
  const [distance, setDistance] = useState(0);
  const startRef = useRef(Date.now());
  const prevPosRef = useRef<{ lat: number; lng: number } | null>(null);

  const { startTracking, stopTracking } = gps;
  useEffect(() => {
    startTracking();
    return () => stopTracking();
  }, [startTracking, stopTracking]);

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!gps.position) return;
    const pos = gps.position;
    if (prevPosRef.current) {
      const d = haversineMetres(prevPosRef.current, pos);
      setDistance((prev) => prev + d);
    }
    prevPosRef.current = { lat: pos.lat, lng: pos.lng };
  }, [gps.position]);

  const pace = distance > 0 ? elapsed / (distance / 1000) : null;
  const meta = WORKOUT_TYPE_META[workoutType];

  function handleComplete() {
    gps.stopTracking();
    onComplete({
      workoutType,
      distanceMetres: distance,
      durationSeconds: BigInt(elapsed),
      averagePaceSecondsPerKm: pace ?? undefined,
      territoryZonesClaimed: BigInt(Math.floor(distance / 2500)),
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl p-5 space-y-4"
      style={{
        background: "oklch(0.16 0.008 50 / 0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid oklch(0.72 0.2 72 / 0.25)",
        boxShadow: "0 8px 32px oklch(0 0 0 / 0.3)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{meta.emoji}</span>
          <span className="font-display font-semibold text-foreground">
            {meta.label} in Progress
          </span>
        </div>
        <GpsStatusBadge status={gps.status} accuracy={gps.accuracy} />
      </div>

      {gps.errorMessage && (
        <div
          data-ocid="gps.error_state"
          className="text-xs rounded-lg px-3 py-2"
          style={{
            color: "oklch(0.62 0.28 15)",
            background: "oklch(0.62 0.28 15 / 0.1)",
            border: "1px solid oklch(0.62 0.28 15 / 0.2)",
          }}
        >
          {gps.errorMessage}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {[
          {
            icon: <Timer size={14} />,
            label: "Time",
            value: formatDuration(BigInt(elapsed)),
          },
          {
            icon: <MapPin size={14} />,
            label: "Distance",
            value: formatDistance(Math.round(distance)),
          },
          {
            icon: <Zap size={14} />,
            label: "Pace",
            value: pace ? formatPace(pace) : "—",
          },
        ].map(({ icon, label, value }) => (
          <div
            key={label}
            className="glass-card text-center p-3"
            style={{ borderColor: "oklch(0.28 0.01 50)" }}
          >
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              {icon}
              <span className="text-[10px]">{label}</span>
            </div>
            <div className="font-display font-bold text-foreground text-base leading-tight">
              {value}
            </div>
          </div>
        ))}
      </div>

      {gps.gpsEvents.length > 0 && (
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {gps.gpsEvents.slice(0, 3).map((ev, i) => (
            <div
              key={`${ev.timestamp}-${i}`}
              className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background:
                    ev.type === "active"
                      ? "oklch(0.72 0.2 72)"
                      : ev.type === "error"
                        ? "oklch(0.62 0.28 15)"
                        : "oklch(0.45 0 0)",
                }}
              />
              {ev.message}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          data-ocid="workout.complete_button"
          className="flex-1 font-semibold"
          style={goldButtonStyle}
          onClick={handleComplete}
        >
          <CheckCircle2 size={15} className="mr-1.5" />
          Complete
        </Button>
        <Button
          type="button"
          variant="outline"
          data-ocid="workout.cancel_button"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Manual workout form ──────────────────────────────────────────────────────

interface ManualFormProps {
  workoutType: WorkoutType;
  onSave: (summary: Partial<WorkoutSummary>) => void;
  onCancel: () => void;
}

function ManualWorkoutForm({ workoutType, onSave, onCancel }: ManualFormProps) {
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("30");
  const [notes, setNotes] = useState("");
  const meta = WORKOUT_TYPE_META[workoutType];

  function handleSave() {
    const h = Number.parseInt(hours) || 0;
    const m = Number.parseInt(minutes) || 0;
    const totalSecs = h * 3600 + m * 60;
    if (totalSecs === 0) return;
    onSave({
      workoutType,
      distanceMetres: 0,
      durationSeconds: BigInt(totalSecs),
      territoryZonesClaimed: 0n,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 space-y-4"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{meta.emoji}</span>
        <span className="font-display font-semibold text-foreground">
          {meta.label} Details
        </span>
      </div>

      <div className="space-y-3">
        <Label className="text-xs text-muted-foreground font-medium">
          Duration
        </Label>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              data-ocid="manual_workout.hours_input"
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="pr-10 bg-background"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              h
            </span>
          </div>
          <div className="flex-1 relative">
            <Input
              data-ocid="manual_workout.minutes_input"
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="pr-10 bg-background"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              m
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          className="text-xs text-muted-foreground font-medium"
          htmlFor="workout-notes"
        >
          Notes (optional)
        </Label>
        <Textarea
          id="workout-notes"
          data-ocid="manual_workout.notes_textarea"
          placeholder="How did it feel? Any wins today?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="bg-background resize-none h-20 text-sm"
        />
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          data-ocid="manual_workout.save_button"
          className="flex-1 font-semibold"
          style={goldButtonStyle}
          onClick={handleSave}
        >
          Save Workout
        </Button>
        <Button
          type="button"
          variant="outline"
          data-ocid="manual_workout.cancel_button"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Workout complete summary ─────────────────────────────────────────────────

interface CompleteSummaryProps {
  workout: Partial<WorkoutSummary>;
  onDismiss: () => void;
}

function WorkoutCompleteSummary({ workout, onDismiss }: CompleteSummaryProps) {
  const meta = WORKOUT_TYPE_META[workout.workoutType ?? WorkoutType.other];
  const zonesEst = workout.territoryZonesClaimed ?? 0n;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl p-5 space-y-4"
      style={{
        background: "oklch(0.16 0.008 50 / 0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid oklch(0.72 0.2 72 / 0.3)",
        boxShadow:
          "0 8px 32px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(0.72 0.2 72 / 0.08)",
      }}
    >
      <div className="text-center space-y-1">
        <div className="text-4xl">{meta.emoji}</div>
        <div className="font-display font-bold text-foreground text-lg">
          Workout Complete!
        </div>
        <div className="text-xs text-muted-foreground">{meta.label}</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          {
            icon: <Clock size={13} />,
            label: "Duration",
            value: formatDuration(workout.durationSeconds ?? 0n),
          },
          {
            icon: <MapPin size={13} />,
            label: "Distance",
            value:
              workout.distanceMetres && workout.distanceMetres > 0
                ? formatDistance(workout.distanceMetres)
                : "—",
          },
          {
            icon: <Zap size={13} />,
            label: "Pace",
            value: workout.averagePaceSecondsPerKm
              ? formatPace(workout.averagePaceSecondsPerKm)
              : "—",
          },
          {
            icon: <Trophy size={13} />,
            label: "Zones Claimed",
            value: `${String(zonesEst)} zones`,
          },
        ].map(({ icon, label, value }) => (
          <div
            key={label}
            className="glass-card p-3 flex items-center gap-2"
            style={{ borderColor: "oklch(0.28 0.01 50)" }}
          >
            <span style={{ color: "oklch(0.72 0.2 72)" }}>{icon}</span>
            <div>
              <div className="text-[10px] text-muted-foreground">{label}</div>
              <div className="font-semibold text-foreground text-sm">
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {zonesEst > 0n && (
        <div
          className="rounded-xl px-3 py-2 text-center"
          style={{
            background: "oklch(0.72 0.2 72 / 0.1)",
            border: "1px solid oklch(0.72 0.2 72 / 0.2)",
          }}
        >
          <span
            className="text-xs font-medium"
            style={{ color: "oklch(0.72 0.2 72)" }}
          >
            🗺️ You claimed approximately {String(zonesEst)} territory zone
            {zonesEst !== 1n ? "s" : ""}!
          </span>
        </div>
      )}

      <Button
        type="button"
        data-ocid="workout_complete.dismiss_button"
        className="w-full font-semibold"
        style={goldButtonStyle}
        onClick={onDismiss}
      >
        Done
      </Button>
    </motion.div>
  );
}

// ─── History item ─────────────────────────────────────────────────────────────

interface HistoryItemProps {
  workout: WorkoutSummary;
  index: number;
  onDelete: (id: bigint) => void;
}

function HistoryItem({ workout, index, onDelete }: HistoryItemProps) {
  const [expanded, setExpanded] = useState(false);
  const meta = WORKOUT_TYPE_META[workout.workoutType];

  const date = new Date(Number(workout.startedAt / 1_000_000n));
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      data-ocid={`workout_history.item.${index}`}
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: "oklch(0.15 0.006 50)",
        border: `1px solid ${expanded ? "oklch(0.72 0.2 72 / 0.25)" : "oklch(0.22 0.01 50)"}`,
      }}
    >
      <button
        type="button"
        data-ocid={`workout_history.expand.${index}`}
        className="w-full flex items-center gap-3 p-4 text-left"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl"
          style={{ background: "oklch(0.20 0.01 50)" }}
          aria-hidden="true"
        >
          {meta.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-foreground text-sm">
              {meta.label}
            </span>
            {workout.territoryZonesClaimed > 0n && (
              <Badge
                variant="outline"
                className="text-[10px] h-4 px-1.5"
                style={{
                  borderColor: "oklch(0.72 0.2 72 / 0.4)",
                  color: "oklch(0.72 0.2 72)",
                }}
              >
                +{String(workout.territoryZonesClaimed)} zones
              </Badge>
            )}
            <span className="text-[10px] text-muted-foreground ml-auto pr-1">
              {dateStr} · {timeStr}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono flex-wrap">
            {workout.distanceMetres > 0 && (
              <span className="flex items-center gap-1">
                <MapPin size={10} /> {formatDistance(workout.distanceMetres)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={10} /> {formatDuration(workout.durationSeconds)}
            </span>
            {workout.averagePaceSecondsPerKm && (
              <span className="flex items-center gap-1">
                <Zap size={10} /> {formatPace(workout.averagePaceSecondsPerKm)}
              </span>
            )}
            {workout.caloriesBurned && (
              <span className="flex items-center gap-1">
                <Flame size={10} /> {workout.caloriesBurned} kcal
              </span>
            )}
          </div>
        </div>

        <span
          className="text-muted-foreground flex-shrink-0"
          aria-hidden="true"
        >
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 pt-3 space-y-3"
              style={{ borderTop: "1px solid oklch(0.22 0.01 50)" }}
            >
              <div>
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Route Stats
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      label: "Distance",
                      value:
                        workout.distanceMetres > 0
                          ? formatDistance(workout.distanceMetres)
                          : "—",
                    },
                    {
                      label: "Duration",
                      value: formatDuration(workout.durationSeconds),
                    },
                    {
                      label: "Avg Pace",
                      value: formatPace(workout.averagePaceSecondsPerKm),
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-lg p-2.5 text-center"
                      style={{ background: "oklch(0.12 0.004 50)" }}
                    >
                      <div className="text-[10px] text-muted-foreground">
                        {label}
                      </div>
                      <div className="font-mono font-semibold text-foreground text-xs mt-0.5">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  GPS Events Logged
                </div>
                <div className="space-y-1">
                  {SAMPLE_GPS_EVENTS.map((ev, j) => (
                    <div
                      key={`${ev.timestamp}-${j}`}
                      className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono rounded px-2 py-1.5"
                      style={{ background: "oklch(0.12 0.004 50)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background:
                            ev.type === "active"
                              ? "oklch(0.72 0.2 72)"
                              : "oklch(0.40 0 0)",
                        }}
                      />
                      <span className="flex-1 truncate">{ev.message}</span>
                      {ev.accuracy && (
                        <span
                          className="flex-shrink-0"
                          style={{ color: "oklch(0.72 0.2 72)" }}
                        >
                          ±{ev.accuracy}m
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {workout.territoryZonesClaimed > 0n && (
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Territory Zones Claimed
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-2"
                    style={{
                      background: "oklch(0.72 0.2 72 / 0.1)",
                      border: "1px solid oklch(0.72 0.2 72 / 0.2)",
                    }}
                  >
                    <Trophy
                      size={13}
                      style={{ color: "oklch(0.72 0.2 72)" }}
                      className="flex-shrink-0"
                    />
                    <span className="text-xs text-foreground font-medium">
                      {String(workout.territoryZonesClaimed)} zone
                      {workout.territoryZonesClaimed !== 1n ? "s" : ""} claimed
                      in this workout
                    </span>
                  </div>
                </div>
              )}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    data-ocid={`workout_history.delete_button.${index}`}
                    className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 mt-1"
                  >
                    <Trash2 size={13} className="mr-1.5" />
                    Delete Workout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-ocid="workout_history.delete_dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Workout?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently remove this{" "}
                      {meta.label.toLowerCase()} from your history. Any
                      territory claimed will remain.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-ocid="workout_history.delete_cancel_button">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      data-ocid="workout_history.delete_confirm_button"
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => onDelete(workout.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Haversine helper ─────────────────────────────────────────────────────────

function haversineMetres(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6_371_000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

// ─── Main page ────────────────────────────────────────────────────────────────

type PageMode =
  | "idle"
  | "selecting"
  | "gps_active"
  | "manual_form"
  | "complete";

export default function WorkoutsPage() {
  const [mode, setMode] = useState<PageMode>("idle");
  const [selectedType, setSelectedType] = useState<WorkoutType>(
    WorkoutType.run,
  );
  const [completedWorkout, setCompletedWorkout] =
    useState<Partial<WorkoutSummary> | null>(null);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [workouts, setWorkouts] = useState<WorkoutSummary[]>(SAMPLE_WORKOUTS);

  const filteredWorkouts = workouts.filter((w) => matchesFilter(w, filter));
  const totalKm = workouts.reduce((s, w) => s + w.distanceMetres / 1000, 0);
  const totalZones = workouts.reduce(
    (s, w) => s + Number(w.territoryZonesClaimed),
    0,
  );

  function handleStartTracking() {
    if (GPS_TYPES.has(selectedType)) {
      setMode("gps_active");
    } else {
      setMode("manual_form");
    }
  }

  function handleWorkoutComplete(summary: Partial<WorkoutSummary>) {
    const newWorkout: WorkoutSummary = {
      id: BigInt(Date.now()),
      userId: {} as never,
      workoutType: summary.workoutType ?? WorkoutType.other,
      status: WorkoutStatus.completed,
      startedAt: BigInt(Date.now()) * 1_000_000n,
      completedAt: BigInt(Date.now()) * 1_000_000n,
      distanceMetres: summary.distanceMetres ?? 0,
      durationSeconds: summary.durationSeconds ?? 0n,
      caloriesBurned: summary.caloriesBurned,
      averagePaceSecondsPerKm: summary.averagePaceSecondsPerKm,
      territoryZonesClaimed: summary.territoryZonesClaimed ?? 0n,
    };
    setWorkouts((prev) => [newWorkout, ...prev]);
    setCompletedWorkout(summary);
    setMode("complete");
  }

  function handleDeleteWorkout(id: bigint) {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  }

  function handleDismissComplete() {
    setCompletedWorkout(null);
    setMode("idle");
  }

  return (
    <Layout headerTitle="Workouts">
      <div data-ocid="workouts.page" className="flex flex-col gap-4 p-4 pb-8">
        {/* ─ Total Stats Bar ─ */}
        <div data-ocid="workouts.stats_bar" className="grid grid-cols-3 gap-2">
          {[
            {
              icon: <Activity size={13} />,
              label: "Workouts",
              value: String(workouts.length),
            },
            {
              icon: <MapPin size={13} />,
              label: "Total km",
              value: totalKm.toFixed(1),
            },
            {
              icon: <Trophy size={13} />,
              label: "Zones",
              value: String(totalZones),
            },
          ].map(({ icon, label, value }) => (
            <div key={label} className="glass-card p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                {icon}
                <span className="text-[10px]">{label}</span>
              </div>
              <div
                className="font-display font-bold text-lg leading-tight"
                style={{ color: "oklch(0.72 0.2 72)" }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* ─ Workout Complete Summary ─ */}
        <AnimatePresence>
          {mode === "complete" && completedWorkout && (
            <WorkoutCompleteSummary
              workout={completedWorkout}
              onDismiss={handleDismissComplete}
            />
          )}
        </AnimatePresence>

        {/* ─ Log New Workout Section ─ */}
        {mode !== "complete" && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-foreground text-sm">
                Log New Workout
              </h2>
              {(mode === "gps_active" || mode === "manual_form") && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.72 0.2 72 / 0.1)",
                    color: "oklch(0.72 0.2 72)",
                    border: "1px solid oklch(0.72 0.2 72 / 0.25)",
                  }}
                >
                  In Progress
                </span>
              )}
            </div>

            {(mode === "idle" || mode === "selecting") && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <WorkoutTypeSelector
                  selected={selectedType}
                  onChange={(t) => {
                    setSelectedType(t);
                    setMode("selecting");
                  }}
                />

                {GPS_TYPES.has(selectedType) && (
                  <div
                    className="flex items-center gap-1.5 text-[10px] text-muted-foreground rounded-lg px-3 py-2"
                    style={{
                      background: "oklch(0.15 0.006 50)",
                      border: "1px solid oklch(0.24 0.01 50)",
                    }}
                  >
                    <GpsStatusBadge status="idle" />
                    <span className="ml-1">
                      GPS tracking will activate for this workout type
                    </span>
                  </div>
                )}

                <Button
                  type="button"
                  data-ocid="workouts.start_tracking_button"
                  size="lg"
                  className="w-full h-12 font-display font-semibold text-base transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
                  style={goldButtonStyle}
                  onClick={handleStartTracking}
                >
                  {WORKOUT_TYPE_META[selectedType].emoji}
                  <span className="ml-2">
                    {GPS_TYPES.has(selectedType)
                      ? "Start Tracking"
                      : "Log Workout"}
                  </span>
                </Button>
              </motion.div>
            )}

            <AnimatePresence>
              {mode === "gps_active" && (
                <ActiveGpsWorkout
                  workoutType={selectedType}
                  onComplete={handleWorkoutComplete}
                  onCancel={() => setMode("idle")}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {mode === "manual_form" && (
                <ManualWorkoutForm
                  workoutType={selectedType}
                  onSave={handleWorkoutComplete}
                  onCancel={() => setMode("idle")}
                />
              )}
            </AnimatePresence>
          </section>
        )}

        {/* ─ Workout History ─ */}
        <section className="space-y-3">
          <h2 className="font-display font-semibold text-foreground text-sm">
            Workout History
          </h2>

          {/* Filter bar — glass pills */}
          <div
            data-ocid="workouts.filter_bar"
            className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar"
          >
            {FILTER_TABS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                data-ocid={`workouts.filter.${key}`}
                onClick={() => setFilter(key)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={
                  filter === key
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                        color: "oklch(0.10 0 0)",
                        boxShadow: "0 2px 12px oklch(0.68 0.18 70 / 0.35)",
                      }
                    : {
                        background: "oklch(0.15 0.006 50)",
                        border: "1px solid oklch(0.24 0.01 50)",
                        color: "oklch(0.55 0.005 0)",
                      }
                }
              >
                {label}
              </button>
            ))}
          </div>

          {filteredWorkouts.length === 0 ? (
            <div
              data-ocid="workout_history.empty_state"
              className="glass-card p-8 text-center space-y-2"
            >
              <div className="text-3xl">🏃</div>
              <div className="font-display font-semibold text-foreground text-sm">
                No workouts yet
              </div>
              <div className="text-xs text-muted-foreground">
                Start your first workout and claim some territory!
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredWorkouts.map((workout, i) => (
                <HistoryItem
                  key={String(workout.id)}
                  workout={workout}
                  index={i + 1}
                  onDelete={handleDeleteWorkout}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
