import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SAMPLE_COACH_MESSAGES, SAMPLE_PROFILE } from "@/lib/sample-data";
import { type CoachMessage, FitnessLevel, MessageRole } from "@/lib/types";
import {
  Bot,
  Calendar,
  ChevronRight,
  MapPin,
  Send,
  Sparkles,
  Target,
  Trash2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type OnboardingStep = "fitness" | "location" | "hours" | "style" | "done";

interface OnboardingAnswers {
  fitnessLevel?: FitnessLevel;
  location?: string;
  weeklyHours?: number;
  style?: "solo" | "competitive";
}

interface TrainingPlan {
  weekOverview: string;
  workouts: { day: string; activity: string; duration: string }[];
  strategyTips: string[];
}

// ── Plan builder ──────────────────────────────────────────────────────────────

function buildPlan(answers: OnboardingAnswers): TrainingPlan {
  const level = answers.fitnessLevel ?? FitnessLevel.beginner;
  const hours = answers.weeklyHours ?? 3;
  const style = answers.style ?? "solo";
  const loc = answers.location ?? "your city";

  const intensityMap: Record<FitnessLevel, string> = {
    [FitnessLevel.beginner]: "easy paced",
    [FitnessLevel.intermediate]: "moderate tempo",
    [FitnessLevel.advanced]: "high intensity",
    [FitnessLevel.elite]: "elite performance",
  };

  const allWorkouts: Record<
    FitnessLevel,
    { day: string; activity: string; duration: string }[]
  > = {
    [FitnessLevel.beginner]: [
      { day: "Mon", activity: "Recovery Walk", duration: "20 min" },
      { day: "Wed", activity: "Easy Run + Zone Scout", duration: "30 min" },
      { day: "Sat", activity: "Longer Exploration Run", duration: "45 min" },
    ],
    [FitnessLevel.intermediate]: [
      { day: "Mon", activity: "Recovery Walk + Scout", duration: "30 min" },
      { day: "Wed", activity: "Tempo Run", duration: "45 min" },
      { day: "Fri", activity: "Interval Training", duration: "40 min" },
      { day: "Sat", activity: "Long Run", duration: "90 min" },
    ],
    [FitnessLevel.advanced]: [
      { day: "Mon", activity: "Recovery Run", duration: "40 min" },
      { day: "Tue", activity: "Speed Intervals", duration: "50 min" },
      { day: "Thu", activity: "Tempo Run", duration: "60 min" },
      { day: "Fri", activity: "Strength + Core", duration: "40 min" },
      { day: "Sun", activity: "Long Run", duration: "120 min" },
    ],
    [FitnessLevel.elite]: [
      { day: "Mon", activity: "Easy Recovery", duration: "45 min" },
      { day: "Tue", activity: "VO2 Max Intervals", duration: "70 min" },
      { day: "Wed", activity: "Tempo Run", duration: "60 min" },
      { day: "Thu", activity: "Strength Circuit", duration: "50 min" },
      { day: "Sun", activity: "Long Run", duration: "150 min" },
    ],
  };

  const strategyBySyle: Record<string, string[]> = {
    solo: [
      `Explore unclaimed zones in ${loc} early mornings — fewer defenders`,
      "Target grid intersections to claim multiple zones per run",
      "Scout zones using the map view before heading out",
    ],
    competitive: [
      `Identify top rivals in ${loc} and plan counter-routes to reclaim zones`,
      "Run during off-peak hours to defend territory without contests",
      "Focus on high-density zones for maximum competitive score",
    ],
  };

  const maxWorkouts = Math.max(2, Math.ceil(hours / 1.5));
  return {
    weekOverview: `${intensityMap[level]} plan · ${hours}h/week · ${loc}`,
    workouts: allWorkouts[level].slice(0, maxWorkouts),
    strategyTips: strategyBySyle[style],
  };
}

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 px-1" data-ocid="coach.loading_state">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: "oklch(0.72 0.2 72 / 0.15)",
          border: "1px solid oklch(0.72 0.2 72 / 0.3)",
        }}
      >
        <Bot className="w-4 h-4" style={{ color: "oklch(0.72 0.2 72)" }} />
      </div>
      <div
        className="rounded-2xl rounded-bl-sm px-4 py-3"
        style={{
          background: "oklch(0.16 0.008 50)",
          border: "1px solid oklch(0.24 0.01 50)",
        }}
      >
        <div className="flex gap-1 items-center h-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────

