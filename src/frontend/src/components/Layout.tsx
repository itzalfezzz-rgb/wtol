import { Link, useLocation } from "@tanstack/react-router";
import {
  Dumbbell,
  Map as MapIcon,
  MessageSquare,
  Newspaper,
  Trophy,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { GpsStatus } from "../lib/types";
import { GpsStatusBadge } from "./GpsStatusBadge";

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  ocid: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Map", icon: MapIcon, ocid: "nav.map_link" },
  {
    path: "/workouts",
    label: "Workouts",
    icon: Dumbbell,
    ocid: "nav.workouts_link",
  },
  {
    path: "/coach",
    label: "Coach",
    icon: MessageSquare,
    ocid: "nav.coach_link",
  },
  { path: "/feed", label: "Feed", icon: Newspaper, ocid: "nav.feed_link" },
  {
    path: "/competition",
    label: "Compete",
    icon: Trophy,
    ocid: "nav.competition_link",
  },
  { path: "/profile", label: "Profile", icon: User, ocid: "nav.profile_link" },
];

interface LayoutProps {
  children: ReactNode;
  showGpsStatus?: boolean;
  gpsStatus?: GpsStatus;
  gpsAccuracy?: number | null;
  headerTitle?: string;
  headerAction?: ReactNode;
}

export function Layout({
  children,
  showGpsStatus = false,
  gpsStatus = "idle",
  gpsAccuracy,
  headerTitle,
  headerAction,
}: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header — premium glass treatment */}
      <header
        className="sticky top-0 z-40 border-b border-primary/10"
        style={{
          background: "oklch(0.14 0.006 50 / 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 1px 0 oklch(0.68 0.18 70 / 0.12), 0 8px 32px oklch(0 0 0 / 0.4)",
        }}
      >
        <div className="flex items-center justify-between h-14 px-4">
          {/* Brand / Page Title */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2"
              aria-label="WTOL home"
            >
              {/* Gold logo mark */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                  boxShadow: "0 0 12px oklch(0.68 0.18 70 / 0.5)",
                }}
              >
                <span className="font-display font-bold text-xs text-primary-foreground tracking-tight">
                  W
                </span>
              </div>
              {!headerTitle && (
                <span
                  className="font-display font-bold text-lg tracking-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.88 0.14 72), oklch(0.72 0.2 62))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  WTOL
                </span>
              )}
            </Link>
            {headerTitle && (
              <span className="font-display font-semibold text-foreground text-base">
                {headerTitle}
              </span>
            )}
          </div>

          {/* Right: GPS badge + action */}
          <div className="flex items-center gap-2">
            {showGpsStatus && (
              <GpsStatusBadge status={gpsStatus} accuracy={gpsAccuracy} />
            )}
            {headerAction}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background overflow-auto">{children}</main>

      {/* Bottom Navigation — premium glass */}
      <nav
        className="sticky bottom-0 z-40 border-t border-primary/10"
        aria-label="Main navigation"
        style={{
          background: "oklch(0.13 0.006 50 / 0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 -1px 0 oklch(0.68 0.18 70 / 0.15), 0 -8px 32px oklch(0 0 0 / 0.5)",
        }}
      >
        <div className="flex items-center justify-around h-16 px-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                data-ocid={item.ocid}
                className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full min-w-0 relative transition-all duration-200"
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Gold glow underline for active */}
                {isActive && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, oklch(0.68 0.18 70), transparent)",
                      boxShadow: "0 0 8px oklch(0.68 0.18 70 / 0.8)",
                    }}
                    aria-hidden="true"
                  />
                )}

                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  style={
                    isActive
                      ? {
                          color: "oklch(0.72 0.2 72)",
                          filter:
                            "drop-shadow(0 0 6px oklch(0.68 0.18 70 / 0.7))",
                        }
                      : { color: "oklch(0.50 0.005 50)" }
                  }
                />
                <span
                  className="text-[10px] font-medium leading-none"
                  style={
                    isActive
                      ? { color: "oklch(0.72 0.2 72)", fontWeight: 600 }
                      : { color: "oklch(0.50 0.005 50)" }
                  }
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Branding footer */}
      <footer
        className="text-center py-2 border-t border-primary/10"
        style={{ background: "oklch(0.12 0.004 50)" }}
      >
        <p className="text-[10px] text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
