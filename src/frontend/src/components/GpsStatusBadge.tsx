import type { GpsStatus } from "../lib/types";

interface GpsStatusBadgeProps {
  status: GpsStatus;
  accuracy?: number | null;
  className?: string;
}

export function GpsStatusBadge({
  status,
  accuracy,
  className = "",
}: GpsStatusBadgeProps) {
  const configs: Record<
    GpsStatus,
    { label: string; dot: React.ReactNode; badge: string }
  > = {
    active: {
      label: "GPS Active",
      dot: (
        <span
          className="w-2 h-2 rounded-full animate-gold-pulse"
          style={{
            background: "oklch(0.72 0.2 72)",
            boxShadow: "0 0 6px oklch(0.68 0.18 70 / 0.9)",
          }}
          aria-hidden="true"
        />
      ),
      badge: "border-primary/30 text-primary",
    },
    acquiring: {
      label: "Acquiring...",
      dot: (
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "oklch(0.75 0.22 60)" }}
          aria-hidden="true"
        />
      ),
      badge: "border-accent/30 text-accent",
    },
    error: {
      label: "GPS Error",
      dot: (
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "oklch(0.62 0.28 15)" }}
          aria-hidden="true"
        />
      ),
      badge: "border-destructive/30 text-destructive",
    },
    denied: {
      label: "GPS Denied",
      dot: (
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "oklch(0.62 0.28 15)" }}
          aria-hidden="true"
        />
      ),
      badge: "border-destructive/30 text-destructive",
    },
    idle: {
      label: "GPS Off",
      dot: (
        <span
          className="w-2 h-2 rounded-full bg-muted-foreground/50"
          aria-hidden="true"
        />
      ),
      badge: "border-border text-muted-foreground",
    },
  };

  const config = configs[status];

  return (
    <output
      data-ocid="gps.status_badge"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium font-mono backdrop-blur-sm ${config.badge} ${className}`}
      style={{ background: "oklch(0.14 0.006 50 / 0.8)" }}
      aria-label={`GPS status: ${config.label}${accuracy ? `, accuracy ${accuracy.toFixed(0)}m` : ""}`}
    >
      {config.dot}
      <span>{config.label}</span>
      {status === "active" && accuracy != null && (
        <span className="opacity-70">±{accuracy.toFixed(0)}m</span>
      )}
    </output>
  );
}
