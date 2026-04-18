import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  MapPin,
  MessageCircle,
  PenSquare,
  RefreshCw,
  Send,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import {
  SAMPLE_POSTS,
  SAMPLE_WORKOUTS,
  formatDistance,
  formatDuration,
  timeAgo,
} from "../lib/sample-data";
import {
  type PostView,
  WORKOUT_TYPE_META,
  type WorkoutSummary,
} from "../lib/types";

// ─── Static author data ───────────────────────────────────────────────────────

const AUTHORS = [
  { name: "BlazeTerraform", initials: "BT", hue: "72" },
  { name: "NightStrider99", initials: "NS", hue: "60" },
  { name: "PacificRunner", initials: "PR", hue: "45" },
  { name: "UrbanHawk", initials: "UH", hue: "15" },
];

const ZONE_NAMES: Record<string, string> = {
  "1": "Downtown Core",
  "2": "Mission District",
  "3": "Castro Heights",
  "4": "Pacific Heights",
  "5": "Haight-Ashbury",
};

const SAMPLE_COMMENTS = [
  [
    {
      id: "c1",
      author: "SprintKing_SF",
      initials: "SK",
      text: "Incredible run! Those are some tough zones to claim.",
      time: "45m ago",
    },
    {
      id: "c2",
      author: "MorningPace",
      initials: "MP",
      text: "I'll be back for the Downtown Core 😤",
      time: "30m ago",
    },
  ],
  [
    {
      id: "c3",
      author: "TerraHunter",
      initials: "TH",
      text: "The AI coach really works. My pace improved too!",
      time: "2h ago",
    },
  ],
  [
    {
      id: "c4",
      author: "RunnerX",
      initials: "RX",
      text: "HIIT days are underrated for territory running.",
      time: "1d ago",
    },
    {
      id: "c5",
      author: "BlazeTerraform",
      initials: "BT",
      text: "Recovery is key 💯",
      time: "22h ago",
    },
  ],
  [
    {
      id: "c6",
      author: "NightStrider99",
      initials: "NS",
      text: "5 zones in one ride?! Respect 🚴",
      time: "2d ago",
    },
  ],
];

// ─── Compose Modal ────────────────────────────────────────────────────────────

function ComposeModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutSummary | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [published, setPublished] = useState(false);
  const MAX_CHARS = 280;

  function handlePublish() {
    if (!message.trim() && !selectedWorkout) return;
    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      setMessage("");
      setSelectedWorkout(null);
      onClose();
    }, 1500);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="compose.dialog"
        className="max-w-md w-full"
        style={{
          background: "oklch(0.16 0.008 50 / 0.97)",
          backdropFilter: "blur(20px)",
          border: "1px solid oklch(0.72 0.2 72 / 0.2)",
        }}
      >
        <DialogHeader className="flex flex-row items-center justify-between pb-2">
          <DialogTitle className="font-display text-lg text-foreground">
            Share Workout
          </DialogTitle>
          <button
            type="button"
            data-ocid="compose.close_button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="compose-workout-select"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block"
            >
              Select Workout
            </label>
            <div className="relative">
              <select
                id="compose-workout-select"
                data-ocid="compose.select"
                className="w-full border rounded-lg px-3 py-2.5 text-sm text-foreground appearance-none pr-8 focus:outline-none focus:ring-1"
                style={{
                  background: "oklch(0.12 0.004 50)",
                  borderColor: "oklch(0.28 0.01 50)",
                  color: "oklch(0.90 0.005 0)",
                }}
                value={selectedWorkout ? String(selectedWorkout.id) : ""}
                onChange={(e) => {
                  const w = SAMPLE_WORKOUTS.find(
                    (wk) => String(wk.id) === e.target.value,
                  );
                  setSelectedWorkout(w ?? null);
                }}
              >
                <option value="">— No workout —</option>
                {SAMPLE_WORKOUTS.map((wk) => (
                  <option key={String(wk.id)} value={String(wk.id)}>
                    {WORKOUT_TYPE_META[wk.workoutType].emoji}{" "}
                    {WORKOUT_TYPE_META[wk.workoutType].label} ·{" "}
                    {formatDistance(wk.distanceMetres)} ·{" "}
                    {formatDuration(wk.durationSeconds)}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-3 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>

          {selectedWorkout && (
            <div
              className="rounded-xl p-3 flex items-center gap-3"
              style={{
                background: "oklch(0.12 0.004 50)",
                border: "1px solid oklch(0.28 0.01 50)",
              }}
            >
              <div className="text-2xl">
                {WORKOUT_TYPE_META[selectedWorkout.workoutType].emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground">
                  {WORKOUT_TYPE_META[selectedWorkout.workoutType].label}
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground font-mono mt-0.5">
                  {selectedWorkout.distanceMetres > 0 && (
                    <span>
                      {formatDistance(selectedWorkout.distanceMetres)}
                    </span>
                  )}
                  <span>{formatDuration(selectedWorkout.durationSeconds)}</span>
                  {selectedWorkout.caloriesBurned && (
                    <span>{selectedWorkout.caloriesBurned} kcal</span>
                  )}
                </div>
              </div>
              {selectedWorkout.territoryZonesClaimed > 0n && (
                <Badge
                  variant="outline"
                  className="text-[10px] h-5"
                  style={{
                    borderColor: "oklch(0.72 0.2 72 / 0.4)",
                    color: "oklch(0.72 0.2 72)",
                  }}
                >
                  <MapPin size={9} className="mr-1" />
                  {String(selectedWorkout.territoryZonesClaimed)} zones
                </Badge>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="compose-message-textarea"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block"
            >
              Message
            </label>
            <Textarea
              id="compose-message-textarea"
              data-ocid="compose.textarea"
              placeholder="Tell the community about your run…"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_CHARS))}
              rows={3}
              className="resize-none text-sm"
              style={{
                background: "oklch(0.12 0.004 50)",
                borderColor: "oklch(0.28 0.01 50)",
              }}
            />
            <div
              className={`text-right text-xs mt-1 font-mono ${message.length > MAX_CHARS * 0.9 ? "text-destructive" : "text-muted-foreground"}`}
            >
              {message.length}/{MAX_CHARS}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              data-ocid="compose.cancel_button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="compose.submit_button"
              size="sm"
              disabled={!message.trim() && !selectedWorkout}
              onClick={handlePublish}
              className="flex-1 font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
                color: "oklch(0.10 0 0)",
              }}
            >
              {published ? (
                <span className="text-xs">Posted! ✓</span>
              ) : (
                <>
                  <Send size={14} className="mr-1.5" />
                  Publish
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Comment Section ──────────────────────────────────────────────────────────

function CommentSection({ postIndex }: { postIndex: number }) {
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState<
    {
      id: string;
      author: string;
      initials: string;
      text: string;
      time: string;
    }[]
  >(SAMPLE_COMMENTS[postIndex] ?? []);

  function handleSubmit() {
    if (!commentText.trim()) return;
    setLocalComments((prev) => [
      ...prev,
      {
        id: `local_${Date.now()}`,
        author: "ClaimMaster42",
        initials: "CM",
        text: commentText.trim(),
        time: "just now",
      },
    ]);
    setCommentText("");
  }

  return (
    <div
      className="mt-3 pt-3 space-y-3"
      style={{ borderTop: "1px solid oklch(0.22 0.01 50)" }}
    >
      {localComments.map((c) => (
        <div key={c.id} className="flex gap-2.5">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "oklch(0.20 0.01 50)",
              border: "1px solid oklch(0.28 0.01 50)",
            }}
          >
            <span className="text-[9px] font-bold text-muted-foreground font-mono">
              {c.initials}
            </span>
          </div>
          <div
            className="flex-1 min-w-0 rounded-lg px-2.5 py-1.5"
            style={{ background: "oklch(0.14 0.006 50)" }}
          >
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-semibold text-foreground">
                {c.author}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {c.time}
              </span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed mt-0.5 break-words">
              {c.text}
            </p>
          </div>
        </div>
      ))}

      <div className="flex gap-2 items-end">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "oklch(0.72 0.2 72 / 0.15)",
            border: "1px solid oklch(0.72 0.2 72 / 0.3)",
          }}
        >
          <span
            className="text-[9px] font-bold font-mono"
            style={{ color: "oklch(0.72 0.2 72)" }}
          >
            CM
          </span>
        </div>
        <div className="flex-1 flex gap-1.5">
          <input
            data-ocid={`feed.comment_input.${postIndex + 1}`}
            type="text"
            placeholder="Add a comment…"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 rounded-lg px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
            style={{
              background: "oklch(0.14 0.006 50)",
              border: "1px solid oklch(0.24 0.01 50)",
            }}
          />
          <button
            type="button"
            data-ocid={`feed.comment_submit.${postIndex + 1}`}
            onClick={handleSubmit}
            disabled={!commentText.trim()}
            className="p-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "oklch(0.72 0.2 72 / 0.12)",
              border: "1px solid oklch(0.72 0.2 72 / 0.3)",
              color: "oklch(0.72 0.2 72)",
            }}
          >
            <Send size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({
  post,
  index,
  isLiked,
  isFollowing,
  onToggleLike,
  onToggleFollow,
}: {
  post: PostView;
  index: number;
  isLiked: boolean;
  isFollowing: boolean;
  onToggleLike: (id: string) => void;
  onToggleFollow: (id: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const author = AUTHORS[index % AUTHORS.length];
  const postId = String(post.id);

  return (
    <article
      data-ocid={`feed.post.item.${index + 1}`}
      className="px-4 pt-4 pb-3"
      style={{ borderBottom: "1px solid oklch(0.18 0.008 50)" }}
    >
      {/* Author row */}
      <div className="flex items-center gap-2.5 mb-3">
        {/* Avatar with gold ring treatment */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `oklch(0.72 0.2 ${author.hue} / 0.15)`,
            border: `2px solid oklch(0.72 0.2 ${author.hue} / 0.5)`,
            boxShadow: `0 0 8px oklch(0.72 0.2 ${author.hue} / 0.2)`,
          }}
        >
          <span
            className="font-bold text-xs font-mono"
            style={{ color: `oklch(0.82 0.18 ${author.hue})` }}
          >
            {author.initials}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-foreground text-sm leading-none">
              {author.name}
            </span>
            <span className="text-muted-foreground text-xs">
              · {timeAgo(post.createdAt)}
            </span>
          </div>
          {post.territoryClaimed.length > 0 && (
            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
              {post.territoryClaimed.slice(0, 3).map((zid) => (
                <span
                  key={String(zid)}
                  className="text-[9px] font-mono rounded px-1 py-0.5"
                  style={{
                    color: "oklch(0.72 0.2 72)",
                    background: "oklch(0.72 0.2 72 / 0.1)",
                    border: "1px solid oklch(0.72 0.2 72 / 0.2)",
                  }}
                >
                  {ZONE_NAMES[String(zid)] ?? `Zone ${zid}`}
                </span>
              ))}
              {post.territoryClaimed.length > 3 && (
                <span className="text-[9px] text-muted-foreground">
                  +{post.territoryClaimed.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Follow button */}
        {index > 0 &&
          (isFollowing ? (
            <button
              type="button"
              data-ocid={`feed.following_badge.${index + 1}`}
              onClick={() => onToggleFollow(postId)}
              className="flex items-center gap-1 text-[10px] rounded-full px-2 py-0.5 transition-colors"
              style={{
                color: "oklch(0.72 0.2 72)",
                background: "oklch(0.72 0.2 72 / 0.1)",
                border: "1px solid oklch(0.72 0.2 72 / 0.25)",
              }}
            >
              <UserCheck size={10} />
              Following
            </button>
          ) : (
            <button
              type="button"
              data-ocid={`feed.follow_button.${index + 1}`}
              onClick={() => onToggleFollow(postId)}
              className="flex items-center gap-1 text-[10px] rounded-full px-2 py-0.5 transition-colors"
              style={{
                color: "oklch(0.65 0.005 0)",
                background: "oklch(0.18 0.008 50)",
                border: "1px solid oklch(0.28 0.01 50)",
              }}
            >
              <UserPlus size={10} />
              Follow
            </button>
          ))}
      </div>

      {/* Message */}
      <p className="text-foreground/90 text-sm leading-relaxed mb-3">
        {post.message}
      </p>

      {/* Workout summary card */}
      {post.workoutSummary && (
        <div
          className="glass-card p-3 mb-3 flex items-center gap-3"
          style={{ borderColor: "oklch(0.28 0.01 50)" }}
        >
          <div className="text-2xl leading-none">
            {WORKOUT_TYPE_META[post.workoutSummary.workoutType].emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground text-sm">
                {WORKOUT_TYPE_META[post.workoutSummary.workoutType].label}
              </span>
              {post.workoutSummary.territoryZonesClaimed > 0n && (
                <Badge
                  variant="outline"
                  className="text-[9px] h-4 px-1.5"
                  style={{
                    borderColor: "oklch(0.72 0.2 72 / 0.4)",
                    color: "oklch(0.72 0.2 72)",
                  }}
                >
                  <MapPin size={8} className="mr-0.5" />
                  {String(post.workoutSummary.territoryZonesClaimed)} zones
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-mono mt-0.5">
              {post.workoutSummary.distanceMetres > 0 && (
                <span>
                  {formatDistance(post.workoutSummary.distanceMetres)}
                </span>
              )}
              <span>{formatDuration(post.workoutSummary.durationSeconds)}</span>
              {post.workoutSummary.caloriesBurned && (
                <span>{post.workoutSummary.caloriesBurned} kcal</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action bar */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          data-ocid={`feed.like_button.${index + 1}`}
          onClick={() => onToggleLike(postId)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-all duration-200"
          style={
            isLiked
              ? {
                  color: "oklch(0.72 0.2 72)",
                  background: "oklch(0.72 0.2 72 / 0.1)",
                }
              : { color: "oklch(0.50 0.005 0)" }
          }
        >
          <Heart size={15} className={isLiked ? "fill-current" : ""} />
          <span className="text-xs font-mono">
            {Number(post.likesCount) + (isLiked ? 1 : 0)}
          </span>
        </button>

        <button
          type="button"
          data-ocid={`feed.comment_button.${index + 1}`}
          onClick={() => setShowComments((v) => !v)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-all duration-200"
          style={
            showComments
              ? {
                  color: "oklch(0.72 0.2 72)",
                  background: "oklch(0.72 0.2 72 / 0.1)",
                }
              : { color: "oklch(0.50 0.005 0)" }
          }
        >
          <MessageCircle size={15} />
          <span className="text-xs font-mono">
            {Number(post.commentsCount)}
          </span>
          {showComments ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {showComments && <CommentSection postIndex={index} />}
    </article>
  );
}

// ─── Following Empty State ────────────────────────────────────────────────────

function FollowingEmptyState() {
  return (
    <div
      data-ocid="feed.following.empty_state"
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: "oklch(0.72 0.2 72 / 0.1)",
          border: "1px solid oklch(0.72 0.2 72 / 0.2)",
        }}
      >
        <UserPlus size={28} style={{ color: "oklch(0.72 0.2 72)" }} />
      </div>
      <h3 className="font-display text-lg font-bold text-foreground mb-2">
        No one to follow yet
      </h3>
      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-5">
        Follow runners to see their workouts and territory claims in your
        personal feed.
      </p>
      <Link to="/competition">
        <Button
          type="button"
          data-ocid="feed.following.leaderboard_link"
          size="sm"
          variant="outline"
          className="transition-all duration-200"
          style={{
            borderColor: "oklch(0.72 0.2 72 / 0.4)",
            color: "oklch(0.72 0.2 72)",
          }}
        >
          Find runners on the Leaderboard
        </Button>
      </Link>
    </div>
  );
}

// ─── FeedPage ─────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<"following" | "global">("global");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [followedPosts, setFollowedPosts] = useState<Set<string>>(
    new Set(["2"]),
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  function toggleLike(id: string) {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleFollow(id: string) {
    setFollowedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => {
      setRefreshKey((k) => k + 1);
      setIsRefreshing(false);
    }, 800);
  }

  const followingPosts = SAMPLE_POSTS.filter((p) =>
    followedPosts.has(String(p.id)),
  );
  const displayPosts = activeTab === "global" ? SAMPLE_POSTS : followingPosts;

  return (
    <Layout headerTitle="Community Feed">
      <div data-ocid="feed.page" className="flex flex-col relative min-h-full">
        {/* Sticky tab bar */}
        <div
          className="sticky top-0 z-20 border-b"
          style={{
            background: "oklch(0.14 0.006 50 / 0.95)",
            backdropFilter: "blur(16px)",
            borderColor: "oklch(0.72 0.2 72 / 0.12)",
          }}
        >
          <div className="flex items-center">
            <div className="flex flex-1">
              {(["following", "global"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  data-ocid={`feed.${tab}.tab`}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-3 text-sm font-medium transition-colors relative capitalize"
                  style={{
                    color:
                      activeTab === tab
                        ? "oklch(0.72 0.2 72)"
                        : "oklch(0.50 0.005 0)",
                  }}
                >
                  {tab === "following" ? "Following" : "Global"}
                  {activeTab === tab && (
                    <span
                      className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-t-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, oklch(0.72 0.2 72), transparent)",
                        boxShadow: "0 0 6px oklch(0.68 0.18 70 / 0.6)",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              data-ocid="feed.refresh_button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-3 py-3 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              aria-label="Refresh feed"
            >
              <RefreshCw
                size={16}
                className={isRefreshing ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {/* Feed content */}
        <div
          key={refreshKey}
          className="pb-24"
          style={{ background: "oklch(0.11 0.004 50)" }}
        >
          {displayPosts.length === 0 && activeTab === "following" ? (
            <FollowingEmptyState />
          ) : (
            displayPosts.map((post) => (
              <PostCard
                key={`${refreshKey}-${String(post.id)}`}
                post={post}
                index={SAMPLE_POSTS.indexOf(post)}
                isLiked={likedPosts.has(String(post.id))}
                isFollowing={followedPosts.has(String(post.id))}
                onToggleLike={toggleLike}
                onToggleFollow={toggleFollow}
              />
            ))
          )}
        </div>

        {/* Floating compose button */}
        <button
          type="button"
          data-ocid="feed.compose.open_modal_button"
          onClick={() => setComposeOpen(true)}
          className="fixed bottom-20 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-30"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.2 72), oklch(0.58 0.22 55))",
            color: "oklch(0.10 0 0)",
            boxShadow: "0 4px 20px oklch(0.68 0.18 70 / 0.5)",
          }}
          aria-label="Share a workout"
        >
          <PenSquare size={20} />
        </button>

        <ComposeModal
          open={composeOpen}
          onClose={() => setComposeOpen(false)}
        />
      </div>
    </Layout>
  );
}
