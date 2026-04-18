import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  Crosshair,
  MapPin,
  Maximize2,
  Play,
  Square,
  WifiOff,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GpsStatusBadge } from "../components/GpsStatusBadge";
import { Layout } from "../components/Layout";
import { MapView } from "../components/MapView";
import { useGps } from "../hooks/useGps";
import {
  SAMPLE_ZONES,
  formatDistance,
  formatDuration,
} from "../lib/sample-data";
import type { GpsPosition, ZoneInfo } from "../lib/types";

// ── Types ───────────────────────────────────────────────────────────────────

interface WorkoutStats {
  distance: number;
  startTime: number;
  zones: number;
}

// ── Zone Popup ───────────────────────────────────────────────────────────────

function ZonePopup({ zone, onClose }: { zone: ZoneInfo; onClose: () => void }) {
  const isClaimed = !!zone.claimedAt;
  const claimedDate = zone.claimedAt
    ? new Date(Number(zone.claimedAt / 1_000_000n)).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
      )
    : null;

  const statusColor = isClaimed ? "oklch(0.68 0.18 70)" : "oklch(0.55 0 0)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      data-ocid="map.zone_popup.dialog"
      className="absolute bottom-4 left-4 right-4 z-30 glass-card p-4 shadow-2xl gold-accent-border"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm flex-shrink-0"
            style={{ background: statusColor }}
          />
          <h3 className="font-display font-bold text-foreground text-base leading-tight">
            {zone.name}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          data-ocid="map.zone_popup.close_button"
          className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-smooth"
          aria-label="Close zone popup"
        >
          <span className="text-muted-foreground text-xs">✕</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-muted/50 rounded-xl p-2.5 text-center">
          <div className="font-mono font-bold text-primary text-sm">
            {zone.areaKm2}
          </div>
          <div className="text-muted-foreground text-xs mt-0.5">km²</div>
        </div>
        <div className="bg-muted/50 rounded-xl p-2.5 text-center">
          <div
            className="font-mono font-bold text-sm"
            style={{ color: statusColor }}
          >
            {isClaimed ? "Claimed" : "Free"}
          </div>
          <div className="text-muted-foreground text-xs mt-0.5">status</div>
        </div>
        <div className="bg-muted/50 rounded-xl p-2.5 text-center">
          <div className="font-mono font-bold text-foreground text-sm">
            {zone.takeoverHistory.length}
          </div>
          <div className="text-muted-foreground text-xs mt-0.5">takeovers</div>
        </div>
      </div>

      {claimedDate && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <MapPin size={11} />
          <span>Claimed {claimedDate}</span>
        </div>
      )}

      {!isClaimed && (
        <div className="mb-2 flex items-center gap-1.5 text-xs text-primary">
          <CheckCircle2 size={11} />
          <span>Run through this zone to claim it!</span>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          data-ocid="map.zone_popup.claim_button"
          className="glass-button flex-1 text-xs py-1.5 font-semibold"
        >
          {isClaimed ? "Defend Zone" : "Claim Zone"}
        </button>
        <button
          type="button"
          data-ocid="map.zone_popup.details_button"
          className="flex-1 text-xs py-1.5 bg-muted/60 border border-border/40 rounded-lg text-foreground hover:bg-muted transition-smooth"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}

// ── GPS Error Panel ──────────────────────────────────────────────────────────

function GpsErrorPanel({
  status,
  errorMessage,
  onRetry,
}: { status: string; errorMessage: string | null; onRetry: () => void }) {
  if (status !== "error" && status !== "denied") return null;

  const isDenied = status === "denied";
  const isTimeout = errorMessage?.includes("timed out");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      data-ocid="map.gps_error_panel.error_state"
      className="mx-4 mt-3 bg-destructive/10 border border-destructive/30 rounded-xl p-3"
    >
      <div className="flex items-start gap-2">
        {isDenied ? (
          <WifiOff
            size={16}
            className="text-destructive flex-shrink-0 mt-0.5"
          />
        ) : (
          <AlertCircle
            size={16}
            className="text-destructive flex-shrink-0 mt-0.5"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-destructive text-xs font-medium leading-snug">
            {isDenied
              ? "Location permission denied"
              : isTimeout
                ? "Signal lost, retrying..."
                : "GPS unavailable"}
          </p>
          <p className="text-destructive/70 text-xs mt-1 leading-relaxed">
            {isDenied
              ? "Open Settings → Site Settings → Location to allow access."
              : isTimeout
                ? "Move to an open area and try again."
                : "GPS not available. Try on a mobile device with GPS hardware."}
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onRetry}
            data-ocid="map.retry_gps_button"
            className="mt-2 h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            Retry GPS
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Territory Claimed Summary ────────────────────────────────────────────────

function TerritoryClaimedSummary({
  stats,
  onDismiss,
}: { stats: WorkoutStats; onDismiss: () => void }) {
  const duration = BigInt(Math.floor((Date.now() - stats.startTime) / 1000));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      data-ocid="map.territory_claimed_summary.success_state"
      className="absolute inset-x-4 bottom-4 z-40 glass-card p-5 shadow-2xl gold-accent-border"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle2 size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground text-base">
            Territory Claimed!
          </h3>
          <p className="text-muted-foreground text-xs">Workout complete</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          {
            value: formatDistance(stats.distance),
            label: "distance",
            color: "text-chart-2",
          },
          {
            value: formatDuration(duration),
            label: "duration",
            color: "text-primary",
          },
          { value: String(stats.zones), label: "zones", color: "text-accent" },
        ].map((s) => (
          <div key={s.label} className="bg-muted/40 rounded-xl p-3 text-center">
            <div className={`font-mono font-bold ${s.color} text-lg`}>
              {s.value}
            </div>
            <div className="text-muted-foreground text-xs mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        data-ocid="map.territory_claimed_summary.close_button"
        className="w-full glass-button justify-center font-semibold font-display"
        onClick={onDismiss}
      >
        Awesome!
      </Button>
    </motion.div>
  );
}

// ── Distance helpers ─────────────────────────────────────────────────────────

function calcDistance(pts: GpsPosition[]): number {
  if (pts.length < 2) return 0;
  let dist = 0;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const R = 6371000;
    const dLat = ((curr.lat - prev.lat) * Math.PI) / 180;
    const dLng = ((curr.lng - prev.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((prev.lat * Math.PI) / 180) *
        Math.cos((curr.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    dist += R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  return dist;
}

function countZonesCovered(pts: GpsPosition[]): number {
  if (pts.length === 0) return 0;
  return SAMPLE_ZONES.filter((zone) =>
    pts.some((pt) => {
      const cx =
        zone.polygon.reduce((s, c) => s + c.lng, 0) / zone.polygon.length;
      const cy =
        zone.polygon.reduce((s, c) => s + c.lat, 0) / zone.polygon.length;
      return Math.abs(pt.lat - cy) < 0.005 && Math.abs(pt.lng - cx) < 0.008;
    }),
  ).length;
}

// ── MapPage ──────────────────────────────────────────────────────────────────

export default function MapPage() {
  const {
    status,
    position,
    accuracy,
    errorMessage,
    startTracking,
    stopTracking,
  } = useGps();

  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [routePoints, setRoutePoints] = useState<GpsPosition[]>([]);
  const [selectedZone, setSelectedZone] = useState<ZoneInfo | null>(null);
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const workoutStartRef = useRef<number>(0);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);

  // Accumulate route points when tracking
  useEffect(() => {
    if (isWorkoutActive && position && status === "active") {
      setRoutePoints((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.lat === position.lat && last.lng === position.lng)
          return prev;
        return [...prev, position];
      });
    }
  }, [isWorkoutActive, position, status]);

  // Elapsed timer
  useEffect(() => {
    if (isWorkoutActive) {
      elapsedRef.current = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    } else {
      if (elapsedRef.current) clearInterval(elapsedRef.current);
      setElapsedSec(0);
    }
    return () => {
      if (elapsedRef.current) clearInterval(elapsedRef.current);
    };
  }, [isWorkoutActive]);

  const handleStartWorkout = useCallback(() => {
    setIsWorkoutActive(true);
    setRoutePoints([]);
    setSelectedZone(null);
    setShowSummary(false);
    setWorkoutStats(null);
    workoutStartRef.current = Date.now();
    startTracking();
  }, [startTracking]);

  const handleStopWorkout = useCallback(() => {
    stopTracking();
    setIsWorkoutActive(false);
    setWorkoutStats({
      distance: calcDistance(routePoints),
      startTime: workoutStartRef.current,
      zones: countZonesCovered(routePoints),
    });
    setShowSummary(true);
  }, [stopTracking, routePoints]);

  const distanceKm = formatDistance(calcDistance(routePoints));
  const elapsedFormatted = formatDuration(BigInt(elapsedSec));
  const zonesCount = countZonesCovered(routePoints);
  const claimedZones = SAMPLE_ZONES.filter((z) => z.claimedAt).length;

  // Default center: Sydney if no GPS, SF as backup
  const mapCenter = position
    ? { lat: position.lat, lng: position.lng }
    : { lat: -33.8688, lng: 151.2093 };

  return (
    <Layout>
      <div data-ocid="map.page" className="flex flex-col h-full relative">
        {/* Map header strip */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-border/60">
          <div className="flex items-center gap-2">
            <GpsStatusBadge status={status} accuracy={accuracy} />
            {status === "active" && accuracy != null && (
              <span
                data-ocid="map.accuracy_indicator"
                className="text-xs text-muted-foreground font-mono"
              >
                ±{accuracy.toFixed(0)}m
              </span>
            )}
          </div>

          <AnimatePresence>
            {isWorkoutActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                data-ocid="map.tracking_indicator"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/40"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold font-mono text-primary tracking-widest">
                  TRACKING
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <Badge
            variant="outline"
            className="text-xs border-primary/30 bg-primary/5 text-primary font-mono"
          >
            {claimedZones}/{SAMPLE_ZONES.length} zones
          </Badge>
        </div>

        {/* GPS error panel */}
        <AnimatePresence>
          {(status === "error" || status === "denied") && (
            <GpsErrorPanel
              status={status}
              errorMessage={errorMessage}
              onRetry={startTracking}
            />
          )}
        </AnimatePresence>

        {/* Map container */}
        <div className="relative flex-1 min-h-0 overflow-hidden bg-background">
          <MapView
            zones={SAMPLE_ZONES}
            userPosition={position}
            routePoints={routePoints}
            center={mapCenter}
            onZoneClick={(z) => {
              setSelectedZone((prev) => (prev?.id === z.id ? null : z));
              setShowSummary(false);
            }}
            onLocateMe={() => {
              if (!isWorkoutActive) startTracking();
            }}
          />

          {/* Zone popup */}
          <AnimatePresence>
            {selectedZone && !showSummary && (
              <ZonePopup
                zone={selectedZone}
                onClose={() => setSelectedZone(null)}
              />
            )}
          </AnimatePresence>

          {/* Territory claimed summary */}
          <AnimatePresence>
            {showSummary && workoutStats && (
              <TerritoryClaimedSummary
                stats={workoutStats}
                onDismiss={() => setShowSummary(false)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom workout panel */}
        <div className="bg-card border-t border-border/60 px-4 pt-3 pb-4">
          <AnimatePresence mode="wait">
            {!isWorkoutActive ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    {
                      value: "12.4",
                      unit: "km²",
                      label: "territory",
                      color: "text-primary",
                    },
                    {
                      value: String(claimedZones),
                      unit: "zones",
                      label: "claimed",
                      color: "text-chart-2",
                    },
                    {
                      value: "4th",
                      unit: "rank",
                      label: "global",
                      color: "text-accent",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-muted/40 rounded-xl py-2.5 px-2"
                    >
                      <div
                        className={`font-mono font-bold text-lg ${stat.color}`}
                      >
                        {stat.value}
                        <span className="text-xs font-normal ml-0.5 text-muted-foreground">
                          {stat.unit}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  data-ocid="map.start_workout_button"
                  size="lg"
                  className="w-full glass-button justify-center font-bold font-display h-12 text-base"
                  onClick={handleStartWorkout}
                >
                  <Play size={18} className="mr-2 fill-current" />
                  Start Workout
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    {
                      value: distanceKm,
                      label: "distance",
                      color: "text-chart-2",
                    },
                    {
                      value: elapsedFormatted,
                      label: "time",
                      color: "text-primary",
                    },
                    {
                      value: String(zonesCount),
                      label: "zones",
                      color: "text-accent",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-muted/40 rounded-xl py-2.5 px-2"
                    >
                      <div className={`font-mono font-bold ${s.color} text-lg`}>
                        {s.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {status === "acquiring" && (
                  <p
                    data-ocid="map.gps_acquiring.loading_state"
                    className="text-xs text-primary text-center font-mono animate-pulse"
                  >
                    Acquiring GPS signal...
                  </p>
                )}

                <Button
                  type="button"
                  data-ocid="map.stop_workout_button"
                  variant="destructive"
                  size="lg"
                  className="w-full font-bold font-display h-12 text-base"
                  onClick={handleStopWorkout}
                >
                  <Square size={18} className="mr-2 fill-current" />
                  End Workout
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nearby zones list */}
        <div className="px-4 pb-4 bg-background">
          <h2 className="font-display font-semibold text-foreground text-sm mb-2 pt-3">
            Nearby Zones
          </h2>
          <div className="space-y-1.5">
            {SAMPLE_ZONES.map((zone, i) => {
              const isClaimed = !!zone.claimedAt;
              return (
                <button
                  key={String(zone.id)}
                  type="button"
                  data-ocid={`map.zone.item.${i + 1}`}
                  onClick={() => {
                    setSelectedZone(zone);
                    setShowSummary(false);
                  }}
                  className="w-full text-left bg-card border border-border/50 hover:border-primary/40 rounded-xl px-3 py-2.5 flex items-center justify-between transition-smooth hover-lift"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                      style={{
                        background: isClaimed
                          ? "oklch(0.68 0.18 70)"
                          : "oklch(0.22 0 0)",
                      }}
                    />
                    <span className="text-sm text-foreground font-medium truncate">
                      {zone.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-xs text-muted-foreground font-mono">
                      {zone.areaKm2}km²
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full border font-mono"
                      style={
                        isClaimed
                          ? {
                              color: "oklch(0.68 0.18 70)",
                              borderColor: "oklch(0.68 0.18 70 / 0.25)",
                              background: "oklch(0.68 0.18 70 / 0.1)",
                            }
                          : {
                              color: "oklch(0.55 0 0)",
                              borderColor: "oklch(0.22 0 0)",
                            }
                      }
                    >
                      {isClaimed ? "Claimed" : "Free"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
