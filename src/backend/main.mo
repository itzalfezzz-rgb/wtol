import Common "types/common";
import UserTypes "types/user";
import WorkoutTypes "types/workout";
import TerritoryTypes "types/territory";
import FeedTypes "types/feed";
import CompetitionTypes "types/competition";
import CoachTypes "types/coach";

import UserApi "mixins/user-api";
import WorkoutApi "mixins/workout-api";
import TerritoryApi "mixins/territory-api";
import FeedApi "mixins/feed-api";
import CompetitionApi "mixins/competition-api";
import CoachApi "mixins/coach-api";

import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";

actor {
  // --- authorization state ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- user state ---
  let users = Map.empty<Common.UserId, UserTypes.User>();
  let follows = List.empty<UserTypes.FollowRelation>();

  // --- workout state ---
  let workouts = Map.empty<Common.WorkoutId, WorkoutTypes.Workout>();

  // --- territory state ---
  let zones = Map.empty<Common.ZoneId, TerritoryTypes.Zone>();

  // --- feed state ---
  let posts = Map.empty<Common.PostId, FeedTypes.Post>();

  // --- competition state ---
  let competitions = Map.empty<Common.CompetitionId, CompetitionTypes.Competition>();

  // --- coach state ---
  let conversations = Map.empty<Common.UserId, CoachTypes.CoachConversation>();

  // --- mixin composition ---
  include UserApi(accessControlState, users, follows);
  include WorkoutApi(workouts);
  include TerritoryApi(zones, users, workouts);
  include FeedApi(posts, follows);
  include CompetitionApi(competitions, users);
  include CoachApi(conversations);
};
