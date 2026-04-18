import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, Z as Zap, M as MapPin } from "./index-DZE4_1XK.js";
import { h as SAMPLE_COACH_MESSAGES, M as MessageRole, L as Layout, F as FitnessLevel, i as SAMPLE_PROFILE } from "./sample-data-B2VD8r3E.js";
import { B as Badge } from "./badge-D696GoZp.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-WGroGG_-.js";
import { I as Input } from "./input-G5XbGc7c.js";
import { S as ScrollArea } from "./scroll-area-DEiXEbPY.js";
import { B as Bot, S as Separator, T as Target, C as ChevronRight } from "./separator-BjlmNUqj.js";
import { T as Trash2 } from "./trash-2-DWxMM2BW.js";
import { A as AnimatePresence } from "./index-BR6E1TZ7.js";
import { m as motion } from "./proxy-DXhcapRv.js";
import { S as Send } from "./send-01Tfw2bl.js";
import "./index-B9xCgXJC.js";
import "./index-DL_KEFUS.js";
import "./index-CWGPi081.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function buildPlan(answers) {
  const level = answers.fitnessLevel ?? FitnessLevel.beginner;
  const hours = answers.weeklyHours ?? 3;
  const style = answers.style ?? "solo";
  const loc = answers.location ?? "your city";
  const intensityMap = {
    [FitnessLevel.beginner]: "easy paced",
    [FitnessLevel.intermediate]: "moderate tempo",
    [FitnessLevel.advanced]: "high intensity",
    [FitnessLevel.elite]: "elite performance"
  };
  const allWorkouts = {
    [FitnessLevel.beginner]: [
      { day: "Mon", activity: "Recovery Walk", duration: "20 min" },
      { day: "Wed", activity: "Easy Run + Zone Scout", duration: "30 min" },
      { day: "Sat", activity: "Longer Exploration Run", duration: "45 min" }
    ],
    [FitnessLevel.intermediate]: [
      { day: "Mon", activity: "Recovery Walk + Scout", duration: "30 min" },
      { day: "Wed", activity: "Tempo Run", duration: "45 min" },
      { day: "Fri", activity: "Interval Training", duration: "40 min" },
      { day: "Sat", activity: "Long Run", duration: "90 min" }
    ],
    [FitnessLevel.advanced]: [
      { day: "Mon", activity: "Recovery Run", duration: "40 min" },
      { day: "Tue", activity: "Speed Intervals", duration: "50 min" },
      { day: "Thu", activity: "Tempo Run", duration: "60 min" },
      { day: "Fri", activity: "Strength + Core", duration: "40 min" },
      { day: "Sun", activity: "Long Run", duration: "120 min" }
    ],
    [FitnessLevel.elite]: [
      { day: "Mon", activity: "Easy Recovery", duration: "45 min" },
      { day: "Tue", activity: "VO2 Max Intervals", duration: "70 min" },
      { day: "Wed", activity: "Tempo Run", duration: "60 min" },
      { day: "Thu", activity: "Strength Circuit", duration: "50 min" },
      { day: "Sun", activity: "Long Run", duration: "150 min" }
    ]
  };
  const strategyBySyle = {
    solo: [
      `Explore unclaimed zones in ${loc} early mornings — fewer defenders`,
      "Target grid intersections to claim multiple zones per run",
      "Scout zones using the map view before heading out"
    ],
    competitive: [
      `Identify top rivals in ${loc} and plan counter-routes to reclaim zones`,
      "Run during off-peak hours to defend territory without contests",
      "Focus on high-density zones for maximum competitive score"
    ]
  };
  const maxWorkouts = Math.max(2, Math.ceil(hours / 1.5));
  return {
    weekOverview: `${intensityMap[level]} plan · ${hours}h/week · ${loc}`,
    workouts: allWorkouts[level].slice(0, maxWorkouts),
    strategyTips: strategyBySyle[style]
  };
}
function TypingIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 px-1", "data-ocid": "coach.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        style: {
          background: "oklch(0.72 0.2 72 / 0.15)",
          border: "1px solid oklch(0.72 0.2 72 / 0.3)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4", style: { color: "oklch(0.72 0.2 72)" } })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-2xl rounded-bl-sm px-4 py-3",
        style: {
          background: "oklch(0.16 0.008 50)",
          border: "1px solid oklch(0.24 0.01 50)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 items-center h-5", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "w-1.5 h-1.5 rounded-full bg-muted-foreground",
            animate: { y: [0, -4, 0] },
            transition: {
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.15,
              ease: "easeInOut"
            }
          },
          i
        )) })
      }
    )
  ] });
}
function MessageBubble({
  message,
  onQuickReply,
  isLast,
  index
}) {
  const isUser = message.role === MessageRole.user;
  const quickReplies = [
    "Suggest a route",
    "How to claim territory",
    "Improve my pace"
  ];
  const renderContent = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-foreground", children: part.slice(2, -2) }, part);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, part);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.25, ease: "easeOut" },
      className: `flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`,
      "data-ocid": `coach.message.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-end gap-2 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`,
            children: [
              !isUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5",
                  style: {
                    background: "oklch(0.72 0.2 72 / 0.15)",
                    border: "1px solid oklch(0.72 0.2 72 / 0.3)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4", style: { color: "oklch(0.72 0.2 72)" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line",
                  style: isUser ? {
                    background: "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                    color: "oklch(0.10 0 0)",
                    borderRadius: "1rem 1rem 0.25rem 1rem",
                    boxShadow: "0 4px 12px oklch(0.68 0.18 70 / 0.25)"
                  } : {
                    background: "oklch(0.16 0.008 50)",
                    border: "1px solid oklch(0.28 0.01 50)",
                    color: "oklch(0.90 0.005 0)",
                    borderRadius: "1rem 1rem 1rem 0.25rem",
                    borderLeft: "2px solid oklch(0.72 0.2 72 / 0.4)"
                  },
                  children: renderContent(message.content)
                }
              )
            ]
          }
        ),
        !isUser && isLast && onQuickReply && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pl-10", children: quickReplies.map((reply) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `coach.quick_reply.${reply.toLowerCase().replace(/\s+/g, "_")}`,
            onClick: () => onQuickReply(reply),
            className: "px-3 py-1 text-xs rounded-full transition-all duration-200 cursor-pointer",
            style: {
              border: "1px solid oklch(0.72 0.2 72 / 0.4)",
              color: "oklch(0.72 0.2 72)",
              background: "oklch(0.72 0.2 72 / 0.06)"
            },
            children: reply
          },
          reply
        )) })
      ]
    }
  );
}
function TrainingPlanCard({ plan }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mx-4 rounded-2xl p-4 space-y-3",
          style: {
            background: "oklch(0.16 0.008 50 / 0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid oklch(0.72 0.2 72 / 0.25)",
            boxShadow: "0 8px 24px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(0.72 0.2 72 / 0.08)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkles,
                  {
                    className: "w-4 h-4",
                    style: { color: "oklch(0.72 0.2 72)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Your Training Plan" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-xs",
                  style: {
                    background: "oklch(0.72 0.2 72 / 0.12)",
                    border: "1px solid oklch(0.72 0.2 72 / 0.25)",
                    color: "oklch(0.72 0.2 72)"
                  },
                  children: "Active"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: plan.weekOverview }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: plan.workouts.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-2 rounded-lg p-2",
                style: { background: "oklch(0.12 0.004 50)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Calendar,
                    {
                      className: "w-3 h-3 mt-0.5 flex-shrink-0",
                      style: { color: "oklch(0.72 0.2 72)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-foreground truncate", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.72 0.2 72)" }, children: w.day }),
                      " ·",
                      " ",
                      w.activity
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: w.duration })
                  ] })
                ]
              },
              w.day
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: "oklch(0.24 0.01 50)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Target,
                  {
                    className: "w-3 h-3",
                    style: { color: "oklch(0.75 0.22 60)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: "Territory Strategy" })
              ] }),
              plan.strategyTips.map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: tip })
              ] }, tip))
            ] })
          ]
        }
      )
    }
  );
}
const FITNESS_OPTIONS = [
  {
    value: FitnessLevel.beginner,
    label: "Beginner",
    desc: "New to running or returning after a break"
  },
  {
    value: FitnessLevel.intermediate,
    label: "Intermediate",
    desc: "Running regularly, comfortable with 5K+"
  },
  {
    value: FitnessLevel.advanced,
    label: "Advanced",
    desc: "Training for races, strong weekly mileage"
  },
  {
    value: FitnessLevel.elite,
    label: "Elite",
    desc: "Competitive runner, high weekly volume"
  }
];
const HOURS_OPTIONS = [
  { value: 2, label: "~2 hrs", desc: "Light commitment" },
  { value: 4, label: "~4 hrs", desc: "Moderate training" },
  { value: 6, label: "~6 hrs", desc: "Dedicated runner" },
  { value: 10, label: "10+ hrs", desc: "Serious athlete" }
];
function OnboardingCard({
  step,
  answers,
  onAnswer
}) {
  const [locationInput, setLocationInput] = reactExports.useState(answers.location ?? "");
  const titles = {
    fitness: "What's your fitness level?",
    location: "Where are you based?",
    hours: "Weekly training availability?",
    style: "How do you prefer to play?",
    done: ""
  };
  if (step === "done") return null;
  const isSelected = (val) => step === "fitness" ? answers.fitnessLevel === val : step === "hours" ? answers.weeklyHours === val : answers.style === val;
  const buttonStyle = (active) => active ? {
    border: "1px solid oklch(0.72 0.2 72 / 0.5)",
    background: "oklch(0.72 0.2 72 / 0.12)",
    boxShadow: "0 0 12px oklch(0.68 0.18 70 / 0.15)"
  } : {
    border: "1px solid oklch(0.24 0.01 50)",
    background: "oklch(0.14 0.006 50)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.3 },
      className: "px-1 py-1",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card p-4 space-y-3",
          style: { borderColor: "oklch(0.28 0.01 50)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4", style: { color: "oklch(0.72 0.2 72)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: titles[step] })
            ] }),
            step === "fitness" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: FITNESS_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `coach.onboarding.fitness.${opt.value}`,
                onClick: () => onAnswer("fitnessLevel", opt.value),
                className: "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                style: buttonStyle(isSelected(opt.value)),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: opt.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-2 text-xs", children: opt.desc })
                ]
              },
              opt.value
            )) }),
            step === "location" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "coach.onboarding.location.input",
                    className: "pl-9",
                    style: {
                      background: "oklch(0.12 0.004 50)",
                      borderColor: "oklch(0.28 0.01 50)"
                    },
                    placeholder: "e.g. San Francisco, CA",
                    value: locationInput,
                    onChange: (e) => setLocationInput(e.target.value),
                    onKeyDown: (e) => {
                      if (e.key === "Enter" && locationInput.trim())
                        onAnswer("location", locationInput.trim());
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "coach.onboarding.location.submit_button",
                  size: "sm",
                  disabled: !locationInput.trim(),
                  style: {
                    background: "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                    color: "oklch(0.10 0 0)"
                  },
                  onClick: () => onAnswer("location", locationInput.trim()),
                  children: "Next"
                }
              )
            ] }),
            step === "hours" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: HOURS_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `coach.onboarding.hours.${opt.value}`,
                onClick: () => onAnswer("weeklyHours", opt.value),
                className: "px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-200",
                style: buttonStyle(isSelected(opt.value)),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: opt.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: opt.desc })
                ]
              },
              opt.value
            )) }),
            step === "style" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "coach.onboarding.style.solo",
                  onClick: () => onAnswer("style", "solo"),
                  className: "w-full text-left px-3 py-3 rounded-xl text-sm transition-all duration-200",
                  style: buttonStyle(isSelected("solo")),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "🗺️ Solo Exploration" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Discover and claim unclaimed territory at your own pace" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "coach.onboarding.style.competitive",
                  onClick: () => onAnswer("style", "competitive"),
                  className: "w-full text-left px-3 py-3 rounded-xl text-sm transition-all duration-200",
                  style: buttonStyle(isSelected("competitive")),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "⚔️ Competitive Takeovers" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Battle rivals for contested zones and dominate leaderboards" })
                  ]
                }
              )
            ] })
          ]
        }
      )
    },
    step
  );
}
function getCoachReply(userText) {
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
function CoachPage() {
  const [messages, setMessages] = reactExports.useState(
    () => SAMPLE_COACH_MESSAGES.map((m) => ({ ...m }))
  );
  const [input, setInput] = reactExports.useState("");
  const [isTyping, setIsTyping] = reactExports.useState(false);
  const [plan, setPlan] = reactExports.useState(null);
  const [onboardingStep, setOnboardingStep] = reactExports.useState("done");
  const [onboardingAnswers, setOnboardingAnswers] = reactExports.useState(
    {}
  );
  const [showClearDialog, setShowClearDialog] = reactExports.useState(false);
  const bottomRef = reactExports.useRef(null);
  const hasExistingConversation = messages.some(
    (m) => m.role === MessageRole.user
  );
  const messagesLen = messages.length;
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [messagesLen, isTyping]);
  reactExports.useEffect(() => {
    if (hasExistingConversation) {
      setPlan(
        buildPlan({
          fitnessLevel: SAMPLE_PROFILE.fitnessLevel,
          location: SAMPLE_PROFILE.locationLabel,
          weeklyHours: Number(SAMPLE_PROFILE.weeklyAvailabilityHours),
          style: "competitive"
        })
      );
    }
  }, [hasExistingConversation]);
  const appendMessage = (role, content) => {
    setMessages((prev) => [
      ...prev,
      {
        id: BigInt(Date.now()),
        role,
        content,
        createdAt: BigInt(Date.now()) * 1000000n
      }
    ]);
  };
  const handleSend = (text) => {
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
      "Let's build your personalized training plan! I'll ask you a few quick questions to tailor everything for you."
    );
  };
  const handleOnboardingAnswer = (key, value) => {
    const updated = { ...onboardingAnswers, [key]: value };
    setOnboardingAnswers(updated);
    const userResponses = {
      fitness: `My fitness level: ${value}`,
      location: `I'm based in ${value}`,
      hours: `I can train ~${value} hours per week`,
      style: `I prefer ${value === "solo" ? "solo exploration" : "competitive takeovers"}`,
      done: ""
    };
    appendMessage(MessageRole.user, userResponses[onboardingStep]);
    const nextStepMap = {
      fitness: "location",
      location: "hours",
      hours: "style",
      style: "done",
      done: "done"
    };
    const next = nextStepMap[onboardingStep];
    setOnboardingStep(next);
    if (next !== "done") {
      setIsTyping(true);
      const prompts = {
        location: "Nice! Now, where are you based? This helps me suggest routes and identify nearby territory.",
        hours: "Got it! How many hours per week can you dedicate to training?",
        style: "Perfect! Last question — how do you prefer to play WTOL?",
        done: "",
        fitness: ""
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
          `Excellent! Your personalized plan is ready 🎉

**${finalPlan.weekOverview}**

I've pinned your weekly schedule above. Your strategy is optimized for ${updated.style === "competitive" ? "competitive takeovers" : "solo exploration"} in ${updated.location}. Ask me anything — routes, pacing, territory tactics — I'm here all week!`
        );
      }, 2e3);
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
    (acc, m, i) => m.role === MessageRole.assistant ? i : acc,
    -1
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { headerTitle: "AI Coach", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto",
        "data-ocid": "coach.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "border-b px-4 py-3 flex items-center justify-between flex-shrink-0",
              style: {
                background: "oklch(0.14 0.006 50 / 0.95)",
                backdropFilter: "blur(16px)",
                borderColor: "oklch(0.72 0.2 72 / 0.15)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-10 h-10 rounded-full flex items-center justify-center",
                      style: {
                        background: "oklch(0.72 0.2 72 / 0.15)",
                        border: "1px solid oklch(0.72 0.2 72 / 0.3)",
                        boxShadow: "0 0 12px oklch(0.68 0.18 70 / 0.2)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Bot,
                        {
                          className: "w-5 h-5",
                          style: { color: "oklch(0.72 0.2 72)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground", children: "WTOL Coach" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-1.5 h-1.5 rounded-full animate-gold-pulse",
                          style: {
                            background: "oklch(0.72 0.2 72)",
                            boxShadow: "0 0 4px oklch(0.68 0.18 70)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs",
                          style: { color: "oklch(0.72 0.2 72)" },
                          children: "Online"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    "data-ocid": "coach.clear.open_modal_button",
                    onClick: () => setShowClearDialog(true),
                    className: "text-muted-foreground hover:text-destructive",
                    "aria-label": "Clear conversation",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: plan && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrainingPlanCard, { plan }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 px-4 py-4", children: messages.length === 0 && !isOnboarding ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              className: "flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center px-4",
              "data-ocid": "coach.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-20 h-20 rounded-3xl flex items-center justify-center",
                    style: {
                      background: "oklch(0.72 0.2 72 / 0.15)",
                      border: "1px solid oklch(0.72 0.2 72 / 0.3)",
                      boxShadow: "0 0 40px oklch(0.68 0.18 70 / 0.2)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Bot,
                      {
                        className: "w-10 h-10",
                        style: { color: "oklch(0.72 0.2 72)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Meet Your WTOL Coach" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs leading-relaxed", children: "Your personal fitness coach and territory strategist. I'll help you maximize map domination and improve your running performance." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass-card text-left max-w-sm w-full p-4 space-y-2 text-xs text-muted-foreground",
                    style: { borderColor: "oklch(0.28 0.01 50)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-sm mb-1", children: "I can help you with:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "🗺️ Personalized route strategies for territory control" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "🏃 Training plans for 5K to marathon level" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "⚔️ Competitive tactics to take down rivals" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "📈 Pace improvement and weekly scheduling" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "coach.start_coaching.primary_button",
                    size: "lg",
                    className: "gap-2 font-semibold transition-all duration-200 hover:scale-105",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                      color: "oklch(0.10 0 0)",
                      boxShadow: "0 4px 20px oklch(0.68 0.18 70 / 0.4)"
                    },
                    onClick: handleStartOnboarding,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                      "Start Coaching"
                    ]
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              MessageBubble,
              {
                message: msg,
                index: i,
                isLast: i === lastAssistantIndex,
                onQuickReply: !isOnboarding && !isTyping && i === lastAssistantIndex ? handleSend : void 0
              },
              String(msg.id)
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isOnboarding && /* @__PURE__ */ jsxRuntimeExports.jsx(
              OnboardingCard,
              {
                step: onboardingStep,
                answers: onboardingAnswers,
                onAnswer: handleOnboardingAnswer
              }
            ) }),
            isTyping && /* @__PURE__ */ jsxRuntimeExports.jsx(TypingIndicator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-shrink-0 px-4 py-3 border-t",
              style: {
                background: "oklch(0.13 0.006 50 / 0.97)",
                backdropFilter: "blur(16px)",
                borderColor: "oklch(0.72 0.2 72 / 0.15)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "coach.message.input",
                      className: "flex-1",
                      style: {
                        background: "oklch(0.16 0.008 50)",
                        borderColor: "oklch(0.28 0.01 50)"
                      },
                      placeholder: isOnboarding ? "Complete the steps above…" : "Ask your coach anything…",
                      value: input,
                      disabled: isTyping || isOnboarding,
                      onChange: (e) => setInput(e.target.value),
                      onKeyDown: (e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      "data-ocid": "coach.message.send_button",
                      size: "icon",
                      disabled: !input.trim() || isTyping || isOnboarding,
                      onClick: () => handleSend(),
                      "aria-label": "Send message",
                      style: input.trim() && !isTyping && !isOnboarding ? {
                        background: "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                        color: "oklch(0.10 0 0)"
                      } : {},
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                isTyping && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 pl-1", children: "Coach is typing…" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showClearDialog, onOpenChange: setShowClearDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "coach.clear.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Clear conversation?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "This will delete all chat messages and your training plan. You'll need to go through onboarding again to get a new plan." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            "data-ocid": "coach.clear.cancel_button",
            onClick: () => setShowClearDialog(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "destructive",
            "data-ocid": "coach.clear.confirm_button",
            onClick: handleClearConversation,
            children: "Clear conversation"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  CoachPage as default
};