function MessageBubble({
  message,
  onQuickReply,
  isLast,
  index,
}: {
  message: CoachMessage;
  onQuickReply?: (text: string) => void;
  isLast: boolean;
  index: number;
}) {
  const isUser = message.role === MessageRole.user;
  const quickReplies = [
    "Suggest a route",
    "How to claim territory",
    "Improve my pace",
  ];

  const renderContent = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={part} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={part}>{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}
      data-ocid={`coach.message.item.${index + 1}`}
    >
      <div
        className={`flex items-end gap-2 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        {!isUser && (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
            style={{
              background: "oklch(0.72 0.2 72 / 0.15)",
              border: "1px solid oklch(0.72 0.2 72 / 0.3)",
            }}
          >
            <Bot className="w-4 h-4" style={{ color: "oklch(0.72 0.2 72)" }} />
          </div>
        )}
        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
          style={
            isUser
              ? {
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                  color: "oklch(0.10 0 0)",
                  borderRadius: "1rem 1rem 0.25rem 1rem",
                  boxShadow: "0 4px 12px oklch(0.68 0.18 70 / 0.25)",
                }
              : {
                  background: "oklch(0.16 0.008 50)",
                  border: "1px solid oklch(0.28 0.01 50)",
                  color: "oklch(0.90 0.005 0)",
                  borderRadius: "1rem 1rem 1rem 0.25rem",
                  borderLeft: "2px solid oklch(0.72 0.2 72 / 0.4)",
                }
          }
        >
          {renderContent(message.content)}
        </div>
      </div>

      {!isUser && isLast && onQuickReply && (
        <div className="flex flex-wrap gap-2 pl-10">
          {quickReplies.map((reply) => (
            <button
              type="button"
              key={reply}
              data-ocid={`coach.quick_reply.${reply.toLowerCase().replace(/\s+/g, "_")}`}
              onClick={() => onQuickReply(reply)}
              className="px-3 py-1 text-xs rounded-full transition-all duration-200 cursor-pointer"
              style={{
                border: "1px solid oklch(0.72 0.2 72 / 0.4)",
                color: "oklch(0.72 0.2 72)",
                background: "oklch(0.72 0.2 72 / 0.06)",
              }}
            >
              {reply}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Training plan card ─────────────────────────────────────────────────────────

function TrainingPlanCard({ plan }: { plan: TrainingPlan }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="mx-4 rounded-2xl p-4 space-y-3"
        style={{
          background: "oklch(0.16 0.008 50 / 0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid oklch(0.72 0.2 72 / 0.25)",
          boxShadow:
            "0 8px 24px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(0.72 0.2 72 / 0.08)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.2 72)" }}
            />
            <span className="font-display font-semibold text-sm text-foreground">
              Your Training Plan
            </span>
          </div>
          <Badge
            variant="secondary"
            className="text-xs"
            style={{
              background: "oklch(0.72 0.2 72 / 0.12)",
              border: "1px solid oklch(0.72 0.2 72 / 0.25)",
              color: "oklch(0.72 0.2 72)",
            }}
          >
            Active
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground">{plan.weekOverview}</p>

        <div className="grid grid-cols-2 gap-2">
          {plan.workouts.map((w) => (
            <div
              key={w.day}
              className="flex items-start gap-2 rounded-lg p-2"
              style={{ background: "oklch(0.12 0.004 50)" }}
            >
              <Calendar
                className="w-3 h-3 mt-0.5 flex-shrink-0"
                style={{ color: "oklch(0.72 0.2 72)" }}
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  <span style={{ color: "oklch(0.72 0.2 72)" }}>{w.day}</span> ·{" "}
                  {w.activity}
                </p>
                <p className="text-xs text-muted-foreground">{w.duration}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator style={{ background: "oklch(0.24 0.01 50)" }} />

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Target
              className="w-3 h-3"
              style={{ color: "oklch(0.75 0.22 60)" }}
            />
            <span className="text-xs font-medium text-foreground">
              Territory Strategy
            </span>
          </div>
          {plan.strategyTips.map((tip) => (
            <div key={tip} className="flex items-start gap-2">
              <ChevronRight className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Onboarding options ────────────────────────────────────────────────────────

const FITNESS_OPTIONS: { value: FitnessLevel; label: string; desc: string }[] =
  [
    {
      value: FitnessLevel.beginner,
      label: "Beginner",
      desc: "New to running or returning after a break",
    },
    {
      value: FitnessLevel.intermediate,
      label: "Intermediate",
      desc: "Running regularly, comfortable with 5K+",
    },
    {
      value: FitnessLevel.advanced,
      label: "Advanced",
      desc: "Training for races, strong weekly mileage",
    },
    {
      value: FitnessLevel.elite,
      label: "Elite",
      desc: "Competitive runner, high weekly volume",
    },
  ];

const HOURS_OPTIONS = [
  { value: 2, label: "~2 hrs", desc: "Light commitment" },
  { value: 4, label: "~4 hrs", desc: "Moderate training" },
  { value: 6, label: "~6 hrs", desc: "Dedicated runner" },
  { value: 10, label: "10+ hrs", desc: "Serious athlete" },
];

// ── Onboarding card ───────────────────────────────────────────────────────────

function OnboardingCard({
  step,
  answers,
  onAnswer,
}: {
  step: OnboardingStep;
  answers: OnboardingAnswers;
  onAnswer: (
    key: keyof OnboardingAnswers,
    value: OnboardingAnswers[keyof OnboardingAnswers],
  ) => void;
}) {
  const [locationInput, setLocationInput] = useState(answers.location ?? "");

  const titles: Record<OnboardingStep, string> = {
    fitness: "What's your fitness level?",
    location: "Where are you based?",
    hours: "Weekly training availability?",
    style: "How do you prefer to play?",
    done: "",
  };

  if (step === "done") return null;

  const isSelected = (val: FitnessLevel | number | string) =>
    step === "fitness"
      ? answers.fitnessLevel === val
      : step === "hours"
        ? answers.weeklyHours === val
        : answers.style === val;

  const buttonStyle = (active: boolean) =>
    active
      ? {
          border: "1px solid oklch(0.72 0.2 72 / 0.5)",
          background: "oklch(0.72 0.2 72 / 0.12)",
          boxShadow: "0 0 12px oklch(0.68 0.18 70 / 0.15)",
        }
      : {
          border: "1px solid oklch(0.24 0.01 50)",
          background: "oklch(0.14 0.006 50)",
        };

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="px-1 py-1"
    >
      <div
        className="glass-card p-4 space-y-3"
        style={{ borderColor: "oklch(0.28 0.01 50)" }}
      >
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" style={{ color: "oklch(0.72 0.2 72)" }} />
          <h3 className="font-display font-semibold text-sm text-foreground">
            {titles[step]}
          </h3>
        </div>

        {step === "fitness" && (
          <div className="space-y-2">
            {FITNESS_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                data-ocid={`coach.onboarding.fitness.${opt.value}`}
                onClick={() => onAnswer("fitnessLevel", opt.value)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
                style={buttonStyle(isSelected(opt.value))}
              >
                <span className="font-medium text-foreground">{opt.label}</span>
                <span className="text-muted-foreground ml-2 text-xs">
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === "location" && (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="coach.onboarding.location.input"
                className="pl-9"
                style={{
                  background: "oklch(0.12 0.004 50)",
                  borderColor: "oklch(0.28 0.01 50)",
                }}
                placeholder="e.g. San Francisco, CA"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && locationInput.trim())
                    onAnswer("location", locationInput.trim());
                }}
              />
            </div>
            <Button
              type="button"
              data-ocid="coach.onboarding.location.submit_button"
              size="sm"
              disabled={!locationInput.trim()}
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                color: "oklch(0.10 0 0)",
              }}
              onClick={() => onAnswer("location", locationInput.trim())}
            >
              Next
            </Button>
          </div>
        )}

        {step === "hours" && (
          <div className="grid grid-cols-2 gap-2">
            {HOURS_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                data-ocid={`coach.onboarding.hours.${opt.value}`}
                onClick={() => onAnswer("weeklyHours", opt.value)}
                className="px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-200"
                style={buttonStyle(isSelected(opt.value))}
              >
                <p className="font-medium text-foreground">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </button>
            ))}
          </div>
        )}

        {step === "style" && (
          <div className="space-y-2">
            <button
              type="button"
              data-ocid="coach.onboarding.style.solo"
              onClick={() => onAnswer("style", "solo")}
              className="w-full text-left px-3 py-3 rounded-xl text-sm transition-all duration-200"
              style={buttonStyle(isSelected("solo"))}
            >
              <p className="font-medium text-foreground">🗺️ Solo Exploration</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Discover and claim unclaimed territory at your own pace
              </p>
            </button>
            <button
              type="button"
              data-ocid="coach.onboarding.style.competitive"
              onClick={() => onAnswer("style", "competitive")}
              className="w-full text-left px-3 py-3 rounded-xl text-sm transition-all duration-200"
              style={buttonStyle(isSelected("competitive"))}
            >
              <p className="font-medium text-foreground">
                ⚔️ Competitive Takeovers
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Battle rivals for contested zones and dominate leaderboards
              </p>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Coach reply generator ─────────────────────────────────────────────────────

function getCoachReply(userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes("route") || lower.includes("suggest")) {
    return "**Route Suggestion:**\n\nFor maximum territory gain, try this loop:\n\n1. Start at a central zone you own\n2. Head into 2–3 adjacent unclaimed zones\n3. Loop back through a rival zone for a takeover bonus\n\nAim for 5–8km at moderate pace — enough to claim 3–5 zones without burning out. Want a more specific route for your area?";
  }
  if (lower.includes("claim") || lower.includes("territory")) {
    return "**Claiming Territory:**\n\nTo claim a zone, run through its boundary polygon. Tips:\n\n- **Speed doesn't matter** — walking counts\n- **Unclaimed zones** are easiest — look for grey areas on the map\n- **Contested zones** give bonus points but require consecutive visits\n- Run during off-peak hours (early morning) to avoid real-time competition";
  }
  if (lower.includes("pace") || lower.includes("improve")) {
    return "**Improving Your Pace:**\n\nHere's a proven 4-week pace plan:\n\n**Week 1–2:** Add 2×15min tempo runs at uncomfortable-but-sustainable effort\n**Week 3:** Introduce 6×400m intervals at 5K race pace\n**Week 4:** Easy recovery week — just 3 light runs\n\nYou should see 10–15 sec/km improvement within the month.";
  }
  return "Great question! I'm here to help you maximize your territory and training. Ask me about specific routes, how territory claiming works, or building a training plan tailored to your goals.";
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CoachPage() {
  const [messages, setMessages] = useState<CoachMessage[]>(() =>
    SAMPLE_COACH_MESSAGES.map((m) => ({ ...m })),
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("done");
  const [onboardingAnswers, setOnboardingAnswers] = useState<OnboardingAnswers>(
    {},
  );
  const [showClearDialog, setShowClearDialog] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const hasExistingConversation = messages.some(
    (m) => m.role === MessageRole.user,
  );
  const messagesLen = messages.length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message/typing change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesLen, isTyping]);

  useEffect(() => {
    if (hasExistingConversation) {
      setPlan(
        buildPlan({
          fitnessLevel: SAMPLE_PROFILE.fitnessLevel,
          location: SAMPLE_PROFILE.locationLabel,
          weeklyHours: Number(SAMPLE_PROFILE.weeklyAvailabilityHours),
          style: "competitive",
        }),
      );
    }
  }, [hasExistingConversation]);

  const appendMessage = (role: MessageRole, content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: BigInt(Date.now()),
        role,
        content,
        createdAt: BigInt(Date.now()) * 1_000_000n,
      },
    ]);
  };

  const handleSend = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || isTyping || onboardingStep !== "done") return;
    setInput("");
    appendMessage(MessageRole.user, value);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      appendMessage(MessageRole.assistant, getCoachReply(value));
    }, 1800);
  };

  const handleStartOnboarding = () => {
    setMessages([]);
    setPlan(null);
    setOnboardingStep("fitness");
    setOnboardingAnswers({});
    appendMessage(
      MessageRole.assistant,
      "Let's build your personalized training plan! I'll ask you a few quick questions to tailor everything for you.",
    );
  };

  const handleOnboardingAnswer = (
    key: keyof OnboardingAnswers,
    value: OnboardingAnswers[keyof OnboardingAnswers],
  ) => {
    const updated = { ...onboardingAnswers, [key]: value };
    setOnboardingAnswers(updated);

    const userResponses: Record<OnboardingStep, string> = {
      fitness: `My fitness level: ${value}`,
      location: `I'm based in ${value}`,
      hours: `I can train ~${value} hours per week`,
      style: `I prefer ${value === "solo" ? "solo exploration" : "competitive takeovers"}`,
      done: "",
    };
    appendMessage(MessageRole.user, userResponses[onboardingStep]);

    const nextStepMap: Record<OnboardingStep, OnboardingStep> = {
      fitness: "location",
      location: "hours",
      hours: "style",
      style: "done",
      done: "done",
    };
    const next = nextStepMap[onboardingStep];
    setOnboardingStep(next);

    if (next !== "done") {
      setIsTyping(true);
      const prompts: Record<OnboardingStep, string> = {
        location:
          "Nice! Now, where are you based? This helps me suggest routes and identify nearby territory.",
        hours: "Got it! How many hours per week can you dedicate to training?",
        style: "Perfect! Last question — how do you prefer to play WTOL?",
        done: "",
        fitness: "",
      };
      setTimeout(() => {
        setIsTyping(false);
        appendMessage(MessageRole.assistant, prompts[next]);
      }, 900);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const finalPlan = buildPlan(updated);
        setPlan(finalPlan);
        appendMessage(
          MessageRole.assistant,
          `Excellent! Your personalized plan is ready 🎉\n\n**${finalPlan.weekOverview}**\n\nI've pinned your weekly schedule above. Your strategy is optimized for ${updated.style === "competitive" ? "competitive takeovers" : "solo exploration"} in ${updated.location}. Ask me anything — routes, pacing, territory tactics — I'm here all week!`,
        );
      }, 2000);
    }
  };

  const handleClearConversation = () => {
    setMessages([]);
    setPlan(null);
    setOnboardingStep("done");
    setOnboardingAnswers({});
    setShowClearDialog(false);
  };

  const isOnboarding = onboardingStep !== "done";
  const lastAssistantIndex = messages.reduce(
    (acc, m, i) => (m.role === MessageRole.assistant ? i : acc),
    -1,
  );

  return (
    <Layout headerTitle="AI Coach">
      <div
        className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto"
        data-ocid="coach.page"
      >
        {/* Chat header */}
        <div
          className="border-b px-4 py-3 flex items-center justify-between flex-shrink-0"
          style={{
            background: "oklch(0.14 0.006 50 / 0.95)",
            backdropFilter: "blur(16px)",
            borderColor: "oklch(0.72 0.2 72 / 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.72 0.2 72 / 0.15)",
                border: "1px solid oklch(0.72 0.2 72 / 0.3)",
                boxShadow: "0 0 12px oklch(0.68 0.18 70 / 0.2)",
              }}
            >
              <Bot
                className="w-5 h-5"
                style={{ color: "oklch(0.72 0.2 72)" }}
              />
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-foreground">
                WTOL Coach
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-gold-pulse"
                  style={{
                    background: "oklch(0.72 0.2 72)",
                    boxShadow: "0 0 4px oklch(0.68 0.18 70)",
                  }}
                />
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.72 0.2 72)" }}
                >
                  Online
                </span>
              </div>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            data-ocid="coach.clear.open_modal_button"
            onClick={() => setShowClearDialog(true)}
            className="text-muted-foreground hover:text-destructive"
            aria-label="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Sticky training plan */}
        <AnimatePresence>
          {plan && (
            <div className="flex-shrink-0 py-2">
              <TrainingPlanCard plan={plan} />
            </div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-4">
          {messages.length === 0 && !isOnboarding ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center px-4"
              data-ocid="coach.empty_state"
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{
                  background: "oklch(0.72 0.2 72 / 0.15)",
                  border: "1px solid oklch(0.72 0.2 72 / 0.3)",
                  boxShadow: "0 0 40px oklch(0.68 0.18 70 / 0.2)",
                }}
              >
                <Bot
                  className="w-10 h-10"
                  style={{ color: "oklch(0.72 0.2 72)" }}
                />
              </div>
              <div className="space-y-2">
                <h2 className="font-display font-bold text-xl text-foreground">
                  Meet Your WTOL Coach
                </h2>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Your personal fitness coach and territory strategist. I'll
                  help you maximize map domination and improve your running
                  performance.
                </p>
              </div>
              <div
                className="glass-card text-left max-w-sm w-full p-4 space-y-2 text-xs text-muted-foreground"
                style={{ borderColor: "oklch(0.28 0.01 50)" }}
              >
                <p className="text-foreground font-medium text-sm mb-1">
                  I can help you with:
                </p>
                <p>🗺️ Personalized route strategies for territory control</p>
                <p>🏃 Training plans for 5K to marathon level</p>
                <p>⚔️ Competitive tactics to take down rivals</p>
                <p>📈 Pace improvement and weekly scheduling</p>
              </div>
              <Button
                type="button"
                data-ocid="coach.start_coaching.primary_button"
                size="lg"
                className="gap-2 font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                  color: "oklch(0.10 0 0)",
                  boxShadow: "0 4px 20px oklch(0.68 0.18 70 / 0.4)",
                }}
                onClick={handleStartOnboarding}
              >
                <Zap className="w-4 h-4" />
                Start Coaching
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <MessageBubble
                  key={String(msg.id)}
                  message={msg}
                  index={i}
                  isLast={i === lastAssistantIndex}
                  onQuickReply={
                    !isOnboarding && !isTyping && i === lastAssistantIndex
                      ? handleSend
                      : undefined
                  }
                />
              ))}

              <AnimatePresence mode="wait">
                {isOnboarding && (
                  <OnboardingCard
                    step={onboardingStep}
                    answers={onboardingAnswers}
                    onAnswer={handleOnboardingAnswer}
                  />
                )}
              </AnimatePresence>

              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input bar */}
        <div
          className="flex-shrink-0 px-4 py-3 border-t"
          style={{
            background: "oklch(0.13 0.006 50 / 0.97)",
            backdropFilter: "blur(16px)",
            borderColor: "oklch(0.72 0.2 72 / 0.15)",
          }}
        >
          <div className="flex gap-2 items-center">
            <Input
              data-ocid="coach.message.input"
              className="flex-1"
              style={{
                background: "oklch(0.16 0.008 50)",
                borderColor: "oklch(0.28 0.01 50)",
              }}
              placeholder={
                isOnboarding
                  ? "Complete the steps above…"
                  : "Ask your coach anything…"
              }
              value={input}
              disabled={isTyping || isOnboarding}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              type="button"
              data-ocid="coach.message.send_button"
              size="icon"
              disabled={!input.trim() || isTyping || isOnboarding}
              onClick={() => handleSend()}
              aria-label="Send message"
              style={
                input.trim() && !isTyping && !isOnboarding
                  ? {
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                      color: "oklch(0.10 0 0)",
                    }
                  : {}
              }
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {isTyping && (
            <p className="text-xs text-muted-foreground mt-1.5 pl-1">
              Coach is typing…
            </p>
          )}
        </div>
      </div>

      {/* Clear confirmation dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent data-ocid="coach.clear.dialog">
          <DialogHeader>
            <DialogTitle>Clear conversation?</DialogTitle>
            <DialogDescription>
              This will delete all chat messages and your training plan. You'll
              need to go through onboarding again to get a new plan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              data-ocid="coach.clear.cancel_button"
              onClick={() => setShowClearDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              data-ocid="coach.clear.confirm_button"
              onClick={handleClearConversation}
            >
              Clear conversation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
