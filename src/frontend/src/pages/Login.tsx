import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { MapPin, Shield, Trophy, Zap } from "lucide-react";
import { useEffect } from "react";
import { useBackend } from "../hooks/useBackend";

const FEATURES = [
  {
    icon: MapPin,
    title: "Claim Territory",
    desc: "Run routes to own real-world zones on the map",
  },
  {
    icon: Trophy,
    title: "Win Competitions",
    desc: "Monthly contests with real prizes for top runners",
  },
  {
    icon: Zap,
    title: "AI Coach",
    desc: "Personalized training plans and territory strategy",
  },
  {
    icon: Shield,
    title: "Defend Your Zones",
    desc: "Hold territory and fend off challengers worldwide",
  },
];

export default function Login() {
  const { login, isAuthenticated, isLoading } = useBackend();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      void navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      data-ocid="login.page"
      className="min-h-screen bg-background flex flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% -10%, oklch(0.68 0.18 70 / 0.15), transparent 60%), radial-gradient(ellipse 80% 60% at 80% 100%, oklch(0.75 0.22 60 / 0.08), transparent 50%), oklch(0.10 0 0)",
      }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.68 0.18 70 / 0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 relative z-10">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
              boxShadow:
                "0 0 16px oklch(0.68 0.18 70 / 0.5), inset 0 1px 1px oklch(1 0 0 / 0.15)",
            }}
          >
            <span className="text-primary-foreground font-display font-bold text-sm">
              W
            </span>
          </div>
          <span
            className="font-display font-bold text-xl tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.90 0.12 72), oklch(0.72 0.2 62))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            WTOL
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center relative z-10">
        {/* Animated logo ring */}
        <div className="relative mb-8">
          {/* Outer glow ring */}
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              border: "1px solid oklch(0.68 0.18 70 / 0.3)",
              boxShadow:
                "0 0 40px oklch(0.68 0.18 70 / 0.2), inset 0 0 30px oklch(0.68 0.18 70 / 0.05)",
            }}
          >
            <div
              className="w-18 h-18 rounded-full flex items-center justify-center"
              style={{
                width: "4.5rem",
                height: "4.5rem",
                background:
                  "linear-gradient(135deg, oklch(0.68 0.18 70 / 0.2), oklch(0.75 0.22 60 / 0.1))",
                border: "1px solid oklch(0.68 0.18 70 / 0.4)",
              }}
            >
              <MapPin size={28} style={{ color: "oklch(0.72 0.2 72)" }} />
            </div>
          </div>
          {/* Ping animation */}
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-15"
            style={{ border: "1px solid oklch(0.68 0.18 70)" }}
            aria-hidden="true"
          />
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-3 tracking-tight leading-tight">
          Claim Your
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.88 0.16 72), oklch(0.72 0.22 58))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Territory
          </span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-sm mb-10 leading-relaxed">
          Turn your runs and workouts into a global territory battle. Claim
          zones. Defend your ground. Win prizes.
        </p>

        {/* CTA */}
        <div className="w-full max-w-xs flex flex-col gap-3">
          <Button
            data-ocid="login.login_button"
            size="lg"
            className="w-full h-13 font-display font-semibold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
              color: "oklch(0.10 0 0)",
              boxShadow:
                "0 4px 24px oklch(0.68 0.18 70 / 0.4), inset 0 1px 1px oklch(1 0 0 / 0.2)",
              border: "1px solid oklch(0.68 0.18 70 / 0.6)",
              height: "3.25rem",
            }}
            onClick={login}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span
                  className="w-4 h-4 border-2 rounded-full animate-spin"
                  style={{
                    borderColor: "oklch(0.10 0 0 / 0.3)",
                    borderTopColor: "oklch(0.10 0 0)",
                  }}
                />
                Connecting...
              </span>
            ) : (
              <>
                <Shield size={18} className="mr-2" />
                Login with Internet Identity
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Secure, decentralized login — no password needed
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-3 mt-12 w-full max-w-sm">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-card p-4 text-left hover-lift"
                style={{
                  background: "oklch(0.16 0.008 50 / 0.7)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderColor: "oklch(0.68 0.18 70 / 0.12)",
                }}
              >
                <Icon
                  size={18}
                  style={{ color: "oklch(0.72 0.2 72)" }}
                  className="mb-2"
                />
                <p className="font-semibold text-foreground text-sm leading-tight">
                  {feature.title}
                </p>
                <p className="text-muted-foreground text-xs mt-1 leading-snug">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 px-6 border-t border-primary/10 relative z-10">
        <p className="text-xs text-muted-foreground">
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
