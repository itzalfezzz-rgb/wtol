import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, u as useComposedRefs, e as cn, f as buttonVariants, M as MapPin, T as Trophy, B as Button, Z as Zap } from "./index-DZE4_1XK.js";
import { c as composeEventHandlers, a as createSlottable, b as createContextScope } from "./index-DL_KEFUS.js";
import { R as Root, T as Trigger, W as WarningProvider, C as Content, a as Title, D as Description, b as Close, c as createDialogScope, P as Portal, O as Overlay } from "./index-B9xCgXJC.js";
import { B as Badge } from "./badge-D696GoZp.js";
import { I as Input } from "./input-G5XbGc7c.js";
import { L as Label } from "./label-DBzXjXGO.js";
import { T as Textarea } from "./textarea-AwdXvNNX.js";
import { W as WorkoutType, b as SAMPLE_WORKOUTS, L as Layout, G as GpsStatusBadge, c as WORKOUT_TYPE_META, d as WorkoutStatus, a as formatDuration, f as formatDistance, e as formatPace, g as SAMPLE_GPS_EVENTS } from "./sample-data-B2VD8r3E.js";
import { u as useGps, C as CircleCheck } from "./useGps-D1Xc2_Zi.js";
import { A as AnimatePresence } from "./index-BR6E1TZ7.js";
import { m as motion } from "./proxy-DXhcapRv.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-NwpvRlDh.js";
import { T as Trash2 } from "./trash-2-DWxMM2BW.js";
import "./index-CWGPi081.js";
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
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger2, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
const goldButtonStyle = {
  background: "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
  color: "oklch(0.10 0 0)",
  boxShadow: "0 4px 16px oklch(0.68 0.18 70 / 0.35)",
  border: "1px solid oklch(0.72 0.2 72 / 0.5)"
};
const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "runs", label: "Runs" },
  { key: "cardio", label: "Cardio" },
  { key: "strength", label: "Strength" }
];
const GPS_TYPES = /* @__PURE__ */ new Set([
  WorkoutType.run,
  WorkoutType.cycling,
  WorkoutType.walking
]);
function matchesFilter(w, f) {
  if (f === "all") return true;
  if (f === "runs") return w.workoutType === WorkoutType.run;
  if (f === "cardio")
    return w.workoutType === WorkoutType.cycling || w.workoutType === WorkoutType.walking || w.workoutType === WorkoutType.hiit;
  if (f === "strength")
    return w.workoutType === WorkoutType.strength || w.workoutType === WorkoutType.yoga || w.workoutType === WorkoutType.other;
  return true;
}
const WORKOUT_TYPES = Object.values(WorkoutType);
function WorkoutTypeSelector({ selected, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: WORKOUT_TYPES.map((t) => {
    const meta = WORKOUT_TYPE_META[t];
    const isSelected = selected === t;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": `workout_type.${t}`,
        onClick: () => onChange(t),
        className: "flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200",
        style: isSelected ? {
          border: "1px solid oklch(0.72 0.2 72 / 0.5)",
          background: "oklch(0.72 0.2 72 / 0.12)",
          boxShadow: "0 0 12px oklch(0.68 0.18 70 / 0.2)"
        } : {
          border: "1px solid oklch(0.24 0.01 50)",
          background: "oklch(0.15 0.006 50)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl leading-none", children: meta.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-medium",
              style: {
                color: isSelected ? "oklch(0.72 0.2 72)" : "oklch(0.50 0.005 0)"
              },
              children: meta.label
            }
          )
        ]
      },
      t
    );
  }) });
}
function ActiveGpsWorkout({
  workoutType,
  onComplete,
  onCancel
}) {
  const gps = useGps();
  const [elapsed, setElapsed] = reactExports.useState(0);
  const [distance, setDistance] = reactExports.useState(0);
  const startRef = reactExports.useRef(Date.now());
  const prevPosRef = reactExports.useRef(null);
  const { startTracking, stopTracking } = gps;
  reactExports.useEffect(() => {
    startTracking();
    return () => stopTracking();
  }, [startTracking, stopTracking]);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1e3));
    }, 1e3);
    return () => clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    if (!gps.position) return;
    const pos = gps.position;
    if (prevPosRef.current) {
      const d = haversineMetres(prevPosRef.current, pos);
      setDistance((prev) => prev + d);
    }
    prevPosRef.current = { lat: pos.lat, lng: pos.lng };
  }, [gps.position]);
  const pace = distance > 0 ? elapsed / (distance / 1e3) : null;
  const meta = WORKOUT_TYPE_META[workoutType];
  function handleComplete() {
    gps.stopTracking();
    onComplete({
      workoutType,
      distanceMetres: distance,
      durationSeconds: BigInt(elapsed),
      averagePaceSecondsPerKm: pace ?? void 0,
      territoryZonesClaimed: BigInt(Math.floor(distance / 2500))
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 },
      className: "rounded-2xl p-5 space-y-4",
      style: {
        background: "oklch(0.16 0.008 50 / 0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid oklch(0.72 0.2 72 / 0.25)",
        boxShadow: "0 8px 32px oklch(0 0 0 / 0.3)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: meta.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-foreground", children: [
              meta.label,
              " in Progress"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GpsStatusBadge, { status: gps.status, accuracy: gps.accuracy })
        ] }),
        gps.errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "gps.error_state",
            className: "text-xs rounded-lg px-3 py-2",
            style: {
              color: "oklch(0.62 0.28 15)",
              background: "oklch(0.62 0.28 15 / 0.1)",
              border: "1px solid oklch(0.62 0.28 15 / 0.2)"
            },
            children: gps.errorMessage
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { size: 14 }),
            label: "Time",
            value: formatDuration(BigInt(elapsed))
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
            label: "Distance",
            value: formatDistance(Math.round(distance))
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14 }),
            label: "Pace",
            value: pace ? formatPace(pace) : "—"
          }
        ].map(({ icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card text-center p-3",
            style: { borderColor: "oklch(0.28 0.01 50)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 text-muted-foreground mb-1", children: [
                icon,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-foreground text-base leading-tight", children: value })
            ]
          },
          label
        )) }),
        gps.gpsEvents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 max-h-24 overflow-y-auto", children: gps.gpsEvents.slice(0, 3).map((ev, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 text-[10px] text-muted-foreground font-mono",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
                  style: {
                    background: ev.type === "active" ? "oklch(0.72 0.2 72)" : ev.type === "error" ? "oklch(0.62 0.28 15)" : "oklch(0.45 0 0)"
                  }
                }
              ),
              ev.message
            ]
          },
          `${ev.timestamp}-${i}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "workout.complete_button",
              className: "flex-1 font-semibold",
              style: goldButtonStyle,
              onClick: handleComplete,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 15, className: "mr-1.5" }),
                "Complete"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              "data-ocid": "workout.cancel_button",
              onClick: onCancel,
              children: "Cancel"
            }
          )
        ] })
      ]
    }
  );
}
function ManualWorkoutForm({ workoutType, onSave, onCancel }) {
  const [hours, setHours] = reactExports.useState("0");
  const [minutes, setMinutes] = reactExports.useState("30");
  const [notes, setNotes] = reactExports.useState("");
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
      territoryZonesClaimed: 0n
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      className: "glass-card p-5 space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: meta.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-foreground", children: [
            meta.label,
            " Details"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground font-medium", children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "manual_workout.hours_input",
                  type: "number",
                  min: "0",
                  max: "23",
                  value: hours,
                  onChange: (e) => setHours(e.target.value),
                  className: "pr-10 bg-background"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground", children: "h" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "manual_workout.minutes_input",
                  type: "number",
                  min: "0",
                  max: "59",
                  value: minutes,
                  onChange: (e) => setMinutes(e.target.value),
                  className: "pr-10 bg-background"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground", children: "m" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              className: "text-xs text-muted-foreground font-medium",
              htmlFor: "workout-notes",
              children: "Notes (optional)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "workout-notes",
              "data-ocid": "manual_workout.notes_textarea",
              placeholder: "How did it feel? Any wins today?",
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              className: "bg-background resize-none h-20 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": "manual_workout.save_button",
              className: "flex-1 font-semibold",
              style: goldButtonStyle,
              onClick: handleSave,
              children: "Save Workout"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              "data-ocid": "manual_workout.cancel_button",
              onClick: onCancel,
              children: "Cancel"
            }
          )
        ] })
      ]
    }
  );
}
function WorkoutCompleteSummary({ workout, onDismiss }) {
  const meta = WORKOUT_TYPE_META[workout.workoutType ?? WorkoutType.other];
  const zonesEst = workout.territoryZonesClaimed ?? 0n;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      className: "rounded-2xl p-5 space-y-4",
      style: {
        background: "oklch(0.16 0.008 50 / 0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid oklch(0.72 0.2 72 / 0.3)",
        boxShadow: "0 8px 32px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(0.72 0.2 72 / 0.08)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: meta.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-foreground text-lg", children: "Workout Complete!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: meta.label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13 }),
            label: "Duration",
            value: formatDuration(workout.durationSeconds ?? 0n)
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13 }),
            label: "Distance",
            value: workout.distanceMetres && workout.distanceMetres > 0 ? formatDistance(workout.distanceMetres) : "—"
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 13 }),
            label: "Pace",
            value: workout.averagePaceSecondsPerKm ? formatPace(workout.averagePaceSecondsPerKm) : "—"
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 13 }),
            label: "Zones Claimed",
            value: `${String(zonesEst)} zones`
          }
        ].map(({ icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card p-3 flex items-center gap-2",
            style: { borderColor: "oklch(0.28 0.01 50)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.72 0.2 72)" }, children: icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm", children: value })
              ] })
            ]
          },
          label
        )) }),
        zonesEst > 0n && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl px-3 py-2 text-center",
            style: {
              background: "oklch(0.72 0.2 72 / 0.1)",
              border: "1px solid oklch(0.72 0.2 72 / 0.2)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs font-medium",
                style: { color: "oklch(0.72 0.2 72)" },
                children: [
                  "🗺️ You claimed approximately ",
                  String(zonesEst),
                  " territory zone",
                  zonesEst !== 1n ? "s" : "",
                  "!"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            "data-ocid": "workout_complete.dismiss_button",
            className: "w-full font-semibold",
            style: goldButtonStyle,
            onClick: onDismiss,
            children: "Done"
          }
        )
      ]
    }
  );
}
function HistoryItem({ workout, index, onDelete }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const meta = WORKOUT_TYPE_META[workout.workoutType];
  const date = new Date(Number(workout.startedAt / 1000000n));
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `workout_history.item.${index}`,
      className: "rounded-xl overflow-hidden transition-all duration-200",
      style: {
        background: "oklch(0.15 0.006 50)",
        border: `1px solid ${expanded ? "oklch(0.72 0.2 72 / 0.25)" : "oklch(0.22 0.01 50)"}`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `workout_history.expand.${index}`,
            className: "w-full flex items-center gap-3 p-4 text-left",
            onClick: () => setExpanded((v) => !v),
            "aria-expanded": expanded,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl",
                  style: { background: "oklch(0.20 0.01 50)" },
                  "aria-hidden": "true",
                  children: meta.emoji
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: meta.label }),
                  workout.territoryZonesClaimed > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-[10px] h-4 px-1.5",
                      style: {
                        borderColor: "oklch(0.72 0.2 72 / 0.4)",
                        color: "oklch(0.72 0.2 72)"
                      },
                      children: [
                        "+",
                        String(workout.territoryZonesClaimed),
                        " zones"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground ml-auto pr-1", children: [
                    dateStr,
                    " · ",
                    timeStr
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground font-mono flex-wrap", children: [
                  workout.distanceMetres > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 10 }),
                    " ",
                    formatDistance(workout.distanceMetres)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
                    " ",
                    formatDuration(workout.durationSeconds)
                  ] }),
                  workout.averagePaceSecondsPerKm && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 10 }),
                    " ",
                    formatPace(workout.averagePaceSecondsPerKm)
                  ] }),
                  workout.caloriesBurned && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 10 }),
                    " ",
                    workout.caloriesBurned,
                    " kcal"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-muted-foreground flex-shrink-0",
                  "aria-hidden": "true",
                  children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 15 })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-4 pb-4 pt-3 space-y-3",
                style: { borderTop: "1px solid oklch(0.22 0.01 50)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Route Stats" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
                      {
                        label: "Distance",
                        value: workout.distanceMetres > 0 ? formatDistance(workout.distanceMetres) : "—"
                      },
                      {
                        label: "Duration",
                        value: formatDuration(workout.durationSeconds)
                      },
                      {
                        label: "Avg Pace",
                        value: formatPace(workout.averagePaceSecondsPerKm)
                      }
                    ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-lg p-2.5 text-center",
                        style: { background: "oklch(0.12 0.004 50)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-semibold text-foreground text-xs mt-0.5", children: value })
                        ]
                      },
                      label
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "GPS Events Logged" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: SAMPLE_GPS_EVENTS.map((ev, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 text-[10px] text-muted-foreground font-mono rounded px-2 py-1.5",
                        style: { background: "oklch(0.12 0.004 50)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
                              style: {
                                background: ev.type === "active" ? "oklch(0.72 0.2 72)" : "oklch(0.40 0 0)"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate", children: ev.message }),
                          ev.accuracy && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "flex-shrink-0",
                              style: { color: "oklch(0.72 0.2 72)" },
                              children: [
                                "±",
                                ev.accuracy,
                                "m"
                              ]
                            }
                          )
                        ]
                      },
                      `${ev.timestamp}-${j}`
                    )) })
                  ] }),
                  workout.territoryZonesClaimed > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Territory Zones Claimed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 rounded-lg px-3 py-2",
                        style: {
                          background: "oklch(0.72 0.2 72 / 0.1)",
                          border: "1px solid oklch(0.72 0.2 72 / 0.2)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Trophy,
                            {
                              size: 13,
                              style: { color: "oklch(0.72 0.2 72)" },
                              className: "flex-shrink-0"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-foreground font-medium", children: [
                            String(workout.territoryZonesClaimed),
                            " zone",
                            workout.territoryZonesClaimed !== 1n ? "s" : "",
                            " claimed in this workout"
                          ] })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        "data-ocid": `workout_history.delete_button.${index}`,
                        className: "w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 mt-1",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13, className: "mr-1.5" }),
                          "Delete Workout"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "workout_history.delete_dialog", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Workout?" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                          "This will permanently remove this",
                          " ",
                          meta.label.toLowerCase(),
                          " from your history. Any territory claimed will remain."
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "workout_history.delete_cancel_button", children: "Cancel" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogAction,
                          {
                            "data-ocid": "workout_history.delete_confirm_button",
                            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                            onClick: () => onDelete(workout.id),
                            children: "Delete"
                          }
                        )
                      ] })
                    ] })
                  ] })
                ]
              }
            )
          }
        ) })
      ]
    }
  );
}
function haversineMetres(a, b) {
  const R = 6371e3;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}
function WorkoutsPage() {
  const [mode, setMode] = reactExports.useState("idle");
  const [selectedType, setSelectedType] = reactExports.useState(
    WorkoutType.run
  );
  const [completedWorkout, setCompletedWorkout] = reactExports.useState(null);
  const [filter, setFilter] = reactExports.useState("all");
  const [workouts, setWorkouts] = reactExports.useState(SAMPLE_WORKOUTS);
  const filteredWorkouts = workouts.filter((w) => matchesFilter(w, filter));
  const totalKm = workouts.reduce((s, w) => s + w.distanceMetres / 1e3, 0);
  const totalZones = workouts.reduce(
    (s, w) => s + Number(w.territoryZonesClaimed),
    0
  );
  function handleStartTracking() {
    if (GPS_TYPES.has(selectedType)) {
      setMode("gps_active");
    } else {
      setMode("manual_form");
    }
  }
  function handleWorkoutComplete(summary) {
    const newWorkout = {
      id: BigInt(Date.now()),
      userId: {},
      workoutType: summary.workoutType ?? WorkoutType.other,
      status: WorkoutStatus.completed,
      startedAt: BigInt(Date.now()) * 1000000n,
      completedAt: BigInt(Date.now()) * 1000000n,
      distanceMetres: summary.distanceMetres ?? 0,
      durationSeconds: summary.durationSeconds ?? 0n,
      caloriesBurned: summary.caloriesBurned,
      averagePaceSecondsPerKm: summary.averagePaceSecondsPerKm,
      territoryZonesClaimed: summary.territoryZonesClaimed ?? 0n
    };
    setWorkouts((prev) => [newWorkout, ...prev]);
    setCompletedWorkout(summary);
    setMode("complete");
  }
  function handleDeleteWorkout(id) {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  }
  function handleDismissComplete() {
    setCompletedWorkout(null);
    setMode("idle");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { headerTitle: "Workouts", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "workouts.page", className: "flex flex-col gap-4 p-4 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "workouts.stats_bar", className: "grid grid-cols-3 gap-2", children: [
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 13 }),
        label: "Workouts",
        value: String(workouts.length)
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13 }),
        label: "Total km",
        value: totalKm.toFixed(1)
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 13 }),
        label: "Zones",
        value: String(totalZones)
      }
    ].map(({ icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 text-muted-foreground mb-1", children: [
        icon,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "font-display font-bold text-lg leading-tight",
          style: { color: "oklch(0.72 0.2 72)" },
          children: value
        }
      )
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mode === "complete" && completedWorkout && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WorkoutCompleteSummary,
      {
        workout: completedWorkout,
        onDismiss: handleDismissComplete
      }
    ) }),
    mode !== "complete" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Log New Workout" }),
        (mode === "gps_active" || mode === "manual_form") && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[10px] px-2 py-0.5 rounded-full",
            style: {
              background: "oklch(0.72 0.2 72 / 0.1)",
              color: "oklch(0.72 0.2 72)",
              border: "1px solid oklch(0.72 0.2 72 / 0.25)"
            },
            children: "In Progress"
          }
        )
      ] }),
      (mode === "idle" || mode === "selecting") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          className: "space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              WorkoutTypeSelector,
              {
                selected: selectedType,
                onChange: (t) => {
                  setSelectedType(t);
                  setMode("selecting");
                }
              }
            ),
            GPS_TYPES.has(selectedType) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 text-[10px] text-muted-foreground rounded-lg px-3 py-2",
                style: {
                  background: "oklch(0.15 0.006 50)",
                  border: "1px solid oklch(0.24 0.01 50)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(GpsStatusBadge, { status: "idle" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1", children: "GPS tracking will activate for this workout type" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                "data-ocid": "workouts.start_tracking_button",
                size: "lg",
                className: "w-full h-12 font-display font-semibold text-base transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]",
                style: goldButtonStyle,
                onClick: handleStartTracking,
                children: [
                  WORKOUT_TYPE_META[selectedType].emoji,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: GPS_TYPES.has(selectedType) ? "Start Tracking" : "Log Workout" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mode === "gps_active" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActiveGpsWorkout,
        {
          workoutType: selectedType,
          onComplete: handleWorkoutComplete,
          onCancel: () => setMode("idle")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mode === "manual_form" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ManualWorkoutForm,
        {
          workoutType: selectedType,
          onSave: handleWorkoutComplete,
          onCancel: () => setMode("idle")
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Workout History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "workouts.filter_bar",
          className: "flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar",
          children: FILTER_TABS.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `workouts.filter.${key}`,
              onClick: () => setFilter(key),
              className: "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
              style: filter === key ? {
                background: "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                color: "oklch(0.10 0 0)",
                boxShadow: "0 2px 12px oklch(0.68 0.18 70 / 0.35)"
              } : {
                background: "oklch(0.15 0.006 50)",
                border: "1px solid oklch(0.24 0.01 50)",
                color: "oklch(0.55 0.005 0)"
              },
              children: label
            },
            key
          ))
        }
      ),
      filteredWorkouts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "workout_history.empty_state",
          className: "glass-card p-8 text-center space-y-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: "🏃" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-foreground text-sm", children: "No workouts yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Start your first workout and claim some territory!" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredWorkouts.map((workout, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        HistoryItem,
        {
          workout,
          index: i + 1,
          onDelete: handleDeleteWorkout
        },
        String(workout.id)
      )) })
    ] })
  ] }) });
}
export {
  WorkoutsPage as default
};
